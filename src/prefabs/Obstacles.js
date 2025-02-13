class Obstacles extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed=-2) {
      super(scene, x, y, texture, frame);
      this.parentScene = scene
      this.parentScene.add.existing(this);
      this.moveSpeed = speed
      this.hasCloned=false
      this.counter = 0
    }

    update() {
      // move obstacle wall left
      this.x+=this.moveSpeed
      // destroy once reaches left edge
      if (this.x < -50) {
        this.destroy()
      }
    }
}