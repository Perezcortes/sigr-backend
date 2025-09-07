import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, Brackets } from 'typeorm';

import { Office } from './entities/office.entity';
import { City } from './entities/city.entity';
import { Estate } from './entities/estate.entity';
import { CreateOfficeDto, UpdateOfficeDto, FilterOfficeDto } from './dto/offices.dto';

@Injectable()
export class OfficesService {
  constructor(
    @InjectRepository(Office)
    private readonly officeRepository: Repository<Office>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(Estate)
    private readonly estateRepository: Repository<Estate>,
  ) {}

  /**
   * Obtiene todas las oficinas de la base de datos, incluyendo sus relaciones,
   * y permite filtrar por múltiples criterios.
   * @param filters Los criterios para filtrar la búsqueda.
   * @returns Un arreglo de objetos de oficina.
   */
  async findAll(filters: FilterOfficeDto): Promise<Office[]> {
    const queryBuilder = this.officeRepository.createQueryBuilder('office');
    
    // Uniones para filtrar por relaciones
    queryBuilder
      .leftJoinAndSelect('office.city', 'city')
      .leftJoinAndSelect('office.estate', 'estate');

    // Filtro de búsqueda general
    if (filters.search) {
      queryBuilder.andWhere(new Brackets(qb => {
        const searchValue = `%${filters.search?.toLowerCase() ?? ''}%`;
        qb.where('LOWER(office.nombre) LIKE :search', { search: searchValue })
          .orWhere('LOWER(office.responsable) LIKE :search', { search: searchValue })
          .orWhere('LOWER(office.clave) LIKE :search', { search: searchValue })
          .orWhere('LOWER(office.correo) LIKE :search', { search: searchValue })
          .orWhere('LOWER(city.nombre) LIKE :search', { search: searchValue })
          .orWhere('LOWER(estate.nombre) LIKE :search', { search: searchValue });
      }));
    }

    // Filtros por campos específicos
    if (filters.cityId) {
      queryBuilder.andWhere('city.id = :cityId', { cityId: filters.cityId });
    }
    if (filters.estateId) {
      queryBuilder.andWhere('estate.id = :estateId', { estateId: filters.estateId });
    }
    if (filters.estatus_actividad !== undefined) {
      queryBuilder.andWhere('office.estatus_actividad = :estatus_actividad', { estatus_actividad: filters.estatus_actividad });
    }
    
    return queryBuilder.getMany();
  }

  /**
   * Obtiene una oficina por su ID.
   * @param id El ID de la oficina.
   * @returns Un objeto de oficina si se encuentra, de lo contrario lanza una excepción.
   */
  async findOne(id: number): Promise<Office> {
    const office = await this.officeRepository.findOne({
      where: { id },
      relations: ['city', 'estate'],
    });
    if (!office) {
      throw new NotFoundException(`Oficina con ID ${id} no encontrada.`);
    }
    return office;
  }

  /**
   * Crea una nueva oficina en la base de datos.
   * @param createOfficeDto Los datos para crear la oficina.
   * @returns La oficina recién creada.
   */
  async create(createOfficeDto: CreateOfficeDto): Promise<Office> {
    const { ciudad, estate_id, ...officeData } = createOfficeDto;

    // Verificar que la ciudad y el estado existan
    const city = await this.cityRepository.findOne({ where: { id: ciudad } });
    if (!city) {
      throw new BadRequestException('El ID de ciudad proporcionado no es válido.');
    }
    const estate = await this.estateRepository.findOne({ where: { id: estate_id } });
    if (!estate) {
      throw new BadRequestException('El ID de estado proporcionado no es válido.');
    }

    const office = this.officeRepository.create({
      ...officeData,
      city,
      estate,
    });

    return this.officeRepository.save(office);
  }

  /**
   * Actualiza una oficina existente en la base de datos.
   * @param id El ID de la oficina a actualizar.
   * @param updateOfficeDto Los datos para actualizar la oficina.
   * @returns La oficina actualizada.
   */
  async update(id: number, updateOfficeDto: UpdateOfficeDto): Promise<Office> {
    const office = await this.findOne(id);
    const { ciudad, estate_id, ...officeData } = updateOfficeDto;

    // Verificar que la ciudad y el estado existan si se proporcionan
    if (ciudad) {
      const city = await this.cityRepository.findOne({ where: { id: ciudad } });
      if (!city) {
        throw new BadRequestException('El ID de ciudad proporcionado no es válido.');
      }
      office.city = city;
    }
    if (estate_id) {
      const estate = await this.estateRepository.findOne({ where: { id: estate_id } });
      if (!estate) {
        throw new BadRequestException('El ID de estado proporcionado no es válido.');
      }
      office.estate = estate;
    }
    
    this.officeRepository.merge(office, officeData);
    return this.officeRepository.save(office);
  }

  /**
   * Elimina una oficina de la base de datos (eliminación lógica).
   * @param id El ID de la oficina a eliminar.
   */
  async remove(id: number): Promise<void> {
    const office = await this.findOne(id);
    await this.officeRepository.softDelete(office.id);
  }
}
