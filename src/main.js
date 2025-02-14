// Parker Lanum
// 2/12/2025
//
// Other than an interesting implementation of recursively created obstacle walls that works similarly to the paddle parkour version, I'd say
// I am most proud of the way difficulty scales. The distance between the wall obstacles, represented by (340+(30*(1.0001**(-this.p1Score)))) 
// in the AddWall() function is an asymptotic function that brings the gap between the walls closer to 340 pixels (a very tight space) as the 
// player gets further into Planet Crimson.

"use strict"

let config = {
     type: Phaser.AUTO,
     width: 640,
     height: 480,
     scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH
     },
     physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          x: 0,
          y: 0
        }
      }
     },
     scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keySPACE