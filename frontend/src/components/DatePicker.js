import { React } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ResponsiveDatePicker({ dateInput, setDateInput }) {
  const handleChangeDate = (date) => {
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
        renderInput={(params) => (
          <TextField {...params} style={{ background: "white" }} />
        )}
      />
    </LocalizationProvider>
  );
}
