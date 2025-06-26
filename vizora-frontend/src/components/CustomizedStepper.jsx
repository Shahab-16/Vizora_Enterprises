import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const primaryPurple = "rgb(138,35,135)";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 20,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: primaryPurple,
      width: "100%",
      transitionProperty: "all",
      transitionDuration: "100ms",
      transitionTimingFunction: "ease-in-out",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: primaryPurple,
      width: "100%",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    width: "0%",
    transitionProperty: "all",
    transitionDuration: "100ms",
    transitionTimingFunction: "ease-in-out",
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    ownerState.completed || ownerState.active ? primaryPurple : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  transitionProperty: "all",
  transitionDuration: "300ms",
  transitionTimingFunction: "ease-in-out",
  boxShadow: ownerState.active ? "0 4px 10px 0 rgba(0,0,0,.25)" : "none",
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[700],
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;
  const icons = {
    1: <div>1</div>,
    2: <div>2</div>,
    3: <div>3</div>,
    4: <div>4</div>,
    5: <div>5</div>,
  };
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = [
  "Add your Home",
  "Floorplan details",
  "Choose plan",
  "Select add-ons",
  "Confirm purchase",
];
const CustomizedStepper = ({ activeStep, setActiveStep }) => {
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<ColorlibConnector />}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            onClick={() => setActiveStep(index)}
            StepIconComponent={ColorlibStepIcon}
          >
            <span className="text-xs font-medium">{label}</span>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
export default CustomizedStepper;
