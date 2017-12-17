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
var playerOneId;
var playerTwoId;
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

// reset game for new players
$("#resetGame").on('click', function() {
	// empty DB
	database.ref('/players').set({});
	database.ref('/game').set({});
});

$("#newGame").on('click', function() {
	database.ref('/game').set({});
});

database.ref('/game').on('child_removed', function() {
	$('.playAgain').hide();
	$('.winner-alert').html('');
	$('.player-selection').html('');
	$('.carousel-item').fadeIn();
	playerOneChoice = null;
	playerTwoChoice = null;
});

$('#name-submit').on('click', function(event){
	event.preventDefault();
	$('#playerSubmit').hide();
	name = $('#name').val().trim();

	var playerAdded = database.ref('/players').push({
				name: name,
				wins: 0,
				losses: 0
				});
	sessionStorage.setItem('playerId', playerAdded.key);
})

// reset the DOM when the game is reset
database.ref('/players').on('child_removed', function(childSnapshot) {
	// put Player 1 and Player 2 defaults on the dom and remove the DB key from the name
	$("." + childSnapshot.key).html($("." + childSnapshot.key).data('empty')).removeClass("." + childSnapshot.key);
	$('#playerSubmit').show();
	sessionStorage.removeItem('playerId');
	$('.playAgain').hide();
	$('.carousel-item').fadeIn();
	$('.player-selection').html('');
	$('.winner-alert').html('');
	$('.player-stats').html('');
})
	
database.ref('/players').on('child_added', function(snapshot, prevChildKey){
	
	player1 = !prevChildKey;
	player2 = prevChildKey;

	if (player1){
		$('#first-player').html(snapshot.val().name).addClass(snapshot.key);
		$('#first-player-selection').addClass(snapshot.key + '_selection');
		playerOneId = snapshot.key;
	}
	if (player2){
		$('#second-player').html(snapshot.val().name).addClass(snapshot.key);
		$('#second-player-selection').addClass(snapshot.key + '_selection');
		playerTwoId = snapshot.key;
	}
});

database.ref('/players').on('child_changed', function(childSnapshot) {
	if (childSnapshot.key === playerOneId) {
		$('#player1-wins').text(childSnapshot.val().wins);
		$('#player1-losses').text(childSnapshot.val().losses);
	} else {
		$('#player2-wins').text(childSnapshot.val().wins);
		$('#player2-losses').text(childSnapshot.val().losses);
	}
})


$('.carousel').on('click', '.carousel-item', function(){

	// var playerId = localStorage.getItem('playerId');
	// console.log('this player just played', playerId);
	RPS = $(this).attr('data-info');

	database.ref('/game').push({
		player: sessionStorage.getItem('playerId'),
		choice: RPS
	});
	//$('.' + sessionStorage.getItem('playerId') + '_selection').html('Played ' + RPS);
	// fadeout unplayed options
	setTimeout(function() {
		$('.carousel-item').not('.active').fadeOut();
	}, 1000);
});

database.ref('/game').on('child_added', function(childSnapshot){
	if ($('#first-player').hasClass(childSnapshot.val().player)) {
		playerOneChoice = childSnapshot.val().choice
	} else {
		playerTwoChoice = childSnapshot.val().choice;
	}
	if (childSnapshot.val().player === sessionStorage.getItem('playerId')) {
		$('.' + childSnapshot.val().player + '_selection').html('Played ' + childSnapshot.val().choice);
	} else {
		$('.' + childSnapshot.val().player + '_selection').html('Has played');
	}
	if (playerOneChoice && playerTwoChoice) {
		$('.playAgain').show();
	
		if (playerOneChoice === playerTwoChoice) {
			$('.alert-winner1').html('Tie!');
			$('.alert-winner2').html('Tie!');
		}

		if (playerOneChoice === 'paper' && playerTwoChoice === 'rock') {
			$('.alert-winner1').html('Win!');
			$('.alert-winner2').html('Lose!');
			player1wins++;
			player2losses++;
			database.ref('/players').child(playerOneId).update({
				wins: player1wins
			});
			database.ref('/players').child(playerTwoId).update({
				losses: player2losses
			});
		}

		if (playerOneChoice === 'paper' && playerTwoChoice === 'scissors') {
			$('.alert-winner1').html('Lose!');
			$('.alert-winner2').html('Win!');
			player1losses++;
			player2wins++;
			database.ref('/players').child(playerOneId).update({
				losses: player1losses
			});
			database.ref('/players').child(playerTwoId).update({
				wins: player2wins
			});
		}

		if (playerOneChoice === 'scissors' && playerTwoChoice === 'rock') {
			$('.alert-winner1').html('Lose!');
			$('.alert-winner2').html('Win!');
			player1losses++;
			player2wins++;
			database.ref('/players').child(playerOneId).update({
				losses: player1losses
			});
			database.ref('/players').child(playerTwoId).update({
				wins: player2wins
			});
		}

		if (playerOneChoice === 'scissors' && playerTwoChoice === 'paper') {
			$('.alert-winner1').html('Win!');
			$('.alert-winner2').html('Lose!');
			player1wins++;
			player2losses++;
			database.ref('/players/').child(playerOneId).update({
				wins: player1wins
			});
			database.ref('/players').child(playerTwoId).update({
				losses: player2losses
			});
		}

		if (playerOneChoice === 'rock' && playerTwoChoice === 'paper') {
			$('.alert-winner1').html('Lose!');
			$('.alert-winner2').html('Win!');
			player1losses++;
			player2wins++;
			database.ref('/players').child(playerOneId).update({
				losses: player1losses
			});
			database.ref('/players').child(playerTwoId).update({
				wins: player2wins
			});
		}

		if (playerOneChoice === 'rock' && playerTwoChoice === 'scissors') {
			$('.alert-winner1').html('Win!');
			$('.alert-winner2').html('Lose!');
			player1wins++;
			player2losses++;
			database.ref('/players').child(playerOneId).update({
				wins: player1wins
			});
			database.ref('/players').child(playerTwoId).update({
				losses: player2losses
			});
		}
	}
});