// store.ts
import { create } from 'zustand';

interface SectionStore {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useSectionStore = create<SectionStore>((set) => ({
  activeSection: '/',
  setActiveSection: (section: string) => set({ activeSection: section }),
}));
