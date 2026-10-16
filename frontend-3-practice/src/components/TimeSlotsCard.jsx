import { useState } from "react";
import { RESERVATIONS } from "../data";

function getSelectableTimeSlots(year, month, day) {
  const dayOfWeek = new Date(year, month, day).getDay();
  if (dayOfWeek === 6 || dayOfWeek === 0) {
    // если Сб или Вс
    return [
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
    ];
  } else {
    // если с Пн по Пт
    return [
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
    ];
  }
}

export default function TimeSlotsCard({
  selectedDay,
  selectedMonth,
  selectedYear,
  handleSelectTime,
}) {
  const [activeTimeSlotId, setActiveTimeSlotId] = useState();

  let content;

  if (!selectedDay) {
    content = (
      <p className="time-slots-fallback-msg">
        Выберите день <br /> записи
      </p>
    );
  } else {
    const formattedDate = `${selectedDay}-${selectedMonth + 1}-${selectedYear}`;
    const timeSlots = getSelectableTimeSlots(
      selectedYear,
      selectedMonth,
      selectedDay,
    );
    const selectedDayReservations = RESERVATIONS.find(
      ({ date }) => date === formattedDate,
    );
    const reservedTimeSlots = selectedDayReservations
      ? selectedDayReservations.reservedTimeSlots
      : [];
    
    function handleClick(timeSlotId) {
      setActiveTimeSlotId(timeSlotId);
      handleSelectTime(timeSlots[timeSlotId]);
    }

    content = (
      <>
        {timeSlots.map((timeSlot, id) => {
          const isDisabled = reservedTimeSlots.includes(timeSlot);
          return (
            <div
              key={timeSlot}
              className={`time-slots-item ${isDisabled ? "disabled" : activeTimeSlotId === id && "active"}`}
              onClick={isDisabled || activeTimeSlotId === id ? undefined : () => handleClick(id)}
            >
              {timeSlot}
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="time-slots-card">
      <div className="time-slots-title">Доступное время</div>
      <div className="time-slots-grid">{content}</div>
    </div>
  );
}
