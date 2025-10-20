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
// Importar las nuevas entities de rentals
import { 
  Rental, 
  InquilinoPf, 
  InquilinoPm, 
  ObligadoSolidarioPf, 
  ObligadoSolidarioPm, 
  PropietarioPf, 
  PropietarioPm, 
  Propiedad 
} from "../../rentals/entities";

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
    // Repositories de rentals
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
    @InjectRepository(InquilinoPf)
    private inquilinoPfRepository: Repository<InquilinoPf>,
    @InjectRepository(InquilinoPm)
    private inquilinoPmRepository: Repository<InquilinoPm>,
    @InjectRepository(ObligadoSolidarioPf)
    private obligadoPfRepository: Repository<ObligadoSolidarioPf>,
    @InjectRepository(ObligadoSolidarioPm)
    private obligadoPmRepository: Repository<ObligadoSolidarioPm>,
    @InjectRepository(PropietarioPf)
    private propietarioPfRepository: Repository<PropietarioPf>,
    @InjectRepository(PropietarioPm)
    private propietarioPmRepository: Repository<PropietarioPm>,
    @InjectRepository(Propiedad)
    private propiedadRepository: Repository<Propiedad>,
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

    // Seed de rentals
    await this.seedRentalsData(users);
    console.log("Datos de rentas creados");

    console.log("Seeders completados exitosamente");
  }

  private async cleanDatabase() {
    console.log("Limpiando base de datos...");
    try {
      // Limpiar tablas de rentals primero (por las relaciones)
      await this.rentalRepository.query("DELETE FROM rentas");
      await this.inquilinoPfRepository.query("DELETE FROM inquilinos_pf");
      await this.inquilinoPmRepository.query("DELETE FROM inquilinos_pm");
      await this.obligadoPfRepository.query("DELETE FROM obligados_solidarios_pf");
      await this.obligadoPmRepository.query("DELETE FROM obligados_solidarios_pm");
      await this.propietarioPfRepository.query("DELETE FROM propietarios_pf");
      await this.propietarioPmRepository.query("DELETE FROM propietarios_pm");
      await this.propiedadRepository.query("DELETE FROM propiedades");
      
      // Limpiar otras tablas
      await this.roleRepository.query("DELETE FROM role_permiso");
      await this.userRepository.query("DELETE FROM office_user");
      await this.userRepository.query("DELETE FROM password_reset_tokens");
      await this.refreshTokenRepository.query("DELETE FROM refresh_tokens");
      await this.userRepository.query("DELETE FROM users");
      await this.roleRepository.query("DELETE FROM roles");
      await this.permissionRepository.query("DELETE FROM permisos");
      await this.officeRepository.query("DELETE FROM offices");
      await this.cityRepository.query("DELETE FROM cities");
      await this.estateRepository.query("DELETE FROM estates");

      // Resetear secuencias
      await this.roleRepository.query("ALTER SEQUENCE roles_id_seq RESTART WITH 1");
      await this.permissionRepository.query("ALTER SEQUENCE permisos_id_seq RESTART WITH 1");
      await this.userRepository.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
      await this.officeRepository.query("ALTER SEQUENCE offices_id_seq RESTART WITH 1");
      await this.cityRepository.query("ALTER SEQUENCE cities_id_seq RESTART WITH 1");
      await this.estateRepository.query("ALTER SEQUENCE estates_id_seq RESTART WITH 1");
      
      console.log("Base de datos limpia.");
    } catch (error) {
      console.log("Error al limpiar la base de datos, es posible que algunas tablas no existan. Continuando...");
      console.log(error);
    }
  }

  private async seedEstates() {
    const estatesData = [
      { nombre: "Oaxaca" }, 
      { nombre: "Ciudad de México" }, 
      { nombre: "Puebla" }, 
      { nombre: "Guerrero" }, 
      { nombre: "Veracruz" }
    ];
    return this.estateRepository.save(estatesData);
  }

  private async seedCities() {
    const citiesData = [
      { nombre: "Huajuapan de León" }, 
      { nombre: "Oaxaca de Juárez" }, 
      { nombre: "Salina Cruz" }, 
      { nombre: "Tuxtepec" }, 
      { nombre: "Ciudad de México" }, 
      { nombre: "Puebla de Zaragoza" }, 
      { nombre: "Acapulco" }, 
      { nombre: "Chilpancingo" }, 
      { nombre: "Veracruz" }, 
      { nombre: "Xalapa" }
    ];
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
      gerenteRole.permissions = permissions.filter((p) => 
        !p.nombre.includes("eliminar_usuarios") && !p.nombre.includes("configuracion_sistema")
      );
      await this.roleRepository.save(gerenteRole);
    }

    if (coordinadorRole) {
      coordinadorRole.permissions = permissions.filter((p) => 
        p.nombre.includes("ver_") || 
        p.nombre.includes("editar_propiedades") || 
        p.nombre.includes("crear_propiedades") || 
        p.nombre.includes("gestionar_leads")
      );
      await this.roleRepository.save(coordinadorRole);
    }

    if (agenteRole) {
      agenteRole.permissions = permissions.filter((p) => 
        p.nombre.includes("ver_propiedades") || 
        p.nombre.includes("ver_leads") || 
        p.nombre.includes("gestionar_leads") || 
        p.nombre.includes("crear_propiedades") || 
        p.nombre.includes("crear_rentas")
      );
      await this.roleRepository.save(agenteRole);
    }

    if (propietarioRole) {
      propietarioRole.permissions = permissions.filter((p) => 
        p.nombre.includes("ver_propiedades") || 
        p.nombre.includes("editar_propiedades")
      );
      await this.roleRepository.save(propietarioRole);
    }

    if (inquilinoRole) {
      inquilinoRole.permissions = permissions.filter((p) => 
        p.nombre.includes("ver_propiedades")
      );
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

  private async seedRentalsData(users: User[]) {
  const agente = users.find((u) => u.correo === "agente1@sigr.com");
  
  if (!agente) {
    console.log("No se encontró el agente para crear rentas de ejemplo");
    return;
  }

  // PRIMERO: Crear la renta
  const rental = await this.rentalRepository.save({
    tipoInquilino: "fisica",
    tipoObligado: "fisica",
    tipoPropietario: "fisica",
    tipoPropiedad: "casa",
    observaciones: "Renta de ejemplo para demostración",
    usuarioCreacion: agente.id.toString(),
    estado: "pendiente",
  });

  // SEGUNDO: Crear propiedad con el renta_id
  const propiedad = await this.propiedadRepository.save({
    rentaId: rental.id, // Asignar el ID de la renta
    tipoPropiedad: "casa",
    domCalle: "Mina",
    domNumExt: "302",
    domCp: "68000",
    domColonia: "Centro Histórico",
    domMunicipio: "Oaxaca de Juárez",
    domEstado: "Oaxaca",
    domReferencias: "Cerca del mercado de artesanías",
    usoSuelo: "habitacional",
    permiteMascotas: true,
    mascotasEspecifique: "Solo perros pequeños",
    precioRenta: 15000.00,
    ivaRenta: "sin_iva",
    frecuenciaPago: "mensual",
    condicionesPago: "Primeros 5 días hábiles del mes",
    depositoGarantia: 15000.00,
    pagaMantenimiento: true,
    quienPagaMantenimiento: "Arrendatario",
    mantenimientoIncluido: false,
    costoMantenimiento: 500.00,
    instruccionesPago: "Transferencia a la cuenta 987654321",
    requiereSeguro: true,
    coberturaSeguro: "Daños al inmueble",
    montoSeguro: 500000.00,
    serviciosPagar: "Luz y agua",
    inventario: "Cortinas y calentador solar",
  });

  // TERCERO: Crear propietario persona física con el renta_id
  const propietarioPf = await this.propietarioPfRepository.save({
    rentaId: rental.id, // Asignar el ID de la renta
    nombres: "Carlos",
    apellidoPaterno: "Sánchez",
    apellidoMaterno: "Ramírez",
    curp: "SARC800101HOCRN01",
    email: "carlos.s@mail.com",
    telefono: "9512223344",
    estadoCivil: "casado",
    regimenConyugal: "sociedad_conyugal",
    sexo: "masculino",
    nacionalidad: "mexicana",
    tipoIdentificacion: "ine",
    rfc: "SARC800101ABC",
    domCalle: "Av. Las Palmas",
    domNumExt: "50",
    domCp: "68010",
    domColonia: "Reforma",
    domMunicipio: "Oaxaca de Juárez",
    domEstado: "Oaxaca",
    domReferencias: "Esquina con calle Rosas",
    formaPago: "transferencia",
    titularCuenta: "Carlos Sánchez Ramírez",
    numeroCuenta: "1234567890",
    banco: "BBVA Bancomer",
    clabe: "012345678901234567",
  });

  // CUARTO: Crear inquilino persona física con el renta_id
  const inquilinoPf = await this.inquilinoPfRepository.save({
    rentaId: rental.id, // Asignar el ID de la renta
    nombres: "Gabriela",
    apellidoPaterno: "Torres",
    apellidoMaterno: "Soto",
    nacionalidad: "mexicana",
    nacionalidadEspecifique: undefined,
    sexo: "femenino",
    estadoCivil: "soltero",
    email: "gabriela.t@mail.com",
    confirmarEmail: "gabriela.t@mail.com",
    tipoIdentificacion: "ine",
    fechaNacimiento: new Date("1990-05-15"),
    rfc: "TOSG900515ABC",
    curp: "TOSGS900515HMCRN01",
    telefonoCelular: "9511112233",
    telefonoFijo: "9511112244",
    domCalle: "Calle del Sol",
    domNumExt: "10",
    domNumInt: "A",
    domCp: "68000",
    domColonia: "Centro",
    domMunicipio: "Oaxaca de Juárez",
    domEstado: "Oaxaca",
    situacionHabitacional: "inquilino",
    profesion: "Abogada",
    tipoEmpleo: "empleado",
    empresaTrabaja: "Bufete Legal S.A.",
    fechaIngreso: new Date("2018-01-10"),
    ingresoComprobable: 25000.00,
    ingresoNoComprobable: 0.00,
  });

  // QUINTO: Crear obligado solidario persona física con el renta_id
  const obligadoPf = await this.obligadoPfRepository.save({
    rentaId: rental.id, // Asignar el ID de la renta
    nombres: "Laura",
    apellidoPaterno: "Lois",
    apellidoMaterno: "Amador",
    nacionalidad: "mexicana",
    nacionalidadEspecifique: undefined,
    sexo: "femenino",
    estadoCivil: "casado",
    email: "laura.lois@mail.com",
    confirmarEmail: "laura.lois@mail.com",
    telefonoCelular: "9516667788",
    telefonoFijo: "9516667799",
    relacionSolicitante: "Amiga",
    tiempoConocer: "10 años",
    domCalle: "Calle de la Luna",
    domNumExt: "35",
    domCp: "68000",
    domColonia: "Centro",
    domMunicipio: "Oaxaca de Juárez",
    domEstado: "Oaxaca",
    empresaTrabaja: "Constructora XYZ",
    fechaIngreso: new Date("2010-03-01"),
    profesion: "Arquitecta",
    tipoEmpleo: "empleado",
    ingresoMensual: 35000.00,
    autorizaInvestigacion: true,
    declaraVeracidad: true,
  });

  console.log("Datos de renta creados exitosamente");
  console.log(`Renta ID: ${rental.id}`);
  console.log(`Propiedad ID: ${propiedad.id}`);
  console.log(`Propietario ID: ${propietarioPf.id}`);
  console.log(`Inquilino ID: ${inquilinoPf.id}`);
  console.log(`Obligado Solidario ID: ${obligadoPf.id}`);
}
}