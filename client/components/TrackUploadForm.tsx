import React, { FC, ReactElement } from 'react';
import { Grid, TextField } from '@material-ui/core';

import styles from '@Styles/TrackUploadForm.module.sass';

import { useInput } from 'hooks/useInput';

type TProps = {
  children?: never;
}

export const TrackUploadForm: FC<TProps> = (): ReactElement => {

  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');

  return (
    <Grid container direction="column">
      <TextField
        {...name}
        label="Track name"
        className={styles.form__input}
      />
      <TextField
        {...artist}
        label="Artist name"
        className={styles.form__input}
      />
      <TextField
        {...text}
        className={styles.form__input}
        label="Track text"
        multiline
        rows={3}
      />
    </Grid>
  );
};
