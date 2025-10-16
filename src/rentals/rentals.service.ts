// src/rentals/rentals.service.ts
import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rental } from "./entities/rental.entity";
import { Tenant } from "./entities/tenant.entity";
import { Owner } from "./entities/owner.entity";
import { Guarantor } from "./entities/guarantor.entity";
import { Property } from "./entities/property.entity";
import { User } from "../users/entities/user.entity";
import { CreateRentalDto } from "./dto/rental.dto";

// Importa los repositorios de las nuevas entidades
import { PersonaFisica } from "./entities/tenant-pf.entity";
import { PersonaMoral } from "./entities/tenant-pm.entity";
import { UsoPropiedad } from "./entities/use-property.entity";
import { GuarantorPropertyGuarantee } from "./entities/guarantor-property-guarantee.entity";
import { GuarantorEmploymentIncomePf } from "./entities/guarantor-employment-income-pf.entity";
import { GuarantorLegalRepresentative } from "./entities/guarantor-legal-representative.entity";
import { OwnerBankInfo } from "./entities/owner-bank-info.entity";
import { OwnerProperty } from "./entities/owner-property.entity";
import { OwnerLegalRepresentative } from "./entities/owner-legal-representative.entity";
import { TipoPersona } from "./dto/create-tenant.dto";

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
      throw new BadRequestException("El usuario que crea la renta no es válido.");
    }

    return this.rentalRepository.manager.transaction(async (transactionalEntityManager): Promise<Rental> => {
      // ========== 1. CREAR Y GUARDAR EL INQUILINO ==========
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

      // Si es Persona Física, guardar todos los datos de PF (incluye empleo y referencias)
      if (inquilino.tipo_persona === TipoPersona.FISICA && inquilino.pf_datos) {
        const pfData: any = { ...inquilino.pf_datos };

        // Agregar datos de empleo e ingresos
        if (inquilino.pf_empleo_ingresos) {
          pfData.profesion = inquilino.pf_empleo_ingresos.profesion;
          pfData.tipo_empleo = inquilino.pf_empleo_ingresos.tipo_empleo;
          pfData.nom_empresa = inquilino.pf_empleo_ingresos.nom_empresa;
          pfData.tel_empleo = inquilino.pf_empleo_ingresos.tel_empleo;
          pfData.ext_empleo = inquilino.pf_empleo_ingresos.ext_empleo;
          pfData.calle_empresa = inquilino.pf_empleo_ingresos.calle_empresa;
          pfData.num_ext_empresa = inquilino.pf_empleo_ingresos.num_ext_empresa;
          pfData.num_int_empresa = inquilino.pf_empleo_ingresos.num_int_empresa;
          pfData.cp_empresa = inquilino.pf_empleo_ingresos.cp_empresa;
          pfData.col_empresa = inquilino.pf_empleo_ingresos.col_empresa;
          pfData.mun_empresa = inquilino.pf_empleo_ingresos.mun_empresa;
          pfData.edo_empresa = inquilino.pf_empleo_ingresos.edo_empresa;
          pfData.fecha_ing_empleo = inquilino.pf_empleo_ingresos.fecha_ing_empleo;
          pfData.ing_comprobable = inquilino.pf_empleo_ingresos.ing_comprobable;
          pfData.ing_no_comprobable = inquilino.pf_empleo_ingresos.ing_no_comprobable;
          pfData.dependientes = inquilino.pf_empleo_ingresos.dependientes;
          pfData.ing_fam_aporta = inquilino.pf_empleo_ingresos.ing_fam_aporta;
          pfData.num_aportan = inquilino.pf_empleo_ingresos.num_aportan;
          pfData.aportante_nombre = inquilino.pf_empleo_ingresos.aportante_nombre;
          pfData.aportante_apellido_p = inquilino.pf_empleo_ingresos.aportante_apellido_p;
          pfData.aportante_apellido_m = inquilino.pf_empleo_ingresos.aportante_apellido_m;
          pfData.aportante_parentesco = inquilino.pf_empleo_ingresos.aportante_parentesco;
          pfData.aportante_telefono = inquilino.pf_empleo_ingresos.aportante_telefono;
          pfData.aportante_empresa = inquilino.pf_empleo_ingresos.aportante_empresa;
          pfData.aportante_ingreso = inquilino.pf_empleo_ingresos.aportante_ingreso;
        }

        // Agregar referencias personales y familiares
        if (inquilino.pf_referencias) {
          pfData.ref_per1_nombre = inquilino.pf_referencias.per1_nombre;
          pfData.ref_per1_apellido_p = inquilino.pf_referencias.per1_apellido_p;
          pfData.ref_per1_apellido_m = inquilino.pf_referencias.per1_apellido_m;
          pfData.ref_per1_relacion = inquilino.pf_referencias.per1_relacion;
          pfData.ref_per1_telefono = inquilino.pf_referencias.per1_telefono;

          pfData.ref_per2_nombre = inquilino.pf_referencias.per2_nombre;
          pfData.ref_per2_apellido_p = inquilino.pf_referencias.per2_apellido_p;
          pfData.ref_per2_apellido_m = inquilino.pf_referencias.per2_apellido_m;
          pfData.ref_per2_relacion = inquilino.pf_referencias.per2_relacion;
          pfData.ref_per2_telefono = inquilino.pf_referencias.per2_telefono;

          pfData.ref_fam1_nombre = inquilino.pf_referencias.fam1_nombre;
          pfData.ref_fam1_apellido_p = inquilino.pf_referencias.fam1_apellido_p;
          pfData.ref_fam1_apellido_m = inquilino.pf_referencias.fam1_apellido_m;
          pfData.ref_fam1_relacion = inquilino.pf_referencias.fam1_relacion;
          pfData.ref_fam1_telefono = inquilino.pf_referencias.fam1_telefono;

          pfData.ref_fam2_nombre = inquilino.pf_referencias.fam2_nombre;
          pfData.ref_fam2_apellido_p = inquilino.pf_referencias.fam2_apellido_p;
          pfData.ref_fam2_apellido_m = inquilino.pf_referencias.fam2_apellido_m;
          pfData.ref_fam2_relacion = inquilino.pf_referencias.fam2_relacion;
          pfData.ref_fam2_telefono = inquilino.pf_referencias.fam2_telefono;
        }

        const pfEntity = this.personaFisicaRepository.create(pfData);
        const savedPf = await transactionalEntityManager.save(pfEntity);
        newTenant.pf = Array.isArray(savedPf) ? savedPf[0] : savedPf;
      } else if (inquilino.tipo_persona === TipoPersona.MORAL && inquilino.pm_datos) {
        newTenant.pm = await transactionalEntityManager.save(this.personaMoralRepository.create(inquilino.pm_datos));
      }

      // Guardar uso de propiedad
      if (inquilino.uso_propiedad) {
        newTenant.uso_propiedad = await transactionalEntityManager.save(this.usoPropiedadRepository.create(inquilino.uso_propiedad));
      }

      const savedTenant = await transactionalEntityManager.save(newTenant);

      // ========== 2. CREAR Y GUARDAR EL PROPIETARIO ==========
      const newOwner = this.ownerRepository.create({
        tipo_persona: propietario.tipo_persona,
        email: propietario.email,
        telefono: propietario.telefono,
        // Campos específicos según tipo de persona
        nombre: propietario.tipo_persona === TipoPersona.FISICA ? propietario.nombre_pf : propietario.nombre_empresa_pm,
        apellido_p: propietario.apellido_p_pf,
        apellido_m: propietario.apellido_m_pf,
        curp: propietario.curp_pf,
        rfc: propietario.rfc_pm,
        // Domicilio del propietario
        dom_calle: propietario.dom_calle,
        dom_num_ext: propietario.dom_num_ext,
        dom_num_int: propietario.dom_num_int,
        dom_cp: propietario.dom_cp,
        dom_colonia: propietario.dom_colonia,
        dom_del_mun: propietario.dom_del_mun,
        dom_estado: propietario.dom_estado,
        dom_referencias: propietario.dom_referencias,
      });

      // Guardar datos bancarios
      if (propietario.datos_bancarios) {
        newOwner.bank_info = await transactionalEntityManager.save(this.ownerBankInfoRepository.create(propietario.datos_bancarios));
      }

      // Guardar datos del inmueble del propietario
      if (propietario.inmueble) {
        newOwner.property = await transactionalEntityManager.save(this.ownerPropertyRepository.create(propietario.inmueble));
      }

      // Guardar representante legal si existe
      if (propietario.representante) {
        newOwner.legal_representative = await transactionalEntityManager.save(this.ownerLegalRepresentativeRepository.create(propietario.representante));
      }

      const savedOwner = await transactionalEntityManager.save(newOwner);

      // ========== 3. CREAR Y GUARDAR LA PROPIEDAD ==========
      const newProperty = this.propertyRepository.create({
        ...propiedad,
        propietario: savedOwner,
      });
      const savedProperty = await transactionalEntityManager.save(newProperty);

      // ========== 4. CREAR Y GUARDAR EL OBLIGADO SOLIDARIO ==========
      let savedGuarantor: Guarantor | null = null;
      if (obligado_solidario) {
        const newGuarantor = this.guarantorRepository.create({
          tipo_persona: obligado_solidario.tipo_persona,
          relacion_solicitante: obligado_solidario.relacion_solicitante,
          tiempo_conociendolo: obligado_solidario.tiempo_conociendolo,
          nombre: obligado_solidario.nombre,
          apellido_p: obligado_solidario.apellido_p,
          apellido_m: obligado_solidario.apellido_m,
          rfc: obligado_solidario.rfc,
          dom_calle: obligado_solidario.dom_calle,
          dom_num_ext: obligado_solidario.dom_num_ext,
          dom_num_int: obligado_solidario.dom_num_int,
          dom_cp: obligado_solidario.dom_cp,
          dom_colonia: obligado_solidario.dom_colonia,
          dom_del_mun: obligado_solidario.dom_del_mun,
          dom_estado: obligado_solidario.dom_estado,
        });

        // Si es Persona Física, guardar datos de empleo
        if (obligado_solidario.tipo_persona === TipoPersona.FISICA && obligado_solidario.pf_datos_empleo) {
          newGuarantor.empleo_ingresos_pf = await transactionalEntityManager.save(this.guarantorEmploymentIncomePfRepository.create(obligado_solidario.pf_datos_empleo));
        }
        // Si es Persona Moral, guardar datos del representante legal
        else if (obligado_solidario.tipo_persona === TipoPersona.MORAL && obligado_solidario.pm_representante_legal) {
          newGuarantor.representante_legal = await transactionalEntityManager.save(this.guarantorLegalRepresentativeRepository.create(obligado_solidario.pm_representante_legal));
        }

        // Guardar propiedad en garantía si existe
        if (obligado_solidario.propiedad_garantia) {
          newGuarantor.propiedad_garantia = await transactionalEntityManager.save(this.guarantorPropertyGuaranteeRepository.create(obligado_solidario.propiedad_garantia));
        }

        savedGuarantor = await transactionalEntityManager.save(newGuarantor);
      }

      // ========== 5. CREAR LA ENTIDAD DE RENTA PRINCIPAL ==========
      const newRental = this.rentalRepository.create({
        status: "apartada",
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
      relations: ["inquilino", "inquilino.pf", "inquilino.pm", "inquilino.uso_propiedad", "propietario", "propietario.bank_info", "propietario.property", "propietario.legal_representative", "propiedad", "obligado_solidario", "obligado_solidario.empleo_ingresos_pf", "obligado_solidario.representante_legal", "obligado_solidario.propiedad_garantia", "creado_por_user"],
    });
  }
}
