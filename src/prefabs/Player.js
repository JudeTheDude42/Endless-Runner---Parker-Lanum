// Rocket prefab - stolen from rocket patrol
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame)
  
      // add object to existing scene
      scene.add.existing(this)
      this.moveSpeed=2
      //this.sfxShot = scene.sound.add('sfx-shot')
    }

    update() {
        //up and down movement
        if(keySPACE.isDown && this.y >= borderUISize - this.height) {
            this.y -= this.moveSpeed
        }else if(keySPACE.isUp && this.y <= game.config.height - borderUISize - this.height) {
            this.y += this.moveSpeed
        }
    }

    reset(){

    }
}