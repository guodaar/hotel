flatpickr("#dateSelect", {
  mode: "range",
  dateFormat: "Y-m-d",
  minDate: "today",
  onClose: function (date) {
    var startDay = flatpickr.formatDate(date[0], "m/d/Y");
    var endDay = flatpickr.formatDate(date[1], "m/d/Y");

    var newStartDate = new Date(startDay).getTime();
    var newEndDate = new Date(endDay).getTime();

    var newStartDate = eval(newStartDate / 1000 + 3600); // for GMT+1 I had to add 3600 (seconds) [1 hour]
    var newEndDate = eval(newEndDate / 1000 + 3600); // for GMT+1 I had to add 3600 (seconds) [1 hour]

    var countDays = eval(newEndDate - newStartDate);
    var countDays = eval(countDays / 86400 + 1);

    console.log("Amount of selected days: " + countDays);
  },
});
