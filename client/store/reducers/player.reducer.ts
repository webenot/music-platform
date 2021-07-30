import { TPlayerAction, EPlayerActions, IPlayerState } from 'types/player.type';

const initialState: IPlayerState = {
  active: null,
  volume: 50,
  duration: 0,
  currentTime: 0,
  pause: true,
};

export const playerReducer = (state = initialState, action: TPlayerAction): IPlayerState => {
  switch (action.type) {
    case EPlayerActions.PLAY:
      return {
        ...state,
        pause: false,
      };
    case EPlayerActions.PAUSE:
      return {
        ...state,
        pause: true,
      };
    case EPlayerActions.SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
        duration: 0,
        currentTime: 0,
      };
    case EPlayerActions.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload,
      };
    case EPlayerActions.SET_DURATION:
      return {
        ...state,
        duration: action.payload,
      };
    case EPlayerActions.SET_VOLUME:
      return {
        ...state,
        volume: action.payload,
      };
    default: return state;
  }
};
