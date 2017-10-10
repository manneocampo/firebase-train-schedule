  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAS3m918gpmLvcYwPYZ1BwptwwmCfQ6rH0",
    authDomain: "train-schedule-15b64.firebaseapp.com",
    databaseURL: "https://train-schedule-15b64.firebaseio.com",
    projectId: "train-schedule-15b64",
    storageBucket: "train-schedule-15b64.appspot.com",
    messagingSenderId: "509214606552"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var trainName; 
var destinationName;
var firstTrainTime = 0;
var frequency = 0;


//capture submit button click 
$("#add-train").on("click", function(event) {
	event.preventDefault();
	 

	var trainName = $("#trainName").val().trim(); 
	var destinationName = $("#destinationName").val().trim();
	var firstTrainTime = $("#firstTrainTime").val().trim();
	var frequency = $("#frequency").val().trim();

	// console.log(trainName);
	// console.log(destinationName);
	// console.log(firstTrainTime);
	// console.log(frequency);

	database.ref().push({
		"trainName": trainName, 
		"destinationName": destinationName, 
		"firstTrainTime": firstTrainTime,
		"frequency": frequency,
		"dateAdded": firebase.database.ServerValue.TIMESTAMP 
	});

		$("#trainName").val("");
	  	$("#destinationName").val("");
	  	$("#firstTrainTime").val("");
	  	$("#frequency").val("");
});

//By default display the content from local storage to the page
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	
	console.log(childSnapshot.val());
	
	var trainName = childSnapshot.val().trainName;
  	var destinationName = childSnapshot.val().destinationName;
 	var firstTrainTime = childSnapshot.val().firstTrainTime;
  	var frequency = childSnapshot.val().frequency;
  	
	
	var tFrequency = frequency; 
	var firstTime = firstTrainTime;
	console.log("FIRST TRAIN TIME:" + firstTime);

	var firstTimeConverted = moment(firstTime, "hh:mm A").subtract(1, "years");
	console.log("FIRST TIME CONVERTED:" + firstTimeConverted);

	//current time 
	var currentTime = moment();
	console.log("CURRENT TIME:" + moment(currentTime).format("hh:mm A"));

	//Difference between the times 
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME:" + diffTime);

	//Time apart (remainder)
	var tRemainder = diffTime % tFrequency; 
	console.log("TIME APART(REMAINDER):" + tRemainder);

	//Minutes Until Train 
	var tMinutesTillTrain = tFrequency - tRemainder; 
	console.log("MINUTES TILL TRAIN:" + tMinutesTillTrain);

	//Next Train 
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainFormatted = moment(nextTrain).format("hh:mm A");
	console.log("ARRIVAL TIME:" + moment(nextTrain).format("hh:mm A"));


	$("tbody").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destinationName + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + nextTrainFormatted + "</td><td>" + tMinutesTillTrain + "</td></tr>")
})