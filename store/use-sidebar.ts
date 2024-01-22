import { create } from "zustand";

interface SidebarStore {
    collapsed: Boolean,
    onCollapse: () => void,
    onExpand: () => void
}

export const useSidebar = create<SidebarStore>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true }))
}));