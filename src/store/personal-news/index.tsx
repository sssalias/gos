import NewsService from 'src/api/services/NewsService'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'


interface NewsState {
    data: any[]
}

interface NewsActions {
    updateData: (token: string) => void
    setData: (data: any[]) => void
}

export const usePersonalNewsStore = create<NewsState & NewsActions>()(immer(set => ({
    data: [],
    updateData: async (token) => {
        if (token.length !== 0) {
            const {data} = await NewsService.getPersonal(token)
            console.log(data)
            
            set({data: data})
        }
    },
    setData: (data: any[]) => {
        set({data: data})
    }
})))
