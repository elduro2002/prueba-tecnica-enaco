<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

```
Backend hecho con NestJs, un poderoso framework de javascript, diseñado para crear aplicaciones grandes, escalables y manteibles.
```

```
Para la base de datos utilice Postgres con Docker, pero para prueba vasta con tener instalado Postgress y llenar las variables de entorno.
```

# Prueba Backend
1. Clonar proyecto
2. ```yarn install```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
4. Cambiar las variables de entorno
5. Levantar la base de datos
```
docker-compose up -d
```
6. Levanta: ```yarn start:dev```
