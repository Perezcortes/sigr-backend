import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './entities/rental.entity';
import { Tenant } from './entities/tenant.entity';
import { Owner } from './entities/owner.entity';
import { Guarantor } from './entities/guarantor.entity';
import { Property } from './entities/property.entity';
import { User } from '../users/entities/user.entity';
import { CreateRentalDto } from './dto/rental.dto';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
    @InjectRepository(Guarantor)
    private readonly guarantorRepository: Repository<Guarantor>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Crea una nueva renta de forma manual, incluyendo inquilino, propietario, propiedad y obligado solidario.
   * @param createRentalDto Los datos para la creación de la renta.
   * @returns La entidad de renta recién creada.
   */
  async createManualRental(createRentalDto: CreateRentalDto): Promise<Rental> {
    const { inquilino, propietario, propiedad, obligado_solidario, ...rentalData } = createRentalDto;

    // Verificar si el usuario que crea la renta existe
    const user = await this.userRepository.findOne({ where: { id: rentalData.creado_por_user_id } });
    if (!user) {
      throw new BadRequestException('El usuario que crea la renta no es válido.');
    }
    
    // 1. Crear y guardar el inquilino
    const newTenant = this.tenantRepository.create(inquilino);
    const savedTenant = await this.tenantRepository.save(newTenant);

    // 2. Crear y guardar el propietario
    const newOwner = this.ownerRepository.create(propietario);
    const savedOwner = await this.ownerRepository.save(newOwner);

    // 3. Crear y guardar la propiedad
    const newProperty = this.propertyRepository.create({
      ...propiedad,
      propietario: savedOwner,
    });
    const savedProperty = await this.propertyRepository.save(newProperty);

    // 4. Crear y guardar el obligado solidario si existe
    let savedGuarantor: Guarantor | null = null;
    if (obligado_solidario) {
      const newGuarantor = this.guarantorRepository.create(obligado_solidario);
      savedGuarantor = await this.guarantorRepository.save(newGuarantor);
    }

    // 5. Crear la entidad de renta principal con los IDs correctos
    const newRental = this.rentalRepository.create({
      status: 'apartada', // El estado inicial para una renta creada manualmente
      tipo_origen: rentalData.tipo_origen,
      creado_por_user_id: user.id,
      inquilino_id: savedTenant.id,
      propietario_id: savedOwner.id,
      propiedad_id: savedProperty.id,
      obligado_solidario_id: savedGuarantor ? savedGuarantor.id : undefined,
    });

    return this.rentalRepository.save(newRental);
  }
}
