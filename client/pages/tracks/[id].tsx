import React, { FC, ReactElement, useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { Button, Grid, TextField, Divider } from '@material-ui/core';

import styles from '@Styles/[id].module.sass';

import { MainLayout } from 'layouts/MainLayout';
import { IComment, ITrack } from 'pages/tracks/types/track.type';
import { useInput } from 'hooks/useInput';
import { CommentsList } from 'components/CommentsList';

type TProps = {
  children?: never;
  serverTrack: ITrack;
}

export const getServerSideProps: GetServerSideProps = async ({ params }: ParsedUrlQuery) => {

  try {
    const response = await fetch(`http://localhost:4500/tracks/${params.id}`);
    const result: ITrack = await response.json();
    return { props: { serverTrack: result } };
  } catch (e) {
    console.error(e);
    return { props: { serverTrack: {} } };
  }
};

const TrackDetails: FC<TProps> = ({ serverTrack }: TProps): ReactElement => {

  const [ track, setTrack ] = useState<ITrack>(serverTrack);
  const [ adding, setAdding ] = useState<boolean>(false);

  const router = useRouter();

  const username = useInput('');
  const text = useInput('');

  const addCommentHandler = useCallback(async () => {
    setAdding(true);
    try {
      const response = await fetch(
        'http://localhost:4500/tracks/comment',
        {
          body: JSON.stringify({
            username: username.value,
            text: text.value,
            track: track._id,
          }),
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const result: IComment = await response.json();
      setTrack({
        ...track,
        comments: [ ...track.comments, result ],
      });
      username.setValue('');
      text.setValue('');
    } catch (e) {
      console.error(e);
    }
    setAdding(false);
  }, [ username, text, track ]);

  return (
    <MainLayout title={track.name}>
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
            value={username.value}
            onChange={username.onChange}
            label="Your name"
            fullWidth
            className={styles.comments__input}
            disabled={adding}
          />
          <TextField
            value={text.value}
            onChange={text.onChange}
            label="Comment"
            fullWidth
            multiline
            rows={4}
            className={styles.comments__input}
            disabled={adding}
          />
          <Button
            type="button"
            variant="contained"
            disabled={adding || (!username.value || !text.value)}
            onClick={addCommentHandler}
          >Send</Button>
        </Grid>
        <CommentsList comments={track.comments} />
      </div>
    </MainLayout>
  );
};

export default TrackDetails;
