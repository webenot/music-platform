import React from 'react';
import { useRouter } from 'next/router';
import { Grid, Card, Button, Box } from '@material-ui/core';

import { MainLayout } from 'layouts/MainLayout';
import { ITrack } from 'pages/tracks/types';
import { TrackList } from 'components/TrackList';

const Tracks = () => {
  const router = useRouter();

  const tracks: ITrack[] = [
    {
      _id: '1',
      name: 'Track 1',
      artist: 'Artist 1',
      text: 'Text 1',
      picture: 'http://localhost:4500/image/0f8fc5b5-a7db-489c-a0a6-a81cb6e64a0f.gif',
      audio: 'http://localhost:4500/audio/2af80cbf-5306-4095-a4c8-4038daea5781.mp4',
      listens: 1,
      comments: [],
    },
    {
      _id: '2',
      name: 'Track 2',
      artist: 'Artist 2',
      text: 'Text 2',
      picture: 'http://localhost:4500/image/0f8fc5b5-a7db-489c-a0a6-a81cb6e64a0f.gif',
      audio: 'http://localhost:4500/audio/2af80cbf-5306-4095-a4c8-4038daea5781.mp4',
      listens: 2,
      comments: [],
    },
    {
      _id: '3',
      name: 'Track 3',
      artist: 'Artist 3',
      text: 'Text 3',
      picture: 'http://localhost:4500/image/0f8fc5b5-a7db-489c-a0a6-a81cb6e64a0f.gif',
      audio: 'http://localhost:4500/audio/2af80cbf-5306-4095-a4c8-4038daea5781.mp4',
      listens: 3,
      comments: [],
    },
  ];

  return (
    <MainLayout>
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
