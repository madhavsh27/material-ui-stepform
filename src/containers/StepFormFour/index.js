/* eslint-disable react/prop-types */
import * as React from "react";
import { Checkbox, Container, FormControlLabel, Grid } from "@mui/material";
import FooterSection from "../../components/StepFormControlSection";

export default function StepFormFour(props) {
  const [checked, setChecked] = React.useState([
    props.formData.checkedTnC || false,
    false,
  ]);

  //handles form on change events when Tnc checkbox checked/UnChecked
  const onHandleChange = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  //handles submit functionality when use clicks on Submit button
  const handleOnSubmit = async () => {
    let stepFourData = {
      checkedTnC: checked[0],
    };
    if (checked[0]) {
      //compileFormData will store this step info in parent page state
      props.compileFormData(stepFourData);
      props.handleNext();
    }
  };

  //It Renders final form data in dom
  const confirmDetailsChip = (key) => {
    if (
      key !== "password" &&
      key !== "confirmPwd" &&
      key !== "checkedTnC" &&
      key !== "recordObj" &&
      key !== "audioBinary"
    ) {
      return (
        <Grid item xl={12} lg={12} xs={12} sm={12} sx={{}}>
          <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
          <span>{props.formData[`${key}`]}</span>
        </Grid>
      );
    } else if (key === "recordObj" && props?.formData?.recordObj) {
      return (
        <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
          {props?.formData?.recordObj && (
            <audio
              id="audio"
              controls
              src={
                props?.formData?.recordObj
                  ? props?.formData?.recordObj.url
                  : null
              }
            ></audio>
          )}
        </Grid>
      );
    } else return <></>;
  };

  //component mount time method(Like componentDidMount() method of class)
  React.useEffect(()=>{
    console.log("Final Form Data",props.formData)
  },[])

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Grid
          container
          spacing={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {props?.formData &&
            Object.keys(props.formData).map((key) => (
              <div key={key}>{confirmDetailsChip(key)}</div>
            ))}
        </Grid>

        <Grid item xs={12} sm={12} sx={{ mt: 3, ml: 0 }}>
          <FormControlLabel
            label="Please Accept Terms and Conditions"
            control={
              <Checkbox checked={checked[0]} onChange={onHandleChange} />
            }
          />
        </Grid>
      </Container>

      <React.Fragment>
        <FooterSection
          submitBtn={() => handleOnSubmit()}
          submitBtnDisabled={!checked[0]}
          backBtnDisabled={props.activeStep === 0}
          btnName="SUBMIT"
          {...props}
        />
      </React.Fragment>
    </>
  );
}
