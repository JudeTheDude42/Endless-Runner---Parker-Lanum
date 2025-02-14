class Trail extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'trail')
      this.parentScene=scene
      this.scene.add.existing(this)
      this.scene.physics.add.existing(this)
      this.setVelocityX(-256)
      this.scene.time.delayedCall(1000, () => this.destroy());
    }
}