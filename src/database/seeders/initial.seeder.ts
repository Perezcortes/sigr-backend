// src/database/seeders/initial.seeder.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { Role } from "../../roles/entities/role.entity";
import { Permission } from "../../permissions/entities/permission.entity";
import { User } from "../../users/entities/user.entity";
import { Office } from "../../offices/entities/office.entity";
import { Estate } from "../../offices/entities/estate.entity";
import { City } from "../../offices/entities/city.entity";
import { RefreshToken } from "../../auth/entities/refresh-token.entity";
import { Rental } from "../../rentals/entities/rental.entity";
import { Tenant } from "../../rentals/entities/tenant.entity";
import { Owner } from "../../rentals/entities/owner.entity";
import { Property } from "../../rentals/entities/property.entity";
import { Formalization } from "../../rentals/entities/formalization.entity";
import { Activation } from "../../rentals/entities/activation.entity";
import { Guarantor } from "../../rentals/entities/guarantor.entity";

@Injectable()
export class InitialSeeder {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Office)
    private officeRepository: Repository<Office>,
    @InjectRepository(Estate)
    private estateRepository: Repository<Estate>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(Formalization)
    private formalizationRepository: Repository<Formalization>,
    @InjectRepository(Activation)
    private activationRepository: Repository<Activation>,
    @InjectRepository(Guarantor)
    private guarantorRepository: Repository<Guarantor>,
  ) {}

  async seed() {
    console.log("Iniciando seeders...");
    await this.cleanDatabase();

    const estates = await this.seedEstates();
    console.log("Estados creados");

    const cities = await this.seedCities();
    console.log("Ciudades creadas");

    const permissions = await this.seedPermissions();
    console.log("Permisos creados");

    const roles = await this.seedRoles(permissions);
    console.log("Roles creados");

    const users = await this.seedUsers(roles);
    console.log("Usuarios creados");

    const offices = await this.seedOffices(cities, estates);
    console.log("Oficinas creadas");

    await this.assignUsersToOffices(users, offices);
    console.log("Usuarios asignados a oficinas");

    const tenants = await this.seedTenants();
    console.log("Inquilinos creados");

    const owners = await this.seedOwners();
    console.log("Propietarios creados");

    const guarantors = await this.seedGuarantors();
    console.log("Obligados solidarios creados");

    const properties = await this.seedProperties(estates, cities, owners);
    console.log("Propiedades creadas");

    await this.seedRentals(users, tenants, owners, properties, guarantors);
    console.log("Rentas creadas");

    console.log("Seeders completados exitosamente");
  }

  private async cleanDatabase() {
    console.log("Limpiando base de datos...");
    try {
      await this.roleRepository.query("DELETE FROM role_permiso");
      await this.userRepository.query("DELETE FROM office_user");
      await this.rentalRepository.query("DELETE FROM formalization_renta");
      await this.rentalRepository.query("DELETE FROM activacion_renta");
      await this.rentalRepository.query("DELETE FROM documentos");
      await this.rentalRepository.query("DELETE FROM rentas");
      await this.userRepository.query("DELETE FROM password_reset_tokens");
      await this.refreshTokenRepository.query("DELETE FROM refresh_tokens");
      await this.userRepository.query("DELETE FROM users");
      await this.roleRepository.query("DELETE FROM roles");
      await this.permissionRepository.query("DELETE FROM permisos");
      await this.officeRepository.query("DELETE FROM offices");
      await this.propertyRepository.query("DELETE FROM propiedades");
      await this.ownerRepository.query("DELETE FROM propietarios");
      await this.guarantorRepository.query("DELETE FROM obligados_solidarios");
      await this.tenantRepository.query("DELETE FROM inquilinos");
      await this.cityRepository.query("DELETE FROM cities");
      await this.estateRepository.query("DELETE FROM estates");

      await this.roleRepository.query("ALTER SEQUENCE roles_id_seq RESTART WITH 1");
      await this.permissionRepository.query("ALTER SEQUENCE permisos_id_seq RESTART WITH 1");
      await this.userRepository.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
      await this.officeRepository.query("ALTER SEQUENCE offices_id_seq RESTART WITH 1");
      await this.cityRepository.query("ALTER SEQUENCE cities_id_seq RESTART WITH 1");
      await this.estateRepository.query("ALTER SEQUENCE estates_id_seq RESTART WITH 1");
      await this.tenantRepository.query("ALTER SEQUENCE inquilinos_id_seq RESTART WITH 1");
      await this.ownerRepository.query("ALTER SEQUENCE propietarios_id_seq RESTART WITH 1");
      await this.guarantorRepository.query("ALTER SEQUENCE obligados_solidarios_id_seq RESTART WITH 1");
      await this.propertyRepository.query("ALTER SEQUENCE propiedades_id_seq RESTART WITH 1");
      await this.rentalRepository.query("ALTER SEQUENCE rentas_id_seq RESTART WITH 1");
      await this.formalizationRepository.query("ALTER SEQUENCE formalizacion_renta_id_seq RESTART WITH 1");
      await this.activationRepository.query("ALTER SEQUENCE activacion_renta_id_seq RESTART WITH 1");
      console.log("Base de datos limpia.");
    } catch (error) {
      console.log("Error al limpiar la base de datos, es posible que algunas tablas no existan o no tengan la secuencia definida. Continuando...");
      console.log(error);
    }
  }

  private async seedEstates() {
    const estatesData = [{ nombre: "Oaxaca" }, { nombre: "Ciudad de México" }, { nombre: "Puebla" }, { nombre: "Guerrero" }, { nombre: "Veracruz" }];
    return this.estateRepository.save(estatesData);
  }

  private async seedCities() {
    const citiesData = [{ nombre: "Huajuapan de León" }, { nombre: "Oaxaca de Juárez" }, { nombre: "Salina Cruz" }, { nombre: "Tuxtepec" }, { nombre: "Ciudad de México" }, { nombre: "Puebla de Zaragoza" }, { nombre: "Acapulco" }, { nombre: "Chilpancingo" }, { nombre: "Veracruz" }, { nombre: "Xalapa" }];
    return this.cityRepository.save(citiesData);
  }

  private async seedPermissions() {
    const permissionsData = [
      { nombre: "crear_usuarios", descripcion: "Crear nuevos usuarios en el sistema" },
      { nombre: "ver_usuarios", descripcion: "Ver listado y detalles de usuarios" },
      { nombre: "editar_usuarios", descripcion: "Editar información de usuarios" },
      { nombre: "eliminar_usuarios", descripcion: "Eliminar usuarios del sistema" },
      { nombre: "gestionar_roles", descripcion: "Crear, editar y asignar roles" },
      { nombre: "crear_oficinas", descripcion: "Crear nuevas oficinas" },
      { nombre: "ver_oficinas", descripcion: "Ver listado y detalles de oficinas" },
      { nombre: "editar_oficinas", descripcion: "Editar información de oficinas" },
      { nombre: "eliminar_oficinas", descripcion: "Eliminar oficinas" },
      { nombre: "crear_propiedades", descripcion: "Crear nuevas propiedades" },
      { nombre: "ver_propiedades", descripcion: "Ver listado y detalles de propiedades" },
      { nombre: "editar_propiedades", descripcion: "Editar información de propiedades" },
      { nombre: "eliminar_propiedades", descripcion: "Eliminar propiedades" },
      { nombre: "ver_leads", descripcion: "Ver leads y clientes potenciales" },
      { nombre: "gestionar_leads", descripcion: "Gestionar seguimiento de leads" },
      { nombre: "ver_reportes", descripcion: "Ver reportes del sistema" },
      { nombre: "exportar_datos", descripcion: "Exportar datos del sistema" },
      { nombre: "configuracion_sistema", descripcion: "Acceder a configuración del sistema" },
      { nombre: "ver_todas_oficinas", descripcion: "Ver información de todas las oficinas" },
      { nombre: "ver_permisos", descripcion: "Ver el listado de permisos" },
      { nombre: "gestionar_permisos", descripcion: "Crear, editar y eliminar permisos" },
      { nombre: "crear_rentas", descripcion: "Crear nuevas rentas de forma manual o desde una oportunidad" },
      { nombre: "ver_rentas", descripcion: "Ver listado y detalles de rentas" },
      { nombre: "editar_rentas", descripcion: "Editar información de rentas" },
      { nombre: "cancelar_rentas", descripcion: "Cancelar un proceso de renta" },
      { nombre: "formalizar_rentas", descripcion: "Acceder a la sección de formalización de rentas" },
      { nombre: "activar_rentas", descripcion: "Acceder a la sección de activación de rentas" },
    ];
    return this.permissionRepository.save(permissionsData);
  }

  private async seedRoles(permissions: Permission[]) {
    const rolesData = [
      { nombre: "administrador", descripcion: "Administrador del sistema con acceso completo" },
      { nombre: "gerente", descripcion: "Gerente con acceso a gestión de oficinas y reportes" },
      { nombre: "coordinador", descripcion: "Coordinador de oficina con permisos de gestión local" },
      { nombre: "agente", descripcion: "Agente inmobiliario con permisos básicos" },
      { nombre: "propietario", descripcion: "Propietario de inmuebles" },
      { nombre: "inquilino", descripcion: "Inquilino con acceso limitado" },
    ];

    const savedRoles = await this.roleRepository.save(rolesData);

    const administradorRole = savedRoles.find((r) => r.nombre === "administrador");
    const gerenteRole = savedRoles.find((r) => r.nombre === "gerente");
    const coordinadorRole = savedRoles.find((r) => r.nombre === "coordinador");
    const agenteRole = savedRoles.find((r) => r.nombre === "agente");
    const propietarioRole = savedRoles.find((r) => r.nombre === "propietario");
    const inquilinoRole = savedRoles.find((r) => r.nombre === "inquilino");

    if (administradorRole) {
      administradorRole.permissions = permissions;
      await this.roleRepository.save(administradorRole);
    }

    if (gerenteRole) {
      gerenteRole.permissions = permissions.filter((p) => !p.nombre.includes("eliminar_usuarios") && !p.nombre.includes("configuracion_sistema"));
      await this.roleRepository.save(gerenteRole);
    }

    if (coordinadorRole) {
      coordinadorRole.permissions = permissions.filter((p) => p.nombre.includes("ver_") || p.nombre.includes("editar_propiedades") || p.nombre.includes("crear_propiedades") || p.nombre.includes("gestionar_leads"));
      await this.roleRepository.save(coordinadorRole);
    }

    if (agenteRole) {
      agenteRole.permissions = permissions.filter((p) => p.nombre.includes("ver_propiedades") || p.nombre.includes("ver_leads") || p.nombre.includes("gestionar_leads") || p.nombre.includes("crear_propiedades") || p.nombre.includes("crear_rentas"));
      await this.roleRepository.save(agenteRole);
    }

    if (propietarioRole) {
      propietarioRole.permissions = permissions.filter((p) => p.nombre.includes("ver_propiedades") || p.nombre.includes("editar_propiedades"));
      await this.roleRepository.save(propietarioRole);
    }

    if (inquilinoRole) {
      inquilinoRole.permissions = permissions.filter((p) => p.nombre.includes("ver_propiedades"));
      await this.roleRepository.save(inquilinoRole);
    }

    return savedRoles;
  }

  private async seedUsers(roles: Role[]) {
    const adminRole = roles.find((r) => r.nombre === "administrador");
    const gerenteRole = roles.find((r) => r.nombre === "gerente");
    const coordinadorRole = roles.find((r) => r.nombre === "coordinador");
    const agenteRole = roles.find((r) => r.nombre === "agente");

    const hashedPassword = await bcrypt.hash("NewPassword123!", 10);

    const usersData = [
      {
        nombres: "Super",
        primer_apellido: "Admin",
        segundo_apellido: "Sistema",
        correo: "admin@sigr.com",
        telefono: "9511234567",
        whatsapp: "9511234567",
        password: hashedPassword,
        role_id: adminRole?.id,
      },
      {
        nombres: "Juan Carlos",
        primer_apellido: "Pérez",
        segundo_apellido: "Cortés",
        correo: "gerente@sigr.com",
        telefono: "9512345678",
        whatsapp: "9512345678",
        password: hashedPassword,
        role_id: gerenteRole?.id,
      },
      {
        nombres: "María Elena",
        primer_apellido: "González",
        segundo_apellido: "López",
        correo: "coordinador@sigr.com",
        telefono: "9513456789",
        whatsapp: "9513456789",
        password: hashedPassword,
        role_id: coordinadorRole?.id,
      },
      {
        nombres: "Roberto",
        primer_apellido: "Martínez",
        segundo_apellido: "Silva",
        correo: "agente1@sigr.com",
        telefono: "9514567890",
        whatsapp: "9514567890",
        password: hashedPassword,
        role_id: agenteRole?.id,
      },
      {
        nombres: "Ana Patricia",
        primer_apellido: "Hernández",
        segundo_apellido: "Morales",
        correo: "agente2@sigr.com",
        telefono: "9515678901",
        whatsapp: "9515678901",
        password: hashedPassword,
        role_id: agenteRole?.id,
      },
    ];
    return this.userRepository.save(usersData);
  }

  private async seedOffices(cities: City[], estates: Estate[]) {
    const huajuapanCity = cities.find((c) => c.nombre === "Huajuapan de León");
    const oaxacaCity = cities.find((c) => c.nombre === "Oaxaca de Juárez");
    const oaxacaEstate = estates.find((e) => e.nombre === "Oaxaca");

    const officesData = [
      {
        nombre: "Oficina Central Huajuapan",
        telefono: "9531234567",
        correo: "huajuapan@sigr.com",
        responsable: "Juan Carlos Pérez Cortés",
        clave: "HUA001",
        estatus_actividad: true,
        estatus_recibir_leads: true,
        calle: "Av. Oaxaca",
        numero_exterior: "123",
        numero_interior: "Local A",
        colonia: "Centro",
        delegacion_municipio: "Heroica Ciudad de Huajuapan de León",
        ciudad: huajuapanCity?.id,
        estate_id: oaxacaEstate?.id,
        codigo_postal: "69000",
        lat: 17.8021,
        lng: -97.7767,
      },
      {
        nombre: "Sucursal Oaxaca Centro",
        telefono: "9517654321",
        correo: "oaxaca@sigr.com",
        responsable: "María Elena González López",
        clave: "OAX001",
        estatus_actividad: true,
        estatus_recibir_leads: true,
        calle: "Av. Independencia",
        numero_exterior: "456",
        colonia: "Centro Histórico",
        delegacion_municipio: "Oaxaca de Juárez",
        ciudad: oaxacaCity?.id,
        estate_id: oaxacaEstate?.id,
        codigo_postal: "68000",
        lat: 17.0654,
        lng: -96.7236,
      },
    ];
    return this.officeRepository.save(officesData);
  }

  private async assignUsersToOffices(users: User[], offices: Office[]) {
    const huajuapanOffice = offices.find((o) => o.nombre === "Oficina Central Huajuapan");
    const oaxacaOffice = offices.find((o) => o.nombre === "Sucursal Oaxaca Centro");

    const assignments = [
      { user: users.find((u) => u.correo === "admin@sigr.com"), offices: offices },
      { user: users.find((u) => u.correo === "gerente@sigr.com"), offices: huajuapanOffice ? [huajuapanOffice] : [] },
      { user: users.find((u) => u.correo === "coordinador@sigr.com"), offices: huajuapanOffice ? [huajuapanOffice] : [] },
      { user: users.find((u) => u.correo === "agente1@sigr.com"), offices: huajuapanOffice ? [huajuapanOffice] : [] },
      { user: users.find((u) => u.correo === "agente2@sigr.com"), offices: oaxacaOffice ? [oaxacaOffice] : [] },
    ];

    for (const assignment of assignments) {
      if (assignment.user && assignment.offices.length > 0) {
        assignment.user.offices = assignment.offices;
        await this.userRepository.save(assignment.user);
      }
    }
  }

  private async seedTenants() {
    const tenantsData = [
      {
        tipo_persona: "PF",
        pf_nombres: "Gabriela",
        pf_apellido_p: "Torres",
        pf_apellido_m: "Soto",
        pf_nacionalidad: "Mexicana",
        pf_sexo: "Femenino",
        pf_edo_civil: "Soltera",
        pf_email: "gabriela.t@mail.com",
        pf_id_tipo: "INE",
        pf_fecha_nac: new Date("1990-05-15"),
        pf_rfc: "TOSG900515ABC",
        pf_curp: "TOSGS900515HMCRN01",
        pf_tel_cel: "9511112233",
        pf_tel_fijo: "9511112244",
        pf_dom_calle: "Calle del Sol",
        pf_dom_num_ext: "10",
        pf_dom_num_int: "A",
        pf_dom_cp: "68000",
        pf_dom_colonia: "Centro",
        pf_dom_municipio: "Oaxaca de Juárez",
        pf_dom_estado: "Oaxaca",
        pf_sit_hab: "Inquilino",
        pf_arr_act_nombre: "Roberto",
        pf_arr_act_apellido_p: "Perez",
        pf_arr_act_apellido_m: "Lopez",
        pf_arr_act_tel: "9515556677",
        pf_arr_act_renta: 8000.0,
        pf_arr_act_ano_ingreso: 2020,
        pf_profesion: "Abogada",
        pf_tipo_empleo: "Empleado",
        pf_tel_empleo: "9517778899",
        pf_ext_empleo: "123",
        pf_nom_empresa: "Bufete Legal S.A.",
        pf_calle_empresa: "Av. Juarez",
        pf_num_ext_empresa: "500",
        pf_col_empresa: "Reforma",
        pf_mun_empresa: "Oaxaca de Juárez",
        pf_edo_empresa: "Oaxaca",
        pf_fecha_ing_empleo: new Date("2018-01-10"),
        pf_ing_comprobable: 25000.0,
        pf_ing_no_comprobable: 0.0,
        pf_dependientes: 1,
        pf_ing_fam_aporta: false,
        pf_ref_p1_nombre: "Maria",
        pf_ref_p1_relacion: "Amiga",
        pf_ref_p1_tel: "9511234567",
        pf_ref_p2_nombre: "Jose",
        pf_ref_p2_relacion: "Colega",
        pf_ref_p2_tel: "9519876543",
        pf_ref_f1_nombre: "Luis",
        pf_ref_f1_relacion: "Hermano",
        pf_ref_f1_tel: "9511122334",
        pf_ref_f2_nombre: "Sofia",
        pf_ref_f2_relacion: "Prima",
        pf_ref_f2_tel: "9514455667",
        prop_tipo_inmueble: "Oficina",
        prop_giro_negocio: "Servicios inmobiliarios",
        prop_experiencia_giro: "Más de 10 años en el mercado",
        prop_proposito: "Establecer oficina matriz",
        prop_reemplaza_dom: true,
        prop_dom_ant_calle: "Calle Anterior",
        prop_dom_ant_num_ext: "SN",
        prop_dom_ant_cp: "68000",
        prop_dom_ant_colonia: "Barrio",
        prop_dom_ant_municipio: "Oaxaca de Juárez",
        prop_dom_ant_estado: "Oaxaca",
        prop_motivo_cambio: "Expansión de la empresa",
      },
      {
        tipo_persona: "PM",
        pm_razon_social: "Grupo Inmobiliario del Sureste S.A. de C.V.",
        pm_email: "contacto@gissa.com",
        pm_dominio: "gissa.com",
        pm_rfc: "GISSA101010ABC",
        pm_tel: "9511114455",
        pm_calle: "Calle de la Empresa",
        pm_num_ext: "100",
        pm_cp: "68000",
        pm_colonia: "Centro",
        pm_municipio: "Oaxaca de Juárez",
        pm_estado: "Oaxaca",
        pm_ing_mensual: 500000.0,
        pm_ref_ubi: "Cerca de la oficina de correos",
        pm_notario_nombre: "Notario",
        pm_notario_apellido_p: "Legal",
        pm_notario_apellido_m: "Oficial",
        pm_escritura_num: "5555",
        pm_fecha_const: new Date("2015-02-20"),
        pm_notario_num: 15,
        pm_ciudad_reg: "Oaxaca de Juárez",
        pm_estado_reg: "Oaxaca",
        pm_reg_num: "A-123456",
        pm_apoderado_nombre: "Ricardo",
        pm_apoderado_apellido_p: "Mendoza",
        pm_apoderado_sexo: "Masculino",
        pm_apoderado_tel: "9511114455",
        pm_apoderado_ext: "1234",
        pm_apoderado_email: "ricardo.m@gissa.com",
        pm_apoderado_facultades: true,
        pm_apo_escritura_num: "6666",
        pm_apo_notario_num: 20,
        pm_apo_fecha_escritura: new Date("2016-03-10"),
        pm_apo_reg_num: "B-654321",
        pm_apo_ciudad_reg: "Oaxaca de Juárez",
        pm_apo_estado_reg: "Oaxaca",
        pm_apo_tipo_rep: "Administrador único",
        pm_ref_c1_empresa: "Empresa 1",
        pm_ref_c1_contacto: "Contacto 1",
        pm_ref_c1_tel: "9511110001",
        pm_ref_c2_empresa: "Empresa 2",
        pm_ref_c2_contacto: "Contacto 2",
        pm_ref_c2_tel: "9511110002",
        pm_ref_c3_empresa: "Empresa 3",
        pm_ref_c3_contacto: "Contacto 3",
        pm_ref_c3_tel: "9511110003",
        prop_tipo_inmueble: "Oficina",
        prop_giro_negocio: "Servicios inmobiliarios",
        prop_experiencia_giro: "Más de 10 años en el mercado",
        prop_proposito: "Establecer oficina matriz",
        prop_reemplaza_dom: true,
        prop_dom_ant_calle: "Calle Anterior",
        prop_dom_ant_num_ext: "SN",
        prop_dom_ant_cp: "68000",
        prop_dom_ant_colonia: "Barrio",
        prop_dom_ant_municipio: "Oaxaca de Juárez",
        prop_dom_ant_estado: "Oaxaca",
        prop_motivo_cambio: "Expansión de la empresa",
      },
    ];
    return this.tenantRepository.save(tenantsData as any);
  }

  private async seedGuarantors() {
    const guarantorsData = [
      {
        tipo_persona: "PF",
        pf_nombres: "Laura",
        pf_apellido_p: "Lois",
        pf_apellido_m: "Amador",
        pf_nacionalidad: "Mexicana",
        pf_sexo: "Femenino",
        pf_edo_civil: "Casada",
        pf_fecha_nac: new Date("1985-11-20"),
        pf_id_tipo: "INE",
        pf_curp: "LOAM851120HABC",
        pf_rfc: "LOAM851120123",
        pf_email: "laura.lois@mail.com",
        pf_tel_cel: "9516667788",
        pf_tel_fijo: "9516667799",
        pf_relacion_inquilino: "Amiga",
        pf_tiempo_conocerlo: "10 años",
        pf_dom_calle: "Calle de la Luna",
        pf_dom_num_ext: "35",
        pf_dom_cp: "68000",
        pf_dom_colonia: "Centro",
        pf_dom_municipio: "Oaxaca de Juárez",
        pf_dom_estado: "Oaxaca",
        pf_nom_empresa: "Constructora XYZ",
        pf_fecha_ing_empleo: new Date("2010-03-01"),
        pf_profesion: "Arquitecta",
        pf_tipo_empleo: "Empleado",
        pf_ing_mensual: 35000.0,
        pf_empresa_calle: "Av. Central",
        pf_empresa_num_ext: "456",
        pf_empresa_colonia: "Reforma",
        pf_empresa_municipio: "Oaxaca de Juárez",
        pf_empresa_estado: "Oaxaca",
        pf_empresa_tel: "9513334455",
        pf_empresa_ext: "101",
        pf_prop_garantia_calle: "Calle de los Pinos",
        pf_prop_garantia_num_ext: "10",
        pf_prop_garantia_cp: "68010",
        pf_prop_garantia_colonia: "Reforma",
        pf_prop_garantia_municipio: "Oaxaca de Juárez",
        pf_prop_garantia_estado: "Oaxaca",
        pf_escritura_num: "8976",
        pf_fecha_escritura: new Date("2015-05-20"),
        pf_notario_nombre: "Juan",
        pf_notario_apellido_p: "García",
        pf_notario_apellido_m: "Sosa",
        pf_notaria_num: 15,
        pf_notaria_lugar: "Oaxaca de Juárez",
        pf_reg_pub_prop: "Libro 2, Sección B",
        pf_folio_real_elec: "01-12345",
        pf_fecha_reg_prop: new Date("2015-06-01"),
        pf_boleta_predial_num: "12345678",
      },
      {
        tipo_persona: "PM",
        pm_razon_social: "Servicios Legales y Contables del Sur S.C.",
        pm_rfc: "SLCS050505ABC",
        pm_email: "contacto@slcs.com",
        pm_tel: "9519998877",
        pm_antiguedad_empresa: "10 años",
        pm_ing_mensual: 200000.0,
        pm_actividades_empresa: "Servicios de consultoría legal y contable",
        pm_dom_calle: "Calle Las Rosas",
        pm_dom_num_ext: "200",
        pm_dom_cp: "68050",
        pm_dom_colonia: "Jardines del Valle",
        pm_dom_municipio: "Oaxaca de Juárez",
        pm_dom_estado: "Oaxaca",
        pm_notario_nombre: "Ana",
        pm_notario_apellido_p: "Ramírez",
        pm_notario_apellido_m: "Ruiz",
        pm_escritura_num: "1122",
        pm_fecha_const: new Date("2005-05-05"),
        pm_notario_num: 5,
        pm_ciudad_reg: "Oaxaca de Juárez",
        pm_estado_reg: "Oaxaca",
        pm_reg_num: "M-987654",
        pm_giro_comercial: "Servicios profesionales",
        pm_apoderado_nombre: "José",
        pm_apoderado_apellido_p: "Vázquez",
        pm_apoderado_apellido_m: "Mora",
        pm_apoderado_sexo: "Masculino",
        pm_apoderado_rfc: "VAMJ750101ABC",
        pm_apoderado_curp: "VAMJ750101HOCRN02",
        pm_apoderado_email: "jose.v@slcs.com",
        pm_apoderado_tel: "9519998877",
        pm_dom_rep_calle: "Calle de los Robles",
        pm_dom_rep_num_ext: "15",
        pm_dom_rep_cp: "68000",
        pm_dom_rep_colonia: "Centro",
        pm_dom_rep_municipio: "Oaxaca de Juárez",
        pm_dom_rep_estado: "Oaxaca",
        pm_apoderado_facultades: true,
        pm_apo_escritura_num: "3344",
        pm_apo_notario_num: 2,
        pm_apo_fecha_escritura: new Date("2006-01-20"),
        pm_apo_reg_num: "C-112233",
        pm_apo_fecha_reg: new Date("2006-02-05"),
        pm_apo_ciudad_reg: "Oaxaca de Juárez",
        pm_apo_estado_reg: "Oaxaca",
        pm_apo_tipo_rep: "Administrador único",
        pm_prop_garantia_calle: "Calle de las Águilas",
        pm_prop_garantia_num_ext: "50",
        pm_prop_garantia_cp: "68030",
        pm_prop_garantia_colonia: "Oaxaca Moderna",
        pm_prop_garantia_municipio: "Oaxaca de Juárez",
        pm_prop_garantia_estado: "Oaxaca",
        pm_prop_garantia_escritura_num: "4567",
        pm_prop_garantia_fecha_escritura: new Date("2018-07-15"),
        pm_prop_garantia_notario_nombre: "Carmen",
        pm_prop_garantia_notario_apellido_p: "Gómez",
        pm_prop_garantia_notario_apellido_m: "Núñez",
        pm_prop_garantia_notaria_num: 30,
        pm_prop_garantia_notaria_lugar: "Oaxaca de Juárez",
        pm_prop_garantia_reg_pub_prop: "Libro 5, Sección D",
        pm_prop_garantia_folio_real_elec: "02-98765",
        pm_prop_garantia_fecha_reg_prop: new Date("2018-08-01"),
        pm_prop_garantia_boleta_predial_num: "98765432",
      },
    ];
    return this.guarantorRepository.save(guarantorsData as any);
  }

  private async seedOwners() {
    const ownersData = [
      {
        tipo_persona: "fisica",
        pf_nombres: "Carlos",
        pf_apellido_p: "Sánchez",
        pf_apellido_m: "Ramírez",
        pf_curp: "SARC800101HOCRN01",
        pf_email: "carlos.s@mail.com",
        pf_tel: "9512223344",
        pf_edo_civil: "Casado",
        pf_regimen_mat: "Sociedad conyugal",
        pf_sexo: "Masculino",
        pf_nacionalidad: "Mexicana",
        pf_id_tipo: "INE",
        pf_rfc: "SARC800101ABC",
        pf_dom_calle: "Av. Las Palmas",
        pf_dom_num_ext: "50",
        pf_dom_num_int: "SN",
        pf_dom_cp: "68010",
        pf_dom_colonia: "Reforma",
        pf_dom_municipio: "Oaxaca de Juárez",
        pf_dom_estado: "Oaxaca",
        pf_dom_ref: "Esquina con calle Rosas",
        pf_forma_pago_renta: "Transferencia",
        pf_titular_cuenta: "Carlos Sánchez Ramírez",
        pf_num_cuenta: "1234567890",
        pf_nombre_banco: "BBVA Bancomer",
        pf_clabe_interbancaria: "012345678901234567",
        pf_prop_tipo_inmueble: "Casa",
        pf_prop_uso_suelo: "Habitacional",
        pf_prop_mascotas: "Sí",
        pf_prop_mascotas_especif: "Solo perros pequeños",
        pf_prop_precio_renta: 15000.00,
        pf_prop_iva: "Sin IVA",
        pf_prop_frec_pago: "Mensual",
        pf_prop_condiciones_pago: "Primeros 5 días hábiles del mes",
        pf_prop_deposito_garantia: 15000.00,
        pf_prop_paga_mantenimiento: "Sí",
        pf_prop_quien_paga_mantenimiento: "Arrendatario",
        pf_prop_mantenimiento_incluido: "No",
        pf_prop_costo_mantenimiento: 500.00,
        pf_prop_instrucciones_pago: "Transferencia a la cuenta 987654321",
        pf_prop_requiere_seguro: "Sí",
        pf_prop_cobertura_seguro: "Daños al inmueble",
        pf_prop_monto_seguro: 500000.00,
        pf_prop_servicios_pago: "Luz y agua",
        pf_prop_ref: "Cerca del parque central",
        pf_prop_inventario: "Cortinas y calentador solar",
        pf_representado: false,
        pf_rep_tipo_rep: null,
        pf_rep_nombres: null,
        pf_rep_apellido_p: null,
        pf_rep_apellido_m: null,
        pf_rep_sexo: null,
        pf_rep_curp: null,
        pf_rep_id_tipo: null,
        pf_rep_rfc: null,
        pf_rep_tel: null,
        pf_rep_email: null,
        pf_rep_dom_calle: null,
        pf_rep_dom_num_ext: null,
        pf_rep_dom_num_int: null,
        pf_rep_dom_cp: null,
        pf_rep_dom_colonia: null,
        pf_rep_dom_municipio: null,
        pf_rep_dom_estado: null,
      },
      {
        tipo_persona: "moral",
        pm_razon_social: "Inversiones Patrimoniales del Centro S.A.",
        pm_rfc: "IPC850101ABC",
        pm_email: "info@ipacsa.com",
        pm_tel: "9512225566",
        pm_antiguedad_empresa: "15 años",
        pm_ing_mensual: 1000000.00,
        pm_actividades_empresa: "Gestión de inversiones inmobiliarias",
        pm_dom_calle: "Av. Benito Juárez",
        pm_dom_num_ext: "300",
        pm_dom_num_int: "5",
        pm_dom_cp: "68000",
        pm_dom_colonia: "Centro",
        pm_dom_municipio: "Oaxaca de Juárez",
        pm_dom_estado: "Oaxaca",
        pm_notario_nombre: "Notario",
        pm_notario_apellido_p: "Pérez",
        pm_notario_apellido_m: "López",
        pm_escritura_num: "12345",
        pm_fecha_const: new Date("2005-01-01"),
        pm_notario_num: 10,
        pm_ciudad_reg: "Oaxaca de Juárez",
        pm_estado_reg: "Oaxaca",
        pm_reg_num: "R-54321",
        pm_giro_comercial: "Inmobiliario",
        pm_representado: true,
        pm_rep_tipo_rep: "Poder notarial",
        pm_rep_nombres: "Ana",
        pm_rep_apellido_p: "López",
        pm_rep_apellido_m: "Gómez",
        pm_rep_sexo: "Femenino",
        pm_rep_curp: "LOGA900101HOCRN01",
        pm_rep_id_tipo: "INE",
        pm_rep_rfc: "LOGA900101ABC",
        pm_rep_tel: "9511115566",
        pm_rep_email: "ana.l@ipacsa.com",
        pm_rep_dom_calle: "Calle del Árbol",
        pm_rep_dom_num_ext: "20",
        pm_rep_dom_num_int: "A",
        pm_rep_dom_cp: "68010",
        pm_rep_dom_colonia: "Reforma",
        pm_rep_dom_municipio: "Oaxaca de Juárez",
        pm_rep_dom_estado: "Oaxaca",
      },
    ];
    return this.ownerRepository.save(ownersData as any);
  }

  private async seedProperties(estates: Estate[], cities: City[], owners: Owner[]) {
    const oaxacaCity = cities.find((c) => c.nombre === "Oaxaca de Juárez");
    const oaxacaEstate = estates.find((e) => e.nombre === "Oaxaca");
    const carlosOwner = owners.find((o) => o.tipo_persona === "fisica");

    const propertiesData = [
      {
        tipo: "casa",
        calle: "Mina",
        num_ext: "302",
        num_int: "A",
        referencias_ubicacion: "Cerca del mercado de artesanías",
        colonia: "Centro Histórico",
        municipio: "Oaxaca de Juárez",
        estado: "Oaxaca",
        codigo_postal: "68000",
        metros_cuadrados: 120.5,
        monto_renta: 15000.0,
        pago_renta_forma: "Transferencia",
        uso_suelo: "Habitacional",
        mascotas_permitidas: "Sí",
        mascotas_especificacion: "Solo perros pequeños",
        iva_en_renta: "Sin IVA",
        frecuencia_pago: "Mensual",
        condiciones_pago: "Primeros 5 días hábiles del mes",
        deposito_garantia: 15000.00,
        paga_mantenimiento: "Sí",
        quien_paga_mantenimiento: "Arrendatario",
        mantenimiento_incluido: "No",
        costo_mantenimiento_mensual: 500.00,
        requiere_seguro: "Sí",
        cobertura_seguro: "Daños al inmueble",
        monto_cobertura_seguro: 500000.00,
        servicios_a_pagar: "Luz y agua",
        inventario: "Cortinas y calentador solar",
        // Enlazar con el propietario
        propietario: carlosOwner,
        propietario_id: carlosOwner?.id, // Agregamos el ID explícitamente para mayor seguridad
      },
    ];
    return this.propertyRepository.save(propertiesData as any);
  }

  private async seedRentals(users: User[], tenants: Tenant[], owners: Owner[], properties: Property[], guarantors: Guarantor[]) {
    const agente = users.find((u) => u.correo === "agente1@sigr.com");
    const tenant1 = tenants.find((t) => t.tipo_persona === "PF");
    const owner1 = owners.find((o) => o.tipo_persona === "fisica");
    const property1 = properties[0]; // Tomamos el primer elemento, ya que solo estamos creando uno
    const guarantor1 = guarantors.find((g) => g.tipo_persona === "PF");

    if (agente && tenant1 && owner1 && property1 && guarantor1) {
      const rentalsData = [
        {
          status: "apartada",
          tipo_origen: "manual",
          inquilino_id: tenant1.id,
          propietario_id: owner1.id,
          propiedad_id: property1.id,
          obligado_solidario_id: guarantor1.id,
          creado_por_user_id: agente.id,
        },
      ];
      return this.rentalRepository.save(rentalsData as any);
    }
  }
}