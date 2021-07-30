import React, { FC, ReactElement } from 'react';

import styles from '@Styles/CommentsList.module.sass';

import { IComment } from 'pages/tracks/types/track.type';
import { CommentItem } from 'components/CommentItem';

type TProps = {
  children?: never;
  comments: IComment[];
}

export const CommentsList: FC<TProps> = ({ comments }: TProps): ReactElement => (
  <div className={styles.comments__list}>
    {comments.map(comment => (
      <CommentItem
        key={`comment-${comment._id}`}
        comment={comment}
      />
    ))}
  </div>
);
