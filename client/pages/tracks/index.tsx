import React from 'react';
import { GetServerSidePropsResult } from 'next';
import { Store } from 'redux';
import { useRouter } from 'next/router';
import { Grid, Card, Button, Box } from '@material-ui/core';

import { MainLayout } from 'layouts/MainLayout';
import { TrackList } from 'components/TrackList';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { TNextThunkDispatch, wrapper } from 'store';
import { fetchTracks } from 'store/actions/tracks.actions';
import { TRootState } from 'store/reducers';

export const getServerSideProps = wrapper.getServerSideProps(
  (store: Store<TRootState>): Promise<GetServerSidePropsResult<void>> => async () => {
    const dispatch = store.dispatch as TNextThunkDispatch;
    await dispatch(await fetchTracks());
  },
);

const Tracks = () => {
  const router = useRouter();

  const {
    tracks,
    error,
  } = useTypedSelector(state => state.tracks);

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
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Tracks;
