import CategoriesService from 'src/api/services/CategoriesService'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'



interface MenuState {
    data: any[]
}

interface MenuActions {
    updateData: (token: string, menuId:string) => void
    setData: (data: any[]) => void
}

export const useCategoriesStore = create<MenuState & MenuActions>()(immer(set => ({
    data: [],
    updateData: async (token, menuId) => {
        if (token.length !== 0) {
            const {data} = await CategoriesService.get(token, menuId)
            set({data: data})
        }
    },
    setData: (data: any[]) => {
        set({data: data})
    }
})))
