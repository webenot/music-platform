import React, { ChangeEvent, FC, MouseEvent, ReactElement } from 'react';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Grid, IconButton } from '@material-ui/core';

import styles from '@Styles/AudioPlayer.module.sass';

import { ITrack } from 'pages/tracks/types';

import { TrackProgress } from 'components/TrackProgress';

type TProps = {
  children?: never;
}

export const AudioPlayer: FC<TProps> = (): ReactElement => {
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
  const active = false;
  return (
    <div className={styles.player}>
      <IconButton
        onClick={(e: MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
      >
        {active ? (
          <PauseIcon />
        ) : (
          <PlayArrowIcon />
        )}
      </IconButton>
      <Grid
        className={styles.player__content}
        container
        direction="column"
      >
        <div>{track.name}</div>
        <div className={styles.player__artist}>{track.artist}</div>
      </Grid>
      <TrackProgress left={0} right={100} onChange={(e: ChangeEvent<HTMLInputElement>) => {}} />
      <div className={styles.player__volume}>
        <VolumeUpIcon />
        <TrackProgress left={0} right={100} onChange={(e: ChangeEvent<HTMLInputElement>) => {}} />
      </div>
    </div>
  );
};
