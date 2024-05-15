import * as express from 'express'
import * as path from 'path'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { swaggerConfig } from '@/config/swagger.config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())

    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'MT Documentation',
    })

    app.use(
        'docs',
        express.static(path.join(__dirname, '..', 'swagger-ui.html')),
    )

    await app.listen(3000)
}
bootstrap()
