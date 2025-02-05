// Rocket prefab - stolen from rocket patrol
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame)
  
      // add object to existing scene
      scene.add.existing(this)
      this.moveSpeed=2
      this.sfxShot = scene.sound.add('sfx-shot')
    }

    update() {
        //left/right movement
        if(!this.isFiring) {
            if(keySPACE.isDown && this.y >= borderUISize + this.width) {
                this.x -= this.moveSpeed
            }else if(keySPACE.isUp && this.y <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed
            }
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false
            this.y = game.config.height - borderUISize - borderPadding
        }
    }

    reset(){
        this.y=game.config.height-borderUISize-borderPadding
    }
}