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

//capture submit button click 
$("#add-train").on("click", function(event) {
	event.preventDefault();
	 

	var trainName = $("#trainName").val().trim(); 
	var destinationName = $("#destinationName").val().trim();
	var firstTrainTime = $("#firstTrainTime").val().trim();
	var frequency = $("#frequency").val().trim();

	console.log(trainName);
	console.log(destinationName);
	console.log(firstTrainTime);
	console.log(frequency);

	database.ref().push({
		"trainName": trainName, 
		"destinationName": destinationName, 
		"firstTrainTime": firstTrainTime,
		"frequency": frequency,
		"dateAdded": firebase.database.ServerValue.TIMESTAMP 
	});
});

//By default display the content from local storage to the page
database.ref().on("child_added", function(childSnapshot) {
	var randomFormat = "hh:mm";
	var convertedTime = moment(childSnapshot.val().time, randomFormat);
	console.log(convertedTime);
	$("tbody").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destinationName + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + childSnapshot.val().firstTrainTime + "</td></tr>" )
})