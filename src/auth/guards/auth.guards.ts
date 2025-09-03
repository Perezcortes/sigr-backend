import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

// Decorador para definir roles requeridos
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// Decorador para definir permisos requeridos
export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);

// Guard JWT básico
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}

// Guard para verificar roles
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException(
        'No tienes los permisos necesarios para acceder a este recurso',
      );
    }

    return true;
  }
}

// Guard para verificar permisos específicos
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const hasPermission = requiredPermissions.every((permission) =>
      user.permissions?.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'No tienes los permisos necesarios para realizar esta acción',
      );
    }

    return true;
  }
}

// Guard combinado para roles y permisos
@Injectable()
export class RolePermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    // Si no hay requerimientos, permitir acceso
    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Verificar roles si están definidos
    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.some((role) => user.role === role);
      if (!hasRole) {
        throw new ForbiddenException(
          'No tienes el rol necesario para acceder a este recurso',
        );
      }
    }

    // Verificar permisos si están definidos
    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasPermission = requiredPermissions.every((permission) =>
        user.permissions?.includes(permission),
      );
      if (!hasPermission) {
        throw new ForbiddenException(
          'No tienes los permisos necesarios para realizar esta acción',
        );
      }
    }

    return true;
  }
}

// Guard para verificar que el usuario pueda acceder solo a su oficina
@Injectable()
export class OfficeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user, params, body, query } = request;

    // Los administradores pueden acceder a cualquier oficina
    if (user.role === 'ADMIN') {
      return true;
    }

    // Obtener office_id de diferentes fuentes
    const targetOfficeId = params.officeId || body.office_id || query.office_id;

    // Si no se especifica oficina, usar la del usuario
    if (!targetOfficeId) {
      return true;
    }

    // Verificar que el usuario pertenezca a la oficina
    if (user.officeId !== targetOfficeId) {
      throw new ForbiddenException(
        'No puedes acceder a recursos de otras oficinas',
      );
    }

    return true;
  }
}

// Decorador para marcar endpoints que requieren verificación de oficina
export const RequireOfficeAccess = () => SetMetadata('requireOfficeAccess', true);