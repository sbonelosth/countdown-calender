function q(selector) { return document.querySelector(selector); }

function clock() {
  let date = new Date();
  let current_year = date.getFullYear();
  let current_month = date.getMonth();
  let current_day = date.getDate();

  var getDaysInMonth = function(month, year) {
    return new Date(year, month + 1, 0).getDate();
  };

  let year_days = 367 - new Date(current_year, 0, 367).getDate();
  let mon_days = 32 - new Date(current_year, current_month, 32).getDate();

  // Constant variables
  let day_secs = 86400;
  let week_secs = 7 * day_secs;
  let hour_secs = 3600;
  let min_secs = 60;

  // Calcuting current year's progress and remaining time.
  let prog = ((date.getTime() / 1000) - (new Date(current_year - 1, 11, 31, 0, 0, 0).getTime() / 1000)).toFixed(0);
  let rem = (((new Date(current_year, 11, 31, 0, 0, 0).getTime() / 1000) - (new Date(current_year - 1, 11, 31, 0, 0, 0).getTime() / 1000)).toFixed(0)) - prog;

  let rem_days = getDaysInMonth(current_month, current_year) - current_day;
  //let rem_weeks = (rem / week_secs);
  let rem_hours = Math.floor(rem / hour_secs);
  let rem_minutes = Math.floor(rem / min_secs);

  let fmonths = 12 - (current_month + 1);
  let fdays = rem_days % 7;
  let fweeks = Math.floor(rem_days / 7);
  let fhours = rem_hours % 24;
  let fminutes = rem_minutes % 60;
  let fseconds = rem % 60;

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

  let rem_months_dom = q(".rem-months");
  let rem_weeks_dom = q(".rem-weeks");
  let rem_days_dom = q(".rem-days");
  let rem_hours_dom = q(".rem-hours");
  let rem_minutes_dom = q(".rem-minutes");
  let rem_seconds_dom = q(".rem-seconds");

  let rem_months_label = q(".rem-months-label");
  let rem_weeks_label = q(".rem-weeks-label");
  let rem_days_label = q(".rem-days-label");
  let rem_hours_label = q(".rem-hours-label");
  let rem_minutes_label = q(".rem-minutes-label");
  let rem_seconds_label = q(".rem-seconds-label");

  // Setting up conditions for displaying remaining time.

  rem_weeks_dom.style.display = (fweeks === 0) ? "none" : "inline";
  rem_weeks_label.style.display = (fweeks === 0) ? "none" : "inline";

  rem_days_dom.style.display = (fdays === 0) ? "none" : "inline";
  rem_days_label.style.display = (fdays === 0) ? "none" : "inline";

  rem_months_dom.style.display = (fmonths === 0) ? "none" : "inline";
  rem_months_label.style.display = (fmonths === 0) ? "none" : "inline";

  rem_hours_dom.style.display = (fhours === 0) ? "none" : "inline";
  rem_hours_label.style.display = (fhours === 0) ? "none" : "inline";

  rem_minutes_dom.style.display = (fminutes === 0) ? "none" : "inline";
  rem_minutes_label.style.display = (fminutes === 0) ? "none" : "inline";

  rem_seconds_dom.style.display = (fseconds === 0) ? "none" : "inline";
  rem_seconds_label.style.display = (fseconds === 0) ? "none" : "inline";


  if (fmonths > 0) {
    rem_seconds_dom.style.display = "none";
    rem_minutes_dom.style.display = "none";
    rem_hours_dom.style.display = "none";

    rem_months_label.innerHTML = fmonths > 1 ? pmonths : smonths;
    rem_weeks_label.innerHTML = fweeks > 1 ? pweeks : sweeks;
    rem_days_label.innerHTML = fdays > 1 ? pdays : sdays;
  }

  else if (fmonths < 1 && fweeks > 0) {
    rem_seconds_dom.style.display = "none";
    rem_minutes_dom.style.display = "none";

    rem_weeks_label.innerHTML = fweeks > 1 ? pweeks : sweeks;
    rem_days_label.innerHTML = fdays > 1 ? pdays : sdays;
    rem_hours_label.innerHTML = fhours > 1 ? phours : shours;
  }

  else if (fmonths < 1 && fweeks < 1) {
    rem_minutes_dom.style.display = "none";

    rem_days_label.innerHTML = fdays > 1 ? pdays : sdays;
    rem_hours_label.innerHTML = fhours > 1 ? phours : shours;
    rem_minutes_label.innerHTML = fminutes > 1 ? pminutes : sminutes;
  }

  else if (fmonths < 1 && fweeks < 1 && fdays < 1) {
    rem_hours_label.innerHTML = fhours > 1 ? phours : shours;
    rem_minutes_label.innerHTML = fminutes > 1 ? pminutes : sminutes;
    rem_seconds_label.innerHTML = fseconds > 1 ? pseconds : sseconds;
  }

  // Inflating the DOM with remaining time.
  rem_months_dom.innerHTML = fmonths;
  rem_weeks_dom.innerHTML = fweeks;
  rem_days_dom.innerHTML = fdays;
  rem_hours_dom.innerHTML = fhours;
  rem_minutes_dom.innerHTML = fminutes;
  rem_seconds_dom.innerHTML = fseconds;

  // Setting up a progress bar for the loading year.
  let next_year = q(".year-progress");
  next_year.innerHTML = "<div class='progress-bar'></div>";

  let disp_year = q(".from-to-year");
  disp_year.innerHTML = `<span class='dying-year'>${current_year}</span>&nbsp;&nbsp;>&nbsp;&nbsp;<span class='pending-year'>${parseInt(current_year + 1)}</span>`;

  let progress_count = q(".progress-count");
  let fprogress = (100 * ((prog / day_secs) / year_days)).toFixed(1);
  let fprog_string = fprogress.toString();
  progress_count.innerHTML = (fprog_string.charAt(fprog_string.length - 1) == "0") ? Math.floor(fprogress) + "% COMPLETE" : fprogress + "% COMPLETE";

  let fade_away = q(".dying-year");
  let fade_in = q(".pending-year");

  fade_away.style.opacity = 1.1 - (fprogress / 100).toFixed(1);
  fade_in.style.opacity = 1.1 - ((100 - fprogress) / 100).toFixed(1);

  fade_away.style.color = (current_year === 2021) ? "#BDB220" : "#EBEBEB";
  
  fade_away.style.filter = `blur(${((2 * fprogress) / 100).toFixed(1)}px)`;
  fade_in.style.filter = `blur(${((2 * (100 - fprogress)) / 100).toFixed(1)}px)`;

  let progress_bar = q(".progress-bar");
  let fprog_width = ((165 * (1 - (rem / day_secs) / year_days))).toFixed(0);
  fprog_width = (Math.ceil(fprog_width) - fprog_width) < 0.5 ? Math.ceil(fprog_width) : Math.floor(fprog_width);
  progress_bar.style.width = `${fprog_width}px`;
  let R;
  let G;
  if (fprogress <= 25) {
    R = (((4 * fprogress) / 100) * (255 / 2)).toFixed(0);
    progress_bar.style.backgroundColor = `rgba(${R}, 255, 75)`;
    progress_count.style.color = `rgba(${R}, 255, 75)`;
  }

  else if (fprogress > 25 && fprogress <= 50) {
    R = (((2 * fprogress) / 100) * (255)).toFixed(0);
    progress_bar.style.backgroundColor = `rgba(${R}, 255, 75)`;
    progress_count.style.color = `rgba(${R}, 255, 75)`;
  }

  else if (fprogress > 50 && fprogress <= 100) {
    G = ((2 * (100 - fprogress) / 100) * (255)).toFixed(0);
    progress_bar.style.backgroundColor = `rgba(255, ${G}, 75)`;
    progress_count.style.color = `rgba(255, ${G}, 75)`;
  }

  let day_span = "<span class='day'>";
  let progress_day =  Math.floor(prog / day_secs);
  let today = day_span + ((date.toString().split(' ')[0]).bold() + ", </span> " + (date.toString().split(' ').splice(1, 1).join(' ') + ` ${current_day}`)).toUpperCase();
  q(".time-disp").innerHTML = `Day <b>${progress_day}</b> of ${year_days}`;
  q(".date-disp").innerHTML = today;
  setInterval(clock, 1000);
}

clock();