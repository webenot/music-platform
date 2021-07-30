import { ETracksActions, ITrackState, TTracksAction } from 'pages/tracks/types/track.type';

const initialState: ITrackState = {
  tracks: [],
  error: '',
};

export const trackReducer = (state = initialState, action: TTracksAction): ITrackState => {
  switch (action.type) {
    case ETracksActions.FETCH_TRACKS:
      return {
        ...state,
        tracks: action.payload,
        error: '',
      };
    case ETracksActions.FETCH_TRACKS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
