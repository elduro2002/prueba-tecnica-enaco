import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Extrayendo el puerto desde una variable de entorno
  const PORT = process.env.PORT;
  // Logguer, sirve para los comandos de consola, para agregarle colores y formas.
  const logger = new Logger()

  // Esta funcion es utilizada para agregar un prefijo a la URL del servidor
  // Ejemplo: localhost:3000/login con este prefijo seria localhost:3000/api/login
  app.setGlobalPrefix('api');

  // Las cors para proteger el servidor de intrusos
  app.enableCors();

  // Los pipes son utilizados para parsear la data que venga desde el frontend
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )


  // ESTA CONFIGURACION AGREGA UNA DOCUMENTACION DE LA API CON SWAGGER
  const config = new DocumentBuilder()
    .setTitle('video-serve api documention')
    .setDescription('This is documentation of this project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  logger.log(`App corriendo en el puerto ${PORT}`)
}
bootstrap();
