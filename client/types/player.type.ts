import { ITrack } from 'pages/tracks/types';

export interface IPlayerState {
  active: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
}

export enum TPlayerActions {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  SET_ACTIVE = 'SET_ACTIVE',
  SET_DURATION = 'SET_DURATION',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_VOLUME = 'SET_VOLUME',
}

interface IPlayAction {
  type: TPlayerActions.PLAY;
}

interface IPauseAction {
  type: TPlayerActions.PAUSE;
}

interface ISetActiveAction {
  type: TPlayerActions.SET_ACTIVE;
  payload: ITrack;
}

interface ISetDurationAction {
  type: TPlayerActions.SET_DURATION;
  payload: number;
}

interface ISetCurrentTimeAction {
  type: TPlayerActions.SET_CURRENT_TIME;
  payload: number;
}

interface ISetVolumeAction {
  type: TPlayerActions.SET_VOLUME;
  payload: number;
}

export type TPlayerAction =
  | IPlayAction
  | IPauseAction
  | ISetActiveAction
  | ISetDurationAction
  | ISetCurrentTimeAction
  | ISetVolumeAction;
