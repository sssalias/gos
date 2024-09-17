import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'


interface SideState {
    isOpen: boolean
    isSmall: boolean
}

interface SideActions {
    setOpen: (open: boolean) => void
    setSmall: (small: boolean) => void
}

export const useSideStore = create<SideActions & SideState>()(immer(set => ({
    isOpen: false,
    isSmall: true,
    setOpen: (open) => {
        set({isOpen: open})
    },
    setSmall: (small) => {
        set({isSmall: small})
    }
})))