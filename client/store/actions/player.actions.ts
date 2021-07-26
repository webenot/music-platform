import { TPlayerAction, TPlayerActions } from 'types/player.type';
import { ITrack } from 'pages/tracks/types';

export const playTrack = (): TPlayerAction => ({ type: TPlayerActions.PLAY });

export const pauseTrack = (): TPlayerAction => ({ type: TPlayerActions.PAUSE });

export const setActiveTrack = (payload: ITrack): TPlayerAction =>
  ({ type: TPlayerActions.SET_ACTIVE, payload });

export const setDuration = (payload: number): TPlayerAction =>
  ({ type: TPlayerActions.SET_DURATION, payload });

export const setCurrentTime = (payload: number): TPlayerAction =>
  ({ type: TPlayerActions.SET_CURRENT_TIME, payload });

export const setVolume = (payload: number): TPlayerAction =>
  ({ type: TPlayerActions.SET_VOLUME, payload });
