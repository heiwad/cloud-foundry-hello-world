//Written by Heiwad Osman for Catt Small's for the CLF Phaser.io Lesson (http://codeliberation.org/author/catt/)


function preload () {
	//Defines images and sounds that need to happen before game displays
	//supports static game.load.image, sprites (animated), tile sets (environment)
	game.load.image('background','img/background.png');
	game.load.image('spider','img/spider.png');
	game.load.image('cloud','img/cloud.png');
	game.load.image('cloudfoundry','img/cloudfoundry.png');
	game.load.image('cloud','img/cloud/pivotal.png');
};

function create() {
	//start instantiating the game

	game.stage.backgroundColor = "#4488AA";

	
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	game.scale.updateLayout(true);
	game.scale.refresh();

	//make it clickable
	game.add.sprite(0,0,'background')
	game.clickableObject = game.add.sprite(game.width/2,game.height/2,'cloudfoundry'); // place it at middle
	game.clickableObject.inputEnabled = true;
	game.clickableObject.anchor.setTo(0.5,0.5) // set the positioning to be based on center of object

	//bind event listener functions
	game.clickableObject.events.onInputDown.add(addScore,game);
	//game.clickableObject.events.onInputUp.add(spawnClickables,game)

	game.score = 0;
	game.scoreText = game.add.text(20,20,"Score: " + game.score, {fill: "#cccccc"});
	game.GOAL_SCORE = 500; 

	//timer
	var START_TIME = 1000;
	game.timeLeft = START_TIME; //functions created in the create function are available in the rest of the Game
	game.timerText = game.add.text(game.width/2, 20, 'Time left: ' + game.timeLeft, {fill:"#cccccc"});
	game.timerText.anchor.setTo(0.5,0);

	//start countdown
	game.countdownTimer = game.time.create(false);
	game.countdownTimer.loop(1000,updateTimer,game);
	game.countdownTimer.start()

};

function update() {
	//runs every millisecond
};

function addScore() {
	if (game.score < game.GOAL_SCORE && game.timeLeft > 0) {
	game.score +=1;
	game.scoreText.setText("Score: " + game.score);
	console.log(game.score);
	spawnClickables();
	}
}

function updateTimer() {
	if (game.timeLeft > 0) {
		game.timeLeft--;
		game.timerText.setText("Time left: " + game.timeLeft);
	} else {
		game.countdownTimer.destroy();
	}

}

function spawnClickables() {
	var newClickable = game.add.sprite(game.input.x, game.input.y, 'cloud');
	newClickable.anchor.setTo(0.5,0.5);
	newClickable.scale.x = 0.25;
	newClickable.scale.y = 0.25;

	game.physics.enable(newClickable, Phaser.Physics.ARCADE); //can enable for whole game or just this object
	newClickable.body.gravity.y = 400;
	xdirection = Math.floor((Math.random() * 400) + 1);
	
	if (xdirection %2 ==0) {
		xdirection = xdirection*-1;
	}
	newClickable.body.gravity.x = xdirection
	newClickable.body.collideWorldBounds = true;
	newClickable.body.bounce.y = 0.1
	newClickable.body.velocity.y = Math.floor((Math.random() * 400) + 1)*-1;

}