import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import StepFormOne from "../../containers/StepFormOne";
import StepFormTwo from "../../containers/StepFormTwo";
import StepFormThree from "../../containers/StepFormThree";
import StepFormFour from "../../containers/StepFormFour";
import { Container } from "@mui/material";
import "./index.css";

const steps = ["STEP1", "STEP2", "STEP3", "STEP4"];

export default function StepperLandingPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});

  const compileFormData = (data) => {
    let setData = { ...formData, ...data };
    setFormData(setData);
  };

  //Handles next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  //Handles previous step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <StepFormOne
            // <StepFormTwo
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            compileFormData={compileFormData}
            formData={formData}
          />
        );
      case 1:
        return (
          <StepFormTwo
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            compileFormData={compileFormData}
            formData={formData}
          />
        );
      case 2:
        return (
          <StepFormThree
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            compileFormData={compileFormData}
            formData={formData}
          />
        );
      case 3:
        return (
          <StepFormFour
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            compileFormData={compileFormData}
            formData={formData}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: "#ffffff", boxShadow: 2 }}>
      <Box sx={{ width: 1, mt: 10, py: 2 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Container maxWidth="sm" sx={{ mb: 10, mt: 6 }}>
              <Typography sx={{ mt: 0, mb: 1 }}>
                All steps completed - your details submitted successfully.
              </Typography>
            </Container>
          </React.Fragment>
        ) : (
          <React.Fragment>{handleSteps(activeStep)}</React.Fragment>
        )}
      </Box>
    </Container>
  );
}
