// Get date in format month date,year hour:minute am/pm e.g. Mar 25, 2024, 10:35 PM
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

// Get dependent dropdown

const getFilteredDropdownOptions = (id, optionsArray, filterType) => {
  let filteredOptionsArray = [];
  if (filterType == "country") {
    filteredOptionsArray = optionsArray.filter((option) => {
      return option.fkCountryId == id;
    });
  } else if (filterType == "state") {
    filteredOptionsArray = optionsArray.filter((option) => {
      return option.fkStateId == id;
    });
  }
  return filteredOptionsArray;
};

const toTitleCase = (str)  => {
  if (!str || !/[a-zA-Z]/.test(str)) {
      return "";
  }

  return str.toLowerCase().replace(/\b\w/g, function(char) {
      return char.toUpperCase();
  });
}

export { getDateFormatted, getFilteredDropdownOptions, toTitleCase };
