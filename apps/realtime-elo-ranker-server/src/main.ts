import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';

AppDataSource.initialize().then(() => {
  console.log('Database initialized');
}).catch((err) => {
  console.error('Error initializing database', err);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
