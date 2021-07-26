import React, { FC, ReactElement } from 'react';
import { Grid, TextField } from '@material-ui/core';

import styles from '@Styles/TrackUploadForm.module.sass';

type TProps = {
  children?: never;
}

export const TrackUploadForm: FC<TProps> = (): ReactElement => (
  <Grid container direction="column">
    <TextField
      label="Track name"
      className={styles.form__input}
    />
    <TextField
      label="Artist name"
      className={styles.form__input}
    />
    <TextField
      className={styles.form__input}
      label="Track text"
      multiline
      rows={3}
    />
  </Grid>
);
