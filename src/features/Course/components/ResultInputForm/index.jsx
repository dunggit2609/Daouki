import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Radio } from '@material-ui/core';
import './styles.scss'
import { useEffect } from 'react';
import { cloneDeep } from 'core/utils/common';
import RadioButtonGroup from 'components/RadioGroup';
import CheckboxGroup from 'components/CheckboxGroup/CheckboxGroup';
ResultInputForm.propTypes = {

};

function ResultInputForm(props) {
    const { amount, multiple, onChange } = props
    const [answer, setAnswer] = useState({})
    const [value, setValue] = useState('')
    const handleChangeItem = (value, key) => {
        if (!key) {
            return
        }
        const dummy = cloneDeep(answer)
        
        dummy[key] = value
        setAnswer(dummy)


        if (!onChange) {
            return
        }
        onChange([dummy])
    }
    const options = [
        {
            label: 'A',
            value: 'A'
        },
        {
            label: 'B',
            value: 'B'
        },
        {
            label: 'C',
            value: 'C'
        },
        {
            label: 'D',
            value: 'D'
        },
    ]
    useEffect(() => {
        if (amount < 1) {
            return
        }

        const dummy = {}

        for (let i = 1; i <= amount; i++) {
            dummy[i] = '';
        }
        setAnswer(dummy)
    }, [amount])
    return (
        <div>

            {
                answer &&
                Object.keys(answer).map((item) =>

                    <div key={item}>
                        <Grid container spacing={2}>
                            <Grid item xs={2} className='row-item-input-from-ui'>
                                <div className='question-no'>
                                    {item}.
                                </div>
                            </Grid>
                            <Grid item xs={10} className='row-item-input-from-ui'>
                                {multiple ? <CheckboxGroup itemKey={item} value={answer[item]} list={options} handleChangeValue={handleChangeItem} direction='row' labelAlign='start' /> :
                                    <RadioButtonGroup itemKey={item} value={answer[item]} list={options} handleChangeValue={handleChangeItem} direction='row' labelAlign='start' />

                                }

                            </Grid>
                        </Grid>
                    </div>


                )
            }
        </div>
    );
}

export default ResultInputForm;