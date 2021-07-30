import React, { FC, ReactElement, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Button, Grid, TextField, Divider } from '@material-ui/core';

import styles from '@Styles/[id].module.sass';

import { MainLayout } from 'layouts/MainLayout';
import { ITrack } from 'pages/tracks/types/track.type';

type TProps = {
  children?: never;
  serverTrack: ITrack;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const response = await fetch(`http://localhost:4500/tracks/${params.id}`);
  const result: ITrack = await response.json();
  console.log('track', result);

  return { props: { serverTrack: result } };
};

const TrackDetails: FC<TProps> = ({ serverTrack }: TProps): ReactElement => {

  const [ track ] = useState<ITrack>(serverTrack);

  const router = useRouter();

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
                src={`http://localhost:4500/${track.picture}`}
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
