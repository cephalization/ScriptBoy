import {
  WALKING_VELOCITY,
  JUMP_VELOCITY,
  MAXIMUM_JUMPS,
} from '@src/js/constants';
import { log } from '@src/js/util';

let jumpHeight = JUMP_VELOCITY;
let allowedJumps = MAXIMUM_JUMPS;
let jumpLock = false;

const controlHandler = () => {
  if (cursors.left.isDown) {
    player.setVelocityX(-WALKING_VELOCITY);
    player.flipX = true;
    player.anims.play('walk', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(WALKING_VELOCITY);
    player.flipX = false;
    player.anims.play('walk', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('stand');
  }
};

const velocityAnimationHandler = () => {
  if (player.body.newVelocity.y > 1) {
    player.anims.play('airborn');
  }

  if (player.body.newVelocity.y < 0) {
    player.anims.play('jump');
  }
};

const jumpHandler = () => {
  // Make the second jump in a double jump shorter
  if (allowedJumps < MAXIMUM_JUMPS) {
    jumpHeight = JUMP_VELOCITY + 150;
  } else {
    jumpHeight = JUMP_VELOCITY;
  }

  // Don't duplicate jumping velocity while the up arrow is held
  if (cursors.up.isUp) {
    jumpLock = false;
  }

  // Control jumping, allow jumping twice until the hero hits the ground again
  if (cursors.up.isDown && !jumpLock && allowedJumps > 1) {
    log(`Jumping velocity ${jumpHeight}; Jumps left ${allowedJumps}`);
    player.body.velocity.y = jumpHeight;
    allowedJumps--;
    jumpLock = true;
  }

  // When the hero hits the ground, reset the double jump counter
  // if the hero is in the air, play the jump animation
  if (player.body.touching.down) {
    allowedJumps = MAXIMUM_JUMPS;
  }
};

export default function() {
  const player = window.player;
  const cursors = window.cursors;

  // Prevent the update loop from running when player and cursors are undefined
  if (player === undefined && cursors === undefined) return;

  // Control movement with arrow keys and trigger animations while moving
  controlHandler();
  velocityAnimationHandler();
  jumpHandler();
}
