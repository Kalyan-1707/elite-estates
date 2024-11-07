import React from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SelectMenu({label, defaultValue, selectOptions, ...props}) {
    const [value, setValue] = React.useState(defaultValue);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
  return (
    <FormControl variant="standard" sx={{ minWidth: 120, width: '90%' }}>
    <InputLabel id={label +"-select-standard-label"}>{label}</InputLabel>
    <Select
      labelId={label+"-select-standard-label"}
      id={label+"-select-standard"}
      value={value}
      onChange={handleChange}
      label={label}
      {...props}
    >
      {selectOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  )
}

export default SelectMenu