import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormGroup } from '@mui/material';
import { FormControlLabel } from '@material-ui/core';
import './styles.scss'
import { cloneDeep } from 'core/utils/common';


function CheckboxGroup(props) {
    const { value, handleChangeValue, list, direction, itemKey, labelAlign } = props
    const [val, setVal] = useState(value ? value : [])
    const isRow = direction === 'row'
    useEffect(() => {
        if (!handleChangeValue) {
            return
        }
        handleChangeValue(val, itemKey)
    }, [val])

    const handleChange = (value) => {
        const index = val.indexOf(value)

        if (index < 0) {
            setVal([...val, value])
            return
        }
        
        const dummy = cloneDeep(val)       
        dummy.splice(index, 1)

        setVal(dummy)
    }

    return (
        // <RadioGroup row={isRow} aria-label="gender" className='row-radio-buttons-group' name="row-radio-buttons-group" value={val} onChange={(event) => setVal(event.target.value)}>
        //     {
        //         list.map(item =>
        //             <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} labelPlacement={labelAlign}/>

        //         )
        //     }
        // </RadioGroup>
        <FormGroup row={isRow} className='row-checkbox-group'>
            {list && list.length > 0 && list.map((item) =>
                <FormControlLabel
                    key={item.value}
                    control={
                        <Checkbox value={item.value} onChange={(e) => handleChange(e.target.value)} name={item.label} />
                    }
                    label={item.label}
                    labelPlacement={labelAlign}
                />
            )}

        </FormGroup>

    );
}

export default CheckboxGroup;