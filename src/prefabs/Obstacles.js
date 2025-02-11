class Obstacles extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.moveSpeed = game.settings.obstacleSpeed
    }
  
    update() {
      // move obstacle wall left
      this.x -= this.moveSpeed;
  
      // destroy once reaches left edge
      if (this.x <= 0 - this.width) {
        this.destroy()
      }
    }

    reset() {
      
    }
  }