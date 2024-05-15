export const getJWTConfig = async (): Promise<any> => {
    return {
        secret: process.env.JWT_SECRET
    }
}
