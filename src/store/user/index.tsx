import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'


interface UserState {
    isAuth: boolean,
    token: string
}

interface UserActions {
    setAuth: (token: string) => void
    getData: () => object
}

export const useUserStore = create<UserActions & UserState>()(immer(set => ({
    isAuth: false,
    token: '',
    setAuth: (token) => {
        console.log(token)
        
        set({isAuth: true, token: token})
    },
    getData: () => {
        return {
            token: ''
        }
    }
})))