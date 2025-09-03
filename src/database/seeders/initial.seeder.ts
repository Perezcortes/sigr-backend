import { DataSource } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../permissions/entities/permission.entity';
import { Office } from '../../offices/entities/office.entity';
import { User } from '../../users/entities/user.entity';

export async function seedInitialData(dataSource: DataSource) {
  console.log('Iniciando seeders...');

  const roleRepository = dataSource.getRepository(Role);
  const permissionRepository = dataSource.getRepository(Permission);
  const officeRepository = dataSource.getRepository(Office);
  const userRepository = dataSource.getRepository(User);

  try {
    // 1. Crear Roles 
    console.log('Creando roles...');
    const roles = [
      {
        name: 'ADMINISTRADOR',
        display_name: 'Administrador',
        description: 'Acceso completo al sistema de rentas',
        is_system_role: true,
      },
      {
        name: 'GERENTE',
        display_name: 'Gerente',
        description: 'Gerente de oficina con acceso completo a su sucursal',
        is_system_role: true,
      },
      {
        name: 'COORDINADOR',
        display_name: 'Coordinador',
        description: 'Coordinador de oficina con permisos de supervisión',
        is_system_role: true,
      },
      {
        name: 'AGENTE',
        display_name: 'Agente de Ventas',
        description: 'Agente de ventas y rentas',
        is_system_role: true,
      },
      {
        name: 'PROPIETARIO',
        display_name: 'Propietario',
        description: 'Propietario de inmuebles',
        is_system_role: true,
      },
      {
        name: 'INQUILINO',
        display_name: 'Inquilino',
        description: 'Inquilino con acceso a información de sus rentas',
        is_system_role: true,
      },
    ];

    const savedRoles = await roleRepository.save(
      roles.map(role => roleRepository.create(role))
    );
    console.log(`${savedRoles.length} roles creados`);

    // 2. Crear Permisos 
    console.log('Creando permisos...');
    const permissions = [
      // Usuarios
      { name: 'usuarios.crear', display_name: 'Crear Usuarios', description: 'Puede crear nuevos usuarios en el sistema', resource: 'usuarios', action: 'crear' },
      { name: 'usuarios.ver', display_name: 'Ver Usuarios', description: 'Puede consultar información de usuarios', resource: 'usuarios', action: 'ver' },
      { name: 'usuarios.editar', display_name: 'Editar Usuarios', description: 'Puede modificar información de usuarios', resource: 'usuarios', action: 'editar' },
      { name: 'usuarios.eliminar', display_name: 'Eliminar Usuarios', description: 'Puede eliminar usuarios del sistema', resource: 'usuarios', action: 'eliminar' },
      { name: 'usuarios.listar', display_name: 'Listar Usuarios', description: 'Puede ver el listado completo de usuarios', resource: 'usuarios', action: 'listar' },
      
      // Oficinas/Sucursales
      { name: 'oficinas.crear', display_name: 'Crear Oficinas', description: 'Puede crear nuevas oficinas o sucursales', resource: 'oficinas', action: 'crear' },
      { name: 'oficinas.ver', display_name: 'Ver Oficinas', description: 'Puede consultar información de oficinas', resource: 'oficinas', action: 'ver' },
      { name: 'oficinas.editar', display_name: 'Editar Oficinas', description: 'Puede modificar información de oficinas', resource: 'oficinas', action: 'editar' },
      { name: 'oficinas.eliminar', display_name: 'Eliminar Oficinas', description: 'Puede eliminar oficinas del sistema', resource: 'oficinas', action: 'eliminar' },
      { name: 'oficinas.listar', display_name: 'Listar Oficinas', description: 'Puede ver el listado de todas las oficinas', resource: 'oficinas', action: 'listar' },
      
      // Roles y Permisos
      { name: 'roles.crear', display_name: 'Crear Roles', description: 'Puede crear nuevos roles de usuario', resource: 'roles', action: 'crear' },
      { name: 'roles.ver', display_name: 'Ver Roles', description: 'Puede consultar información de roles', resource: 'roles', action: 'ver' },
      { name: 'roles.editar', display_name: 'Editar Roles', description: 'Puede modificar roles y sus permisos', resource: 'roles', action: 'editar' },
      { name: 'roles.eliminar', display_name: 'Eliminar Roles', description: 'Puede eliminar roles del sistema', resource: 'roles', action: 'eliminar' },
      { name: 'roles.listar', display_name: 'Listar Roles', description: 'Puede ver todos los roles disponibles', resource: 'roles', action: 'listar' },
      
      // Propiedades/Inmuebles
      { name: 'propiedades.crear', display_name: 'Crear Propiedades', description: 'Puede registrar nuevas propiedades', resource: 'propiedades', action: 'crear' },
      { name: 'propiedades.ver', display_name: 'Ver Propiedades', description: 'Puede consultar información de propiedades', resource: 'propiedades', action: 'ver' },
      { name: 'propiedades.editar', display_name: 'Editar Propiedades', description: 'Puede modificar información de propiedades', resource: 'propiedades', action: 'editar' },
      { name: 'propiedades.eliminar', display_name: 'Eliminar Propiedades', description: 'Puede eliminar propiedades del sistema', resource: 'propiedades', action: 'eliminar' },
      { name: 'propiedades.listar', display_name: 'Listar Propiedades', description: 'Puede ver el catálogo de propiedades', resource: 'propiedades', action: 'listar' },
      
      // Rentas/Contratos
      { name: 'rentas.crear', display_name: 'Crear Contratos de Renta', description: 'Puede crear nuevos contratos de renta', resource: 'rentas', action: 'crear' },
      { name: 'rentas.ver', display_name: 'Ver Contratos de Renta', description: 'Puede consultar contratos de renta', resource: 'rentas', action: 'ver' },
      { name: 'rentas.editar', display_name: 'Editar Contratos de Renta', description: 'Puede modificar contratos de renta', resource: 'rentas', action: 'editar' },
      { name: 'rentas.eliminar', display_name: 'Cancelar Contratos de Renta', description: 'Puede cancelar contratos de renta', resource: 'rentas', action: 'eliminar' },
      { name: 'rentas.listar', display_name: 'Listar Contratos de Renta', description: 'Puede ver todos los contratos de renta', resource: 'rentas', action: 'listar' },
      
      // Pagos
      { name: 'pagos.crear', display_name: 'Registrar Pagos', description: 'Puede registrar pagos de rentas', resource: 'pagos', action: 'crear' },
      { name: 'pagos.ver', display_name: 'Ver Pagos', description: 'Puede consultar historial de pagos', resource: 'pagos', action: 'ver' },
      { name: 'pagos.editar', display_name: 'Editar Pagos', description: 'Puede modificar información de pagos', resource: 'pagos', action: 'editar' },
      { name: 'pagos.listar', display_name: 'Listar Pagos', description: 'Puede ver listado de pagos', resource: 'pagos', action: 'listar' },
      
      // Reportes
      { name: 'reportes.generar', display_name: 'Generar Reportes', description: 'Puede generar reportes del sistema', resource: 'reportes', action: 'generar' },
      { name: 'reportes.exportar', display_name: 'Exportar Reportes', description: 'Puede exportar reportes en diferentes formatos', resource: 'reportes', action: 'exportar' },
      
      // Sistema
      { name: 'sistema.administrar', display_name: 'Administrar Sistema', description: 'Acceso completo a configuración del sistema', resource: 'sistema', action: 'administrar' },
      { name: 'sistema.logs', display_name: 'Ver Registros del Sistema', description: 'Puede consultar logs y auditoría del sistema', resource: 'sistema', action: 'logs' },
      { name: 'sistema.configuracion', display_name: 'Configurar Sistema', description: 'Puede modificar configuraciones generales', resource: 'sistema', action: 'configuracion' },
    ];

    const savedPermissions = await permissionRepository.save(
      permissions.map(permission => permissionRepository.create(permission))
    );
    console.log(`${savedPermissions.length} permisos creados`);

    // 3. Asignar permisos a roles
    console.log('Asignando permisos a roles...');
    
    const adminRole = savedRoles.find(role => role.name === 'ADMINISTRADOR');
    const managerRole = savedRoles.find(role => role.name === 'GERENTE');
    const coordinatorRole = savedRoles.find(role => role.name === 'COORDINADOR');
    const agentRole = savedRoles.find(role => role.name === 'AGENTE');
    const ownerRole = savedRoles.find(role => role.name === 'PROPIETARIO');
    const tenantRole = savedRoles.find(role => role.name === 'INQUILINO');

    // ADMINISTRADOR: Todos los permisos
    if (adminRole) {
      adminRole.permissions = savedPermissions;
      await roleRepository.save(adminRole);
    }

    // GERENTE: Permisos completos excepto administración del sistema
    if (managerRole) {
      managerRole.permissions = savedPermissions.filter(p => 
        !p.name.includes('sistema.administrar') && 
        !p.name.includes('roles.crear') && 
        !p.name.includes('roles.eliminar')
      );
      await roleRepository.save(managerRole);
    }

    // COORDINADOR: Permisos de supervisión
    if (coordinatorRole) {
      coordinatorRole.permissions = savedPermissions.filter(p => 
        p.name.includes('usuarios.ver') ||
        p.name.includes('usuarios.listar') ||
        p.name.includes('oficinas.ver') ||
        p.name.includes('propiedades.') ||
        p.name.includes('rentas.') ||
        p.name.includes('pagos.') ||
        p.name.includes('reportes.')
      );
      await roleRepository.save(coordinatorRole);
    }

    // AGENTE: Permisos operativos básicos
    if (agentRole) {
      agentRole.permissions = savedPermissions.filter(p => 
        p.name.includes('usuarios.ver') ||
        p.name.includes('usuarios.listar') ||
        p.name.includes('propiedades.') ||
        p.name.includes('rentas.') ||
        p.name.includes('pagos.ver') ||
        p.name.includes('pagos.crear')
      );
      await roleRepository.save(agentRole);
    }

    // PROPIETARIO: Solo sus propiedades y rentas
    if (ownerRole) {
      ownerRole.permissions = savedPermissions.filter(p => 
        p.name.includes('propiedades.ver') ||
        p.name.includes('rentas.ver') ||
        p.name.includes('pagos.ver') ||
        p.name.includes('reportes.generar')
      );
      await roleRepository.save(ownerRole);
    }

    // INQUILINO: Solo ver sus rentas y pagos
    if (tenantRole) {
      tenantRole.permissions = savedPermissions.filter(p => 
        p.name.includes('rentas.ver') ||
        p.name.includes('pagos.ver')
      );
      await roleRepository.save(tenantRole);
    }

    console.log('Permisos asignados a roles');

    // 4. Crear Oficina Principal
    console.log('Creando oficina principal...');
    const mainOffice = officeRepository.create({
      name: 'Oficina Central',
      code: 'CENTRAL',
      description: 'Oficina central de la empresa de rentas',
      is_headquarters: true,
      is_active: true,
      city: 'Ciudad de México',
      state: 'CDMX',
      country: 'México',
      address: 'Av. Reforma 123, Col. Centro',
      phone: '+52 55 1234-5678',
      email: 'central@rentas.com',
    });
    const savedOffice = await officeRepository.save(mainOffice);
    console.log('Oficina principal creada');

    // 5. Crear usuarios de prueba
    console.log('Creando usuarios de prueba...');
    
    if (adminRole && managerRole && agentRole) {
      const users = [
        {
          email: 'admin@rentas.com',
          password_hash: 'Admin123!', // Se hashea automáticamente en el entity
          first_name: 'Administrador',
          last_name: 'Sistema',
          role_id: adminRole.id,
          office_id: savedOffice.id,
          is_active: true,
          is_verified: true,
          email_verified_at: new Date(),
          phone: '+52 55 1111-1111',
        },
        {
          email: 'gerente@rentas.com',
          password_hash: 'Gerente123!',
          first_name: 'Juan Carlos',
          last_name: 'García Martínez',
          role_id: managerRole.id,
          office_id: savedOffice.id,
          is_active: true,
          is_verified: true,
          email_verified_at: new Date(),
          phone: '+52 55 2222-2222',
        },
        {
          email: 'agente@rentas.com',
          password_hash: 'Agente123!',
          first_name: 'María Elena',
          last_name: 'Rodríguez López',
          role_id: agentRole.id,
          office_id: savedOffice.id,
          is_active: true,
          is_verified: true,
          email_verified_at: new Date(),
          phone: '+52 55 3333-3333',
        },
      ];

      const savedUsers = await userRepository.save(
        users.map(user => userRepository.create(user))
      );
      console.log(`${savedUsers.length} usuarios de prueba creados`);

      // Asignar el gerente como manager de la oficina principal
      savedOffice.manager_id = savedUsers[1].id; // El gerente, no el admin
      await officeRepository.save(savedOffice);
      console.log('Gerente asignado a oficina principal');
    }

    console.log('¡Seeders completados exitosamente!');
    console.log('\n=== USUARIOS CREADOS ===');
    console.log('Email: admin@rentas.com | Password: Admin123!');
    console.log('Email: gerente@rentas.com | Password: Gerente123!');  
    console.log('Email: agente@rentas.com | Password: Agente123!');
    console.log('========================\n');

  } catch (error) {
    console.error('Error en seeders:', error);
    throw error;
  }
}