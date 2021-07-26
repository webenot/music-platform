import { combineReducers } from 'redux';

import { playerReducer } from 'store/reducers/player.reducer';

export const rootReducer = combineReducers({ player: playerReducer });

export type TRootState = ReturnType<typeof rootReducer>;
