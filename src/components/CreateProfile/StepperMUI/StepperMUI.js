import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, useParams } from 'react-router-dom';
import BasicProfile from '../BasicProfile/BasicProfile';
import AdvancedProfile from '../AdvancedProfile/AdvancedProfile';
import CareerProfile from '../CareerProfile/CareerProfile';
import BioProfile from '../BioProfile/BioProfile';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Basic Profile', 'Advanced Prfoile', 'Career Profile', 'Bio'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicProfile />;
    case 1:
      return <AdvancedProfile />;
    case 2:
      return <CareerProfile />;
    case 3:
      return <BioProfile />;
    default:
      return 'Unknown step';
  }
}

export default function StepperMUI() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps();
  const { formId } = useParams();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleComplete = () => {
  //   const newCompleted = completed;
  //   newCompleted[activeStep] = true;
  //   setCompleted(newCompleted);
  //   handleNext();
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  //   setCompleted({});
  // };

  return (
    <div className={classes.root}>
      <Stepper
        nonLinear
        activeStep={
          formId === `basicProfile`
            ? 0
            : formId === `advancedProfile`
            ? 1
            : formId === 'careerProfile'
            ? 2
            : formId === `bioProfile`
            ? 3
            : undefined
          // activeStep
        }
      >
        {steps.map((label, index, id) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              // completed={completed[index]}
            >
              {index === 0 && (
                <Link to="/createProfile/basicProfile">{label}</Link>
              )}
              {index === 1 && (
                <Link to="/createProfile/careerProfile">{label}</Link>
              )}
              {index === 2 && (
                <Link to="/createProfile/advancedProfile">{label}</Link>
              )}
              {index === 3 && (
                <Link to="/createProfile/bioProfile">{label}</Link>
              )}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {/* <div>
        <Typography className={classes.instructions}>
          {getStepContent(activeStep)}
        </Typography>
      </div> */}
      {/* <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}
                  >
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}
