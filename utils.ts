export function formattedDate(date: Date) {
  // return date as 09/11/2022
  // other times it returns 08/11/2022, 12:00:00 AM
  // which is why we call the .split at the end
  date.setHours(1, 0, 0, 0);
  return date.toLocaleDateString('en-US')
}