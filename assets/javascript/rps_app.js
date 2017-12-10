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
var player1;
var player2;
var rock = $('#rock').on('click', function(){});
var paper = $('#paper').on('click', function(){});;
var scissors = $('#scissors').on('click', function(){});;
var name = '';
var player1wins = 0;
var player2wins = 0;
var player1losses = 0;
var player2losses = 0;

$('#name-submit').on('click', function(){
	name = $('#player-name').val().trim();
	console.log(name);

	database.ref().push({
		name: name,
		win: wins,
		loss: losses,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});

database.ref().on('child_added', function(snapshot){
	$('#player1-name').html('<td>' + snapshot.val().name + '</td>');
})

if (player1 == player2){
	alert("It's a tie!");
}

else if (player1 == rock && player2 == scissors){
	alert("player 1 wins!");
	player1wins++;
	player2losses++;
}
else if (player1 == paper && player2 == scissors){
	alert("player 2 wins!");
	player2wins++;
	player1losses++;
}
else if (player1 == scissors && player2 == rock){
	alert("player 2 wins!");
	player2wins++;
	player1losses++;
}
else if (player1 == scissors && player2 == paper){
	alert("player 1 wins!");
	player1wins++;
	player2losses++;
}
else if (player1 == paper && player2 == rock){
	alert("player 1 wins");
	player1wins++;
	player2losses++;
}
else if (player1 == rock && player2 == paper){
	alert("player 2 wins");
	player2wins++;
	player1losses++;
}



// look for .key(), this method takes the key from the database


//google API key AIzaSyBE9zmO0aeZ6k8VmQwtvMWbqLGTWMDjjzE
//API URL https://maps.googleapis.com/maps/api/js?key=&callback=initMap