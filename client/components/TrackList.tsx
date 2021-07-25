import React, { FC, ReactElement } from 'react';
import { Grid, Box } from '@material-ui/core';

import { ITrack } from 'pages/tracks/types';
import { TrackItem } from 'components/TrackItem';

type TProps = {
  children?: never;
  tracks: ITrack[];
}

export const TrackList: FC<TProps> = ({ tracks }: TProps): ReactElement => (
  <Grid container direction="column">
    <Box p={2}>
      {tracks.map(track => (
        <TrackItem
          key={`track-${track._id}`}
          track={track}
          active={true}
        />
      ))}
    </Box>
  </Grid>
);
