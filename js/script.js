function modulo(num, denom) { if (num%denom >= 0) { return Math.abs(num%denom); } else { return num%denom + denom; } }

function clock() {
	var
	date = new Date(),
	current_year = date.getFullYear(),
	current_month	 = date.getMonth(),
	current_day = date.getDay(),
	current_hour = date.getHours(),
	current_min = date.getMinutes(),
	current_sec 	= date.getSeconds();
	
	let year_days = 367 - new Date(current_year, 0, 367).getDate();
	let mon_days = 32 - new Date(current_year, current_month, 32).getDate();
	
	// Constant variables
	var
	day_secs = 86400,
	year_secs = day_secs*year_days,
	month_secs = year_secs / 12,
	week_secs = 604800,
	year_weeks = year_secs / week_secs,
	hour_secs = 3600,
	min_secs = 60;	
	
	// Calcuting current year's progress and remaining time.
	var
	prog = Math.floor(date.getTime() / 1000) - Math.ceil(new Date(current_year-1, 11, 31).getTime() / 1000);
	rem = Math.ceil(year_secs - prog);
	
	var
	rem_days	 = Math.floor( rem / day_secs ),
	rem_weeks = Math.floor( rem / week_secs ),
	rem_hours = Math.floor( rem / hour_secs ),
	rem_minutes = Math.floor( rem / min_secs );
	
	let fmonth = 12 - Math.ceil(prog / month_secs);
	let fweeks = rem_weeks - 4*(fmonth);
	let fdays = rem_days - (7*rem_weeks);
	let fhours	= rem_hours - (24*rem_days);
	let fminutes	= rem_minutes - (60*rem_hours);
	let fseconds	= rem - (60*rem_minutes);
	
	// Strings for labels.
	let pmonths = "months";
	let smonths = "month";
	let pdays = "days ";
	let sdays = "day ";
	let pweeks = "weeks";
	let sweeks = "week";
	let phours = "hours";
	let shours = "hour";
	let pminutes = "minutes";
	let sminutes = "minute";
	let pseconds = "seconds";
	let sseconds = "second";
	
	// Assigning the DOM to variables.
	let rem_months_dom = document.querySelector(".rem-months");
	let rem_weeks_dom = document.querySelector(".rem-weeks");
	let rem_days_dom = document.querySelector(".rem-days");
	let rem_hours_dom = document.querySelector(".rem-hours");
	let rem_minutes_dom = document.querySelector(".rem-minutes");
	let rem_seconds_dom = document.querySelector(".rem-seconds");
	
	let rem_months_label 	= document.querySelector(".rem-months-label");
	let rem_weeks_label = document.querySelector(".rem-weeks-label");
	let rem_days_label = document.querySelector(".rem-days-label");
	let rem_hours_label = document.querySelector(".rem-hours-label");
	let rem_minutes_label = document.querySelector(".rem-minutes-label");
	let rem_seconds_label = document.querySelector(".rem-seconds-label");
	
	// Setting up conditions for displaying remaining time.
	if (fmonth > 0 && fweeks !== 0 && fdays !== 0) {
		rem_months_label.innerHTML = fmonth > 1 ? pmonths : smonths;
		rem_weeks_label.innerHTML = fweeks > 1 ? pweeks : sweeks;
		rem_days_label.innerHTML = fdays > 1 ? pdays : sdays;
	} 
	
	else if (fmonth > 0 && fweeks !== 0 && fdays === 0) {
		rem_months_label.innerHTML = fmonth > 1 ? pmonths : smonths;
		rem_weeks_label.innerHTML = fweeks > 1 ? pweeks : sweeks;
		rem_days_dom.style.display = "none";
		rem_days_label.style.display = "none";
	}
	
	else if (fmonth > 0 && fweeks === 0 && fdays !== 0) {
		rem_months_label.innerHTML = fmonth > 1 ? pmonths : smonths;
		rem_days_label.innerHTML = fweeks > 1 ? pdays : sdays;
		rem_weeks_dom.style.display = "none";
		rem_weeks_label.style.display = "none";
	}
	
	else if ( fmonth < 1 && fweeks > 0 ) {
		rem_months_dom.style.display = "none";
		rem_months_label.style.display = "none";
		rem_hours_dom.style.display = "inline";
		rem_hours_label.style.display = "inline";
		
		if (  fweeks !== 0 && fdays !== 0 && fhours !== 0 ) {
			rem_weeks_label.innerHTML = fweeks > 1 ? pweeks : sweeks;
			rem_days_label.innerHTML = fdays > 1 ? pdays : sdays;
			rem_hours_label.innerHTML = fhours > 1 ? phours : shours;
		}
		
		else if ( fweeks !== 0 && fdays !== 0 && fhours === 0 ) {
			rem_hours_dom.style.display = "none";
			rem_hours_label.style.display = "none";
		
			rem_weeks_label.innerHTML = fweeks > 1 ? pweeks : sweeks;
			rem_days_label.innerHTML = fdays > 1 ? pdays : sdays;
		}
		
		else if ( fweeks !== 0 && fdays === 0 && fhours !== 0 ) {
			rem_days_dom.style.display = "none";
			rem_days_label.style.display = "none";
		
			rem_weeks_label.innerHTML = fweeks > 1 ? pweeks : sweeks;
			rem_hours_label.innerHTML = fhours > 1 ? phours : shours;
		}
		
		else if ( fweeks !== 0 && fdays === 0 && fhours === 0 ) {
			rem_days_dom.style.display = "none";
			rem_days_label.style.display = "none";
			rem_hours_dom.style.display = "none";
			rem_hours_label.style.display = "none";
			
			rem_weeks_label.innerHTML = fweeks > 1 ? pweeks : sweeks;
		}
		
	}
	
	else if ( fmonth < 1 && fweeks < 1 ) {
		rem_months_dom.style.display = "none";
		rem_months_label.style.display = "none";
		rem_weeks_dom.style.display = "none";
		rem_weeks_label.style.display = "none";
		
		if ( fdays !== 0 && fhours !== 0 && fminutes !== 0 ) {
			rem_hours_dom.style.display = "inline";
			rem_hours_label.style.display = "inline";
			rem_minutes_dom.style.display = "inline";
			rem_minutes_label.style.display = "inline";
			
			rem_days_label.innerHTML = fdays > 1 ? pdays : sdays;
			rem_hours_label.innerHTML = fhours > 1 ? phours : shours;
			rem_minutes_label.innerHTML = fminutes > 1 ? pminutes : sminutes;
		}
		
		else if ( fdays !== 0 && fhours !== 0 && fminutes === 0 ) {
			rem_hours_dom.style.display = "inline";
			rem_hours_label.style.display = "inline";
			rem_minutes_dom.style.display = "none";
			rem_minutes_label.style.display = "none";
			
			rem_days_label.innerHTML = fdays > 1 ? pdays : sdays;
			rem_hours_label.innerHTML = fhours > 1 ? phours : shours;
		}
		
		else if ( fdays !== 0 && fhours === 0 && fminutes !== 0 ) {
			rem_hours_dom.style.display = "none";
			rem_hours_label.style.display = "none";
			rem_minutes_dom.style.display = "inline";
			rem_minutes_label.style.display = "inline";
			
			rem_days_label.innerHTML = fdays > 1 ? pdays : sdays;
			rem_minutes_label.innerHTML = fminutes > 1 ? pminutes : sminutes;
		}
		
		else if ( fdays !== 0 && fhours === 0 && fminutes === 0 ) {
			rem_hours_dom.style.display = "none";
			rem_hours_label.style.display = "none";
			rem_minutes_dom.style.display = "none";
			rem_minutes_label.style.display = "none";
			
			rem_days_label.innerHTML = fdays > 1 ? pdays : sdays;
		}
	}
	
	else if ( fmonths < 1 && fweeks < 1 && fdays < 1) {
		rem_months_dom.style.display = "none";
		rem_months_label.style.display = "none";
		rem_weeks_dom.style.display = "none";
		rem_weeks_label.style.display = "none";
		rem_days_dom.style.display = "none";
		rem_days_label.style.display = "none";
		
		rem_hours_dom.style.display = "inline";
		rem_hours_label.style.display = "inline";
		rem_minutes_dom.style.display = "inline";
		rem_minutes_label.style.display = "inline";
		rem_seconds_dom.style.display = "inline";
		rem_seconds_label.style.display = "inline";
		
		if ( fhours !== 0 && fminutes !== 0 && fseconds !==0 ) {
			rem_hours_label.innerHTML = fhours > 1 ? phours : shours;
			rem_minutes_label.innerHTML = fminutes > 1 ? pminutes : sminutes;
			rem_seconds_label.innerHTML = fseconds > 1 ? pseconds : sseconds;
		}
		
		else if ( fhours !== 0 && fminutes !== 0 && fseconds ===0 ) {
			rem_seconds_dom.style.display = "none";
			rem_seconds_label.style.display = "none";
			
			rem_hours_label.innerHTML = fhours > 1 ? phours : shours;
			rem_minutes_label.innerHTML = fminutes > 1 ? pminutes : sminutes;
		}
		
		else if ( fhours !== 0 && fminutes === 0 && fseconds !==0 ) {
			rem_minutes_dom.style.display = "none";
			rem_minutes_label.style.display = "none";
			
			rem_hours_label.innerHTML = fhours > 1 ? phours : shours;
			rem_seconds_label.innerHTML = fseconds > 1 ? pseconds : sseconds;
		}
		
		else if ( fhours !== 0 && fminutes === 0 && fseconds ===0 ) {
			rem_minutes_dom.style.display = "none";
			rem_minutes_label.style.display = "none";
			rem_seconds_dom.style.display = "none";
			rem_seconds_label.style.display = "none";
			
			rem_hours_label.innerHTML = fhours > 1 ? phours : shours;
		}
		
		else if ( fhours < 1 && fminutes !== 0 && fseconds !== 0 ) {
			rem_hours_dom.style.display = "none";
			rem_hours_label.style.display = "none";
			
			rem_minutes_label.innerHTML = fminutes > 1 ? pminutes : sminutes;
			rem_seconds_label.innerHTML = fseconds > 1 ? pseconds : sseconds;
		}
		
		else if ( fhours < 1 && fminutes < 1 && fseconds !== 0 ) {
			rem_hours_dom.style.display = "none";
			rem_hours_label.style.display = "none";
			rem_minutes_dom.style.display = "none";
			rem_minutes_label.style.display = "none";
			rem_seconds_dom.style.width = "50px";
			rem_seconds_dom.style.height = "50px";
			rem_seconds_dom.style.fontSize = "35px";
			
			rem_seconds_label.innerHTML = fseconds > 1 ? pseconds : sseconds;
		}
	}
	
	// Inflating the DOM with remaining time.
	rem_months_dom.innerHTML = fmonth;
	rem_weeks_dom.innerHTML = fweeks;
	rem_days_dom.innerHTML = fdays;
	rem_hours_dom.innerHTML = fhours;
	rem_minutes_dom = fminutes;
	rem_seconds_dom = fseconds;
	
	// Setting up a progress bar for the loading year.
	let next_year = document.querySelector(".year-progress");
	next_year.innerHTML = "<div class='progress-bar'></div>";
	
	let disp_year = document.querySelector(".from-to-year");
	disp_year.innerHTML = "<span class='dying-year'>" + current_year + "</span>&nbsp;&nbsp;>&nbsp;&nbsp;" + "<span class='pending-year'>" + parseInt(current_year + 1) + "</span>";
	
	let progress_count = document.querySelector(".progress-count");
	let fprogress = ((year_days - rem_days)/year_days)*100;
	fprogress = ( Math.ceil(fprogress) - fprogress ) < 0.5 ? Math.ceil(fprogress) : Math.floor(fprogress);
	progress_count.innerHTML = fprogress + "%";
	
	let fade_away = document.querySelector(".dying-year");
	let fade_in = document.querySelector(".pending-year");
	
	fade_away.style.opacity = 1.1 - Math.round(fprogress/100, 1);
	fade_in.style.opacity = 1.1 - Math.round((100-fprogress)/100, 1);
	
	fade_away.style.filter = "blur(" + Math.round((2*fprogress)/100, 1) + "px)";
	fade_in.style.filter = "blur(" + Math.round((2*(100-fprogress))/100, 1) + "px)";
	
	let progress_bar_width = document.querySelector(".progress-bar");
	let fprog_width = (165 * (year_days - rem_days)) / 366;
	fprog_width = ( Math.ceil(fprog_width) - fprog_width) < 0.5 ? Math.ceil(fprog_width) : Math.floor(fprog_width);
	progress_bar_width.style.width = fprog_width + "px";
	
	// Current date and time.
	let period = 'AM'.bold();
	if (current_hour >= 12) {
		current_hour = current_hour - 12;
		period = 'PM'.bold();
	}
	
	current_hour = current_hour == 0 ? 12 : current_hour;
	current_hour = current_hour < 10 ? '0' + current_hour : current_hour;
	current_min = current_min < 10 ? '0' + current_min : current_min;
	current_sec = current_sec < 10 ? '0' + current_sec : current_sec;
	
	let today = ("<span class='day'>" + (date.toString().split(' ')[0]).bold() + "</span>" + ' ' + (date.toString().split(' ').splice(1,2).join(' ') + ', ' + current_year)).toUpperCase();
	let time = `${current_hour}:${current_min}:${current_sec}${'&nbsp'}`;
	document.querySelector(".time-disp").innerHTML = time;
	document.querySelector(".period-disp").innerHTML = period;
	document.querySelector(".date-disp").innerHTML = today;
	setInterval(clock, 1000);
}

clock();
