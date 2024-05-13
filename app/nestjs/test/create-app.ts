import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from '@/app.module'
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing'

export const createApp = async (callback?: Function) => {
    let app: INestApplication
    let moduleFixture: TestingModuleBuilder = Test.createTestingModule({
        imports: [AppModule],
    })

    if (typeof callback == 'function') {
        moduleFixture = callback(moduleFixture)
    }

    const builder = await moduleFixture.compile()

    app = builder.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()

    return app
}
