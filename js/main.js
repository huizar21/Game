var game = new Phaser.Game(800, 600, Phaser.AUTO, 'area', { preload: preload, create: create, update: update });
var soundofwin = new Audio('/music/musicofwin.mp3');
var soundofback = new Audio('/music/Superboy.mp3');
var soundofvita = new Audio('/music/vida.mp3');
var soundoflose = new Audio('/music/lose.mp3');
var soundof
var player;
var platforms;
var platformsdia;
var dia;
var touch=0; 
var touchtext;
var cursors;
var player2;
var textforwinner;
var vita=3;
var vitatext; 

function preload() {
    game.load.image('sky', '/assets/sky.png');
    game.load.image('landscape', '/assets/landscape.png');
    game.load.image('ground', '/assets/platform.png');
    game.load.image('star', '/assets/star.png');
    game.load.image('diamond', '/assets/diamond.png');
    game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
    game.load.spritesheet('bluesky', '/assets/bluesky.png', 32, 48);
}
function create() {
        //  For elements visibles but not animated
        game.add.sprite(0, 0, 'landscape');
        game.add.sprite(100, 10, 'star');
        game.add.sprite(250, 10, 'star');
        game.add.sprite(450, 10, 'star');
        game.add.sprite(650, 10, 'star');
        platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        var ledge = platforms.create(-150, 200, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(400, 350, 'ground');
        ledge.body.immovable = true;
        // For elements that have animations
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player); 
        player.body.bounce.y = 0.5;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        player2 = game.add.sprite(32, game.world.height-150 , 'bluesky');
        game.physics.arcade.enable(player2);
        player2.body.gravity.y=300;
        player2.body.collideWorldBounds =  true;
        player2.body.bounce.setTo(0.5, 0.5);
        
        //Elements that dessapear
        platformsdia = game.add.group();
        platformsdia.enableBody = true;
        dia = game.add.group;
        dia =  platformsdia.create(200, 450, 'diamond');
        dia =  platformsdia.create(300, 500, 'diamond');
        dia =  platformsdia.create(500, 400, 'diamond');
        dia =  platformsdia.create(600, 450, 'diamond');
        dia =  platformsdia.create(700, 500, 'diamond');
        dia =  platformsdia.create(450, 300, 'diamond');
        dia =  platformsdia.create(550, 200, 'diamond');
        dia =  platformsdia.create(200, 150, 'diamond');
        dia =  platformsdia.create(150, 80, 'diamond'); 
        dia =  platformsdia.create(100, 150, 'diamond'); 
        touchtext = game.add.text(16, 50,'Touch: 0', {fontsize: '32px', fill: '#fff'});
        vitatext = game.add.text(650,50,'Life: 3', {fontsize: '32px', fill: '#fff'});
}
function update() {
    soundofback.play();
   game.physics.arcade.collide(player, platforms);
   game.physics.arcade.collide(player2, platforms);
    cursors = game.input.keyboard.createCursorKeys();
    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
    game.physics.arcade.overlap(player, platformsdia, collectdia, null, this);
    player2.body.gravity.x = 150;
    player2.body.gravity.y = 150;
    player2.body.bounce.setTo(1, 1);
    game.physics.arcade.overlap(player, player2,CollideEnemy, null, this);
    
}
function collectdia (player, platformsdia){
    platformsdia.kill();
    touch = touch +1;
    touchtext.text = 'Touch: ' + touch;
    if(touch == 10 && vita >0){
        textforwinner = game.add.text(250, 256,'YOU ARE WINNER', {fontsize: '400px', fill: '#fff'});
        soundofwin.play();
    }
    soundofvita.play();
}
function CollideEnemy(player, player2){
    soundoflose.play();
    if(game.physics.arcade.collide(player2, player)){
        if(vita == 0 && touch<10){
        textforwinner = game.add.text(250,256,'YOU ARE LOSER', {fontsize: '400px', fill: '#fff'}); 
        }
        else if(vita>0){    
            vita--;
            vitatext.text = 'Life: ' + vita;            
        }
    }
}