export const getSessionStorageValue = (key) => {
  try {
    const JsonData = localStorage.getItem(key);
    if (JsonData) {
      return JSON.parse(JsonData);
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const getSessionAuthData = (key, defaultValue) => {
  return getSessionStorageValue(key) || defaultValue;
};

export const setSessionData = (key, data) => {
  try {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  } catch (error) {}
};
