function getISOWeek(weekDay, w, y = new Date().getFullYear()) {
  const d = new Date(y, 0, 4);
  d.setDate(d.getDate() - (d.getDay() || 7) + weekDay + 7 * w);
  return d;
}

export function getWeekDay(offset) {
  const today = new Date(); // Get the current date
  const januaryFourth = new Date(today.getFullYear(), 0, 4); // January 4th of the current year
  const dayOfYear =
    (today - new Date(today.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24) + 1;
  const currentWeek = Math.ceil((dayOfYear + januaryFourth.getDay() - 12) / 7);

  return getISOWeek(offset, currentWeek);
}

const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

export const days = [
  { dayIndex: 1, weekDay: getWeekDay(2).toLocaleDateString("fr-FR", options) },
  { dayIndex: 2, weekDay: getWeekDay(3).toLocaleDateString("fr-FR", options) },
  { dayIndex: 3, weekDay: getWeekDay(4).toLocaleDateString("fr-FR", options) },
  { dayIndex: 4, weekDay: getWeekDay(5).toLocaleDateString("fr-FR", options) },
  { dayIndex: 5, weekDay: getWeekDay(6).toLocaleDateString("fr-FR", options) },
  { dayIndex: 6, weekDay: getWeekDay(7).toLocaleDateString("fr-FR", options) },
];

export function checkAvailability(currentHourIndex, currentDayIndex, data) {
  const exists = data.filter(
    (item) =>
      item.hourIndex === currentHourIndex && item.dayIndex === currentDayIndex
  );
  return exists;
}
