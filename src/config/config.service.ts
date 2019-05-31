import { NotFoundException } from '@nestjs/common';
import { config } from 'dotenv';

export class ConfigService {
  constructor() {
    config();
    this.CheckRequiredConfigItems([]);
  }
  get isApiAuthEnabled(): boolean {
    return (
      this.env('API_AUTH_ENABLED', '')
        .toLowerCase()
        .trim() !== 'false'
    );
  }

  env(key: string, defaultValue: string = null): string {
    if (process.env[key]) {
      return process.env[key];
    }
    return defaultValue;
  }
  CheckRequiredConfigItems(requiredItems) {
    requiredItems.forEach(i => {
      if (process.env[i] === undefined) {
        throw new NotFoundException(
          `Required Configuration item ${i} is missing.`,
        );
      }
    });
  }
}
