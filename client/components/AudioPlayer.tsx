import React, { ChangeEvent, FC, ReactElement, useCallback, useEffect } from 'react';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Grid, IconButton } from '@material-ui/core';

import styles from '@Styles/AudioPlayer.module.sass';

import { TrackProgress } from 'components/TrackProgress';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useActions } from 'hooks/useActions';

type TProps = {
  children?: never;
}

let audio: any;

export const AudioPlayer: FC<TProps> | null = (): ReactElement | null => {

  const {
    pause,
    active,
    volume,
    duration,
    currentTime,
  } = useTypedSelector(state => state.player);

  const {
    pauseTrack,
    playTrack,
    setVolume,
    setCurrentTime,
    setDuration,
  } = useActions();

  const setAudio = useCallback(() => {
    if (audio && active) {
      audio.pause();
      pauseTrack();
      audio.src = `http://localhost:4500/${active.audio}`;
      audio.load();
      audio.volume = 0.5;
      audio.currentTime = 0;
      audio.onloadedmetadata = () => setDuration(Math.ceil(audio.duration) || 0);
    }
  }, [ active ]);

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
      audio.ontimeupdate = () => setCurrentTime(Math.ceil(audio.currentTime) || 0);
    }
    setAudio();
  }, [ active ]);

  const playHandler = useCallback(() => {
    if (pause) {
      playTrack();
      audio?.play();
    } else {
      pauseTrack();
      audio?.pause();
    }
  }, [ pause ]);

  const changeVolumeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const volume = Number(e.target.value);
    setVolume(volume);
    if (audio) {
      audio.volume = volume / 100;
    }
  }, []);

  const changeProgressHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const currentTime = Number(e.target.value);
    setCurrentTime(currentTime);
    if (audio) {
      audio.currentTime = currentTime;
    }
  }, []);

  if (!active) return null;

  return (
    <div className={styles.player}>
      <IconButton
        onClick={playHandler}
      >
        {pause ? (
          <PlayArrowIcon />
        ) : (
          <PauseIcon />
        )}
      </IconButton>
      <Grid
        className={styles.player__content}
        container
        direction="column"
      >
        <div>{active?.name}</div>
        <div className={styles.player__artist}>{active?.artist}</div>
      </Grid>
      <TrackProgress left={currentTime} right={duration} onChange={changeProgressHandler} />
      <div className={styles.player__volume}>
        <VolumeUpIcon />
        <TrackProgress left={volume} right={100} onChange={changeVolumeHandler} />
      </div>
    </div>
  );
};
