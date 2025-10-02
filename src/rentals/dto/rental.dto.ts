// src/rentals/dto/rental.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsObject,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateTenantDto } from './create-tenant.dto'; //Datos del inquilino
import { CreatePropertyDto } from './create-property.dto'; //Datos de la propiedad
import { CreateOwnerDto } from './create-owner.dto'; //Datos del propietario
import { CreateGuarantorDto } from './create-guarantor.dto'; //Datos del obligado solidario

export class CreateRentalDto {
  @ApiProperty({ description: 'Tipo de origen de la renta', example: 'manual' })
  @IsString()
  @IsNotEmpty()
  tipo_origen: string;

  @ApiProperty({ description: 'ID del usuario que crea la renta', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  creado_por_user_id: number;

  @ApiProperty({ description: 'Datos del inquilino', type: CreateTenantDto })
  @IsObject()
  @ValidateNested()
  @Type(() => CreateTenantDto)
  inquilino: CreateTenantDto;

  @ApiProperty({ description: 'Datos del propietario', type: CreateOwnerDto })
  @IsObject()
  @ValidateNested()
  @Type(() => CreateOwnerDto)
  propietario: CreateOwnerDto;

  @ApiProperty({ description: 'Datos de la propiedad (solo si se crea manualmente)', type: CreatePropertyDto })
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePropertyDto)
  propiedad: CreatePropertyDto;

  @ApiProperty({ description: 'Datos del obligado solidario (opcional)', required: false, type: CreateGuarantorDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateGuarantorDto) // Uso del DTO correcto
  obligado_solidario?: CreateGuarantorDto;
}