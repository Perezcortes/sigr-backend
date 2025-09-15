import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estate } from '../offices/entities/estate.entity';
import { City } from '../offices/entities/city.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Estate)
    private readonly estateRepository: Repository<Estate>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  /**
   * Busca un estado por su nombre.
   * @param name El nombre del estado.
   * @returns La entidad de estado si se encuentra.
   */
  async findEstateByName(name: string): Promise<Estate> {
    const estate = await this.estateRepository.findOne({
      where: { nombre: name },
    });
    if (!estate) {
      throw new NotFoundException(`Estado con nombre "${name}" no encontrado.`);
    }
    return estate;
  }

  /**
   * Busca una ciudad por su nombre.
   * @param name El nombre de la ciudad.
   * @returns La entidad de ciudad si se encuentra.
   */
  async findCityByName(name: string): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { nombre: name },
    });
    if (!city) {
      throw new NotFoundException(`Ciudad con nombre "${name}" no encontrada.`);
    }
    return city;
  }
}
