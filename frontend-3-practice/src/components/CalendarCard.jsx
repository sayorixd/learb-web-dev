import { useState } from "react";
import { today } from "../data";

function compareDates(a, b) {
  const d1 = new Date(a.year, a.month, a.day);
  const d2 = new Date(b.year, b.month, b.day);
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = offset - 1; i >= 0; i--) {
    cells.push({ day: prevMonthLastDay - i, otherMonth: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false });
  }
  const totalCells = Math.ceil(cells.length / 7) * 7;
  let nextDay = 1;
  while (cells.length < totalCells) {
    cells.push({ day: nextDay, otherMonth: true });
    nextDay++;
  }

  return cells;
}

export default function CalendarCard({
  selectedMonth,
  selectedYear,
  handleSelectDay,
  handleSelectMonth,
}) {
  const cells = buildCalendarGrid(selectedYear, selectedMonth);
  const todayCellId = cells.findIndex((cell) => cell.day === today.getDate());

  const [activeCellId, setActiveCellId] = useState(todayCellId);

  let formattedMonthYear = new Date(selectedYear, selectedMonth)
    .toLocaleString("ru-RU", { month: "long", year: "numeric" })
    .replace(/^./, (l) => l.toUpperCase());

  function handleClick(cellId) {
    console.log("click");
    setActiveCellId(cellId);
    handleSelectDay(cells[cellId]);
  }

  function handleSelectPrevMonth() {
    if (selectedMonth === 0) {
      handleSelectMonth(11, selectedYear - 1);
    } else {
      handleSelectMonth(selectedMonth - 1, selectedYear);
    }
    setActiveCellId(undefined);
  }
  function handleSelectNextMonth() {
    if (selectedMonth === 11) {
      handleSelectMonth(0, selectedYear + 1);
    } else {
      handleSelectMonth(selectedMonth + 1, selectedYear);
    }
    setActiveCellId(undefined);
  }

  return (
    <div className="calendar-card">
      <div className="month-display">
        <span className="month-year-label">{formattedMonthYear}</span>
        <div className="month-display-buttons">
          <button className="arrow-button" onClick={handleSelectPrevMonth}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="arrow-button" onClick={handleSelectNextMonth}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="weekday-display">
        <p>Пн</p>
        <p>Вт</p>
        <p>Ср</p>
        <p>Чт</p>
        <p>Пт</p>
        <p>Сб</p>
        <p>Вс</p>
      </div>

      <div className="calendar-grid">
        {cells.map((cell, id) => {
          const isDisabled =
            compareDates(
              { year: selectedYear, month: selectedMonth, day: cell.day },
              {
                year: today.getFullYear(),
                month: today.getMonth(),
                day: today.getDate(),
              },
            ) < 0 || cell.otherMonth;
          
          return (
            <div
              key={id}
              className={`calendar-day ${isDisabled ? "disabled" : id === activeCellId && "active"}`}
              onClick={isDisabled || activeCellId === id ? undefined : () => handleClick(id)}
            >
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
