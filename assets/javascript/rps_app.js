$(document).ready(function(){
      $('.carousel').carousel();
    });

var config = {
    apiKey: "AIzaSyBE9zmO0aeZ6k8VmQwtvMWbqLGTWMDjjzE",
    authDomain: "rock-paper-scissor-ecfb9.firebaseapp.com",
    databaseURL: "https://rock-paper-scissor-ecfb9.firebaseio.com",
    projectId: "rock-paper-scissor-ecfb9",
    storageBucket: "rock-paper-scissor-ecfb9.appspot.com",
    messagingSenderId: "531817991562"
  };

firebase.initializeApp(config);
     
var database = firebase.database();
var user;
var player1;
var player2;
var rock = $('#rock')
var paper = $('#paper')
var scissors = $('#scissors')
var name = '';
var player1wins = 0;
var player2wins = 0;
var player1losses = 0;
var player2losses = 0;

$('#name-submit').on('click', function(){
	name = $('#player-name').val().trim();

	database.ref().push({
				name: name,
				dateAdded: firebase.database.ServerValue.TIMESTAMP
			})
	
});

// database.ref().on('child_added', function(snapshot){
// 	$('#player1-name').html('<h2>' + snapshot.val().name + '</h2>');
// 	$('#player2-name').html('<h2>' + snapshot.val().name + '</h2>');
// })

database.ref().orderByChild('name').limitToFirst(2).on('child_added', function(snapshot){
	player1 = snapshot.key;
	player2 = snapshot.key;
	console.log(player1);
	console.log(player2);
	// $('#player1-name').html(snapshot.val().name);	
})

// database.ref().orderByKey().limitToLast(1).on('child_added', function(snapshot){
// 	player2 = snapshot.key;
// 	console.log(player2)
	// $('#player2-name').html(snapshot.val().name);	
// })


// look for .key(), this method takes the key from the database


//google API key AIzaSyBE9zmO0aeZ6k8VmQwtvMWbqLGTWMDjjzE
//API URL https://maps.googleapis.com/maps/api/js?key=&callback=initMap