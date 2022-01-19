/* eslint-disable react/prop-types */
import * as React from "react";
import { Grid, Container } from "@mui/material";
import FooterSection from "../../components/StepFormControlSection";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

export default function StepFormTwo(props) {
  const [recordState, setRecordState] = React.useState(null);
  const [audioData, setAudioData] = React.useState(props?.formData?.recordObj || null);
  const [showAudioPreview, setShowAudioPreview] = React.useState(props?.formData?.recordObj ? true : false);
  const [recordingState, setRecordingState] = React.useState(false);
  const [audioBinary, setAudioBinary] = React.useState(false);

  //start audio method
  const start = () => {
    setRecordState(RecordState.START);
    setShowAudioPreview(false);
    setRecordingState(true);
  };

  //stop audio method
  const stop = () => {
    setRecordState(RecordState.STOP);
    setRecordingState(false);
  };

  //audioData contains blob and blobUrl
  const onStop = async (audioData) => {
    setAudioData(audioData);
    setShowAudioPreview(true);
    const audioBinaryResponse = await readFileDataAsBase64(audioData)
    setAudioBinary(audioBinaryResponse)
  };

  //converts blob to binary
  function readFileDataAsBase64(e) {
    const file = e.blob;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.onerror = (err) => {
            reject(err);
        };
        reader.readAsDataURL(file);
    });
}

  //handles submit functionality
  const handleOnSubmit = async () => {
    let stepOneData = {
      recordObj: audioData,
      audioBinary:audioBinary
    };
    if (audioData) {
      //compileFormData will store this step info in parent page state
      props.compileFormData(stepOneData);
      props.handleNext();
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
              <AudioReactRecorder
                state={recordState}
                onStop={onStop}
                backgroundColor="rgb(255,255,255)"
                canvasHeight={recordingState ? 100 : 1}
              />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <div>
              {showAudioPreview  && (
                <audio
                  id="audio"
                  controls
                  src={audioData ? audioData.url : null}
                ></audio>
              )}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Button
                  variant="contained"
                  disabled={recordingState ? true : false}
                  onClick={start}
                  sx={{ mr: recordingState ? 5 : 0 }}
                >
                  Start Recording
                </Button>
                {recordingState && (
                  <Button variant="contained" disabled={false} onClick={stop}>
                    Stop
                  </Button>
                )}
              </Box>
            </div>
          </Grid>
        </Grid>
      </Container>

      <React.Fragment>
        <FooterSection
          submitBtn={() => handleOnSubmit()}
          submitBtnDisabled={audioData ? false : true}
          btnName="NEXT"
          {...props}
        />
      </React.Fragment>
    </>
  );
}
