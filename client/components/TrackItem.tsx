import React, { FC, ReactElement, MouseEvent, useCallback } from 'react';
import { Card, Grid, IconButton } from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from '@Styles/TrackItem.module.sass';

import { ITrack } from 'pages/tracks/types/track.type';
import { useRouter } from 'next/router';
import { useActions } from 'hooks/useActions';
import { useDispatch } from 'react-redux';
import { fetchTracks } from 'store/actions/tracks.actions';
import { TNextThunkDispatch } from 'store';

type TProps = {
  children?: never;
  track: ITrack;
  active?: boolean;
}

export const TrackItem: FC<TProps> = ({
  track,
  active = false,
}: TProps): ReactElement => {

  const router = useRouter();

  const { setActiveTrack } = useActions();

  const dispatch = useDispatch() as TNextThunkDispatch;

  const playClickHandle = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!active) {
      setActiveTrack(track);
    }
  }, [ active ]);

  const deleteTrackHandler = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!confirm('Do you really want to delete this track?')) return false;
    try {
      await fetch(
        `http://localhost:4500/tracks/${track._id}`,
        { method: 'DELETE' },
      );
      dispatch(await fetchTracks());
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Card
      className={styles.track}
      onClick={() => router.push(`/tracks/${track._id}`)}
    >
      <IconButton
        onClick={playClickHandle}
      >
        {active ? (
          <PauseIcon />
        ) : (
          <PlayArrowIcon />
        )}
      </IconButton>
      {track.picture ? (
        <img
          src={`http://localhost:4500/${track.picture}`}
          alt={track.name}
        />
      ) : null}
      <Grid
        className={styles.track__content}
        container
        direction="column"
      >
        <div>{track.name}</div>
        <div className={styles.track__artist}>{track.artist}</div>
      </Grid>
      {active && (
        <div className={styles.track__time}>02:42 / 03:22</div>
      )}
      <IconButton
        className={styles.track__delete}
        onClick={deleteTrackHandler}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

TrackItem.defaultProps = { active: false };
