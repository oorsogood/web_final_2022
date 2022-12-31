import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ResponsiveDatePicker({ dateInput, setDateInput }) {
  // const [value, setValue] = useState();

  const handleChangeDate = (date) => {
    // setDateInput({ Year: date.$y, Month: date.$M + 1, Date: date.$D });
    setDateInput(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        inputFormat="YYYY/MM/DD"
        label="Date"
        openTo="year"
        views={["year", "month", "day"]}
        value={dateInput}
        onChange={handleChangeDate}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
