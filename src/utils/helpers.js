const getDateFormatted = (dateString) => {
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const date = new Date(dateString);

  const istOffset = 5.5 * 60 * 60 * 1000; 
  date.setTime(date.getTime() + istOffset);

  const formattedDate = date.toLocaleDateString("en-US", options);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;

  return `${formattedDate}, ${formattedTime}`;
};
export { getDateFormatted };
