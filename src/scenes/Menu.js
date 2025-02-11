class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    
    preload(){
        // load images/tile sprites
        this.load.image('player', './assets/player.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('wall', './assets/wall.png')
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        })
        // load audio
        //this.load.audio('sfx-select', './assets/sfx-select.wav')
        //this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        //this.load.audio('sfx-shot', './assets/sfx-shot.wav')
    }

    create() {
        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 3, 
                first: 0
            }),
            frameRate: 10
        })

        let menuConfig={
            fontFamily: 'Courier',
            fontsize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize-borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use left and right arrows to move and F to fire!', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor='#00FF00'
        menuConfig.color='#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press left for Easy Mode and right for Hard Mode', menuConfig).setOrigin(0.5)
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          //this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
    }
}