import React, { FC, ReactElement, ReactNode } from 'react';
import { Container, Stepper, Step, StepLabel, Grid, Card, Box } from '@material-ui/core';

import styles from '@Styles/create.module.sass';

type TProps = {
  children: ReactNode;
  activeStep: number;
}

const steps = [ 'Track info', 'Picture uploading', 'Track uploading' ];

export const StepWrapper: FC<TProps> = ({
  activeStep,
  children,
}: TProps): ReactElement => (
  <Container>
    <Stepper activeStep={activeStep}>
      {steps.map((step, index) => (
        <Step
          key={`step-${index}`}
          completed={activeStep > index}
        >
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
    <Grid container justifyContent="center" className={styles.upload}>
      <Card className={styles.upload__card}>
        <Box p={2}>{children}</Box>
      </Card>
    </Grid>
  </Container>
);
