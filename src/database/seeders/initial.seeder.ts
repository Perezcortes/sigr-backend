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

    console.log('Seeders completados exitosamente');
  }

  private async cleanDatabase() {
    // CORRECCIÓN: Usar DELETE en lugar de clear() para evitar problemas de FK
    // Eliminar en orden correcto respetando las foreign keys
    
    console.log('Limpiando base de datos...');
    
    // 1. Limpiar tablas de unión many-to-many primero
    await this.roleRepository.query('DELETE FROM role_permiso');
    await this.userRepository.query('DELETE FROM office_user');
    
    // 2. Limpiar refresh tokens (referencia users)
    await this.refreshTokenRepository.query('DELETE FROM refresh_tokens');
    
    // 3. Limpiar password_reset_tokens (referencia users)
    await this.userRepository.query('DELETE FROM password_reset_tokens');
    
    // 4. Limpiar usuarios
    await this.userRepository.query('DELETE FROM users');
    
    // 5. Limpiar roles (referenciado por users)
    await this.roleRepository.query('DELETE FROM roles');
    
    // 6. Limpiar permisos
    await this.permissionRepository.query('DELETE FROM permisos');
    
    // 7. Limpiar oficinas (puede referenciar cities y estates)
    await this.officeRepository.query('DELETE FROM offices');
    
    // 8. Limpiar cities y estates
    await this.cityRepository.query('DELETE FROM cities');
    await this.estateRepository.query('DELETE FROM estates');
    
    // Reset secuencias para que los IDs empiecen desde 1
    await this.roleRepository.query('ALTER SEQUENCE roles_id_seq RESTART WITH 1');
    await this.permissionRepository.query('ALTER SEQUENCE permisos_id_seq RESTART WITH 1');
    await this.userRepository.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    await this.officeRepository.query('ALTER SEQUENCE offices_id_seq RESTART WITH 1');
    await this.cityRepository.query('ALTER SEQUENCE cities_id_seq RESTART WITH 1');
    await this.estateRepository.query('ALTER SEQUENCE estates_id_seq RESTART WITH 1');
    
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
      // Agrega aquí los permisos que faltan
      { nombre: 'ver_permisos', descripcion: 'Ver el listado de permisos' },
      { nombre: 'gestionar_permisos', descripcion: 'Crear, editar y eliminar permisos' },
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
      agenteRole.permissions = permissions.filter(p => p.nombre.includes('ver_propiedades') || p.nombre.includes('ver_leads') || p.nombre.includes('gestionar_leads') || p.nombre.includes('crear_propiedades'));
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
        role_id: adminRole?.id, // usar role_id en lugar de roleId
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
        ciudad: huajuapanCity?.id, // usar ciudad en lugar de cityId
        estate_id: oaxacaEstate?.id, // usar estate_id en lugar de estateId
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

    // Asignar usuarios a oficinas usando la relación many-to-many
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
}
