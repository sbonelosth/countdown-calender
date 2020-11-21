let today = new Date();
let current_month = today.getMonth();
let current_year = today.getFullYear();
let select_year = document.getElementById("year");
let select_month = document.getElementById("month");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let month_year_dom = document.querySelector("#month-year");
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
        for ( let j = 0; j < 7; j++ ) {
            if ( i === 0 && j < first_day ) {
                let cell = document.createElement("td");
                let cell_txt = document.createTextNode("");
                cell.appendChild(cell_txt);
                row.appendChild(cell);
            }
			
            else if ( date > month_days ) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cell_txt = document.createTextNode(date);
				
                // Color today's date.
                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cell.classList.add("today-bg"); 
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
