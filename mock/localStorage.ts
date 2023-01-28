const getMockLocalStorage = () => {
  const store = new Map<string, string>();

  return {
    getItem(key: string) {
      return store.get(key);
    },

    setItem(key: string, value: string) {
      store.set(key, value);
    },
  };
};

export default getMockLocalStorage();
