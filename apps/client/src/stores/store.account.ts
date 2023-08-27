import { create } from 'zustand'

type State = {
    account: {
        isLogged: boolean,
        infos: any | null
    }
}

type Actions = {
    login: (payload: any) => void
}

export const accountStore = create<State & Actions>((set) => ({
    account: {
        isLogged: false,
        infos: null
    },
    login: (payload) => set((state) => ({ account: { isLogged: true, infos: payload } }))
}))