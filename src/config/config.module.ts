import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        `${process.env.NODE_ENV ? process.env.NODE_ENV : ''}.env`,
      ),
    },
  ],
})
export class ConfigModule {}
