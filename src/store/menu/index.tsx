import MenuService from 'src/shared/api/services/MenuService'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'



interface MenuState {
    data: any[]
}

interface MenuActions {
    updateData: (token: string) => void
    setData: (data: any[]) => void
}

export const useMenuStore = create<MenuState & MenuActions>()(immer(set => ({
    data: [],
    updateData: async (token) => {
        if (token.length !== 0) {
            const {data} = await MenuService.get(token)
            set({data: data})
        }
    },
    setData: (data: any[]) => {
        set({data: data})
    }
})))
