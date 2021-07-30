import { Dispatch } from 'react';

import { ETracksActions, ITrack, TTracksAction } from 'pages/tracks/types/track.type';

export const fetchTracks = () => async (dispatch: Dispatch<TTracksAction>) => {
  try {
    const response = await fetch('http://localhost:4500/tracks');
    const result: ITrack[] = await response.json();
    dispatch({
      type: ETracksActions.FETCH_TRACKS,
      payload: result,
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: ETracksActions.FETCH_TRACKS_ERROR,
      payload: e.message || 'Loading error',
    });
  }
};

export const searchTracks = (query = '') => async (dispatch: Dispatch<TTracksAction>) => {
  try {
    const response = await fetch(
      `http://localhost:4500/tracks/search?query=${encodeURIComponent(query)}`,
    );
    const result: ITrack[] = await response.json();
    dispatch({
      type: ETracksActions.FETCH_TRACKS,
      payload: result,
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: ETracksActions.FETCH_TRACKS_ERROR,
      payload: e.message || 'Loading error',
    });
  }
};
