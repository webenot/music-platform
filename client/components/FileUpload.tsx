import React, { ChangeEvent, FC, MutableRefObject, ReactElement, ReactNode, useCallback, useRef } from 'react';

import styles from '@Styles/FileUpload.module.sass';

type TProps = {
  children: ReactNode;
  setFile: Function;
  accept: string;
  file: File | null;
}

export const FileUpload: FC<TProps> = ({
  file,
  setFile,
  accept,
  children,
}: TProps): ReactElement => {

  const ref = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  const fileChangeHandle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setFile(e.target.files[0]);
  }, []);

  return (
    <div
      onClick={() => ref.current?.click()}
    >
      <input
        ref={ref}
        type="file"
        accept={accept}
        className={styles.file__input}
        onChange={fileChangeHandle}
      />
      {children}
      <div>{file?.name}</div>
    </div>
  );
};
