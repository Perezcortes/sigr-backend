import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PostalCodesService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Obtiene la información de un código postal.
   * Intenta con una API principal y usa una de respaldo si la primera falla.
   * @param postalCode El código postal de 5 dígitos.
   * @returns Un objeto con el estado, municipio, ciudad y colonias.
   */
  async getInfoByPostalCode(postalCode: string): Promise<any> {
    try {
      // 1. Intenta usar la API principal (Zippopotam)
      return await this.fetchFromZippopotam(postalCode);
    } catch (zippoError) {
      console.error(`Fallo la consulta a Zippopotam, intentando con Sepomex: ${zippoError.message}`);
      
      // 2. Si la API principal falla, intenta con la de respaldo (Sepomex)
      try {
        return await this.fetchFromSepomex(postalCode);
      } catch (sepomexError) {
        console.error(`Fallo la consulta a Sepomex: ${sepomexError.message}`);
        // Si ambas fallan, lanza una excepción
        throw new BadRequestException('No se pudo obtener la información del código postal de ninguna fuente.');
      }
    }
  }

  /**
   * Consulta la API principal (Zippopotam).
   * @param postalCode El código postal.
   * @returns Datos formateados de la respuesta de la API.
   */
  private async fetchFromZippopotam(postalCode: string): Promise<any> {
    const url = `http://api.zippopotam.us/mx/${postalCode}`;
    const { data } = await firstValueFrom(this.httpService.get(url));

    if (!data || data.places.length === 0) {
      throw new BadRequestException('El código postal no existe o es incorrecto en la API principal.');
    }

    const place = data.places[0];
    return {
      estado: place['state'],
      municipio: place['place name'],
      ciudad: data['place name'],
      colonias: data.places.map(p => p['place name']),
    };
  }

  /**
   * Consulta la API de respaldo (Sepomex).
   * @param postalCode El código postal.
   * @returns Datos formateados de la respuesta de la API.
   */
  private async fetchFromSepomex(postalCode: string): Promise<any> {
    const url = `https://api-sepomex.hckdrk.mx/query/info_cp/${postalCode}`;
    const { data } = await firstValueFrom(this.httpService.get(url));

    if (!data || data.error) {
      throw new BadRequestException('El código postal no existe o es incorrecto en la API de respaldo.');
    }

    const info = data[0];
    return {
      estado: info.response.estado,
      municipio: info.response.municipio,
      ciudad: info.response.ciudad,
      colonias: info.response.asentamiento.map(asentamiento => asentamiento.asentamiento),
    };
  }
}
