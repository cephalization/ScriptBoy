import {
  WALKING_VELOCITY,
  JUMP_VELOCITY,
  MAXIMUM_JUMPS,
} from '@src/js/constants';
import { log } from '@src/js/util';

/**
 * Handle the inputs to the player character and the associated animations
 */
const controlHandler = ctx => {
  const { player, cursors } = ctx;

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

/**
 * Handle the animation of the player character while their velocity changes
 */
const velocityAnimationHandler = ctx => {
  const { player } = ctx;

  if (player.body.newVelocity.y > 1) {
    player.anims.play('airborn');
  }

  if (player.body.newVelocity.y < 0) {
    player.anims.play('jump');
  }
};

/**
 * Handle all jumping logic. When and how jumping occurs for the player character.
 */
const jumpHandler = (function() {
  let jumpHeight = JUMP_VELOCITY;
  let jumpsLeft = MAXIMUM_JUMPS;
  let jumpLock = false;

  return ctx => {
    const { player, cursors } = ctx;

    // Don't duplicate jumping velocity while the up arrow is held
    // Additionally, prevent double jump until the player starts falling again
    if (
      cursors.up.isUp &&
      (player.body.newVelocity.y > 0.2 || player.body.touching.down)
    ) {
      jumpLock = false;
    }

    // Make the second jump in a double jump shorter
    if (jumpsLeft < MAXIMUM_JUMPS) {
      jumpHeight = JUMP_VELOCITY + 60;
    } else {
      jumpHeight = JUMP_VELOCITY;
    }

    // When the hero hits the ground, reset the double jump counter
    // if the hero is in the air, play the jump animation
    if (player.body.touching.down && !jumpLock) {
      jumpsLeft = MAXIMUM_JUMPS;
    }

    // Control jumping, allow jumping until the hero hits the ground again or there are no more
    // jumps left
    if (cursors.up.isDown && !jumpLock && jumpsLeft > 0) {
      jumpsLeft--;
      jumpLock = true;
      player.body.velocity.y = jumpHeight;
      log(`Jumping velocity ${jumpHeight}; Jumps left ${jumpsLeft}`);
    }
  };
})();

export default function() {
  const { player, cursors } = this;

  // Prevent the update loop from running when player and cursors are undefined
  if (player === null || cursors === null) return;

  // Control movement with arrow keys and trigger animations while moving
  controlHandler(this);
  velocityAnimationHandler(this);
  jumpHandler(this);
}
