import React, { ChangeEvent, FC, ReactElement } from 'react';

import styles from '@Styles/TrackProgress.module.sass';

type TProps = {
  children?: never;
  left: number;
  right: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TrackProgress: FC<TProps> = ({
  left,
  right,
  onChange,
}: TProps): ReactElement => (
  <div className={styles.progress}>
    <input
      type="range"
      onChange={onChange}
      min={left}
      max={right}
      value={left}
    />
    <div>{left} / {right}</div>
  </div>
);
