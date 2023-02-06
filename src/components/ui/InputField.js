import { TextField } from "@mui/material";
const InputField = (props) => {
  return (
    <TextField
      fullWidth
      id={props.id}
      label={props.label}
      name={props.name}
      type={props.type || "text"}
      margin="normal"
      variant="standard"
      value={props.value}
      onChange={props.handleChange}
      error={props.touched && Boolean(props.error)}
      helperText={props.touched && props.error}
    />
  );
};

export default InputField;
