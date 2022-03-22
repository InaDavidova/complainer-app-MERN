import validator from "validator";

export default function inputValidator(userInput) {
  console.log(userInput);
  const errorsData = {};
  const serialNoRgx = /^[a-zA-Z\d]{5}-[a-zA-Z\d]{6}$/gm;

  if (userInput.laptopType === "-- select an option --") {
    errorsData.laptopType = "Please select a laptop type!";
  }

  if (userInput.issue === "-- select an option --") {
    errorsData.issue = "Please select a laptop type!";
  }

  if (!userInput.notes) {
    errorsData.notes = "Please add some notes describing the problem!";
  }

  if (serialNoRgx.exec(userInput.serialNo) === null) {
    errorsData.serialNo = "Please add a valid serial number! Example: 3rD7a-pO9iu";
  }

  if (!userInput.date) {
    errorsData.date = "Please enter the date this problem occured!";
  }

  if (!userInput.name) {
    errorsData.name = "Please enter your name!";
    
  } else if (userInput.name.length > 40) {
    errorsData.name = "Name can not be more than 40 characters!";
  }
    
  if (!validator.isEmail(userInput.email)) {
    errorsData.email = "Please enter a valid email!";
  }

  return errorsData;
}
