export const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date();
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dayNumber = date.getDate();
  let year = date.getFullYear();

  return `${day}, ${month} ${dayNumber}, ${year}`;
};
