// src/redux/store.js
import { createStore } from 'redux';

const initialState = {
  event: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EVENT':
      return {
        ...state,
        event: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
