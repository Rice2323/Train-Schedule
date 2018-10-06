  var config = {
    apiKey: "AIzaSyBq2nwh6leVb9urt8nt0ic7zeSqr3ciu4U",
    authDomain: "choo-choo-train-schedules.firebaseapp.com",
    databaseURL: "https://choo-choo-train-schedules.firebaseio.com",
    projectId: "choo-choo-train-schedules",
    storageBucket: "choo-choo-train-schedules.appspot.com",
    messagingSenderId: "876548052248"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var name = "";
  var destination = "";
  var arrivalTime = "";
  var frequency = 0;
  var nextArrival = "";
  var minutesAway = 0;

  $("#submit").on("click", function(){

event.preventDefault();

name = $("#tName-input").val().trim();
destination = $("#destination-input").val().trim();
arrivalTime =$("#arrival-input").val().trim();
frequency = $("#frequency-input").val().trim();

 minutesAway = frequency - Math.floor(((moment().unix("X")- moment(arrivalTime, "hh:mm").unix("X"))/60)%frequency);
 nextArrival = moment().add(minutesAway, 'm').format("hh:mm");

database.ref().push({
name: name,
destination: destination,
arrivalTime: arrivalTime,
frequency: frequency,
minutesAway: minutesAway,
nextArrival, nextArrival
});




  });

  var createRow = function(){


    

    var tRow = $("<tr>");
    var trainName = $("<td>").text(name);
    var trainDestination = $("<td>").text(destination);
    var trainFrequency = $("<td>").text(frequency);
    var trainArrivalTime = $("<td>").text(nextArrival);
    var trainMinutesAway = $("<td>").text(minutesAway);
    

    tRow.append(trainName, trainDestination, trainFrequency, trainArrivalTime, trainMinutesAway)
    $("tbody").append(tRow);

  };

  

  database.ref().on("child_added", function(snapshot){

    createRow();
    $(".getTrain").trigger('reset');

  })

