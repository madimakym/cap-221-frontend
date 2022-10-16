// Token
export const loadTokenState = () => {
  try {
    const serializedState = localStorage.getItem("token");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveTokenState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("token", serializedState);
  } catch (error) {}
};

export const removeTokenState = () => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.log("error:", error);
  }
};
