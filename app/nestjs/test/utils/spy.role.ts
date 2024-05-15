import { RolesGuard } from '@/guards/role.guards'
import { ExecutionContext } from '@nestjs/common'

export const spyOnRoleGuard = (role: string) => {
    jest.spyOn(RolesGuard.prototype, 'canActivate').mockImplementation(
        (context: ExecutionContext) => {
            const request = context.switchToHttp().getRequest()
            request.user = { roles: [role] }
            return true
        },
    )
}
