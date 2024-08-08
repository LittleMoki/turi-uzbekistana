import { create } from "zustand";

export const useStoreWallet = create((set) => ({
    wallet: "Рубль",
    setWallet: (state) => set(() => ({ wallet: state })),
}));
