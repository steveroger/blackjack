function Deck()
{
	var cards = [];
	var suits = ["H", "D", "S", "C"]; // Hearts, Diamonds, Spades, Clubs
	var valToFace = { 11:'J', 12:'Q', 13:'K', 1:'A'};

	//Private Method
	var initialize = function() { 
		for (var i=0; i<suits.length; i++){
			for (var j=1; j<14; j++){
				var face = (j==1 || j>10) ? valToFace[j] : j;
				cards.push([face, suits[i]]);
			}
		}
	}

	this.deal = function(){ // Deals a random card.
		var remaining = cards.length;
		var index = Math.floor((Math.random()*remaining)+0);
		if (remaining !== 0){
			return cards.splice(index, 1)[0];
		}
	};

	this.inspect = cards;

	initialize();
}

function Player(deck)
{
	var hand = [];
	var sum = 0;

	var hasAce=function(){
		var faces = []
		for (var i=0; i<hand.length; i++){
			faces.push(hand[i][0])
		}
		if (faces.indexOf('A') >= 0){
			return true
		}
		else {
			return false
		}
	}

	this.hit = function() {
		hand.push(deck.deal())
	}

	this.getTotal = function() {
		for (var i=0; i<hand.length; i++) {
			var face = hand[i][0];
			if (face == 'J' || face == 'Q' || face == 'K'){
				sum += 10
			}
			else if (face == 'A'){
				sum += 11;
			}
			else{
				sum += face;
			}
		}
		if (sum > 21 && hasAce()){
			return sum - 10;
		}
		else {
			return sum;
		}
		
	}

	this.inspect = hand;
}

newDeck = new Deck();
alice = new Player(newDeck);
dealer = new Player(newDeck);

alice.hit();
alice.hit();
alice.hit()
dealer.hit();
dealer.hit();

console.log(alice.inspect)
console.log(alice.getTotal())
