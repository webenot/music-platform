import React, { FC, ReactElement } from 'react';

import styles from '@Styles/CommentItem.module.sass';

import { IComment } from 'pages/tracks/types/track.type';

type TProps = {
  children?: never;
  comment: IComment;
}

export const CommentItem: FC<TProps> = ({ comment }: TProps): ReactElement => (
  <div className={styles.comment}>
    <div className={styles.comment__author}>
      <span className={styles.comment__author__title}>Author:</span>
      <span>{comment.username}</span></div>
    <div className={styles.comment__text}>{comment.text}</div>
  </div>
);
