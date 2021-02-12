let today = new Date();
let current_month = today.getMonth();
let current_year = today.getFullYear();
let select_year = document.getElementById("year");
let select_month = document.getElementById("month");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let month_year_dom = document.querySelector("#month-year");

// Calling the calendar function
showCalendar(current_month, current_year);

function next() {
  current_year = (current_month === 11) ? current_year + 1 : current_year;
  current_month = (current_month + 1) % 12;
  showCalendar(current_month, current_year);
}

function previous() {
  current_year = (current_month === 0) ? current_year - 1 : current_year;
  current_month = (current_month === 0) ? 11 : current_month - 1;
  showCalendar(current_month, current_year);
}

function jump() {
  current_year = parseInt(select_year.value);
  current_month = parseInt(select_month.value);
  showCalendar(current_month, current_year);
}

function showCalendar(month, year) {

  let first_day = (new Date(year, month)).getDay();
  let month_days = 32 - new Date(year, month, 32).getDate();

  // Body of the calendar.
  let tbl = document.getElementById("calendar-body");

  // Clearing all previous cells.
  tbl.innerHTML = "";

  // Filling data about month and year in the page via DOM.

  month_year_dom.innerHTML = "<span class='month'>" + months[month].toUpperCase() + "</span>" + " " + year;
  select_year.value = year;
  select_month.value = month;

  // Creating all cells.
  let date = 1;
  for (let i = 0; i < 6; i++) {

    // Creating a table row.
    let row = document.createElement("tr");

    // Creating individual cells & filling them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < first_day) {
        let cell = document.createElement("td");
        let cell_txt = document.createTextNode("");
        cell.appendChild(cell_txt);
        row.appendChild(cell);
      }
      else if (date > month_days) {
        break;
      }

      else {
        let cell = document.createElement("td");
        let cell_txt = document.createTextNode(date);

        // Color today's date and label events.
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          // January, February event labels.
          if (today.getDate() === 1 && today.getMonth() === 0) {
            document.querySelector(".event-label").innerHTML = "Happy New Year, Make It Count!";
          }
          else if (today.getDate() === 21 && today.getMonth() === 0) {
            document.querySelector(".event-label").innerHTML = "Happy Birthday, Rapsody!";
          }
          // February event labels.
          else if (today.getDate() === 14 && today.getMonth() === 1) {
            document.querySelector(".event-label").innerHTML = "Happy Valentine's Day!";
          }
          else if (today.getDate() === 23 && today.getMonth() === 1) {
            document.querySelector(".event-label").innerHTML = "Happy Birthday, Little Simz!";
          }
          // March event labels.
          else if (today.getDate() === 21 && today.getMonth() === 2) {
            document.querySelector(".event-label").innerHTML = "Happy Human Rights Day!";
          }
          else if (today.getDate() === 22 && today.getMonth() === 2 && today.getFullYear() === 2021) {
            document.querySelector(".event-label").innerHTML = "Human Rights Day observed!";
          }
          else if (today.getDate() === 31 && today.getMonth() === 2) {
            document.querySelector(".event-label").innerHTML = "The end of first quarter of the year!";
          }
          // April event labels.
          else if (today.getDate() === 2 && today.getMonth() === 3 && today.getFullYear() === 2021) {
            document.querySelector(".event-label").innerHTML = "Good Friday!";
          }
          else if (today.getDate() === 3 && today.getMonth() === 3 && today.getFullYear() === 2021) {
            document.querySelector(".event-label").innerHTML = "Holy Saturday!";
          }
          else if (today.getDate() === 4 && today.getMonth() === 3 && today.getFullYear() === 2021) {
            document.querySelector(".event-label").innerHTML = "Easter Sunday!";
          }
          else if (today.getDate() === 5 && today.getMonth() === 3 && today.getFullYear() === 2021) {
            document.querySelector(".event-label").innerHTML = "Happy Family Day, Make It Count!";
          }
          else if (today.getDate() === 27 && today.getMonth() === 2) {
            document.querySelector(".event-label").innerHTML = "Happy Freedom Day!";
          }
          // May event labels.
          else if (today.getDate() === 1 && today.getMonth() === 4) {
            document.querySelector(".event-label").innerHTML = "Worker's Day!";
          }
          else if (today.getDate() === 9 && today.getMonth() === 4 && today.getFullYear() === 2021) {
            document.querySelector(".event-label").innerHTML = "Happy Mother's Day!";
          }
          // June event labels.
          else if (today.getDate() === 16 && today.getMonth() === 5) {
            document.querySelector(".event-label").innerHTML = "Happy Youth Day!";
          }
          else if (today.getDate() === 20 && today.getMonth() === 5 && today.getFullYear() === 2021) {
            document.querySelector(".event-label").innerHTML = "Happy Father's Day!";
          }
          // July, August event labels.
          else if (today.getDate() === 9 && today.getMonth() === 7) {
            document.querySelector(".event-label").innerHTML = "Happy Women's Day!"
          }
          else if (today.getDate() === 9 && today.getMonth() === 7 && today.getFullYear() === 2021) {
            document.querySelector(".event-label").innerHTML = "National Women's Day observed!"
          }
          // December event labels.
          else if (today.getDate() === 16 && today.getMonth() === 11) {
            document.querySelector(".event-label").innerHTML = "A Day of Reconciliation!";
          }
          else if (today.getDate() === 25 && today.getMonth() === 11) {
            document.querySelector(".event-label").innerHTML = "Merry Christmas!";
          }
          else if (today.getDate() === 26 && today.getMonth() === 11) {
            document.querySelector(".event-label").innerHTML = "A Day of Goodwill!";
          }
          else if (today.getDate() === 31 && today.getMonth() === 11) {
            document.querySelector(".event-label").innerHTML = "Happy New Year's Eve!";
          }
          else {
            document.querySelector(".event-label").innerHTML = "Just another day!"
          }
          cell.classList.add("today-bg");
        }
        // January events.
        else if (date === 1 && month === 0) {
          cell.classList.add("new-year");
        }
        // February, March events
        else if (date === 21 && month === 2) {
          cell.classList.add("human-rights");
        }
        else if ((date === 14 && month === 1) || (date === 22 && month === 2 && year === 2021)) {
          cell.classList.add("observed");
        }
        // April events
        else if ((date === 2 || date === 3 || date === 4 || date === 5) && month === 3 && year === 2021) {
          cell.classList.add("event");
        }
        else if (date === 27 && month === 3) {
          cell.classList.add("event");
        }
        // May, June events.
        else if ((date === 1 && month === 4) || (date === 16 && month === 5)) {
          cell.classList.add('event');
        }
        // July, August, September events.
        else if ((date === 9 && month === 7) || (year === 2020 && date === 10 && month === 7) || (date === 24 && month === 8)) {
          cell.classList.add("event");
        }
        // December events
        else if (date === 25 && month === 11) {
          cell.classList.add("xmas");
        }
        else if ((date === 26 || date === 16) && month === 11) {
          cell.classList.add("event");
        }
        cell.appendChild(cell_txt);
        row.appendChild(cell);
        date++;
      }
    }
    // Finally, appending each row into calendar body.
    tbl.appendChild(row);

  }
}

//window.addEventListener('touchmove', swipe);

function swipe(event) {
  var
    hidden_div = document.querySelector('.hidden-div'),
    arr = [],
    arr2 = [];
    
  let x = event.touches[0].clientX;
  arr = [x];
  for (let i = 0; i < arr.length; i++) {
    hidden_div.innerHTML += arr + "<br>";
    arr2 = hidden_div.innerHTML.split('<br>');
    if (arr2.length < 10) {
      if (parseInt(arr2[0]) > 200 && parseInt(arr2[5]) < 150 && parseInt(arr2[5]) > 100) {
        next();
        break;
      }
      else { return false; }
    }
    else if (arr2.length > 10) {
      hidden_div.innerHTML = "";
    }
  }
  setTimeout(swipe, 1000);
}