import React, { FC, ReactElement } from 'react';
import { Grid, Box } from '@material-ui/core';

import { ITrack } from 'pages/tracks/types/track.type';
import { TrackItem } from 'components/TrackItem';
import { useTypedSelector } from 'hooks/useTypedSelector';

type TProps = {
  children?: never;
  tracks: ITrack[];
}

export const TrackList: FC<TProps> = ({ tracks }: TProps): ReactElement => {

  const { active } = useTypedSelector(state => state.player);

  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map(track => (
          <TrackItem
            key={`track-${track._id}`}
            track={track}
            active={active?._id.toString() === track._id.toString()}
          />
        ))}
      </Box>
    </Grid>
  );
};
