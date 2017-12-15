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
var RPS;
var choice1;
var choice2;
var secondPlayer;
var playerOneChoice;
var playerTwoChoice;
var rock = $('#rock')
var paper = $('#paper')
var scissors = $('#scissors')
var gameImage;
var player1wins = 0;
var player2wins = 0;
var player1losses = 0;
var player2losses = 0;
var firstName;
var secondName;


// $('#name-submit').on('click', function(event){
// 	event.preventDefault();
// 	var playerName = $('.player-name');
// 	$('#playerSubmit').hide();
// 	playerName.html($('#name').val().trim());
// 	database.ref().once('value', function(snapshot){
// 		if(snapshot.child("firstPlayer/firstName").exists()) {
// 			secondPlayer = $('#name').val().trim()
// 			database.ref("/secondPlayer").set({
// 				secondName: secondPlayer
// 			});
// 			$('img').on('click', function(){
// 				var gameImage = $(this).attr('data-info');
// 				if (gameImage == 'rock'){
// 					$('#alert-winner').html('<h5>Rock Selected</h5>')
// 				}else if (gameImage == 'paper'){
// 					$('#alert-winner').html('<h5>Paper Selected</h5>')
// 				}else if (gameImage == 'scissors') {
// 					$('#alert-winner').html('<h5>Scissors Selected</h5>')
// 				}
// 				database.ref('/secondPlayer').push({
// 				playerTwoChoice: gameImage
// 				})
// 			})

// 		}else {
// 			firstPlayer = $('#name').val().trim();
// 			database.ref("/firstPlayer").set({
// 				firstName: firstPlayer
// 			})
// 			$('img').on('click', function(){
// 				var gameImage = $(this).attr('data-info');
// 				if (gameImage == 'rock'){
// 					$('#alert-winner').html('<h5>Rock Selected</5>')
// 				}else if (gameImage == 'paper'){
// 					$('#alert-winner').html('<h5>Paper Selected</h5>')
// 				}else if (gameImage == 'scissors') {
// 					$('#alert-winner').html('<h5>Scissors Selected</h5>')
// 				}
// 				database.ref('/firstPlayer').push({
// 				playerOneChoice: gameImage
// 				})
// 			})
// 		}
// 	})
// })

// database.ref().on('value', function(snapshot){
// 	console.log(snapshot.val());
// 	if (snapshot.child('/firstPlayer').exists()){
// 		$('#first-player').text(snapshot.val().firstPlayer.firstName);
// 	}
// 	if (snapshot.child('/secondPlayer').exists()){
// 		$('#second-player').text(snapshot.val().secondPlayer.secondName);
// 	}
// })



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
	
$('#name-submit').on('click', function(event){
	event.preventDefault();
	$('#playerSubmit').hide();
	name = $('#name').val().trim();

	var playerAdded = database.ref('players').push({
				name: name,
				});
	localStorage.setItem('playerId', playerAdded.key);
})
	
database.ref('players').on('child_added', function(snapshot, prevChildKey){
	
	player1 = !prevChildKey;
	player2 = prevChildKey;

	if (player1){
		$('#first-player').html('<h2>' + snapshot.val().name + '</h2>');

	}
	if (player2){
		$('#second-player').html('<h2>' + snapshot.val().name + '</h2>');
	}
});


$('.carousel').on('click', '.carousel-item', function(){

	// var playerId = localStorage.getItem('playerId');
	// console.log('this player just played', playerId);
	RPS = $(this).attr('data-info');

	var playerOneChoice = database.ref('choice').push({
		playerChoice: RPS
	})

	database.ref('choice').on('child_added', function(snapshot, prevChildKey){

		choice1 = !prevChildKey;
		choice2 = prevChildKey;
		var image = $('<img class="choice-display">');

		if(choice1){

			if (RPS === 'rock'){
				image.attr('src', 'assets/images/rock.png');
				$('#alert-winner1').html(image)
			}
			else if (RPS === 'paper'){
				image.attr('src', 'assets/images/paper.png');	
					$('#alert-winner1').html(image)
			}
			else if (RPS === 'scissors'){
				image.attr('src', 'assets/images/scissors.png');		
					$('#alert-winner1').html(image)
			}
		}

		if(choice2){
			if (RPS === 'rock'){
			image.attr('src', 'assets/images/rock.png');
				$('#alert-winner2').html(image);
			}
			else if (RPS === 'paper'){
				image.attr('src', 'assets/images/paper.png');	
					$('#alert-winner2').html(image);
			}
			else if (RPS === 'scissors'){
				image.attr('src', 'assets/images/scissors.png');		
					$('#alert-winner2').html(image);
			}
		}
	})

});




		





