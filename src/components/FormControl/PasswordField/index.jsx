import {
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import PropTypes from "prop-types";
import { React, useState } from "react";
import { Controller } from "react-hook-form";

//handle password field, không dùng chung với input field 
//vì field này là mật khẩu nên sẽ có nút ẩn hiện 

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasError = errors[name];
  const [showPassword, setshowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setshowPassword((preValue) => !preValue);
  };

  return (
    <div>
      <FormControl margin="normal" fullWidth variant="outlined" error={!!hasError}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Controller
          name={name}
          control={form.control}
          as={OutlinedInput}
          disabled={disabled}
          error={!!hasError}
          id={name}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
        <FormHelperText error={!!hasError}>
          {errors[name]?.message}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default PasswordField;
