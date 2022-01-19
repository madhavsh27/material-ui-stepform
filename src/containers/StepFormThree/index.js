/* eslint-disable react/prop-types */
import * as React from 'react';
import { Container, Grid, TextField } from '@mui/material';
import { validateForm } from './validate';
import FooterSection from '../../components/StepFormControlSection';
import '../../index.css';

export default function StepFormThree(props) {
  const [password, setPassword] = React.useState(
    props?.formData?.password || ''
  );
  const [passwordErr, setPasswordErr] = React.useState(false);
  const [confirmPwd, setConfirmPwd] = React.useState(
    props?.formData?.confirmPwd || ''
  );
  const [confirmPwdErr, setConfirmPwdErr] = React.useState(false);

  //handles submit functionality when user clicks on next button
  const handleOnSubmit = async () => {
    let stepTwoData = {
      password,
      confirmPwd,
    };
    let validationCheck = await validateForm(stepTwoData);
    setPasswordErr(validationCheck.isPasswordValid);
    setConfirmPwdErr(validationCheck.isConfirmPwdValid);
    if (
      !validationCheck.isPasswordValid &&
      !validationCheck.isConfirmPwdValid
    ) {
      //compileFormData will store this step info in parent page state
      props.compileFormData(stepTwoData);
      props.handleNext();
    }
  };

  return (
    <div className="password-section">
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Grid container spacing={2} sx={{ py: 5 }}>
          <form>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                label="Password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                error={passwordErr}
                helperText={
                  passwordErr && 'Password must be minimum 8 characters'
                }
                required={true}
                type="password"
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12} sm={12} sx={{ ml: 1 }}>
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                label="Confirm Password"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={confirmPwd}
                onChange={(e) => {
                  setConfirmPwd(e.target.value);
                }}
                error={confirmPwdErr}
                helperText={
                  confirmPwdErr && 'Password and Confirm password do not match'
                }
                required={true}
                type="password"
                autoComplete="new-password"
              />
            </Grid>
          </form>
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
    </div>
  );
}
