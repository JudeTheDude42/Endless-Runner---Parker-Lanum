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
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0).setDepth(100)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0).setDepth(100)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0).setDepth(100)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0).setDepth(100)
        //this.add.rectangle(game.config.width - borderUISize*2  , borderUISize*1.8, borderUISize*2, borderUISize, 0xffffff).setOrigin(0, 0).setDepth(101) //score background
        // add rocket (p1)
        this.player = new Player(this, borderUISize + borderPadding*8, game.config.height/2, 'player').setOrigin(0, 0)
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        // display score
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#a30000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.p1Score=0
        this.scoreLeft = this.add.text(game.config.width - borderUISize - borderPadding*10, borderUISize + borderPadding*2, this.p1Score, this.scoreConfig).setOrigin(0, 0).setDepth(104)
        this.scoreLeft.setBackgroundColor('#ffffff')
        // GAME OVER flag
        this.gameOver = false

        this.scoreConfig.fixedWidth = 0
        this.player.setDepth(100)
        this.walls=[]
        this.addWall(game.config.height/2)
        this.counter=0
        this.currHeight=0
        this.prevHeight=game.config.height/2
        this.speed=-2
        this.boomed=false
    }

    addWall(y) {
        let wall = new Obstacles(this, game.config.width, y-(340+(30*(1.0001**(-this.p1Score))))-game.config.height/2, 'wall').setOrigin(0, 0)
        this.walls.push(wall)
        wall = new Obstacles(this, game.config.width, y+(340+(30*(1.0001**(-this.p1Score))))-game.config.height/2, 'wall').setOrigin(0, 0)
        this.walls.push(wall)
    }

    update() {
          // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.time.delayedCall(60, () => {this.scene.restart()}, null, this)
        }
        this.counter++
        if (this.counter>7){
            this.counter=0
            this.currHeight=Math.min(Math.max((this.prevHeight+((Phaser.Math.Between(-28, 28)))), 100), 380)
            this.addWall(this.currHeight)
            this.prevHeight=this.currHeight
        }
        this.starfield.tilePositionX += 1
        // check collisions
        for (let i of this.walls){
            if(!this.boomed && this.checkCollision(this.player, i)) {
                this.boomed=true
                //this.player.reset()
                this.shipExplode(this.player)
                this.gameOver=true
            } 
        }
        if(!this.gameOver) {               
            this.player.update()  
            for (let i of this.walls){
                i.update()
            }
        } 
        if (this.gameOver){
            this.add.text(game.config.width/2, game.config.height/2-64, 'GAME OVER', this.scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'PRESS SPACE TO RESTART', this.scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2, 'YOU TRAVELLED '+ this.p1Score +' METERS', this.scoreConfig).setOrigin(0.5)
        }
        if (!this.gameOver){this.p1Score++}
        this.scoreLeft.text = this.p1Score+"m"
        if (!this.gameOver){
            if (Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.sound.stopByKey('sfx-down')
                this.sound.play('sfx-up') 
            }
            if (Phaser.Input.Keyboard.JustUp(keySPACE)){
                this.sound.stopByKey('sfx-up')
                this.sound.play('sfx-down') 
            }
        } 
    }

    checkCollision(rocket, ship) {
        // collision implementation stolen from rocket patrol
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
        // function once collision is detected also stolen from rocket patrol with minor changes
        ship.alpha = 0                         
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
        boom.anims.play('explode')           
        boom.on('animationcomplete', () => { 
          ship.reset()                     
          boom.destroy()                     
        })
        this.sound.play('sfx-explosion')
    }
}