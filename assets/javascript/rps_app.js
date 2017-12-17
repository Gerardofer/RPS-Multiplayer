$(document).ready(function(){
      $('.carousel').carousel();
    });

var config = {
    apiKey: "AIzaSyDgYzWrXRQ4XSg9Aw1jomQd9WHc3aUi8DI",
    authDomain: "rps-take2.firebaseapp.com",
    databaseURL: "https://rps-take2.firebaseio.com",
    projectId: "rps-take2",
    storageBucket: "",
    messagingSenderId: "221983390883"
  };
  firebase.initializeApp(config);

var database = firebase.database()

//---------------  THIS CODE WORKS   --------------------
var name;
var RPS;


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

	var choiceAdded = database.ref('choice').push({
		choice: RPS
	})
});


database.ref('choice').on('child_added', function(snapshot, prevChildKey){
	
	// console.log(prevChildKey.key)
	choice1 = !prevChildKey
	choice2 = prevChildKey;

	var image = $('<img class="choice-display">');

	if(choice1){
		
		if (RPS === 'rock'){
			$('.alert-winner1').html(image.attr('src', 'assets/images/rock.png'));
		}
		else if (RPS === 'paper'){	
			$('.alert-winner1').html(image.attr('src', 'assets/images/paper.png'))
		}
		else if (RPS === 'scissors'){
			$('.alert-winner1').html(image.attr('src', 'assets/images/scissors.png'));	
		}
	}

	if(choice2){
		
		if (RPS === 'rock'){
			$('.alert-winner2').html(image.attr('src', 'assets/images/rock.png'));
		}
		else if (RPS === 'paper'){
			$('.alert-winner2').html(image.attr('src', 'assets/images/paper.png'));	
		}
		else if (RPS === 'scissors'){
			$('.alert-winner2').html(image.attr('src', 'assets/images/scissors.png'));	
		}
	}
})


//------------------------------------------------------------------------------
	
