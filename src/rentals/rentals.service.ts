// src/rentals/rentals.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './entities/rental.entity';
import { Tenant } from './entities/tenant.entity';
import { Owner } from './entities/owner.entity';
import { Guarantor } from './entities/guarantor.entity';
import { Property } from './entities/property.entity';
import { User } from '../users/entities/user.entity';
import { CreateRentalDto } from './dto/rental.dto';

// Importa los repositorios de las nuevas entidades
import { PersonaFisica } from './entities/tenant-pf.entity';
import { PersonaMoral } from './entities/tenant-pm.entity';
import { UsoPropiedad } from './entities/use-property.entity';
import { GuarantorPropertyGuarantee } from './entities/guarantor-property-guarantee.entity';
import { GuarantorEmploymentIncomePf } from './entities/guarantor-employment-income-pf.entity';
import { GuarantorLegalRepresentative } from './entities/guarantor-legal-representative.entity';
import { OwnerBankInfo } from './entities/owner-bank-info.entity';
import { OwnerProperty } from './entities/owner-property.entity';
import { OwnerLegalRepresentative } from './entities/owner-legal-representative.entity';
import { TipoPersona } from './dto/create-tenant.dto';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
    @InjectRepository(Guarantor)
    private readonly guarantorRepository: Repository<Guarantor>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    // Repositorios de entidades de inquilino
    @InjectRepository(PersonaFisica)
    private readonly personaFisicaRepository: Repository<PersonaFisica>,
    @InjectRepository(PersonaMoral)
    private readonly personaMoralRepository: Repository<PersonaMoral>,
    @InjectRepository(UsoPropiedad)
    private readonly usoPropiedadRepository: Repository<UsoPropiedad>,

    // Repositorios de entidades de fiador
    @InjectRepository(GuarantorPropertyGuarantee)
    private readonly guarantorPropertyGuaranteeRepository: Repository<GuarantorPropertyGuarantee>,
    @InjectRepository(GuarantorEmploymentIncomePf)
    private readonly guarantorEmploymentIncomePfRepository: Repository<GuarantorEmploymentIncomePf>,
    @InjectRepository(GuarantorLegalRepresentative)
    private readonly guarantorLegalRepresentativeRepository: Repository<GuarantorLegalRepresentative>,

    // Repositorios de entidades de propietario
    @InjectRepository(OwnerBankInfo)
    private readonly ownerBankInfoRepository: Repository<OwnerBankInfo>,
    @InjectRepository(OwnerProperty)
    private readonly ownerPropertyRepository: Repository<OwnerProperty>,
    @InjectRepository(OwnerLegalRepresentative)
    private readonly ownerLegalRepresentativeRepository: Repository<OwnerLegalRepresentative>,
  ) {}

  async createManualRental(createRentalDto: CreateRentalDto): Promise<Rental> {
    const { inquilino, propietario, propiedad, obligado_solidario, ...rentalData } = createRentalDto;
    const user = await this.userRepository.findOne({ where: { id: rentalData.creado_por_user_id } });
    if (!user) {
      throw new BadRequestException('El usuario que crea la renta no es válido.');
    }

    return this.rentalRepository.manager.transaction(async (transactionalEntityManager): Promise<Rental> => {
      // 1. Crear y guardar el inquilino
      const newTenant = this.tenantRepository.create({
        tipo_persona: inquilino.tipo_persona,
        email: inquilino.email,
        rfc: inquilino.rfc,
        tel_cel: inquilino.tel_cel,
        tel_fijo: inquilino.tel_fijo,
        dom_calle: inquilino.dom_calle,
        dom_num_ext: inquilino.dom_num_ext,
        dom_num_int: inquilino.dom_num_int,
        dom_cp: inquilino.dom_cp,
        dom_colonia: inquilino.dom_colonia,
        dom_municipio: inquilino.dom_municipio,
        dom_estado: inquilino.dom_estado,
        sit_hab: inquilino.sit_hab,
        arr_act_nombre: inquilino.arr_act_nombre,
        arr_act_apellido_p: inquilino.arr_act_apellido_p,
        arr_act_apellido_m: inquilino.arr_act_apellido_m,
        arr_act_tel: inquilino.arr_act_tel,
        arr_act_renta: inquilino.arr_act_renta,
        arr_act_ano: inquilino.arr_act_ano,
      });

      if (inquilino.tipo_persona === TipoPersona.FISICA && inquilino.pf_datos) {
        newTenant.pf = await transactionalEntityManager.save(this.personaFisicaRepository.create(inquilino.pf_datos));
      } else if (inquilino.tipo_persona === TipoPersona.MORAL && inquilino.pm_datos) {
        newTenant.pm = await transactionalEntityManager.save(this.personaMoralRepository.create(inquilino.pm_datos));
      }

      if (inquilino.uso_propiedad) {
        newTenant.uso_propiedad = await transactionalEntityManager.save(this.usoPropiedadRepository.create(inquilino.uso_propiedad));
      }

      const savedTenant = await transactionalEntityManager.save(newTenant);

      // 2. Crear y guardar el propietario
      const newOwner = this.ownerRepository.create({
        tipo_persona: propietario.tipo_persona,
        email: propietario.email,
        telefono: propietario.telefono,
        // Asignación de campos de PF o PM
        nombre: propietario.tipo_persona === TipoPersona.FISICA ? propietario.nombre_pf : propietario.nombre_empresa_pm,
        rfc: propietario.rfc_pm, // Asume que el RFC es solo para PM en este DTO
        // ... otros campos
      });

      if (propietario.datos_bancarios) {
        newOwner.bank_info = await transactionalEntityManager.save(this.ownerBankInfoRepository.create(propietario.datos_bancarios));
      }

      if (propietario.inmueble) {
        newOwner.property = await transactionalEntityManager.save(this.ownerPropertyRepository.create(propietario.inmueble));
      }

      const savedOwner = await transactionalEntityManager.save(newOwner);
      
      // 3. Crear y guardar la propiedad
      const newProperty = this.propertyRepository.create({ ...propiedad, propietario: savedOwner });
      const savedProperty = await transactionalEntityManager.save(newProperty);

      // 4. Crear y guardar el obligado solidario si existe
      let savedGuarantor: Guarantor | null = null;
      if (obligado_solidario) {
        const newGuarantor = this.guarantorRepository.create({
          tipo_persona: obligado_solidario.tipo_persona,
          // ... otros campos compartidos del fiador
        });
        
        if (obligado_solidario.tipo_persona === TipoPersona.FISICA && obligado_solidario.pf_datos_empleo) {
          newGuarantor.empleo_ingresos_pf = await transactionalEntityManager.save(this.guarantorEmploymentIncomePfRepository.create(obligado_solidario.pf_datos_empleo));
        } else if (obligado_solidario.tipo_persona === TipoPersona.MORAL && obligado_solidario.pm_representante_legal) {
          newGuarantor.representante_legal = await transactionalEntityManager.save(this.guarantorLegalRepresentativeRepository.create(obligado_solidario.pm_representante_legal));
        }
        
        if (obligado_solidario.propiedad_garantia) {
          newGuarantor.propiedad_garantia = await transactionalEntityManager.save(this.guarantorPropertyGuaranteeRepository.create(obligado_solidario.propiedad_garantia));
        }

        savedGuarantor = await transactionalEntityManager.save(newGuarantor);
      }

      // 5. Crear la entidad de renta principal
      const newRental = this.rentalRepository.create({
        status: 'apartada',
        tipo_origen: rentalData.tipo_origen,
        creado_por_user_id: user.id,
        inquilino: savedTenant,
        propietario: savedOwner,
        propiedad: savedProperty,
        obligado_solidario: savedGuarantor ?? undefined,
      });

      return transactionalEntityManager.save(newRental);
    });
  }

  // ---

  async findAllRentals(): Promise<Rental[]> {
    return this.rentalRepository.find({
      relations: ['inquilino', 'propietario', 'propiedad', 'obligado_solidario', 'creado_por_user'],
    });
  }
}