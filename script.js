window.onload = function () {
    const day = document.getElementById("day");
    const month = document.getElementById("month");
    const year = document.getElementById("year");
    const labels = document.getElementsByTagName("label");
    const errors = document.getElementsByClassName("error");
    const spans = document.getElementsByTagName("span");
    const submitButton = document.getElementById("submit");

    const date = new Date();

    let currentDay = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();

    const typeOfError = [
        "",
        "This field is required",
        "Must be a valid day",
        "Must be a valid month",
        "Must be a valid year",
        "Must be a valid date",
    ];

    const errorState = (index, element, message, color) => {
        errors[index].innerHTML = message;
        labels[index].style.color = color;
        element.style.borderColor = color;
    };

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const isDateValid = (day, month, year) => {
        if (month < 1 || month > 12) return false;
        if (day < 1) return false;

        let daysInMonth = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return day <= daysInMonth[month - 1];
    };

    const subtractAge = () => {
        let newYear = currentYear - parseInt(year.value);
        let newMonth = currentMonth - parseInt(month.value);
        let newDay = currentDay - parseInt(day.value);

        if (newDay < 0) {
            newMonth -= 1;
            newDay += 30; // Assuming an average month length
        }
        if (newMonth < 0) {
            newYear -= 1;
            newMonth += 12;
        }

        spans[0].innerHTML = newYear;
        spans[1].innerHTML = newMonth;
        spans[2].innerHTML = newDay;
    };

    const isDayCorrect = () => {
        if (day.value === "") {
            errorState(0, day, typeOfError[1], "#ff5757");
            return false;
        } else if (!isDateValid(day.value, month.value, year.value)) {
            errorState(0, day, typeOfError[2], "#ff5757");
            return false;
        } else {
            errorState(0, day, typeOfError[0], "");
            return true;
        }
    };

    const isMonthCorrect = () => {
        if (month.value === "") {
            errorState(1, month, typeOfError[1], "#ff5757");
            return false;
        } else if (month.value < 1 || month.value > 12) {
            errorState(1, month, typeOfError[3], "#ff5757");
            return false;
        } else {
            errorState(1, month, typeOfError[0], "");
            return true;
        }
    };

    const isYearCorrect = () => {
        if (year.value === "") {
            errorState(2, year, typeOfError[1], "#ff5757");
            return false;
        } else if (year.value > currentYear) {
            errorState(2, year, typeOfError[4], "#ff5757");
            return false;
        } else if (!isDateValid(day.value, month.value, year.value)) {
            errorState(2, year, typeOfError[5], "#ff5757");
            return false;
        } else {
            errorState(2, year, typeOfError[0], "");
            return true;
        }
    };

    const validateAndSubmit = (event) => {
        event.preventDefault();
        let dayValid = isDayCorrect();
        let monthValid = isMonthCorrect();
        let yearValid = isYearCorrect();

        if (dayValid && monthValid && yearValid) {
            alert("You have successfully submitted your birthday! Thank you for your participation! :D");
            subtractAge();
        }
    };

    submitButton.addEventListener("click", validateAndSubmit);

    // Add event listeners for Enter key press
    day.addEventListener("keydown", (event) => {
        if (event.key === "Enter") validateAndSubmit(event);
    });
    month.addEventListener("keydown", (event) => {
        if (event.key === "Enter") validateAndSubmit(event);
    });
    year.addEventListener("keydown", (event) => {
        if (event.key === "Enter") validateAndSubmit(event);
    });
};
