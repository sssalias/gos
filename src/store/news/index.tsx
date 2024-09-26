import { NewsService } from 'src/shared/api'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'


interface NewsState {
    data: any[]
}

interface NewsActions {
    updateData: (token: string) => void
    setData: (data: any[]) => void
}

export const useNewsStore = create<NewsState & NewsActions>()(immer(set => ({
    data: [],
    updateData: async (token) => {
        if (token.length !== 0) {
            const {data} = await NewsService.getForGroup(token)
            set({data: data})
        }
    },
    setData: (data: any[]) => {
        set({data: data})
    }
})))
