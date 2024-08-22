import { Module } from '@nestjs/common';
import loggerBootstrap from './logger.bootstrap';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    LoggerModule.forRootAsync(loggerBootstrap),
    // other imports
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
