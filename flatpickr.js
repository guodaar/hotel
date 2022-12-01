let dateRange;

flatpickr("#dateSelect", {
  mode: "range",
  dateFormat: "Y-m-d",
  minDate: "today",
  onClose: function (selectedDates, dateStr, instance) {
    let daysInRange = document.getElementsByClassName("inRange");
    let nightsLengthTotal = daysInRange.length + 1;
    // console.log(daysLengthTotal);
    dateRange = nightsLengthTotal;
  },
});

const form = document.querySelector(".dateSelection");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(dateRange);
});
