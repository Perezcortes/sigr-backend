import { Injectable, Inject } from '@nestjs/common';
import Hashids from 'hashids';
import { ConfigService, ConfigType } from '@nestjs/config';

@Injectable()
export class HashidsService {
  private readonly hashids: Hashids;

  constructor(private readonly configService: ConfigService) {
    // Obtiene el salt de las variables de entorno de forma segura.
    const salt = this.configService.get<string>('HASHIDS_SALT', 'default_salt');
    this.hashids = new Hashids(salt, 10);
  }

  /**
   * Codifica un ID numérico en una cadena ofuscada.
   * @param id El ID numérico a codificar.
   * @returns El ID ofuscado como una cadena de texto.
   */
  encode(id: number): string {
    return this.hashids.encode(id);
  }

  /**
   * Decodifica una cadena ofuscada a su ID numérico original.
   * @param hash La cadena ofuscada a decodificar.
   * @returns El ID numérico o null si la decodificación falla.
   */
  decode(hash: string): number | null {
    const decoded = this.hashids.decode(hash);
    return decoded.length > 0 ? Number(decoded[0]) : null;
  }
}
