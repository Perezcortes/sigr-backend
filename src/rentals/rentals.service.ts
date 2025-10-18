import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { 
  Rental, 
  InquilinoPf, 
  InquilinoPm, 
  ObligadoSolidarioPf, 
  ObligadoSolidarioPm, 
  PropietarioPf, 
  PropietarioPm, 
  Propiedad 
} from './entities';
import { PostalCodesService } from '../postal-codes/postal-codes.service';

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
  ) {}

  async createManualRental(createRentalDto: CreateRentalDto): Promise<Rental> {
    const queryRunner = this.rentalRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validar código postal de la propiedad
      await this.validatePostalCode(createRentalDto.propiedad.cp);

      // Crear la renta principal
      const rental = this.rentalRepository.create({
        tipoInquilino: createRentalDto.tipoInquilino,
        tipoObligado: createRentalDto.tipoObligado,
        tipoPropietario: createRentalDto.tipoPropietario,
        tipoPropiedad: createRentalDto.tipoPropiedad,
        observaciones: createRentalDto.observaciones,
        usuarioCreacion: createRentalDto.usuarioCreacion,
        estado: 'pendiente',
      });

      const savedRental = await queryRunner.manager.save(rental);

      // Crear propiedad
      const propiedad = this.propiedadRepository.create({
        ...createRentalDto.propiedad,
        rentaId: savedRental.id,
        tipoPropiedad: createRentalDto.tipoPropiedad,
      });
      await queryRunner.manager.save(propiedad);

      // Crear inquilino según el tipo
      if (createRentalDto.tipoInquilino === 'fisica' && createRentalDto.inquilinoPf) {
        const inquilinoPf = this.inquilinoPfRepository.create({
          ...createRentalDto.inquilinoPf.datosPersonales,
          ...createRentalDto.inquilinoPf.domicilioActual,
          rentaId: savedRental.id,
          situacionHabitacional: createRentalDto.inquilinoPf.situacionHabitacional,
          profesion: createRentalDto.inquilinoPf.empleo?.profesion,
          tipoEmpleo: createRentalDto.inquilinoPf.empleo?.tipoEmpleo,
          empresaTrabaja: createRentalDto.inquilinoPf.empleo?.empresa,
          fechaIngreso: createRentalDto.inquilinoPf.empleo?.fechaIngreso ? new Date(createRentalDto.inquilinoPf.empleo.fechaIngreso) : undefined,
          ingresoComprobable: createRentalDto.inquilinoPf.ingresos?.ingresoComprobable,
          ingresoNoComprobable: createRentalDto.inquilinoPf.ingresos?.ingresoNoComprobable,
        });
        await queryRunner.manager.save(inquilinoPf);
      } else if (createRentalDto.tipoInquilino === 'moral' && createRentalDto.inquilinoPm) {
        const inquilinoPm = this.inquilinoPmRepository.create({
          ...createRentalDto.inquilinoPm.datosEmpresa,
          ...createRentalDto.inquilinoPm.domicilioEmpresa,
          ...createRentalDto.inquilinoPm.actaConstitutiva,
          rentaId: savedRental.id,
        });
        await queryRunner.manager.save(inquilinoPm);
      }

      // Crear obligado solidario según el tipo
      if (createRentalDto.tipoObligado === 'fisica' && createRentalDto.obligadoPf) {
        const obligadoPf = this.obligadoPfRepository.create({
          ...createRentalDto.obligadoPf.datosPersonales,
          ...createRentalDto.obligadoPf.domicilioActual,
          rentaId: savedRental.id,
          relacionSolicitante: createRentalDto.obligadoPf.relacionSolicitante,
          tiempoConocer: createRentalDto.obligadoPf.tiempoConocer,
          empresaTrabaja: createRentalDto.obligadoPf.empleo?.empresa,
          fechaIngreso: createRentalDto.obligadoPf.empleo?.fechaIngreso ? new Date(createRentalDto.obligadoPf.empleo.fechaIngreso) : undefined,
          profesion: createRentalDto.obligadoPf.empleo?.profesion,
          tipoEmpleo: createRentalDto.obligadoPf.empleo?.tipoEmpleo,
          ingresoMensual: createRentalDto.obligadoPf.ingresoMensual,
          autorizaInvestigacion: createRentalDto.obligadoPf.autorizaInvestigacion,
          declaraVeracidad: createRentalDto.obligadoPf.declaraVeracidad,
        });
        await queryRunner.manager.save(obligadoPf);
      } else if (createRentalDto.tipoObligado === 'moral' && createRentalDto.obligadoPm) {
        const obligadoPm = this.obligadoPmRepository.create({
          ...createRentalDto.obligadoPm.datosEmpresa,
          ...createRentalDto.obligadoPm.domicilioEmpresa,
          ...createRentalDto.obligadoPm.actaConstitutiva,
          rentaId: savedRental.id,
          antiguedadEmpresa: createRentalDto.obligadoPm.antiguedadEmpresa,
          ingresoMensual: createRentalDto.obligadoPm.ingresoMensual,
          actividadesEmpresa: createRentalDto.obligadoPm.actividadesEmpresa,
        });
        await queryRunner.manager.save(obligadoPm);
      }

      // Crear propietario según el tipo
      if (createRentalDto.tipoPropietario === 'fisica' && createRentalDto.propietarioPf) {
        const propietarioPf = this.propietarioPfRepository.create({
          ...createRentalDto.propietarioPf.datosPersonales,
          ...createRentalDto.propietarioPf.domicilioActual,
          rentaId: savedRental.id,
          regimenConyugal: createRentalDto.propietarioPf.regimenConyugal,
          formaPago: createRentalDto.propietarioPf.datosPago.formaPago,
          otraFormaPago: createRentalDto.propietarioPf.datosPago.otraFormaPago,
          titularCuenta: createRentalDto.propietarioPf.datosPago.titularCuenta,
          numeroCuenta: createRentalDto.propietarioPf.datosPago.numeroCuenta,
          banco: createRentalDto.propietarioPf.datosPago.banco,
          clabe: createRentalDto.propietarioPf.datosPago.clabe,
        });
        await queryRunner.manager.save(propietarioPf);
      } else if (createRentalDto.tipoPropietario === 'moral' && createRentalDto.propietarioPm) {
        const propietarioPm = this.propietarioPmRepository.create({
          ...createRentalDto.propietarioPm.datosEmpresa,
          ...createRentalDto.propietarioPm.domicilioEmpresa,
          ...createRentalDto.propietarioPm.actaConstitutiva,
          rentaId: savedRental.id,
          formaPago: createRentalDto.propietarioPm.datosPago.formaPago,
          otraFormaPago: createRentalDto.propietarioPm.datosPago.otraFormaPago,
          titularCuenta: createRentalDto.propietarioPm.datosPago.titularCuenta,
          numeroCuenta: createRentalDto.propietarioPm.datosPago.numeroCuenta,
          banco: createRentalDto.propietarioPm.datosPago.banco,
          clabe: createRentalDto.propietarioPm.datosPago.clabe,
        });
        await queryRunner.manager.save(propietarioPm);
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

  async findAllRentals(): Promise<Rental[]> {
    return this.rentalRepository.find({
      relations: [],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async findOneRental(id: string): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({
      where: { id },
      relations: [],
    });

    if (!rental) {
      throw new NotFoundException(`Renta con ID ${id} no encontrada`);
    }

    return rental;
  }

  async updateTenant(rentalId: string, updateTenantDto: any): Promise<Rental> {
    const rental = await this.findOneRental(rentalId);
    // Lógica para actualizar inquilino según el tipo
    // Implementar según sea necesario
    return rental;
  }

  async updateOwner(rentalId: string, updateOwnerDto: any): Promise<Rental> {
    const rental = await this.findOneRental(rentalId);
    // Lógica para actualizar propietario según el tipo
    // Implementar según sea necesario
    return rental;
  }

  async updateProperty(rentalId: string, updatePropertyDto: any): Promise<Rental> {
    const rental = await this.findOneRental(rentalId);
    // Lógica para actualizar propiedad
    // Implementar según sea necesario
    return rental;
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
    return { message: 'Renta eliminada exitosamente' };
  }

  private async validatePostalCode(cp: string): Promise<void> {
    try {
      await this.postalCodesService.getInfoByPostalCode(cp);
    } catch (error) {
      throw new BadRequestException(`Código postal ${cp} no válido: ${error.message}`);
    }
  }
}