import { IHydrate } from 'types/hydrate.type';

export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  text: string;
  picture: string;
  audio: string;
  listens: number;
  comments: IComment[];
}

export interface IComment {
  _id: string;
  track: string;
  username: string;
  text: string;
}

export interface ITrackState {
  tracks: ITrack[];
  error: string;
}

export enum ETracksActions {
  FETCH_TRACKS = 'FETCH_TRACKS',
  FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}

interface IFetchTracksAction {
  type: ETracksActions.FETCH_TRACKS;
  payload: ITrack[];
}

interface IFetchTracksErrorAction {
  type: ETracksActions.FETCH_TRACKS_ERROR;
  payload: string;
}

export type TTracksAction =
  | IFetchTracksAction
  | IFetchTracksErrorAction
  | IHydrate;
