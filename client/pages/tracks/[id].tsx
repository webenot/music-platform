import React, { FC, ReactElement } from 'react';

import { MainLayout } from 'layouts/MainLayout';
import { ITrack } from 'pages/tracks/types';

type TProps = {
  children?: never;
}

const TrackDetails: FC<TProps> = (): ReactElement => {
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
      Track Page
    </MainLayout>
  );
};

export default TrackDetails;
