// Mock de localStorage para entorno JSDOM
// Este archivo debe ser importado ANTES de cualquier otro módulo que use localStorage
export function setupLocalStorageMock() {
  const localStorageMock = {
    store: {} as Record<string, string>,
    getItem: function(key: string) {
      return this.store[key] || null;
    },
    setItem: function(key: string, value: string) {
      this.store[key] = value.toString();
    },
    removeItem: function(key: string) {
      delete this.store[key];
    },
    clear: function() {
      this.store = {};
    },
    key: function(index: number) {
      return Object.keys(this.store)[index] || null;
    },
    get length() {
      return Object.keys(this.store).length;
    }
  };

  // Mock de window.localStorage - assign directly
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true
  });
}
