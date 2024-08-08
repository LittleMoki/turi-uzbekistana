import { create } from "zustand";

export const useStoreMenu = create((set) => ({
    menu: false,
    setMenu: (state) => set(() => ({ menu: state })),
}));
