import { Button } from "@mui/material";
const SubmitButton = (props) => {
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      margin="normal"
      type="submit"
      disabled={props.disabled}
    >
      {props.text}
    </Button>
  );
};

export default SubmitButton;
