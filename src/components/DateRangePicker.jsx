import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar } from "react-icons/ai";

const DateRangePicker = ({today, startDate, setStartDate, endDate, setEndDate}) => {


  return (
    <div className="w-full flex justify-start items-center">
      <label className="ml-3">Start:</label>
      <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            if (endDate && date >= endDate) {
              setEndDate(null);
            }
          }}
          minDate={today}
          dateFormat="MMM d"
          className="p-3 w-28 shadow-sm focus:outline-none focus:ring-0 text-md h-10 oultine-none border-none mr-0"
        />
        <AiOutlineCalendar className='mr-5 text-black' />

      <label>End:</label>
      <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          minDate={startDate}
          disabled={!startDate}
          dateFormat="MMM d"
          className="p-3 w-28 shadow-sm focus:outline-none focus:ring-0 text-md disabled:opacity-50 h-10 oultine-none mr-0"
        />
        <AiOutlineCalendar className="text-black" />
    </div>
  );
};

export default DateRangePicker;