import { useState, useEffect } from "react";
import CalendarCard from "./CalendarCard";
import TimeSlotsCard from "./TimeSlotsCard";
import { today } from "../data";

export default function Calendar({ setTimeOutput, setModalText }) {
  const [{ selectedMonth, selectedYear }, setSelectedMonthYear] = useState({
    selectedMonth: today.getMonth(),
    selectedYear: today.getFullYear(),
  });
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState("");

  function handleSelectDay(cell) {
    setSelectedDay(cell.day);
    setSelectedTime(undefined);
  }
  function handleSelectMonth(month, year) {
    setSelectedMonthYear({ selectedMonth: month, selectedYear: year });
    setSelectedDay(undefined);
    setSelectedTime(undefined);
  }
  function handleSelectTime(time) {
    setSelectedTime(time);

    const date = new Date(
      selectedYear,
      selectedMonth,
      selectedDay,
      ...time.split(":").map(Number),
    );

    setTimeOutput(
      date
        .toLocaleString("ru-RU", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
        })
        .replace(/^./, (l) => l.toUpperCase())
        .replace(" в ", " • "),
    );

    const formattedDate = date.toLocaleString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    setModalText(`Вы записаны на ${formattedDate}`);
  }

  useEffect(() => {
    if (!selectedTime || selectedTime == "") {
      setTimeOutput("");
      return;
    }

    const timeOutput = new Date(
      selectedYear,
      selectedMonth,
      selectedDay,
      ...selectedTime.split(":").map(Number),
    )
      .toLocaleString("ru-RU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      })
      .replace(/^./, (l) => l.toUpperCase())
      .replace(" в ", " • ");

    setTimeOutput((<><b>Выбранное время:&nbsp; &nbsp; &nbsp; &nbsp; </b>{timeOutput}</>));
  }, [selectedYear, selectedMonth, selectedDay, selectedTime, setTimeOutput]);

  return (
    <div className="calendar">
      <CalendarCard
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        handleSelectDay={handleSelectDay}
        handleSelectMonth={handleSelectMonth}
      />
      <TimeSlotsCard
        key={selectedDay}
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        handleSelectTime={handleSelectTime}
      />
    </div>
  );
}
