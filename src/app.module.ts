import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('TYPEORM_HOST'),
        database: config.get<string>('TYPEORM_DATABASE'),
        username: config.get<string>('TYPEORM_USER'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        migrations: ['dist/migrations/*.{ts,js}'],
        migrationsTableName: 'typeorm_migrations',
        autoLoadEntities: true,
        synchronize: true, // never use TRUE in production!
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
