import { ITrack } from 'pages/tracks/types/track.type';
import { IHydrate } from 'types/hydrate.type';

export interface IPlayerState {
  active: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
}

export enum EPlayerActions {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  SET_ACTIVE = 'SET_ACTIVE',
  SET_DURATION = 'SET_DURATION',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_VOLUME = 'SET_VOLUME',
}

interface IPlayAction {
  type: EPlayerActions.PLAY;
}

interface IPauseAction {
  type: EPlayerActions.PAUSE;
}

interface ISetActiveAction {
  type: EPlayerActions.SET_ACTIVE;
  payload: ITrack;
}

interface ISetDurationAction {
  type: EPlayerActions.SET_DURATION;
  payload: number;
}

interface ISetCurrentTimeAction {
  type: EPlayerActions.SET_CURRENT_TIME;
  payload: number;
}

interface ISetVolumeAction {
  type: EPlayerActions.SET_VOLUME;
  payload: number;
}

export type TPlayerAction =
  | IPlayAction
  | IPauseAction
  | ISetActiveAction
  | ISetDurationAction
  | ISetCurrentTimeAction
  | ISetVolumeAction
  | IHydrate;
