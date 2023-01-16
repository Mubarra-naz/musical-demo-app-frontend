import { Button } from "@mui/material";
const SubmitButton = (props) => {
  return (
    <Button
      fullWidth
      variant="contained"
      color="secondary"
      margin="normal"
      type="submit"
      disabled={props.disabled}
    >
      {props.text}
    </Button>
  );
};

export default SubmitButton;
