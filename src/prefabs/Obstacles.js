class Obstacles extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      this.parentScene = scene
      this.parentScene.add.existing(this);
      this.moveSpeed = -2
      this.hasCloned=false
      this.counter = 0
      this.setVelocityX=this.moveSpeed
    }

    update() {
      // move obstacle wall left
      this.counter++
      this.x -= this.moveSpeed;
      if (!this.hasCloned && this.counter>16/this.moveSpeed) { //implementation inspired by paddle parkour
        this.parentScene.addWall(this.parent, this.moveSpeed)
        this.hasCloned=true
      }
  
      // destroy once reaches left edge
      if (this.x <= 0 - this.width) {
        this.destroy()
      }
    }
}