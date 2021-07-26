import React, { ChangeEvent, FC, ReactElement, useCallback, useEffect } from 'react';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Grid, IconButton } from '@material-ui/core';

import styles from '@Styles/AudioPlayer.module.sass';

import { ITrack } from 'pages/tracks/types';

import { TrackProgress } from 'components/TrackProgress';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useActions } from 'hooks/useActions';

type TProps = {
  children?: never;
}

let audio: any;

export const AudioPlayer: FC<TProps> | null = (): ReactElement | null => {
  const track: ITrack = {
    _id: '3',
    name: 'Track 3',
    artist: 'Artist 3',
    text: 'Text 3',
    picture: 'http://localhost:4500/image/0f8fc5b5-a7db-489c-a0a6-a81cb6e64a0f.gif',
    audio: 'http://localhost:4500/audio/2af80cbf-5306-4095-a4c8-4038daea5781.mp4',
    listens: 3,
    comments: [],
  };

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
      audio.src = active.audio;
      audio.load();
      audio.volume = 0.5;
      audio.currentTime = 0;
      audio.onloadedmetadata = () => setDuration(Math.ceil(audio.duration) || 0);
      audio.play();
    }
  }, [ active ]);

  useEffect(() => {
    if (!audio) {
      audio = new Audio(track.audio);
      audio.ontimeupdate = () => setCurrentTime(Math.ceil(audio.currentTime) || 0);
    }
    setAudio();
    playTrack();
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
