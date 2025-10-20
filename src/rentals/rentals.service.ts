import { Injectable, NotFoundException, BadRequestException, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRentalDto } from "./dto/create-rental.dto";
import { UpdateRentalDto } from "./dto/update-rental.dto";
import { Rental, InquilinoPf, InquilinoPm, ObligadoSolidarioPf, ObligadoSolidarioPm, PropietarioPf, PropietarioPm, Propiedad } from "./entities";
import { PostalCodesService } from "../postal-codes/postal-codes.service";
import { InquilinoService } from "./services/inquilino.service";
import { PropietarioService } from "./services/propietario.service";
import { PropiedadService } from "./services/propiedad.service";
import { ObligadoSolidarioService } from "./services/obligado-solidario.service";

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(InquilinoPf)
    private readonly inquilinoPfRepository: Repository<InquilinoPf>,
    @InjectRepository(InquilinoPm)
    private readonly inquilinoPmRepository: Repository<InquilinoPm>,
    @InjectRepository(ObligadoSolidarioPf)
    private readonly obligadoPfRepository: Repository<ObligadoSolidarioPf>,
    @InjectRepository(ObligadoSolidarioPm)
    private readonly obligadoPmRepository: Repository<ObligadoSolidarioPm>,
    @InjectRepository(PropietarioPf)
    private readonly propietarioPfRepository: Repository<PropietarioPf>,
    @InjectRepository(PropietarioPm)
    private readonly propietarioPmRepository: Repository<PropietarioPm>,
    @InjectRepository(Propiedad)
    private readonly propiedadRepository: Repository<Propiedad>,
    private readonly postalCodesService: PostalCodesService,
    private readonly inquilinoService: InquilinoService,
    private readonly propietarioService: PropietarioService,
    private readonly propiedadService: PropiedadService,
    private readonly obligadoSolidarioService: ObligadoSolidarioService,
  ) {}

  async createManualRental(createRentalDto: CreateRentalDto): Promise<Rental> {
    const queryRunner = this.rentalRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validar código postal de la propiedad
      if (createRentalDto.propiedad?.cp) {
        await this.validatePostalCode(createRentalDto.propiedad.cp);
      }

      // Crear la renta principal
      const rental = this.rentalRepository.create({
        tipoInquilino: createRentalDto.tipoInquilino,
        tipoObligado: createRentalDto.tipoObligado || "fisica",
        tipoPropietario: createRentalDto.tipoPropietario || "fisica",
        tipoPropiedad: createRentalDto.tipoPropiedad || "casa",
        observaciones: createRentalDto.observaciones,
        usuarioCreacion: createRentalDto.usuarioCreacion,
        estado: "pendiente",
      });

      const savedRental = await queryRunner.manager.save(rental);

      // Crear propiedad si se proporciona
      if (createRentalDto.propiedad) {
        await this.propiedadService.createPropiedad(
          savedRental.id, 
          createRentalDto.propiedad, 
          createRentalDto.tipoPropiedad, 
          queryRunner
        );
      }

      // Crear inquilino según el tipo
      if (createRentalDto.tipoInquilino === "fisica" && createRentalDto.inquilinoPf) {
        await this.inquilinoService.createInquilinoPersonaFisica(
          savedRental.id, 
          createRentalDto.inquilinoPf, 
          queryRunner
        );
      } else if (createRentalDto.tipoInquilino === "moral" && createRentalDto.inquilinoPm) {
        await this.inquilinoService.createInquilinoPersonaMoral(
          savedRental.id, 
          createRentalDto.inquilinoPm, 
          queryRunner
        );
      }

      // Crear propietario según el tipo
      if (createRentalDto.tipoPropietario === "fisica" && createRentalDto.propietarioPf) {
        await this.propietarioService.createPropietarioPersonaFisica(
          savedRental.id, 
          createRentalDto.propietarioPf, 
          queryRunner
        );
      } else if (createRentalDto.tipoPropietario === "moral" && createRentalDto.propietarioPm) {
        await this.propietarioService.createPropietarioPersonaMoral(
          savedRental.id, 
          createRentalDto.propietarioPm, 
          queryRunner
        );
      }

      // Crear obligado solidario si se proporciona
      if (createRentalDto.tipoObligado === "fisica" && createRentalDto.obligadoPf) {
        await this.obligadoSolidarioService.createObligadoPersonaFisica(
          savedRental.id, 
          createRentalDto.obligadoPf, 
          queryRunner
        );
      } else if (createRentalDto.tipoObligado === "moral" && createRentalDto.obligadoPm) {
        await this.obligadoSolidarioService.createObligadoPersonaMoral(
          savedRental.id, 
          createRentalDto.obligadoPm, 
          queryRunner
        );
      }

      await queryRunner.commitTransaction();
      return await this.findOneRental(savedRental.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`Error al crear la renta: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async findAllRentals(): Promise<any[]> {
    const rentals = await this.rentalRepository.find({
      relations: ["inquilinoPf", "inquilinoPm", "propiedad", "propietarioPf", "propietarioPm", "obligadoPf", "obligadoPm"],
      order: { fechaCreacion: "DESC" },
    });

    return rentals.map((rental) => ({
      ...rental,
      inquilinos_pf: rental.inquilinoPf ? [rental.inquilinoPf] : [],
      inquilinos_pm: rental.inquilinoPm ? [rental.inquilinoPm] : [],
      propiedades: rental.propiedad ? [rental.propiedad] : [],
      propietarios_pf: rental.propietarioPf ? [rental.propietarioPf] : [],
      propietarios_pm: rental.propietarioPm ? [rental.propietarioPm] : [],
    }));
  }

  async findOneRental(id: string): Promise<any> {
    const rental = await this.rentalRepository.findOne({
      where: { id },
      relations: ["inquilinoPf", "inquilinoPm", "propiedad", "propietarioPf", "propietarioPm", "obligadoPf", "obligadoPm"],
    });

    if (!rental) {
      throw new NotFoundException(`Renta con ID ${id} no encontrada`);
    }

    return {
      ...rental,
      inquilinos_pf: rental.inquilinoPf ? [rental.inquilinoPf] : [],
      inquilinos_pm: rental.inquilinoPm ? [rental.inquilinoPm] : [],
      propiedades: rental.propiedad ? [rental.propiedad] : [],
      propietarios_pf: rental.propietarioPf ? [rental.propietarioPf] : [],
      propietarios_pm: rental.propietarioPm ? [rental.propietarioPm] : [],
    };
  }

  async updateTenant(rentalId: string, updateTenantDto: any): Promise<Rental> {
    //console.log('Actualizando inquilino para rentalId:', rentalId);
    
    const rental = await this.findOneRental(rentalId);
    //console.log('Rental encontrado - tipoInquilino:', rental.tipoInquilino);

    const queryRunner = this.rentalRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (rental.tipoInquilino === "fisica" && rental.inquilinoPf) {
        //console.log('Actualizando Inquilino PF con ID:', rental.inquilinoPf.id);
        await this.inquilinoService.updateInquilinoPersonaFisica(
          rental.inquilinoPf.id, 
          updateTenantDto, 
          queryRunner
        );
      } else if (rental.tipoInquilino === "moral" && rental.inquilinoPm) {
        //console.log('Actualizando Inquilino PM con ID:', rental.inquilinoPm.id);
        await this.inquilinoService.updateInquilinoPersonaMoral(
          rental.inquilinoPm.id, 
          updateTenantDto, 
          queryRunner
        );
      } else {
        //console.log('No se pudo encontrar el inquilino para actualizar');
        throw new NotFoundException('Inquilino no encontrado para actualizar');
      }

      await queryRunner.commitTransaction();
      //console.log('Actualización completada exitosamente');
      return await this.findOneRental(rentalId);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      //console.error('Error al actualizar el inquilino:', error);
      throw new BadRequestException(`Error al actualizar el inquilino: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async updateOwner(rentalId: string, updateOwnerDto: any): Promise<Rental> {
    const rental = await this.findOneRental(rentalId);
    
    const queryRunner = this.rentalRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (rental.tipoPropietario === "fisica" && rental.propietarioPf) {
        await this.propietarioService.updatePropietarioPersonaFisica(
          rental.propietarioPf.id, 
          updateOwnerDto, 
          queryRunner
        );
      } else if (rental.tipoPropietario === "moral" && rental.propietarioPm) {
        await this.propietarioService.updatePropietarioPersonaMoral(
          rental.propietarioPm.id, 
          updateOwnerDto, 
          queryRunner
        );
      } else {
        throw new NotFoundException('Propietario no encontrado para actualizar');
      }

      await queryRunner.commitTransaction();
      return await this.findOneRental(rentalId);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`Error al actualizar el propietario: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async updateProperty(rentalId: string, updatePropertyDto: any): Promise<Rental> {
    const rental = await this.findOneRental(rentalId);
    
    const queryRunner = this.rentalRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (rental.propiedad) {
        await this.propiedadService.updatePropiedad(
          rental.propiedad.id, 
          updatePropertyDto, 
          queryRunner
        );
      } else {
        throw new NotFoundException('Propiedad no encontrada para actualizar');
      }

      await queryRunner.commitTransaction();
      return await this.findOneRental(rentalId);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`Error al actualizar la propiedad: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async updateStatus(rentalId: string, status: string): Promise<Rental> {
    const rental = await this.findOneRental(rentalId);
    rental.estado = status;
    return this.rentalRepository.save(rental);
  }

  async removeRental(id: string): Promise<{ message: string }> {
    const result = await this.rentalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Renta con ID ${id} no encontrada`);
    }
    return { message: "Renta eliminada exitosamente" };
  }

  private async validatePostalCode(cp: string): Promise<void> {
    try {
      await this.postalCodesService.getInfoByPostalCode(cp);
    } catch (error) {
      throw new BadRequestException(`Código postal ${cp} no válido: ${error.message}`);
    }
  }

  async findTenantByRentalId(rentalId: string): Promise<any> {
    try {
      const rental = await this.rentalRepository.findOne({
        where: { id: rentalId },
        relations: ["inquilinoPf", "inquilinoPm", "propiedad"],
      });

      if (!rental) {
        throw new NotFoundException(`Renta con ID ${rentalId} no encontrada`);
      }

      if (rental.tipoInquilino === "fisica" && rental.inquilinoPf) {
        return this.inquilinoService.transformInquilinoPfToFormData(rental.inquilinoPf);
      } else if (rental.tipoInquilino === "moral" && rental.inquilinoPm) {
        return this.inquilinoService.transformInquilinoPmToFormData(rental.inquilinoPm);
      }

      throw new NotFoundException("Datos del inquilino no encontrados");
    } catch (error) {
      throw error;
    }
  }
}