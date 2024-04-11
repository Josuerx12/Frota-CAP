import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ProviderModule } from './provider/provider.module';
import { AuthGuardMiddleware } from './auth-guard/auth-guard.middleware';
import { VehicleModule } from './vehicle/vehicle.module';
import { MaintanceRequestModule } from './maintance-request/maintance-request.module';

@Module({
  imports: [UserModule, AuthModule, ProviderModule, VehicleModule, MaintanceRequestModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthGuardMiddleware)
      .forRoutes('/user', '/provider', '/vehicle');
  }
}
