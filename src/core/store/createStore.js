export const createStore = (
  initialState
) => {

  let state = initialState;

  const listeners = new Set();

  const getState = () => state;

  const setState = (partial) => {

    state = {
      ...state,
      ...partial
    };

    listeners.forEach(l => l(state));
  };

  const subscribe = (listener) => {

    listeners.add(listener);

    return () =>
      listeners.delete(listener);
  };

  return {
    getState,
    setState,
    subscribe
  };
};