import React, { FC, ReactElement, useCallback, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { MainLayout } from 'layouts/MainLayout';
import { StepWrapper } from 'components/StepWrapper';
import { TrackUploadForm } from 'components/TrackUploadForm';
import { FileUpload } from 'components/FileUpload';

const CreateTrack: FC = (): ReactElement => {

  const [ activeStep, setActiveStep ] = useState<number>(0);
  const [ picture, setPicture ] = useState<File | null>(null);
  const [ audio, setAudio ] = useState<File | null>(null);

  const nextHandler = useCallback(() => {
    if (activeStep < 2) {
      setActiveStep((prevState: number) => prevState + 1);
    }
  }, [ activeStep ]);

  const backHandler = useCallback(() => {
    if (activeStep) {
      setActiveStep((prevState: number) => prevState - 1);
    }
  }, [ activeStep ]);

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <TrackUploadForm />
        )}
        {activeStep === 1 && (
          <FileUpload
            setFile={setPicture}
            accept="image/*"
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
        >{activeStep >= 2 ? 'Finish' : 'Next'}</Button>
      </Grid>
    </MainLayout>
  );
};

export default CreateTrack;
