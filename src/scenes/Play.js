class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xa30000).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xa30000).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xa30000).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xa30000).setOrigin(0, 0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xa30000).setOrigin(0, 0)
        // add rocket (p1)
        this.player = new Player(this, game.config.width + borderUISize + borderPadding, game.config.height/2, 'player').setOrigin(0, 0)
        // add spaceships (x3)
        this.wall = new Obstacles(this, game.config.width,game.config.height/2, 'wall').setOrigin(0, 0)
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        // initialize score
        this.score = 0
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#8403605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        // GAME OVER flag
        this.gameOver = false

        // 60-second play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press SPACE to Restart', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)
    }

    update() {
          // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.restart()
        }
        this.starfield.tilePositionX += 3
        // check collisions
        if(this.checkCollision(this.player, this.wall)) {
            this.player.reset()
            this.shipExplode(this.wall)
        } 
        if(!this.gameOver) {               
            this.player.update()         // update rocket sprite
            this.wall.update()           // update spaceships (x3)
        } 
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("menuScene")
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
        boom.anims.play('explode')           // play explode animation
        boom.on('animationcomplete', () => { // callback after ani completes
          ship.reset()                       // reset ship position
          ship.alpha = 1                     // make ship visible again
          boom.destroy()                     // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score    
        //this.sound.play('sfx-explosion')   
    }
}