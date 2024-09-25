import { DishServices } from 'src/shared/api'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'


interface DishesState {
    data: any[]
}


interface DishesActions {
    updateData: (token: string, id:string) => void
    setData: (data: any[]) => void
}


export const useDishesStore = create<DishesActions & DishesState>()(immer(set => ({
    data: [],
    updateData: async (token, id) => {
        const {data} = await DishServices.get(token, id)
        set({data: data})
    },
    setData: (data:any[]) => {
        set({data: data})
    },
})))