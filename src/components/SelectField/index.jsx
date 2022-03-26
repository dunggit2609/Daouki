import React, { useEffect, useState  } from 'react';
import PropTypes from 'prop-types';
import { Select } from '@mui/material';
import { MenuItem } from '@material-ui/core';

SelectField.propTypes = {
    handleChangeValue: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired
};

function SelectField(props) {
    const { value, handleChangeValue, list } = props
    const [val, setVal] = useState(value ? value : '')
    useEffect(() => {
        if (!handleChangeValue) {
            return
        }
        handleChangeValue(val)
    }, [val, handleChangeValue])


    return (
        <Select
            value={val}
            onChange={(event) => setVal(event.target.value)}
            className="select"
            fullWidth
        >
            {
                list.map((i) => < MenuItem value={i.value} key={i.value}>{i.label} </MenuItem>)
            }

        </Select>
    );
}

export default SelectField;