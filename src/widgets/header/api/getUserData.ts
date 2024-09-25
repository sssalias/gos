import { jwtDecode } from 'jwt-decode'

export const getUserData = (
    token: string | undefined
) => {
    if (token) {
        const result = jwtDecode(token)
        // //@ts-ignore
        // console.log(result.resource_access['kozodoy-client'].roles)
        // console.log(result.family_name)
        return {
            //@ts-ignore
            user: `${result.family_name} ${result.given_name}`,
            //@ts-ignore
            role: result.resource_access['kozodoy-client'].roles.includes('admin') ? 'Администратор' : 'Менеджер'
        }
    }
}