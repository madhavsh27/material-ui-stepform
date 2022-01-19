/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

export default function StepFormControlSection(props) {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={props.activeStep === 0}
          onClick={props.handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          disabled={props.submitBtnDisabled}
          onClick={() => props.submitBtn()}
        >
          {props.btnName}
        </Button>
      </Box>
    </React.Fragment>
  );
}
