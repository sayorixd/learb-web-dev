// 1. ДАННЫЕ
import { RESERVATIONS } from "./data.js";

const today = new Date();

// 2. Состояние
const selectedTimeOutput = document.getElementsByClassName("selected-time-output")[0];
const monthYearLabel = document.getElementsByClassName("month-year-label")[0];
const calendarGrid = document.getElementsByClassName("calendar-grid")[0];
const calendarLeftArrowButton =
  document.getElementsByClassName("arrow-button")[0];
const calendarRightArrowButton =
  document.getElementsByClassName("arrow-button")[1];
let activeDayCell;

const timeSlotsGrid = document.getElementsByClassName("time-slots-grid")[0];
let activeTimeCell;

let selectedYear;
let selectedMonth;
let selectedDay;
let selectedTime;

// 3. Чистые функции
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

// 4. Отрисовка и обработчики
function updateMonthDisplay() {
  monthYearLabel.textContent = new Date(selectedYear, selectedMonth)
    .toLocaleString("ru-RU", { month: "long", year: "numeric" })
    .replace(/^./, (l) => l.toUpperCase());
  calendarGrid.innerHTML = "";

  const cells = buildCalendarGrid(selectedYear, selectedMonth);
  cells.forEach((cell) => {
    const dayCell = document.createElement("div");
    dayCell.classList = "calendar-day";
    dayCell.textContent = cell.day;

    const isSelectable =
      compareDates(
        { year: selectedYear, month: selectedMonth, day: cell.day },
        {
          year: today.getFullYear(),
          month: today.getMonth(),
          day: today.getDate(),
        },
      ) >= 0 && !cell.otherMonth;

    if (isSelectable) {
      dayCell.dataset.day = cell.day;
      dayCell.onclick = handleSelectDay;
    } else {
      dayCell.classList.add("disabled");
    }

    calendarGrid.appendChild(dayCell);
  });
}

function updateTimeSlotsDispay() {
  timeSlotsGrid.innerHTML = "";
  updateTimeOutput();
  if (!selectedDay) {
    const label = document.createElement("p");
    label.textContent = "Выберите день\r\nзаписи";
    label.classList.add("time-slots-fallback-msg");

    timeSlotsGrid.appendChild(label);
    return;
  }

  const selectedDayReservations = RESERVATIONS.find(
    ({ date }) =>
      date === `${selectedDay}-${selectedMonth + 1}-${selectedYear}`,
  );

  const reservedTimeSlots = selectedDayReservations
    ? selectedDayReservations.reservedTimeSlots
    : [];

  const timeSlots = getSelectableTimeSlots(
    selectedYear,
    selectedMonth,
    selectedDay,
  );
  timeSlots.forEach((timeSlot) => {
    const timeSlotItem = document.createElement("div");
    timeSlotItem.classList.add("time-slots-item");
    timeSlotItem.textContent = timeSlot;

    if (!reservedTimeSlots.includes(timeSlot)) {
      timeSlotItem.dataset.time = timeSlot;
      timeSlotItem.onclick = handleSelectTime;
    } else {
      timeSlotItem.classList.add("disabled");
    }

    timeSlotsGrid.appendChild(timeSlotItem);
  });
}

function handleLeftArrowClick() {
  if (selectedMonth === 0) {
    selectedMonth = 11;
    selectedYear--;
  } else {
    selectedMonth--;
  }
  updateMonthDisplay();
}
function handleRightArrowClick() {
  if (selectedMonth === 11) {
    selectedMonth = 0;
    selectedYear++;
  } else {
    selectedMonth++;
  }
  updateMonthDisplay();
}

function handleSelectDay(event) {
  const cell = event.currentTarget;
  if (activeDayCell === cell) {
    cell.classList.remove("active");
    activeDayCell = null;
    selectedDay = null;
    selectedTime = null;
    activeTimeCell = null;
    updateTimeSlotsDispay();
    return;
  } else if (activeDayCell) {
    activeDayCell.classList.remove("active");
  }
  cell.classList.add("active");
  activeDayCell = cell;
  selectedDay = cell.dataset.day;
  selectedTime = null;
  activeTimeCell = null;
  updateTimeSlotsDispay();
}

function handleSelectTime(event) {
  const time = event.currentTarget;
  if (activeTimeCell === time) {
    time.classList.remove("active");
    activeTimeCell = null;
    selectedTime = null;
    updateTimeOutput();
    return;
  } else if (activeTimeCell) {
    activeTimeCell.classList.remove("active");
  }
  time.classList.add("active");
  activeTimeCell = time;
  selectedTime = time.dataset.time;

  updateTimeOutput();
}
function updateTimeOutput() {
  if (!(selectedYear && selectedMonth && selectedDay && selectedTime)) {
    selectedTimeOutput.innerHTML = "";
    return;
  }

  const timeOutput = new Date(
    selectedYear,
    selectedMonth + 1,
    selectedDay,
    ...selectedTime.split(":").map(Number),
  );
  selectedTimeOutput.innerHTML =
    "<b>Выбранное время:</b>\xa0\xa0\xa0\xa0" +
    timeOutput
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
}

function addArrowClickHandlers() {
  calendarLeftArrowButton.addEventListener("click", handleLeftArrowClick);
  calendarRightArrowButton.addEventListener("click", handleRightArrowClick);
}

// 5. Инициализация
function init() {
  selectedYear = today.getFullYear();
  selectedMonth = today.getMonth();
  

  addArrowClickHandlers();
  updateMonthDisplay();
  updateTimeSlotsDispay();
}

document.addEventListener("DOMContentLoaded", init);
