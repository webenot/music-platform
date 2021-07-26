import React, { FC, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Button, Grid, TextField, Divider } from '@material-ui/core';

import styles from '@Styles/[id].module.sass';

import { MainLayout } from 'layouts/MainLayout';
import { ITrack } from 'pages/tracks/types';

type TProps = {
  children?: never;
}

const TrackDetails: FC<TProps> = (): ReactElement => {

  const router = useRouter();

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
  return (
    <MainLayout>
      <Button
        className={styles.button}
        type="button"
        variant="contained"
        onClick={() => router.push('/tracks')}
      >
        To Tracks List
      </Button>
      <div className={styles.track}>
        <Grid container className={styles.track__content}>
          {track.picture ? (
            <div>
              <img
                className={styles.track__image}
                src={track.picture}
                alt={track.name}
              />
            </div>
          ) : null}
          <div className={styles.track__content}>
            <h1>Track name - {track.name}</h1>
            <h1>Artist - {track.artist}</h1>
            <h1>Listens - {track.listens}</h1>
          </div>
        </Grid>
        <h1>Track text</h1>
        <div className={styles.track__text}>{track.text}</div>
      </div>
      <Divider />
      <div className={styles.comments}>
        <h1>Comments</h1>
        <Grid container>
          <TextField
            label="Your name"
            fullWidth
            className={styles.comments__input}
          />
          <TextField
            label="Comment"
            fullWidth
            multiline
            rows={4}
            className={styles.comments__input}
          />
          <Button type="button" variant="contained">Send</Button>
        </Grid>
        <div className={styles.comments__list}>
          {track.comments.map(comment => (
            <div
              key={`comment-${comment._id}`}
            >
              <div>Author - {comment.username}</div>
              <div>{comment.text}</div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default TrackDetails;
