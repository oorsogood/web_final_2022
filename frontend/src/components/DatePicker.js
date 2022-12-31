import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ResponsiveDatePicker({ date, setDate }) {
  const [value, setValue] = useState();
  const [dateValue, setDateValue] = useState();

  const handleChangeDate = (date) => {
    setValue(date);
    // console.log("date", date, "test", date.$y, date.$M + 1, date.$D);
    setDateValue({ Year: date.$y, Month: date.$M + 1, Date: date.$D });
    // console.log("dateValue", dateValue);
  };

  useEffect(() => {
    console.log("final", dateValue);
  }, [dateValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        inputFormat="YYYY/MM/DD"
        label="Date"
        openTo="year"
        views={["year", "month", "day"]}
        value={value}
        onChange={handleChangeDate}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
