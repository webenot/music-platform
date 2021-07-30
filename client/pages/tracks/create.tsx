import React, { FC, ReactElement, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Grid, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import styles from '@Styles/create.module.sass';

import { MainLayout } from 'layouts/MainLayout';
import { StepWrapper } from 'components/StepWrapper';
import { FileUpload } from 'components/FileUpload';
import { DisableScreen } from 'components/DisableScreen';
import { useInput } from 'hooks/useInput';

const CreateTrack: FC = (): ReactElement => {

  const [ activeStep, setActiveStep ] = useState<number>(0);
  const [ picture, setPicture ] = useState<File | null>(null);
  const [ audio, setAudio ] = useState<File | null>(null);
  const [ uploading, setUploading ] = useState<boolean>(false);

  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');

  const router = useRouter();

  const nextHandler = useCallback(() => {
    if (activeStep < 2) {
      setActiveStep((prevState: number) => prevState + 1);
    } else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('artist', artist.value);
      formData.append('text', text.value);
      formData.append('picture', picture as Blob);
      formData.append('audio', audio as Blob);

      setUploading(true);

      fetch(
        'http://localhost:4500/tracks',
        {
          body: formData,
          method: 'POST',
        },
      )
        .then(response => response.json())
        .then(() => router.push('/tracks'))
        .catch(e => console.error(e))
        .finally(() => setUploading(false));
    }
  }, [ activeStep, name, artist, text, picture, audio ]);

  const backHandler = useCallback(() => {
    if (activeStep) {
      setActiveStep((prevState: number) => prevState - 1);
    }
  }, [ activeStep ]);

  return (
    <MainLayout>
      {uploading && (
        <DisableScreen />
      )}
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column">
            <TextField
              value={name.value}
              onChange={name.onChange}
              label="Track name"
              className={styles.form__input}
            />
            <TextField
              value={artist.value}
              onChange={artist.onChange}
              label="Artist name"
              className={styles.form__input}
            />
            <TextField
              value={text.value}
              onChange={text.onChange}
              className={styles.form__input}
              label="Track text"
              multiline
              rows={3}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload
            setFile={setPicture}
            accept="image/*"
            file={picture}
          >
            <Button
              type="button"
              variant="contained"
            >Upload picture</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload
            setFile={setAudio}
            accept="audio/*"
            file={audio}
          >
            <Button
              type="button"
              variant="contained"
            >Upload audio</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button
          type="button"
          onClick={backHandler}
          variant="contained"
          startIcon={(<ArrowBackIcon />)}
          disabled={activeStep === 0}
        >Back</Button>
        <Button
          type="button"
          onClick={nextHandler}
          variant="contained"
          endIcon={(<ArrowForwardIcon />)}
          disabled={
            (activeStep === 2 && (!name.value || !artist.value || !picture || !audio)) ||
            (activeStep === 2 && uploading)
          }
        >{activeStep >= 2 ? 'Finish' : 'Next'}</Button>
      </Grid>
    </MainLayout>
  );
};

export default CreateTrack;
