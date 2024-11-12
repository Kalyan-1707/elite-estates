import { MenuItem, Select } from '@mui/material';
import React, { useState } from 'react'
import LanguageIcon from "@mui/icons-material/Language";
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../slices/appSlice';

function LanguageSelect() {

    //get lanuage from redux
    const defaultLanguage = useSelector((state) => state.app.language);
    const [lang, setLang] = useState(defaultLanguage);
    const dispatch = useDispatch();

    const handleLanguageChange = (event) => {
        setLang(event.target.value)
        dispatch(setLanguage(event.target.value));
      };

    return (
        <Select
          IconComponent={LanguageIcon}
          sx={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            ".MuiOutlinedInput-input": { marginRight: "8px" },
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
          }}
          value={lang}
          onChange={handleLanguageChange}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">española</MenuItem>
        </Select>
      );
}

export default LanguageSelect