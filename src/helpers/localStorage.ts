export const saveToLocalStorage = (key: string, value: any) => {
  let newValue = value;
  if (typeof value !== "string") {
    newValue = JSON.stringify(value);
  }
  localStorage.setItem(key, newValue);
};

export const getFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (!value) {
    return null;
  }
  return JSON.parse(value);
};
