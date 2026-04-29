import { create } from 'zustand';

interface NavState {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

/**
 * useNavStore - Sistema Nervioso de Navegación Táctica.
 * Centraliza la sección activa para sincronizar el brillo de los HudPanels.
 */
export const useNavStore = create<NavState>((set) => ({
  activeSection: "",
  setActiveSection: (id: string) => set({ activeSection: id }),
}));
