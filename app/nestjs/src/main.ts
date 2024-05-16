import * as express from 'express'
import * as path from 'path'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { swaggerConfig } from '@/config/swagger.config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())

    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('api-docs', app, document, {
        customSiteTitle: 'MT Documentation',
    })

    await app.listen(3000)
}
bootstrap()
