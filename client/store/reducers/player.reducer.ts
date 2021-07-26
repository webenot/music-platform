import { HYDRATE } from 'next-redux-wrapper';

import { TPlayerAction, TPlayerActions, IPlayerState } from 'types/player.type';

const initialState: IPlayerState = {
  active: null,
  volume: 50,
  duration: 0,
  currentTime: 0,
  pause: true,
};

export const playerReducer = (state = initialState, action: TPlayerAction): IPlayerState => {
  switch (action.type) {
    case TPlayerActions.PLAY:
      return {
        ...state,
        pause: false,
      };
    case TPlayerActions.PAUSE:
      return {
        ...state,
        pause: true,
      };
    case TPlayerActions.SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
        duration: 0,
        currentTime: 0,
      };
    case TPlayerActions.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload,
      };
    case TPlayerActions.SET_DURATION:
      return {
        ...state,
        duration: action.payload,
      };
    case TPlayerActions.SET_VOLUME:
      return {
        ...state,
        volume: action.payload,
      };
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    default: return state;
  }
};
