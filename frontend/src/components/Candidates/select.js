import { FormControl } from '@material-ui/core'
import { InputLabel, MenuItem, Select as MuiSelect } from '@mui/material'
import React from 'react'

export default function SelectBox(props) {
    const { name, label, value, onChange } = props
    return (
        <div>
            {/* <FormControl>
                <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    // label={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                > */}
                    {/* <MenuItem value=""> </MenuItem> */}
                    {/* <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>
            </FormControl> */}

            <FormControl variant='standard'>
                                <InputLabel id="demo-simple-select-error-label">{label}</InputLabel>
                                <MuiSelect
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name={name}
                                    value={value}
                                    onChange={onChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </MuiSelect>
                            </FormControl>

        </div>
    )
}
