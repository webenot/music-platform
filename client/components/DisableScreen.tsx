import React, { FC, ReactElement } from 'react';
import { CircularProgress } from '@material-ui/core';

import styles from '@Styles/DisableScreen.module.sass';

type TProps = {
  children?: never;
}

export const DisableScreen: FC<TProps> = (): ReactElement => (
  <div className={styles.disable}>
    <CircularProgress color="inherit" />
  </div>
);
