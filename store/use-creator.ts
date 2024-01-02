import { create } from "zustand";

interface CreatorSidebarStore {
    collapsed: Boolean;
    onCollapse: () => void;
    onExpand: () => void;
}

export const useCreatorSidebar = create<CreatorSidebarStore>((set) => ({
    collapsed: true,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true }))
}));