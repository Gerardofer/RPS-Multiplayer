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

		var playerAdded = database.ref().push({
					name: name,
					wins: 0,
					losses: 0,
					selection:''
					});
		localStorage.setItem('playerId', playerAdded.key);
	})




	
database.ref().on('child_added', function(snapshot, prevChildKey){

	console.log(snapshot.val().name + snapshot.key + " " + snapshot.val().selection);
	
	player1 = !prevChildKey;
	player2 = prevChildKey;

	if (player1){
		$('#first-player').html('<h2>' + snapshot.val().name + '</h2>');

		$(document).on('click', '.carousel-item', function(){
			console.log("Here I am!")
			selection = $(this).data('info');
			console.log(selection);
			var playerId = localStorage.getItem('playerId');
			console.log('this player just played', playerId);
			if(selection == 'rock'){
				$('#alert-winner').append('<h5>' + snapshot.val().selection + '</h5>')
			}
			
		});
	};	
		
	if (player2){
		$('#second-player').html('<h2>' + snapshot.val().name + '</h2>');

		// if (gameImage == 'rock'){
		// 	$('#alert-winner').html('<h5>' + childSnapshot.val().choice + '</h5>')
		// }else if (gameImage == 'paper'){
		// 	$('#alert-winner').html('<h5>' + childSnapshot.val().choice + '</h5>')
		// }else if (gameImage == 'scissors') {
		// 	$('#alert-winner').html('<h5>' + childSnapshot.val().choice + '</h5>')
		// }
	};
});

