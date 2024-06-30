import AppealsService from 'src/api/services/AppealsService'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'


type FiltersType = {
    ownerRole: 'user' | 'super_vip' | 'vip' | 'user' | string
    status: 'ВСЕ' | 'NEW' | 'Принято' | 'Отклонено' | string
}

interface AppealsState {
    data: any[]
    filteredData: any[],
    filters: FiltersType
}


interface AppealsActions {
    setData: (data: any[]) => void
    updateData: (token:string) => void
    setFilteredData: (data: any[]) => void
    setFilters: (filters: FiltersType) => void
}


export const useAppealsStore = create<AppealsActions & AppealsState>()(immer(set => ({
    data: [],
    setData: (data) => {
        set({data: data})
    },
    updateData: async (token) => {
        if (token.length !== 0) {
            const {data} = await AppealsService.get(token)
            set({data: data})
        }
    },
    filteredData: [],
    filters: {
        ownerRole: 'user',
        status: 'ВСЕ'
    },
    setFilteredData: (data) => {
        set({data})
    },
    setFilters: (filters) => {
        set({filters: filters})
    }
})))