/* eslint-disable react/prop-types */
import * as React from "react";
import { Grid, TextField, Container } from "@mui/material";
import { validateForm } from "./validate";
import FooterSection from "../../components/StepFormControlSection";

export default function StepFormOne(props) {
  const [email, setEmail] = React.useState(props.formData.email || "");
  const [emailErr, setEmailErr] = React.useState(false);
  const [name, setName] = React.useState(props.formData.name || "");
  const [nameErr, setNameErr] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState(
    props.formData.phoneNumber || ""
  );
  const [phoneErr, setPhoneErr] = React.useState(false);

  //handles submit functionality when user clicks on next button.
  const handleOnSubmit = async () => {
    let stepOneData = {
      email,
      name,
      phoneNumber,
    };
    let validationCheck = await validateForm(stepOneData);
    setEmailErr(validationCheck.isEmailValid);
    setNameErr(validationCheck.isNameValid);
    setPhoneErr(validationCheck.isPhoneNumValid);
    if (
      !validationCheck.isEmailValid &&
      !validationCheck.isNameValid &&
      !validationCheck.isPhoneNumValid
    ) {
      //compileFormData will store this step info in parent page state
      props.compileFormData(stepOneData);
      props.handleNext();
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              label="Email"
              name="email"
              placeholder="Your email address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={emailErr}
              helperText={emailErr && "Invalid Email"}
              required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              label="Name"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              error={nameErr}
              helperText={nameErr && "Invalid Name"}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              placeholder="Your phone no."
              value={phoneNumber}
              type="number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              error={phoneErr}
              helperText={phoneErr && "Invalid Phone number"}
              required={true}
            />
          </Grid>
        </Grid>
      </Container>
      <React.Fragment>
        <FooterSection
          submitBtn={() => handleOnSubmit()}
          submitBtnDisabled={false}
          btnName="NEXT"
          {...props}
        />
      </React.Fragment>
    </>
  );
}
