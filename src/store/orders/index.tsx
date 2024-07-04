import OrdersService from 'src/api/services/OrdersService'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'


type FiltersType = {
    status: 'Все' | 'Готовим' | 'Готов' | 'Доставлен' | any,
    price: -1 | 0 | 1 | any,
    time: -1 | 0 | 1 | any
}

interface OrdersState {
    data: any[],
    filters: FiltersType,
    filteredData: any[],
    notifications: number
}


interface OrdersActions {
    updateData: (token:string) => void
    setData: (data:any[]) => void
    setFilters: (filters: object) => any
    setFilteredData: (data:any) => void
    setNotifications: (count:number) => void
}

export const useOrdersStore = create<OrdersActions & OrdersState>()(immer(set => ({
    data: [],
    updateData: async (token) => {
        if (token.length !== 0) {
            const {data} = await OrdersService.get(token)
            set({data: data})
        }
     },
    setData: (data:any[]) => {
        set({data: data})
    },
    filters: {
        status: 'Все',
        price: -1,
        time: -1
    },
    filteredData: [], 
    setFilters: (filters:any) => {
        set({filters: filters})
    },
    setFilteredData: (data) => {
        set({filteredData: data})
    },
    notifications: 0,
    setNotifications: (count) => {
        set({notifications: count})
    }
})))