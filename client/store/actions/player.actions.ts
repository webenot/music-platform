import { TPlayerAction, EPlayerActions } from 'types/player.type';
import { ITrack } from 'pages/tracks/types/track.type';

export const playTrack = (): TPlayerAction => ({ type: EPlayerActions.PLAY });

export const pauseTrack = (): TPlayerAction => ({ type: EPlayerActions.PAUSE });

export const setActiveTrack = (payload: ITrack): TPlayerAction =>
  ({ type: EPlayerActions.SET_ACTIVE, payload });

export const setDuration = (payload: number): TPlayerAction =>
  ({ type: EPlayerActions.SET_DURATION, payload });

export const setCurrentTime = (payload: number): TPlayerAction =>
  ({ type: EPlayerActions.SET_CURRENT_TIME, payload });

export const setVolume = (payload: number): TPlayerAction =>
  ({ type: EPlayerActions.SET_VOLUME, payload });
