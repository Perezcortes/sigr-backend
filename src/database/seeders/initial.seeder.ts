import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../permissions/entities/permission.entity';
import { User } from '../../users/entities/user.entity';
import { Office } from '../../offices/entities/office.entity';
import { Estate } from '../../offices/entities/estate.entity';
import { City } from '../../offices/entities/city.entity';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';
// Importación de las nuevas entidades
import { Rental } from '../../rentals/entities/rental.entity';
import { Tenant } from '../../rentals/entities/tenant.entity';
import { Owner } from '../../rentals/entities/owner.entity';
import { Property } from '../../rentals/entities/property.entity';
import { Formalization } from '../../rentals/entities/formalization.entity';
import { Activation } from '../../rentals/entities/activation.entity';

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
    // Inyectar los nuevos repositorios
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
  ) {}

  async seed() {
    console.log('Iniciando seeders...');

    // Limpiar datos existentes
    await this.cleanDatabase();

    // 1. Crear estados
    const estates = await this.seedEstates();
    console.log('Estados creados');

    // 2. Crear ciudades
    const cities = await this.seedCities();
    console.log('Ciudades creadas');

    // 3. Crear permisos
    const permissions = await this.seedPermissions();
    console.log('Permisos creados');

    // 4. Crear roles con permisos
    const roles = await this.seedRoles(permissions);
    console.log('Roles creados');

    // 5. Crear usuarios
    const users = await this.seedUsers(roles);
    console.log('Usuarios creados');

    // 6. Crear oficinas
    const offices = await this.seedOffices(cities, estates);
    console.log('Oficinas creadas');

    // 7. Asignar usuarios a oficinas
    await this.assignUsersToOffices(users, offices);
    console.log('Usuarios asignados a oficinas');

    // *** Nuevos seeders para "Mis Rentas" ***
    // 8. Crear inquilinos
    const tenants = await this.seedTenants();
    console.log('Inquilinos creados');

    // 9. Crear propietarios
    const owners = await this.seedOwners();
    console.log('Propietarios creados');

    // 10. Crear propiedades
    const properties = await this.seedProperties(estates, cities, owners);
    console.log('Propiedades creadas');

    // 11. Crear rentas (enlazando inquilinos, propietarios y propiedades)
    await this.seedRentals(users, tenants, owners, properties);
    console.log('Rentas creadas');

    console.log('Seeders completados exitosamente');
  }

  private async cleanDatabase() {
    console.log('Limpiando base de datos...');
    
    // El orden de borrado es crucial debido a las foreign keys
    await this.roleRepository.query('DELETE FROM role_permiso');
    await this.userRepository.query('DELETE FROM office_user');
    await this.rentalRepository.query('DELETE FROM formalization_renta');
    await this.rentalRepository.query('DELETE FROM activacion_renta');
    await this.rentalRepository.query('DELETE FROM documentos');
    await this.rentalRepository.query('DELETE FROM rentas');
    await this.userRepository.query('DELETE FROM password_reset_tokens');
    await this.refreshTokenRepository.query('DELETE FROM refresh_tokens');
    await this.userRepository.query('DELETE FROM users');
    await this.roleRepository.query('DELETE FROM roles');
    await this.permissionRepository.query('DELETE FROM permisos');
    await this.officeRepository.query('DELETE FROM offices');
    await this.propertyRepository.query('DELETE FROM propiedades'); // Borrar propiedades antes que ciudades/estados
    await this.ownerRepository.query('DELETE FROM propietarios'); // Borrar propietarios
    await this.tenantRepository.query('DELETE FROM inquilinos'); // Borrar inquilinos
    await this.cityRepository.query('DELETE FROM cities');
    await this.estateRepository.query('DELETE FROM estates');
    
    // Resetear las secuencias para que los IDs vuelvan a 1
    await this.roleRepository.query('ALTER SEQUENCE roles_id_seq RESTART WITH 1');
    await this.permissionRepository.query('ALTER SEQUENCE permisos_id_seq RESTART WITH 1');
    await this.userRepository.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    await this.officeRepository.query('ALTER SEQUENCE offices_id_seq RESTART WITH 1');
    await this.cityRepository.query('ALTER SEQUENCE cities_id_seq RESTART WITH 1');
    await this.estateRepository.query('ALTER SEQUENCE estates_id_seq RESTART WITH 1');
    await this.tenantRepository.query('ALTER SEQUENCE inquilinos_id_seq RESTART WITH 1');
    await this.ownerRepository.query('ALTER SEQUENCE propietarios_id_seq RESTART WITH 1');
    await this.propertyRepository.query('ALTER SEQUENCE propiedades_id_seq RESTART WITH 1');
    await this.rentalRepository.query('ALTER SEQUENCE rentas_id_seq RESTART WITH 1');
    await this.formalizationRepository.query('ALTER SEQUENCE formalizacion_renta_id_seq RESTART WITH 1');
    await this.activationRepository.query('ALTER SEQUENCE activacion_renta_id_seq RESTART WITH 1');
    
    console.log('Base de datos limpia');
  }

  private async seedEstates() {
    const estatesData = [
      { nombre: 'Oaxaca' },
      { nombre: 'Ciudad de México' },
      { nombre: 'Puebla' },
      { nombre: 'Guerrero' },
      { nombre: 'Veracruz' }
    ];
    return this.estateRepository.save(estatesData);
  }

  private async seedCities() {
    const citiesData = [
      { nombre: 'Huajuapan de León' },
      { nombre: 'Oaxaca de Juárez' },
      { nombre: 'Salina Cruz' },
      { nombre: 'Tuxtepec' },
      { nombre: 'Ciudad de México' },
      { nombre: 'Puebla de Zaragoza' },
      { nombre: 'Acapulco' },
      { nombre: 'Chilpancingo' },
      { nombre: 'Veracruz' },
      { nombre: 'Xalapa' }
    ];
    return this.cityRepository.save(citiesData);
  }

  private async seedPermissions() {
    const permissionsData = [
      { nombre: 'crear_usuarios', descripcion: 'Crear nuevos usuarios en el sistema' },
      { nombre: 'ver_usuarios', descripcion: 'Ver listado y detalles de usuarios' },
      { nombre: 'editar_usuarios', descripcion: 'Editar información de usuarios' },
      { nombre: 'eliminar_usuarios', descripcion: 'Eliminar usuarios del sistema' },
      { nombre: 'gestionar_roles', descripcion: 'Crear, editar y asignar roles' },
      { nombre: 'crear_oficinas', descripcion: 'Crear nuevas oficinas' },
      { nombre: 'ver_oficinas', descripcion: 'Ver listado y detalles de oficinas' },
      { nombre: 'editar_oficinas', descripcion: 'Editar información de oficinas' },
      { nombre: 'eliminar_oficinas', descripcion: 'Eliminar oficinas' },
      { nombre: 'crear_propiedades', descripcion: 'Crear nuevas propiedades' },
      { nombre: 'ver_propiedades', descripcion: 'Ver listado y detalles de propiedades' },
      { nombre: 'editar_propiedades', descripcion: 'Editar información de propiedades' },
      { nombre: 'eliminar_propiedades', descripcion: 'Eliminar propiedades' },
      { nombre: 'ver_leads', descripcion: 'Ver leads y clientes potenciales' },
      { nombre: 'gestionar_leads', descripcion: 'Gestionar seguimiento de leads' },
      { nombre: 'ver_reportes', descripcion: 'Ver reportes del sistema' },
      { nombre: 'exportar_datos', descripcion: 'Exportar datos del sistema' },
      { nombre: 'configuracion_sistema', descripcion: 'Acceder a configuración del sistema' },
      { nombre: 'ver_todas_oficinas', descripcion: 'Ver información de todas las oficinas' },
      { nombre: 'ver_permisos', descripcion: 'Ver el listado de permisos' },
      { nombre: 'gestionar_permisos', descripcion: 'Crear, editar y eliminar permisos' },
      // Nuevos permisos para el módulo de rentas
      { nombre: 'crear_rentas', descripcion: 'Crear nuevas rentas de forma manual o desde una oportunidad' },
      { nombre: 'ver_rentas', descripcion: 'Ver listado y detalles de rentas' },
      { nombre: 'editar_rentas', descripcion: 'Editar información de rentas' },
      { nombre: 'cancelar_rentas', descripcion: 'Cancelar un proceso de renta' },
      { nombre: 'formalizar_rentas', descripcion: 'Acceder a la sección de formalización de rentas' },
      { nombre: 'activar_rentas', descripcion: 'Acceder a la sección de activación de rentas' },
    ];
    return this.permissionRepository.save(permissionsData);
  }

  private async seedRoles(permissions: Permission[]) {
    // 1. Guardar primero los roles sin las relaciones
    const rolesData = [
      { nombre: 'administrador', descripcion: 'Administrador del sistema con acceso completo' },
      { nombre: 'gerente', descripcion: 'Gerente con acceso a gestión de oficinas y reportes' },
      { nombre: 'coordinador', descripcion: 'Coordinador de oficina con permisos de gestión local' },
      { nombre: 'agente', descripcion: 'Agente inmobiliario con permisos básicos' },
      { nombre: 'propietario', descripcion: 'Propietario de inmuebles' },
      { nombre: 'inquilino', descripcion: 'Inquilino con acceso limitado' },
    ];

    const savedRoles = await this.roleRepository.save(rolesData);

    const administradorRole = savedRoles.find(r => r.nombre === 'administrador');
    const gerenteRole = savedRoles.find(r => r.nombre === 'gerente');
    const coordinadorRole = savedRoles.find(r => r.nombre === 'coordinador');
    const agenteRole = savedRoles.find(r => r.nombre === 'agente');
    const propietarioRole = savedRoles.find(r => r.nombre === 'propietario');
    const inquilinoRole = savedRoles.find(r => r.nombre === 'inquilino');

    // 2. Asignar permisos explícitamente a cada rol
    if (administradorRole) {
      administradorRole.permissions = permissions;
      await this.roleRepository.save(administradorRole);
    }
    
    if (gerenteRole) {
      gerenteRole.permissions = permissions.filter(p => !p.nombre.includes('eliminar_usuarios') && !p.nombre.includes('configuracion_sistema'));
      await this.roleRepository.save(gerenteRole);
    }

    if (coordinadorRole) {
      coordinadorRole.permissions = permissions.filter(p => p.nombre.includes('ver_') || p.nombre.includes('editar_propiedades') || p.nombre.includes('crear_propiedades') || p.nombre.includes('gestionar_leads'));
      await this.roleRepository.save(coordinadorRole);
    }

    if (agenteRole) {
      agenteRole.permissions = permissions.filter(p => p.nombre.includes('ver_propiedades') || p.nombre.includes('ver_leads') || p.nombre.includes('gestionar_leads') || p.nombre.includes('crear_propiedades') || p.nombre.includes('crear_rentas'));
      await this.roleRepository.save(agenteRole);
    }
    
    if (propietarioRole) {
      propietarioRole.permissions = permissions.filter(p => p.nombre.includes('ver_propiedades') || p.nombre.includes('editar_propiedades'));
      await this.roleRepository.save(propietarioRole);
    }

    if (inquilinoRole) {
      inquilinoRole.permissions = permissions.filter(p => p.nombre.includes('ver_propiedades'));
      await this.roleRepository.save(inquilinoRole);
    }

    return savedRoles;
  }

  private async seedUsers(roles: Role[]) {
    const adminRole = roles.find(r => r.nombre === 'administrador');
    const gerenteRole = roles.find(r => r.nombre === 'gerente');
    const coordinadorRole = roles.find(r => r.nombre === 'coordinador');
    const agenteRole = roles.find(r => r.nombre === 'agente');

    const hashedPassword = await bcrypt.hash('NewPassword123!', 10);

    const usersData = [
      {
        nombres: 'Super',
        primer_apellido: 'Admin',
        segundo_apellido: 'Sistema',
        correo: 'admin@sigr.com',
        telefono: '9511234567',
        whatsapp: '9511234567',
        password: hashedPassword,
        role_id: adminRole?.id,
      },
      {
        nombres: 'Juan Carlos',
        primer_apellido: 'Pérez',
        segundo_apellido: 'Cortés',
        correo: 'gerente@sigr.com',
        telefono: '9512345678',
        whatsapp: '9512345678',
        password: hashedPassword,
        role_id: gerenteRole?.id,
      },
      {
        nombres: 'María Elena',
        primer_apellido: 'González',
        segundo_apellido: 'López',
        correo: 'coordinador@sigr.com',
        telefono: '9513456789',
        whatsapp: '9513456789',
        password: hashedPassword,
        role_id: coordinadorRole?.id,
      },
      {
        nombres: 'Roberto',
        primer_apellido: 'Martínez',
        segundo_apellido: 'Silva',
        correo: 'agente1@sigr.com',
        telefono: '9514567890',
        whatsapp: '9514567890',
        password: hashedPassword,
        role_id: agenteRole?.id,
      },
      {
        nombres: 'Ana Patricia',
        primer_apellido: 'Hernández',
        segundo_apellido: 'Morales',
        correo: 'agente2@sigr.com',
        telefono: '9515678901',
        whatsapp: '9515678901',
        password: hashedPassword,
        role_id: agenteRole?.id,
      },
    ];
    return this.userRepository.save(usersData);
  }

  private async seedOffices(cities: City[], estates: Estate[]) {
    const huajuapanCity = cities.find(c => c.nombre === 'Huajuapan de León');
    const oaxacaCity = cities.find(c => c.nombre === 'Oaxaca de Juárez');
    const oaxacaEstate = estates.find(e => e.nombre === 'Oaxaca');

    const officesData = [
      {
        nombre: 'Oficina Central Huajuapan',
        telefono: '9531234567',
        correo: 'huajuapan@sigr.com',
        responsable: 'Juan Carlos Pérez Cortés',
        clave: 'HUA001',
        estatus_actividad: true,
        estatus_recibir_leads: true,
        calle: 'Av. Oaxaca',
        numero_exterior: '123',
        numero_interior: 'Local A',
        colonia: 'Centro',
        delegacion_municipio: 'Heroica Ciudad de Huajuapan de León',
        ciudad: huajuapanCity?.id,
        estate_id: oaxacaEstate?.id,
        codigo_postal: '69000',
        lat: 17.8021,
        lng: -97.7767,
      },
      {
        nombre: 'Sucursal Oaxaca Centro',
        telefono: '9517654321',
        correo: 'oaxaca@sigr.com',
        responsable: 'María Elena González López',
        clave: 'OAX001',
        estatus_actividad: true,
        estatus_recibir_leads: true,
        calle: 'Av. Independencia',
        numero_exterior: '456',
        colonia: 'Centro Histórico',
        delegacion_municipio: 'Oaxaca de Juárez',
        ciudad: oaxacaCity?.id,
        estate_id: oaxacaEstate?.id,
        codigo_postal: '68000',
        lat: 17.0654,
        lng: -96.7236,
      },
    ];
    return this.officeRepository.save(officesData);
  }

  private async assignUsersToOffices(users: User[], offices: Office[]) {
    const huajuapanOffice = offices.find(o => o.nombre === 'Oficina Central Huajuapan');
    const oaxacaOffice = offices.find(o => o.nombre === 'Sucursal Oaxaca Centro');

    const assignments = [
      { user: users.find(u => u.correo === 'admin@sigr.com'), offices: offices },
      { user: users.find(u => u.correo === 'gerente@sigr.com'), offices: huajuapanOffice ? [huajuapanOffice] : [] },
      { user: users.find(u => u.correo === 'coordinador@sigr.com'), offices: huajuapanOffice ? [huajuapanOffice] : [] },
      { user: users.find(u => u.correo === 'agente1@sigr.com'), offices: huajuapanOffice ? [huajuapanOffice] : [] },
      { user: users.find(u => u.correo === 'agente2@sigr.com'), offices: oaxacaOffice ? [oaxacaOffice] : [] },
    ];

    for (const assignment of assignments) {
      if (assignment.user && assignment.offices.length > 0) {
        assignment.user.offices = assignment.offices;
        await this.userRepository.save(assignment.user);
      }
    }
  }

  // Métodos de seeders para las nuevas tablas
  private async seedTenants() {
    const tenantsData = [
      { tipo_persona: 'fisica', nombre_completo: 'Gabriela Torres Soto', telefono: '9511112233', correo: 'gabriela.t@mail.com' },
      { tipo_persona: 'moral', razon_social: 'Grupo Inmobiliario del Sureste S.A. de C.V.', nombre_comercial: 'GISSA', representante_legal: 'Ricardo Mendoza', telefono: '9511114455', correo: 'contacto@gissa.com' },
    ];
    return this.tenantRepository.save(tenantsData);
  }

  private async seedOwners() {
    const ownersData = [
      { tipo_persona: 'fisica', nombre_completo: 'Carlos Sánchez Ramírez', telefono: '9512223344', correo: 'carlos.s@mail.com' },
      { tipo_persona: 'moral', razon_social: 'Inversiones Patrimoniales del Centro S.A.', nombre_comercial: 'IPACSA', representante_legal: 'Ana López', telefono: '9512225566', correo: 'info@ipacsa.com' },
    ];
    return this.ownerRepository.save(ownersData);
  }

  private async seedProperties(estates: Estate[], cities: City[], owners: Owner[]) {
    const oaxacaCity = cities.find(c => c.nombre === 'Oaxaca de Juárez');
    const oaxacaEstate = estates.find(e => e.nombre === 'Oaxaca');
    const carlosOwner = owners.find(o => o.nombre_completo === 'Carlos Sánchez Ramírez');

    const propertiesData = [
      {
        tipo: 'casa',
        codigo_postal: '68000',
        estado_id: oaxacaEstate?.id,
        ciudad_id: oaxacaCity?.id,
        colonia: 'Centro Histórico',
        calle: 'Mina',
        numero: '302',
        interior: 'A',
        referencia: 'Cerca del mercado de artesanías',
        metros_cuadrados: 120.5,
        monto_renta: 15000.00,
        propietario: carlosOwner,
      },
    ];
    return this.propertyRepository.save(propertiesData);
  }

  private async seedRentals(users: User[], tenants: Tenant[], owners: Owner[], properties: Property[]) {
    const agente = users.find(u => u.correo === 'agente1@sigr.com');
    const tenant1 = tenants.find(t => t.nombre_completo === 'Gabriela Torres Soto');
    const owner1 = owners.find(o => o.nombre_completo === 'Carlos Sánchez Ramírez');
    const property1 = properties.find(p => p.calle === 'Mina');

    if (agente && tenant1 && owner1 && property1) {
      const rentalsData = [
        {
          status: 'apartada',
          tipo_origen: 'manual',
          inquilino_id: tenant1.id,
          propietario_id: owner1.id,
          propiedad_id: property1.id,
          creado_por_user_id: agente.id,
        },
      ];
      return this.rentalRepository.save(rentalsData);
    }
  }
}
