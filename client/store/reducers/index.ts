import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { playerReducer } from 'store/reducers/player.reducer';

const rootReducer = combineReducers({ player: playerReducer });

export type TRootState = ReturnType<typeof rootReducer>;

export const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};