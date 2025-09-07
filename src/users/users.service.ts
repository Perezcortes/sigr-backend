import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, In, Brackets } from 'typeorm';

import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Office } from '../offices/entities/office.entity';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Office)
    private readonly officeRepository: Repository<Office>,
  ) {}

  /**
   * Obtiene todos los usuarios de la base de datos, incluyendo sus roles y oficinas,
   * y permite filtrar por múltiples criterios.
   * @param filters Los criterios para filtrar la búsqueda.
   * @returns Un arreglo de objetos de usuario.
   */
  async findAll(filters: FilterUserDto): Promise<User[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    
    // Uniones para filtrar por relaciones
    queryBuilder
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.offices', 'offices');

    // Filtro de búsqueda general
    if (filters.search) {
      queryBuilder.andWhere(new Brackets(qb => {
        const searchValue = (filters.search ?? '').toLowerCase();
        qb.where('LOWER(user.nombres) LIKE :search', { search: `%${searchValue}%` })
          .orWhere('LOWER(user.primer_apellido) LIKE :search', { search: `%${searchValue}%` })
          .orWhere('LOWER(user.correo) LIKE :search', { search: `%${searchValue}%` })
          .orWhere('LOWER(role.nombre) LIKE :search', { search: `%${searchValue}%` })
          .orWhere('LOWER(offices.nombre) LIKE :search', { search: `%${searchValue}%` });
      }));
    }

    // Filtros por campos específicos
    if (filters.roleId) {
      queryBuilder.andWhere('user.role_id = :roleId', { roleId: filters.roleId });
    }
    if (filters.officeId) {
      // Filtramos por la tabla de unión
      queryBuilder.andWhere('offices.id = :officeId', { officeId: filters.officeId });
    }
    if (filters.is_active !== undefined) {
      queryBuilder.andWhere('user.is_active = :is_active', { is_active: filters.is_active });
    }
    
    return queryBuilder.getMany();
  }

  /**
   * Obtiene un usuario por su ID, incluyendo sus roles y oficinas.
   * @param id El ID del usuario.
   * @returns Un objeto de usuario si se encuentra, de lo contrario lanza una excepción.
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'offices'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    return user;
  }

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param createUserData Los datos para crear el usuario.
   * @returns El usuario recién creado.
   */
  async create(createUserData: DeepPartial<User>): Promise<User> {
    // Verificar si el rol y las oficinas existen antes de crear
    if (createUserData.role_id) {
      const role = await this.roleRepository.findOne({ where: { id: createUserData.role_id } });
      if (!role) {
        throw new BadRequestException('El ID de rol proporcionado no es válido.');
      }
    }
    if (createUserData.offices && createUserData.offices.length > 0) {
      const officeIds = createUserData.offices.map(office => office.id);
      const foundOffices = await this.officeRepository.findBy({ id: In(officeIds) });
      if (foundOffices.length !== officeIds.length) {
        throw new BadRequestException('Uno o más IDs de oficinas no son válidos.');
      }
    }

    const user = this.userRepository.create(createUserData);
    return this.userRepository.save(user);
  }

  /**
   * Actualiza un usuario existente en la base de datos.
   * @param id El ID del usuario a actualizar.
   * @param updateUserData Los datos para actualizar el usuario.
   * @returns El usuario actualizado.
   */
  async update(id: number, updateUserData: DeepPartial<User>): Promise<User> {
    const user = await this.findOne(id);
    
    // Verificar si el rol y las oficinas existen si se proporcionan
    if (updateUserData.role_id) {
      const role = await this.roleRepository.findOne({ where: { id: updateUserData.role_id } });
      if (!role) {
        throw new BadRequestException('El ID de rol proporcionado no es válido.');
      }
    }
    if (updateUserData.offices) {
      const officeIds = updateUserData.offices.map(office => office.id);
      const foundOffices = await this.officeRepository.findBy({ id: In(officeIds) });
      if (foundOffices.length !== officeIds.length) {
        throw new BadRequestException('Uno o más IDs de oficinas no son válidos.');
      }
    }

    this.userRepository.merge(user, updateUserData);
    return this.userRepository.save(user);
  }

  /**
   * Elimina un usuario de la base de datos (eliminación lógica).
   * @param id El ID del usuario a eliminar.
   */
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.softDelete(user.id);
  }
}
