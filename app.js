"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Enter the attribute you would like to search by (name, eye color, height, weight, gender, occupation, relatives, DOB): ", validText).toLowerCase();
  let searchResults;
  let person;
  let personIndex;
  switch(searchType){
    case 'name':
      searchResults = searchByName(people);
      displayPerson(searchResults);
      person = searchResults;
      break;
    case 'eye color':
      searchResults = searchByEyeColor(people);
      displayPeople(searchResults);
      personIndex = promptFor("Enter a number to view further details: ", validNum) - 1;
      if(personIndex == searchResults.length){
        app(searchResults);
      }
      else{
        person = searchResults[personIndex]
      }
      break;
    case 'height':
      searchResults = searchByHeight(people);
      displayPeople(searchResults);
      personIndex = promptFor("Enter a number to view further details: ", validNum) - 1;
      if(personIndex == searchResults.length){
        app(searchResults);
      }
      else{
        person = searchResults[personIndex]
      }
      break;
    case 'weight':
      searchResults = searchByWeight(people);
      displayPeople(searchResults);
      personIndex = promptFor("Enter a number to view further details: ", validNum) - 1;
      if(personIndex == searchResults.length){
        app(searchResults);
      }
      else{
        person = searchResults[personIndex]
      }
      break;
    case 'dob':
      searchResults = searchByDob(people);
      displayPeople(searchResults);
      personIndex = promptFor("Enter a number to view further details: ", validNum) - 1;
      if(personIndex == searchResults.length){
        app(searchResults);
      }
      else{
        person = searchResults[personIndex]
      }
      break;
    case 'occupation':
      searchResults = searchByOccupation(people);
      displayPeople(searchResults);
      personIndex = promptFor("Enter a number to view further details: ", validNum) - 1;
      if(personIndex == searchResults.length){
        app(searchResults);
      }
      else{
        person = searchResults[personIndex]
      }
      break;
    case 'gender':
      searchResults = searchByGender(people);
      displayPeople(searchResults);
      personIndex = promptFor("Enter a number to view further details: ", validNum) - 1;
      if(personIndex == searchResults.length){
        app(searchResults);
      }
      else{
        person = searchResults[personIndex]
      }
      break;
    case 'relative':
      searchResults = searchByRelative(people);
      displayPeople(searchResults);
      personIndex = promptFor("Enter a number to view further details: ", validNum) - 1;
      if(personIndex == searchResults.length){
        app(searchResults);
      }
      else{
        person = searchResults[personIndex]
      }
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  
  mainMenu(person, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  
  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", validText);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", validText);
  let lastName = promptFor("What is the person's last name?", validText);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })

  // TODO: find the person single person object using the name they entered.
  return foundPerson[0];
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColor = promptFor("Enter eye color for search: ", validText);

  let foundPeople = people.filter(function(potentialMatch){
    return potentialMatch.eyeColor === eyeColor;
  })
  return foundPeople;
}

function searchByHeight(people){
  let height = promptFor("Enter height for search: ", validNum);

  let foundPeople = people.filter(function(potentialMatch){
    return potentialMatch.height == height;
  })
  return foundPeople;
}

function searchByGender(people){
  let gender = promptFor("Enter gender for search: ", validGender);

  let foundPeople = people.filter(function(potentialMatch){
    return potentialMatch.gender === gender;
  })
  return foundPeople;
}

function searchByDob(people){
  let dob = promptFor("Enter date of birth for search (mm/dd/yyyy): ", validDate);

  let foundPeople = people.filter(function(potentialMatch){
    return potentialMatch.dob == dob;
  })
  return foundPeople;
}

function searchByWeight(people){
  let weight = promptFor("Enter weight for search: ", validNum);

  let foundPeople = people.filter(function(potentialMatch){
    return potentialMatch.weight == weight;
  })
  return foundPeople;
}

function searchByOccupation(people){
  let occupation = promptFor("Enter occupation for search: ", validText);

  let foundPeople = people.filter(function(potentialMatch){
    return potentialMatch.occupation === occupation;
  })
  return foundPeople;
}

function searchByRelative(people){
  let relativeFirstName = promptFor("Enter first name of relative for search: ", validText);
  let relativeLastName = promptFor("Enter Last name of relative for search: ", validText);
  let foundRelative = people.filter(function(potentialMatch){
    return potentialMatch.firstName === relativeFirstName && potentialMatch.lastName === relativeLastName;
  })
  let foundPeople = people.filter(function(potentialMatch){
    return potentialMatch.currentSpouse == foundRelative.id || potentialMatch.parents.includes(foundRelative.id);
  })
  return foundPeople;
}




//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  let n = 0;
  alert(people.map(function(person){
    n ++;
    return n + ". " + person.firstName + " " + person.lastName;
  }).join("\n")+"\n" + (n + 1) + ". Filter this list by addition trait");
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, validator){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = validator(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

function validNum(input){
  if(isNaN(input)){
    return false;
  }
  else{
    return true;
  }
}

function validGender(input){
  if(input.toLowerCase() == "female" || input.toLowerCase() == "male"){
    return true;
  }
  else{
    return false;
  }
}

function validText(input){
  if(input.length >= 1){
    return true;
  }
  else{
    return false;
  }
}

function validDate(input){
  let date = Date.parse(input);
  if(isNaN(date)){
    return false;
  }
  else{
    return true;
  }
}






// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion