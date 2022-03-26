import SelectField from "components/SelectField";
import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import RadioButtonGroup from "components/RadioGroup";

//component này để select 1 value từ danh sách field ,
//handle error => xem loginform hoặc registerform để biết cách sử dụng
RadioGroupForm.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function RadioGroupForm(props) {
    const { form, name, label, disabled, placeholder, list, onChangeSelected, direction } = props;
    const { errors, formState } = form;
    const hasError = errors[name] && formState.isSubmitted;
    const handleChangeSelected = () => {
        if (!onChangeSelected) {
            return
        }
        onChangeSelected()
    }
    return (
        <div>
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
                render={({ onChange, onBlur, value, ref }) => (
                    <RadioButtonGroup
                        handleChangeValue={(val) => {
                            onChange(val)
                            handleChangeSelected()
                        }}
                        onBlur={onBlur}
                        selected={value}
                        inputRef={ref}
                        list={list}
                        direction={direction}
                    />
                )}
            />
            <ErrorMessage errors={errors} name={name} render={({ message }) => <p className="err-msg">{message}</p>} />
        </div>

    );
}

export default RadioGroupForm;
