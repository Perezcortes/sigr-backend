import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Rental } from "./rental.entity";

@Entity("inquilinos_pf")
export class InquilinoPf {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "ID único del inquilino" })
  id: string;

  @OneToOne(() => Rental, rental => rental.inquilinoPf)
  @JoinColumn({ name: "renta_id" })
  renta: Rental;

  @Column({ name: "renta_id" })
  rentaId: string;

  // Datos Personales
  @Column()
  @ApiProperty({ description: "Nombre(s)" })
  nombres: string;

  @Column({ name: "apellido_paterno" })
  @ApiProperty({ description: "Apellido paterno" })
  apellidoPaterno: string;

  @Column({ name: "apellido_materno" })
  @ApiProperty({ description: "Apellido materno" })
  apellidoMaterno: string;

  @Column({ type: "enum", enum: ["mexicana", "extranjera"] })
  @ApiProperty({ enum: ["mexicana", "extranjera"], description: "Nacionalidad" })
  nacionalidad: string;

  @Column({ nullable: true, name: "nacionalidad_especifique" })
  @ApiProperty({ description: "Especifique nacionalidad", nullable: true })
  nacionalidadEspecifique?: string;

  @Column({ type: "enum", enum: ["masculino", "femenino"] })
  @ApiProperty({ enum: ["masculino", "femenino"], description: "Sexo" })
  sexo: string;

  @Column({ name: "estado_civil", type: "enum", enum: ["soltero", "casado", "divorciado", "union_libre"] })
  @ApiProperty({ enum: ["soltero", "casado", "divorciado", "union_libre"], description: "Estado civil" })
  estadoCivil: string;

  @Column()
  @ApiProperty({ description: "Correo electrónico" })
  email: string;

  @Column({ name: "tipo_identificacion", type: "enum", enum: ["ine", "pasaporte", "cedula", "licencia", "otro"] })
  @ApiProperty({ enum: ["ine", "pasaporte", "cedula", "licencia", "otro"], description: "Tipo de identificación" })
  tipoIdentificacion: string;

  @Column({ name: "fecha_nacimiento", type: "date" })
  @ApiProperty({ description: "Fecha de nacimiento" })
  fechaNacimiento: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: "RFC", nullable: true })
  rfc?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: "CURP", nullable: true })
  curp?: string;

  @Column({ name: "telefono_celular" })
  @ApiProperty({ description: "Teléfono celular" })
  telefonoCelular: string;

  @Column({ name: "telefono_fijo", nullable: true })
  @ApiProperty({ description: "Teléfono fijo", nullable: true })
  telefonoFijo?: string;

  // Domicilio Actual
  @Column({ name: "dom_calle" })
  @ApiProperty({ description: "Calle del domicilio" })
  domCalle: string;

  @Column({ name: "dom_num_ext" })
  @ApiProperty({ description: "Número exterior" })
  domNumExt: string;

  @Column({ name: "dom_num_int", nullable: true })
  @ApiProperty({ description: "Número interior", nullable: true })
  domNumInt?: string;

  @Column({ name: "dom_cp" })
  @ApiProperty({ description: "Código postal" })
  domCp: string;

  @Column({ name: "dom_colonia" })
  @ApiProperty({ description: "Colonia" })
  domColonia: string;

  @Column({ name: "dom_municipio" })
  @ApiProperty({ description: "Municipio" })
  domMunicipio: string;

  @Column({ name: "dom_estado" })
  @ApiProperty({ description: "Estado" })
  domEstado: string;

  @Column({ name: "dom_referencias", nullable: true })
  @ApiProperty({ description: "Referencias", nullable: true })
  domReferencias?: string;

  @Column({ name: "situacion_habitacional", type: "enum", enum: ["inquilino", "pension_hotel", "con_familia", "propietario_pagando", "propietario_liberado"] })
  @ApiProperty({ enum: ["inquilino", "pension_hotel", "con_familia", "propietario_pagando", "propietario_liberado"], description: "Situación habitacional" })
  situacionHabitacional: string;

  // NUEVOS CAMPOS: Datos del Arrendador Actual
  @Column({ name: "arrendador_nombres", nullable: true })
  @ApiProperty({ description: "Nombres del arrendador actual", nullable: true })
  arrendadorNombres?: string;

  @Column({ name: "arrendador_apellido_paterno", nullable: true })
  @ApiProperty({ description: "Apellido paterno del arrendador actual", nullable: true })
  arrendadorApellidoPaterno?: string;

  @Column({ name: "arrendador_apellido_materno", nullable: true })
  @ApiProperty({ description: "Apellido materno del arrendador actual", nullable: true })
  arrendadorApellidoMaterno?: string;

  @Column({ name: "arrendador_telefono", nullable: true })
  @ApiProperty({ description: "Teléfono del arrendador actual", nullable: true })
  arrendadorTelefono?: string;

  @Column({ name: "renta_actual", type: "decimal", precision: 12, scale: 2, nullable: true })
  @ApiProperty({ description: "Renta actual que paga", nullable: true })
  rentaActual?: number;

  @Column({ name: "ocupa_desde", nullable: true })
  @ApiProperty({ description: "Año desde que ocupa el lugar", nullable: true })
  ocupaDesde?: string;

  // Empleo
  @Column({ nullable: true })
  @ApiProperty({ description: "Profesión", nullable: true })
  profesion?: string;

  @Column({ name: "tipo_empleo", type: "enum", enum: ["dueño_negocio", "empresario", "independiente", "empleado", "comisionista", "jubilado"], nullable: true })
  @ApiProperty({ enum: ["dueño_negocio", "empresario", "independiente", "empleado", "comisionista", "jubilado"], description: "Tipo de empleo", nullable: true })
  tipoEmpleo?: string;

  @Column({ name: "empresa_trabaja", nullable: true })
  @ApiProperty({ description: "Empresa donde trabaja", nullable: true })
  empresaTrabaja?: string;

  @Column({ name: "fecha_ingreso", type: "date", nullable: true })
  @ApiProperty({ description: "Fecha de ingreso", nullable: true })
  fechaIngreso?: Date;

  @Column({ name: "ingreso_comprobable", type: "decimal", precision: 12, scale: 2, nullable: true })
  @ApiProperty({ description: "Ingreso comprobable", nullable: true })
  ingresoComprobable?: number;

  @Column({ name: "ingreso_no_comprobable", type: "decimal", precision: 12, scale: 2, nullable: true })
  @ApiProperty({ description: "Ingreso no comprobable", nullable: true })
  ingresoNoComprobable?: number;

  @CreateDateColumn({ name: "fecha_creacion" })
  @ApiProperty({ description: "Fecha de creación" })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: "fecha_actualizacion" })
  @ApiProperty({ description: "Fecha de última actualización" })
  fechaActualizacion: Date;
}
