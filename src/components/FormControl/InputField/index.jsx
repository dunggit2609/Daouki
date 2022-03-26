import { ErrorMessage } from "@hookform/error-message";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import './styles.scss'
//component này để nhập vào 1 field ,
//handle error => xem loginform hoặc registerform để biết cách sử dụng
InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled, placeholder, onChangeVal } = props;
  const { errors, formState } = form;
  const hasError = errors[name] && formState.touched;

  return (
    <div className="controller-container">
      <Controller

        placeholder={placeholder}
        fullWidth
        control={form.control}
        name={name}
        label={label}
        disabled={disabled}
        error={!!hasError}
        helperText={errors[name]?.message}
        variant="outlined"
        margin="normal"
        // as={<TextField />}
        render={({ onChange, onBlur, value, ref }) => (
          <TextField
            autoComplete="username"
            label={label}
            fullWidth
            variant="outlined"
            onChange={(event) => {
              const val = event.target.value
              onChange(val)
              if (!onChangeVal) {
                return
              }
              onChangeVal()
            }}
            onBlur={onBlur}
            value={value ? value : ''}
            inputRef={ref}
            error={!!hasError}
          />
        )}

      />
      <ErrorMessage errors={errors} name={name} render={({ message }) => <p className="err-msg">{message}</p>} />

    </div>

  );
}

export default InputField;
