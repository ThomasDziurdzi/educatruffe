const event = new Date(Date.now());
const fullDate = event.toLocaleDateString("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  //   second: "2-digit",
});
export const todayDate = fullDate.replace(" à ", " ");

export function dateCompare(date1, date2) {
  return new Date(date2) > new Date(date1);
}

// mapped item's date format :
// item.date.concat(" ", item.hour),
