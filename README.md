# SIGR Backend  

Este documento describe los cambios implementados en el **módulo de rentas** del proyecto **SIGR (Sistema Integral de Gestión de Rentas)**.  
El objetivo principal fue refactorizar el módulo para hacerlo **más escalable, mantenible y coherente** con buenas prácticas de arquitectura en NestJS.

---

## Tecnologías Usadas

<p align="left">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/TypeORM-FF6C37?style=for-the-badge&logo=databricks&logoColor=white" alt="TypeORM"/>
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
</p>

---

## 📌 Resumen de Cambios

- **Separación de DTOs**: se dividió el DTO principal en sub-DTOs (`tenant`, `owner`, `guarantor`, `property`) para mejorar legibilidad, reutilización y documentación Swagger.
- **Entidades refactorizadas**: se estandarizaron las entidades en TypeORM para soportar tanto **personas físicas (pf_)** como **personas morales (pm_)**, asegurando integridad referencial.
- **Servicio mejorado**: se implementaron **transacciones** en `rentals.service.ts` para garantizar consistencia al crear múltiples entidades relacionadas.
- **Seeder robusto**: `initial.seeder.ts` ahora crea datos de prueba coherentes con la nueva estructura de entidades, asegurando relaciones válidas y evitando duplicados.
- **Escalabilidad asegurada**: la arquitectura modular facilita la incorporación de futuros componentes sin romper la lógica existente.

---

## Archivos Nuevos

### DTOs creados
- `src/rentals/dto/create-tenant.dto.ts`  
- `src/rentals/dto/create-owner.dto.ts`  
- `src/rentals/dto/create-guarantor.dto.ts`  
- `src/rentals/dto/create-property.dto.ts`  

**Explicación**:  
Cada archivo define la estructura y validaciones específicas para su entidad. Esto separa responsabilidades, facilita la documentación Swagger y mejora la escalabilidad del sistema.

---

## ✏️ Archivos Modificados

### `src/rentals/dto/rental.dto.ts`
- Ahora integra los sub-DTOs (`tenant`, `owner`, `guarantor`, `property`) en lugar de un bloque monolítico.  
- Beneficios: mejor legibilidad, modularidad y documentación más clara.

### `src/rentals/entities/tenant.entity.ts`
- Se refactorizó para soportar personas físicas y morales en la misma tabla.  
- Prefijos **`pf_` y `pm_`** para distinguir campos según el tipo de persona.  
- Relaciones ajustadas con `Rental`.

### `src/rentals/entities/owner.entity.ts`
- Similar a tenant: unificación de personas físicas y morales.  
- Relación con propiedad y renta.

### `src/rentals/entities/guarantor.entity.ts`
- Misma lógica de unificación que en tenant/owner.  
- Optimizado para integridad de datos y consistencia.

### `src/rentals/entities/property.entity.ts`
- Definición clara de atributos de la propiedad.  
- Relación con `owner` y `rental`.

### `src/rentals/entities/rental.entity.ts`
- Entidad central que conecta `tenant`, `owner`, `guarantor` y `property`.  
- Manejo de cascadas y referencias para mantener coherencia.

### `src/rentals/rentals.service.ts`
- Implementación de **transacciones** usando `QueryRunner`.  
- Garantiza que si falla un paso (ej. creación de inquilino), toda la operación se revierte.  
- Código más seguro y mantenible.

### `src/database/seeders/initial.seeder.ts`
- Actualizado para reflejar la nueva estructura de entidades.  
- Inserta datos completos de prueba (inquilino, propietario, obligado solidario, propiedad, renta).  
- Se optimizó el borrado previo para evitar errores de duplicidad.

---

## 🚀 Uso de Seeders

Para ejecutar los seeders en este proyecto:

```bash
npm run db:seed
```

Esto inicializará la base de datos con datos consistentes para pruebas del módulo de rentas.

---

## 📖 Beneficios del Refactor

1. **Escalabilidad**: permite agregar más entidades o modificar reglas de negocio sin afectar la base existente.  
2. **Mantenibilidad**: cada DTO/entidad tiene responsabilidad clara, facilitando futuras modificaciones.  
3. **Eficiencia**: uso de transacciones para operaciones críticas asegura datos consistentes.  
4. **Claridad**: Swagger genera ahora documentación más comprensible y modular.  
5. **Robustez en pruebas**: seeders mejorados permiten testear escenarios realistas.    

<<<<<<< HEAD
## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# SIGR Backend  

Este documento describe los cambios implementados en el **módulo de rentas** del proyecto **SIGR (Sistema Integral de Gestión de Rentas)**.  
El objetivo principal fue refactorizar el módulo para hacerlo **más escalable, mantenible y coherente** con buenas prácticas de arquitectura en NestJS.

---

## Tecnologías Usadas

<p align="left">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/TypeORM-FF6C37?style=for-the-badge&logo=databricks&logoColor=white" alt="TypeORM"/>
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
</p>

---

## 📌 Resumen de Cambios

- **Separación de DTOs**: se dividió el DTO principal en sub-DTOs (`tenant`, `owner`, `guarantor`, `property`) para mejorar legibilidad, reutilización y documentación Swagger.
- **Entidades refactorizadas**: se estandarizaron las entidades en TypeORM para soportar tanto **personas físicas (pf_)** como **personas morales (pm_)**, asegurando integridad referencial.
- **Servicio mejorado**: se implementaron **transacciones** en `rentals.service.ts` para garantizar consistencia al crear múltiples entidades relacionadas.
- **Seeder robusto**: `initial.seeder.ts` ahora crea datos de prueba coherentes con la nueva estructura de entidades, asegurando relaciones válidas y evitando duplicados.
- **Escalabilidad asegurada**: la arquitectura modular facilita la incorporación de futuros componentes sin romper la lógica existente.

---

## Archivos Nuevos

### DTOs creados
- `src/rentals/dto/create-tenant.dto.ts`  
- `src/rentals/dto/create-owner.dto.ts`  
- `src/rentals/dto/create-guarantor.dto.ts`  
- `src/rentals/dto/create-property.dto.ts`  

**Explicación**:  
Cada archivo define la estructura y validaciones específicas para su entidad. Esto separa responsabilidades, facilita la documentación Swagger y mejora la escalabilidad del sistema.

---

## ✏️ Archivos Modificados

### `src/rentals/dto/rental.dto.ts`
- Ahora integra los sub-DTOs (`tenant`, `owner`, `guarantor`, `property`) en lugar de un bloque monolítico.  
- Beneficios: mejor legibilidad, modularidad y documentación más clara.

### `src/rentals/entities/tenant.entity.ts`
- Se refactorizó para soportar personas físicas y morales en la misma tabla.  
- Prefijos **`pf_` y `pm_`** para distinguir campos según el tipo de persona.  
- Relaciones ajustadas con `Rental`.

### `src/rentals/entities/owner.entity.ts`
- Similar a tenant: unificación de personas físicas y morales.  
- Relación con propiedad y renta.

### `src/rentals/entities/guarantor.entity.ts`
- Misma lógica de unificación que en tenant/owner.  
- Optimizado para integridad de datos y consistencia.

### `src/rentals/entities/property.entity.ts`
- Definición clara de atributos de la propiedad.  
- Relación con `owner` y `rental`.

### `src/rentals/entities/rental.entity.ts`
- Entidad central que conecta `tenant`, `owner`, `guarantor` y `property`.  
- Manejo de cascadas y referencias para mantener coherencia.

### `src/rentals/rentals.service.ts`
- Implementación de **transacciones** usando `QueryRunner`.  
- Garantiza que si falla un paso (ej. creación de inquilino), toda la operación se revierte.  
- Código más seguro y mantenible.

### `src/database/seeders/initial.seeder.ts`
- Actualizado para reflejar la nueva estructura de entidades.  
- Inserta datos completos de prueba (inquilino, propietario, obligado solidario, propiedad, renta).  
- Se optimizó el borrado previo para evitar errores de duplicidad.

---

## 🚀 Uso de Seeders

Para ejecutar los seeders en este proyecto:

```bash
npm run db:seed
```

Esto inicializará la base de datos con datos consistentes para pruebas del módulo de rentas.

---

## 📖 Beneficios del Refactor

1. **Escalabilidad**: permite agregar más entidades o modificar reglas de negocio sin afectar la base existente.  
2. **Mantenibilidad**: cada DTO/entidad tiene responsabilidad clara, facilitando futuras modificaciones.  
3. **Eficiencia**: uso de transacciones para operaciones críticas asegura datos consistentes.  
4. **Claridad**: Swagger genera ahora documentación más comprensible y modular.  
5. **Robustez en pruebas**: seeders mejorados permiten testear escenarios realistas.    

---

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
# sigr-backend
# sigr-backend
# sigr-backend
=======
---
>>>>>>> 63ae4eb6605c0ee1179e860950ca0eeb4c295682
