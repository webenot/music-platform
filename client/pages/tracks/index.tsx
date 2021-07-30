import React, { ChangeEvent, useCallback, useState } from 'react';
import { GetServerSidePropsResult } from 'next';
import { Store } from 'redux';
import { useRouter } from 'next/router';
import { Grid, Card, Button, Box, TextField } from '@material-ui/core';

import styles from '@Styles/tracks.module.sass';

import { MainLayout } from 'layouts/MainLayout';
import { TrackList } from 'components/TrackList';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { TNextThunkDispatch, wrapper } from 'store';
import { fetchTracks, searchTracks } from 'store/actions/tracks.actions';
import { TRootState } from 'store/reducers';
import { useDispatch } from 'react-redux';

export const getServerSideProps = wrapper.getServerSideProps(
  (store: Store<TRootState>): Promise<GetServerSidePropsResult<void>> => async () => {
    const dispatch = store.dispatch as TNextThunkDispatch;
    await dispatch(await fetchTracks());
  },
);

const Tracks = () => {

  const [ query, setQuery ] = useState<string>('');
  const [ timer, setTimer ] = useState(null);

  const router = useRouter();

  const {
    tracks,
    error,
  } = useTypedSelector(state => state.tracks);

  const dispatch = useDispatch() as TNextThunkDispatch;

  const searchChangeHandler = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(async () => {
      await dispatch(await searchTracks(e.target.value));
    }, 500));
  }, [ timer ]);

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Tracks List">
      <Grid container justifyContent="center">
        <Card className="card">
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Tracks List</h1>
              <Button type="button" onClick={() => router.push('/tracks/create')}>Upload</Button>
            </Grid>
          </Box>
          <TextField
            fullWidth
            value={query}
            onChange={searchChangeHandler}
            className={styles.search}
          />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Tracks;
