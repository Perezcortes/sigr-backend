import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Office } from '../offices/entities/office.entity';

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
   * Obtiene todos los usuarios de la base de datos, incluyendo sus roles y oficinas.
   * @returns Un arreglo de objetos de usuario.
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role', 'offices'],
    });
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
    // Validar que el rol y la oficina existan si se proporcionan
    if (createUserData.role_id) {
      const role = await this.roleRepository.findOne({ where: { id: createUserData.role_id } });
      if (!role) {
        throw new BadRequestException('El ID de rol proporcionado no es válido.');
      }
    }
    if (createUserData.offices && createUserData.offices.length > 0) {
      for (const officeData of createUserData.offices) {
        const office = await this.officeRepository.findOne({ where: { id: officeData.id } });
        if (!office) {
          throw new BadRequestException(`El ID de oficina ${officeData.id} no es válido.`);
        }
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

    // Validar que el rol y la oficina existan si se proporcionan
    if (updateUserData.role_id) {
      const role = await this.roleRepository.findOne({ where: { id: updateUserData.role_id } });
      if (!role) {
        throw new BadRequestException('El ID de rol proporcionado no es válido.');
      }
    }
    if (updateUserData.offices && updateUserData.offices.length > 0) {
      for (const officeData of updateUserData.offices) {
        const office = await this.officeRepository.findOne({ where: { id: officeData.id } });
        if (!office) {
          throw new BadRequestException(`El ID de oficina ${officeData.id} no es válido.`);
        }
      }
    }
    
    // Asignar los nuevos datos y guardar
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
