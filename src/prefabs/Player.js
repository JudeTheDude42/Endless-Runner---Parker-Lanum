// Rocket prefab - stolen from rocket patrol
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame)
        this.parentScene=scene
      // add object to existing scene
      this.parentScene.add.existing(this)
      this.moveSpeed=2
    }

    update() {
        //up and down movement
        let trail = new Trail(this.parentScene, this.x+16, this.y+30, this.moveSpeed)
        if(keySPACE.isDown && this.y >= this.height/2) {
            this.y -= this.moveSpeed
            this.setFlipY(false)
        }else if(keySPACE.isUp && this.y <= game.config.height - borderUISize - this.height) {
            this.y += this.moveSpeed
            this.setFlipY(true)
        }
    }

    reset(){
      this.x=1000
      this.y=1000
    }
}