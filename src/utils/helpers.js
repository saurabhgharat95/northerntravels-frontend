// Get date in format month date,year hour:minute am/pm e.g. Mar 25, 2024, 10:35 PM
const getDateFormatted = (dateString) => {
  if (dateString) {
    if (dateString.includes(".000Z")) {
      dateString = dateString.replace(".000Z", "");
    }
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long", // 'long' for full month name
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // To get AM/PM
    };

    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  }
  return "N.A.";
  // if (dateString) {
  //   const givenTime = new Date(dateString);

  //   // Define hours and minutes to add
  //   const hoursToAdd = 5; // 5 hours
  //   const minutesToAdd = 30; // 30 minutes

  //   // Create a new Date object to avoid modifying the original
  //   const newTime = new Date(givenTime);

  //   // Add hours and minutes
  //   givenTime.setHours(newTime.getHours() + hoursToAdd);
  //   givenTime.setMinutes(newTime.getMinutes() + minutesToAdd);
  //   const options = { year: "numeric", month: "short", day: "2-digit" };
  //   const date = newTime;
  //   console.log("data", date);
  //   // const istOffset = 5.5 * 60 * 60 * 1000;
  //   // date.setTime(date.getTime() + istOffset);

  //   const formattedDate = date.toLocaleDateString("en-US", options);

  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();
  //   const period = hours >= 12 ? "PM" : "AM";
  //   const formattedTime = `${hours % 12 || 12}:${minutes
  //     .toString()
  //     .padStart(2, "0")} ${period}`;

  //   return `${formattedDate}, ${formattedTime}`;
  // } else {
  //   return "N.A.";
  // }
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

// Get dependent dropdown based on idArray
const getMultipleFilteredDropdownOptions = (
  idArray,
  optionsArray,
  filterType
) => {
  let filteredOptionsArray = [];
  if (filterType === "country") {
    filteredOptionsArray = optionsArray.filter((option) => {
      return idArray.includes(option.fkCountryId);
    });
  } else if (filterType === "state") {
    filteredOptionsArray = optionsArray.filter((option) => {
      return idArray.includes(option.fkStateId);
    });
  }
  return filteredOptionsArray;
};

// Convert string to titlecase
const toTitleCase = (str) => {
  if (!str || !/[a-zA-Z]/.test(str)) {
    return "";
  }

  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
};

// Convert date to Y-M-D format
const getDateFormattedForDB = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  // Format into yyyy-mm-dd
  const formattedDate = `${year}-${month}-${day}`;
  console.log("formattedDate", formattedDate);
  return formattedDate;
};

const getFormattedDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Format: YYYYMMDD_HHMMSS
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
};

// Function to create a filename with a date-time suffix
const createFilename = (baseName, extension) => {
  const timestamp = getFormattedDateTime();
  return `${baseName}_${timestamp}.${extension}`;
};

// Convert base64 string to blob
const base64ToBlob = (
  base64,
  contentType = "application/octet-stream",
  sliceSize = 512
) => {
  let base64WithPrefix = base64;
  let base64WithoutPrefix = base64WithPrefix.replace(
    /^data:image\/[a-zA-Z]+;base64,/,
    ""
  );
  console.log("base64WithoutPrefix", base64WithoutPrefix);
  const byteCharacters = atob(base64WithoutPrefix); // Decode Base64
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

// Convert base64 string to file
const base64ToFile = (base64, filename, contentType = "image/jpeg") => {
  console.log("blob", base64);
  if (!base64.includes(".jpeg")) {
    const blob = base64ToBlob(base64, contentType);
    return new File([blob], filename, { type: contentType });
  }
};

export {
  getDateFormatted,
  getFilteredDropdownOptions,
  getMultipleFilteredDropdownOptions,
  toTitleCase,
  getDateFormattedForDB,
  base64ToFile,
  createFilename,
};
