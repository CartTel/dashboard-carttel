import React, { useState } from "react";

interface CalendarProps {
  onDateSelect?: (date: Date) => void; // Optional callback to handle date selection
    className?: string;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, className }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysOfWeek: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get the first and last days of the current month
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const daysInMonth: number[] = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => i + 1
  );

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(date);
    if (onDateSelect) onDateSelect(date);
  };

  // Fill empty days at the start of the month
  const leadingEmptyDays: null[] = Array(startOfMonth.getDay()).fill(null);

  return (
    <div className={`calendar-container  ${className}`}>
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>{"<"}</button>
        <h2>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={handleNextMonth}>{">"}</button>
      </div>
      <div className="calendar-days">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
        {leadingEmptyDays.map((_, index) => (
          <div key={index} className="empty"></div>
        ))}
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`day ${
              selectedDate?.getDate() === day &&
              selectedDate?.getMonth() === currentDate.getMonth()
                ? "selected"
                : ""
            }`}
            onClick={() => handleDateSelect(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
