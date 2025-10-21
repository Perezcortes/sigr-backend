import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Rental } from "./rental.entity";

@Entity("obligados_solidarios_pf")
export class ObligadoSolidarioPf {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "ID único del obligado solidario" })
  id: string;

  @OneToOne(() => Rental)
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

  @Column({ name: "estado_civil", type: "enum", enum: ["soltero", "casado"] })
  @ApiProperty({ enum: ["soltero", "casado"], description: "Estado civil" })
  estadoCivil: string;

  // NUEVOS CAMPOS PARA DATOS PERSONALES
  @Column({ name: "fecha_nacimiento", type: "date", nullable: true })
  @ApiProperty({ description: "Fecha de nacimiento", nullable: true })
  fechaNacimiento?: Date;

  @Column({ name: "tipo_identificacion", type: "enum", enum: ["ine", "pasaporte", "cedula", "licencia", "otro"], nullable: true })
  @ApiProperty({ enum: ["ine", "pasaporte", "cedula", "licencia", "otro"], description: "Tipo de identificación", nullable: true })
  tipoIdentificacion?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: "CURP", nullable: true })
  curp?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: "RFC", nullable: true })
  rfc?: string;

  @Column()
  @ApiProperty({ description: "Correo electrónico" })
  email: string;

  @Column({ name: "confirmar_email" })
  @ApiProperty({ description: "Confirmar correo electrónico" })
  confirmarEmail: string;

  @Column({ name: "telefono_celular" })
  @ApiProperty({ description: "Teléfono celular" })
  telefonoCelular: string;

  @Column({ name: "telefono_fijo", nullable: true })
  @ApiProperty({ description: "Teléfono fijo", nullable: true })
  telefonoFijo?: string;

  @Column({ name: "relacion_solicitante" })
  @ApiProperty({ description: "Relación con el solicitante" })
  relacionSolicitante: string;

  @Column({ name: "tiempo_conocer" })
  @ApiProperty({ description: "Tiempo de conocerlo" })
  tiempoConocer: string;

  // DATOS DEL CÓNYUGE (solo si es casado)
  @Column({ name: "conyuge_nombres", nullable: true })
  @ApiProperty({ description: "Nombre(s) del cónyuge", nullable: true })
  conyugeNombres?: string;

  @Column({ name: "conyuge_apellido_paterno", nullable: true })
  @ApiProperty({ description: "Apellido paterno del cónyuge", nullable: true })
  conyugeApellidoPaterno?: string;

  @Column({ name: "conyuge_apellido_materno", nullable: true })
  @ApiProperty({ description: "Apellido materno del cónyuge", nullable: true })
  conyugeApellidoMaterno?: string;

  @Column({ name: "conyuge_telefono", nullable: true })
  @ApiProperty({ description: "Teléfono del cónyuge", nullable: true })
  conyugeTelefono?: string;

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

  // Empleo e ingresos
  @Column({ name: "empresa_trabaja", nullable: true })
  @ApiProperty({ description: "Empresa donde trabaja", nullable: true })
  empresaTrabaja?: string;

  @Column({ name: "fecha_ingreso", type: "date", nullable: true })
  @ApiProperty({ description: "Fecha de ingreso", nullable: true })
  fechaIngreso?: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: "Profesión", nullable: true })
  profesion?: string;

  @Column({ name: "tipo_empleo", type: "enum", enum: ["dueño_negocio", "empresario", "independiente", "empleado", "comisionista", "jubilado"], nullable: true })
  @ApiProperty({ enum: ["dueño_negocio", "empresario", "independiente", "empleado", "comisionista", "jubilado"], description: "Tipo de empleo", nullable: true })
  tipoEmpleo?: string;

  @Column({ name: "ingreso_mensual", type: "decimal", precision: 12, scale: 2, nullable: true })
  @ApiProperty({ description: "Ingreso mensual", nullable: true })
  ingresoMensual?: number;

  // Domicilio de la empresa
  @Column({ name: "empresa_calle", nullable: true })
  @ApiProperty({ description: "Calle de la empresa", nullable: true })
  empresaCalle?: string;

  @Column({ name: "empresa_num_ext", nullable: true })
  @ApiProperty({ description: "Número exterior empresa", nullable: true })
  empresaNumExt?: string;

  @Column({ name: "empresa_num_int", nullable: true })
  @ApiProperty({ description: "Número interior empresa", nullable: true })
  empresaNumInt?: string;

  @Column({ name: "empresa_cp", nullable: true })
  @ApiProperty({ description: "Código postal empresa", nullable: true })
  empresaCp?: string;

  @Column({ name: "empresa_colonia", nullable: true })
  @ApiProperty({ description: "Colonia empresa", nullable: true })
  empresaColonia?: string;

  @Column({ name: "empresa_municipio", nullable: true })
  @ApiProperty({ description: "Municipio empresa", nullable: true })
  empresaMunicipio?: string;

  @Column({ name: "empresa_estado", nullable: true })
  @ApiProperty({ description: "Estado empresa", nullable: true })
  empresaEstado?: string;

  @Column({ name: "empresa_telefono", nullable: true })
  @ApiProperty({ description: "Teléfono empresa", nullable: true })
  empresaTelefono?: string;

  @Column({ name: "empresa_extension", nullable: true })
  @ApiProperty({ description: "Número de extensión", nullable: true })
  empresaExtension?: string;

  // Autorizaciones
  @Column({ name: "autoriza_investigacion" })
  @ApiProperty({ description: "Autoriza investigación" })
  autorizaInvestigacion: boolean;

  @Column({ name: "declara_veracidad" })
  @ApiProperty({ description: "Declara veracidad" })
  declaraVeracidad: boolean;

  // Propiedad en garantía
  @Column({ name: "garantia_calle", nullable: true })
  @ApiProperty({ description: "Calle propiedad garantía", nullable: true })
  garantiaCalle?: string;

  @Column({ name: "garantia_num_ext", nullable: true })
  @ApiProperty({ description: "Número exterior garantía", nullable: true })
  garantiaNumExt?: string;

  @Column({ name: "garantia_num_int", nullable: true })
  @ApiProperty({ description: "Número interior garantía", nullable: true })
  garantiaNumInt?: string;

  @Column({ name: "garantia_cp", nullable: true })
  @ApiProperty({ description: "Código postal garantía", nullable: true })
  garantiaCp?: string;

  @Column({ name: "garantia_colonia", nullable: true })
  @ApiProperty({ description: "Colonia garantía", nullable: true })
  garantiaColonia?: string;

  @Column({ name: "garantia_municipio", nullable: true })
  @ApiProperty({ description: "Municipio garantía", nullable: true })
  garantiaMunicipio?: string;

  @Column({ name: "garantia_estado", nullable: true })
  @ApiProperty({ description: "Estado garantía", nullable: true })
  garantiaEstado?: string;

  @Column({ name: "garantia_numero_escritura", nullable: true })
  @ApiProperty({ description: "Número de escritura garantía", nullable: true })
  garantiaNumeroEscritura?: string;

  @Column({ name: "garantia_fecha_escritura", type: "date", nullable: true })
  @ApiProperty({ description: "Fecha de escritura garantía", nullable: true })
  garantiaFechaEscritura?: Date;

  @Column({ name: "garantia_notario_nombres", nullable: true })
  @ApiProperty({ description: "Nombre(s) notario garantía", nullable: true })
  garantiaNotarioNombres?: string;

  @Column({ name: "garantia_notario_apellido_paterno", nullable: true })
  @ApiProperty({ description: "Apellido paterno notario garantía", nullable: true })
  garantiaNotarioApellidoPaterno?: string;

  @Column({ name: "garantia_notario_apellido_materno", nullable: true })
  @ApiProperty({ description: "Apellido materno notario garantía", nullable: true })
  garantiaNotarioApellidoMaterno?: string;

  @Column({ name: "garantia_notario_numero", nullable: true })
  @ApiProperty({ description: "Número de notaría garantía", nullable: true })
  garantiaNotarioNumero?: string;

  @Column({ name: "garantia_notario_lugar", nullable: true })
  @ApiProperty({ description: "Lugar de notaría garantía", nullable: true })
  garantiaNotarioLugar?: string;

  @Column({ name: "garantia_registro_publico", nullable: true })
  @ApiProperty({ description: "Registro público propiedad", nullable: true })
  garantiaRegistroPublico?: string;

  @Column({ name: "garantia_folio_real", nullable: true })
  @ApiProperty({ description: "Folio real electrónico", nullable: true })
  garantiaFolioReal?: string;

  @Column({ name: "garantia_fecha_registro", type: "date", nullable: true })
  @ApiProperty({ description: "Fecha de registro", nullable: true })
  garantiaFechaRegistro?: Date;

  @Column({ name: "garantia_boleta_predial", nullable: true })
  @ApiProperty({ description: "Número de boleta predial", nullable: true })
  garantiaBoletaPredial?: string;

  @CreateDateColumn({ name: "fecha_creacion" })
  @ApiProperty({ description: "Fecha de creación" })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: "fecha_actualizacion" })
  @ApiProperty({ description: "Fecha de última actualización" })
  fechaActualizacion: Date;
}
