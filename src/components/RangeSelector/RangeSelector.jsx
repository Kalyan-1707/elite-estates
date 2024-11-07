import React, { useState } from 'react';
import { Slider, Typography, Box, FormControl } from '@mui/material';


function RangeSelector({label,name,  marks, min, max, step, formatFunc, value, setValue}) {
 
  return (
    <FormControl sx={{ minWidth: 120, width: '90%' }}>
     <Typography sx={{ color: '#5A556BC9' }}>
        {label}
      </Typography>
      {/* <Typography>Min: {formatCurrency(priceRange[0])}</Typography>
      <Typography>Max: {formatCurrency(priceRange[1])}</Typography> */}
      <Slider
        value={value}
        onChange={setValue}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        step={step}
        name={name}
        valueLabelFormat={formatFunc}
        marks={marks}
      />
    </FormControl>
  );
}

export default RangeSelector;
