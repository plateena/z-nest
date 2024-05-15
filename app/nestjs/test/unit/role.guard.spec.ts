import { Test, TestingModule } from '@nestjs/testing'
import { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RolesGuard } from '@/guards/role.guards'

describe('RolesGuard', () => {
    let guard: RolesGuard
    let reflector: Reflector

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RolesGuard,
                {
                    provide: Reflector,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        }).compile()

        guard = module.get<RolesGuard>(RolesGuard)
        reflector = module.get<Reflector>(Reflector)
    })

    it('should allow access if no roles are defined', () => {
        jest.spyOn(reflector, 'get').mockReturnValue(undefined)
        const context = {
            getHandler: () => {},
            switchToHttp: () => ({
                getRequest: () => ({
                    user: { role: 'admin' },
                }),
            }),
        } as ExecutionContext 

        const result = guard.canActivate(context)

        expect(result).toBe(true)
    })

    it('should allow access if user has required role', () => {
        jest.spyOn(reflector, 'get').mockReturnValue(['admin'])
        const context = {
            getHandler: () => {},
            switchToHttp: () => ({
                getRequest: () => ({
                    user: { role: 'admin' },
                }),
            }),
        } as ExecutionContext

        const result = guard.canActivate(context)

        expect(result).toBe(true)
    })

    it('should deny access if user does not have required role', () => {
        jest.spyOn(reflector, 'get').mockReturnValue(['admin'])
        const context = {
            getHandler: () => {},
            switchToHttp: () => ({
                getRequest: () => ({
                    user: { role: 'user' },
                }),
            }),
        } as ExecutionContext

        const result = guard.canActivate(context)

        expect(result).toBe(false)
    })

    it('should deny access if no user is present', () => {
        jest.spyOn(reflector, 'get').mockReturnValue(['admin'])
        const context = {
            getHandler: () => {},
            switchToHttp: () => ({
                getRequest: () => ({
                    user: undefined,
                }),
            }),
        // } as unkown as RouterExecutionContext
        } as ExecutionContext

        const result = guard.canActivate(context)

        expect(result).toBe(false)
    })
})
