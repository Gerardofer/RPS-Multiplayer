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
var secondPlayer;
var playerOneChoice;
var playerTwoChoice;
var rock = $('#rock')
var paper = $('#paper')
var scissors = $('#scissors')
// var name = '';
var player1wins = 0;
var player2wins = 0;
var player1losses = 0;
var player2losses = 0;
var firstName;
var secondName;


$('#name-submit').on('click', function(event){
	event.preventDefault();
	var playerName = $('.player-name');
	$('#playerSubmit').hide();
	playerName.html($('#name').val().trim());
	database.ref().once('value', function(snapshot){
		if(snapshot.child("firstPlayer/firstName").exists()) {
			secondPlayer = $('#name').val().trim()
			database.ref("/secondPlayer").set({
				secondName: secondPlayer
			});
			$('img').on('click', function(){
				var gameImage = $(this).attr('data-info');
				if (gameImage == 'rock'){
					$('#alert-winner').html('<h3>Rock Selected</h3>')
				}else if (gameImage == 'paper'){
					$('#alert-winner').html('<h3>Paper Selected</h3>')
				}else if (gameImage == 'scissors') {
					$('#alert-winner').html('<h3>Scissors Selected</h3>')
				}
				database.ref('/secondPlayer').push({
				playerTwoChoice: gameImage
				})
			})

		}else {
			firstPlayer = $('#name').val().trim();
			database.ref("/firstPlayer").set({
				firstName: firstPlayer
			})
			$('img').on('click', function(){
				var gameImage = $(this).attr('data-info');
				if (gameImage == 'rock'){
					$('#alert-winner').html('<h3>Rock Selected</h3>')
				}else if (gameImage == 'paper'){
					$('#alert-winner').html('<h3>Paper Selected</h3>')
				}else if (gameImage == 'scissors') {
					$('#alert-winner').html('<h3>Scissors Selected</h3>')
				}
				database.ref('/firstPlayer').push({
				playerOneChoice: gameImage
				})
			})
		}
	})

	
})



//---------------  THIS CODE WORKS   --------------------
// $('#name-submit').on('click', function(event){
// 	event.preventDefault();
// 	name = $('#player-name').val().trim();

// 	var newUser = {
// 		name: name,
// 		wins: 0,
// 		loss: 0,
// 		dateAdded: firebase.database.ServerValue.TIMESTAMP
// 	}

// 	database.ref().push(newUser);
// });

// database.ref().on('child_added', function(childSnapshot, prevChildKey){

// 	player1 = !prevChildKey;
// 	player2 = prevChildKey;

// 	if (player1){
// 		$('#player1-name').html('<h2>' + childSnapshot.val().name + '</h2>');
// 		rock.on('click', function(){
// 			console.log("rock!")
// 			if (player1 == rock && player2 == scissors){
// 				$('#alert-winner').html("<h1>Player 1 wins!</h1>");
// 			}

// 		})
// 	}

// 	if (player2){
// 		$('#player2-name').html('<h2>' + childSnapshot.val().name + '</h2>');
// 	}

//------------------------------------------------------------------------------
	// rock.on('click', function(){
	// 	if (player1 == rock && player2 == rock){
	// 		console.log("rock!")
	// 		$('#alert-winner').html("<h1>It's a tie!</h1>");

	// 	}
	// 	else if (player1 == rock && player2 == scissors);
	// 		$('#alert-winner').html("<h1>Player 1 wins!</h1>");
	// 		console.log("hey!")
	// })


// var player = database.ref();

// player.once('child_added')
// .then(function(snapshot, prevChildKey){
// 	var key = snapshot.key;
// 	var childKey = prevChildKey;


// 	console.log(key, childKey);

// })











// })





// look for .key(), this method takes the key from the database


//google API key AIzaSyBE9zmO0aeZ6k8VmQwtvMWbqLGTWMDjjzE
//API URL https://maps.googleapis.com/maps/api/js?key=&callback=initMap