class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    
    preload(){
        // load images/tile sprites
        this.load.image('player', './assets/player.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('wall', './assets/wall.png')
        this.load.image('trail', './assets/trail.png')
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        })
        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-up', './assets/sfx-up.wav')
        this.load.audio('sfx-down', './assets/sfx-down.wav')
        this.load.audio('bgm', './assets/bgm.wav')
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
            fontsize: '50px',
            backgroundColor: '#a30000',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize-borderPadding, 'INTO PLANET CRIMSON', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'HOLD SPACE TO FLY UP AND RELEASE TO FLY DOWN! PRESS SPACE TO PLAY', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize+borderPadding, 'GAMEPLAY, ASSETS AND SOUND EFFECTS CREATED BY PARKER LANUM', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 +borderPadding, 'MUSIC CREATED BY ANDREWM PRAHLOW', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor='#00FF00'
        menuConfig.color='#000'
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.sound.play('sfx-select')
          this.sound.play('bgm', { loop: true })        
          this.scene.start('playScene')    
        }
    }
}