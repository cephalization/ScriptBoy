import { WALKING_VELOCITY, JUMP_VELOCITY } from '@src/js/constants';

export default function() {
  const player = window.player;
  const cursors = window.cursors;

  if (cursors.left.isDown) {
    player.setVelocityX(-WALKING_VELOCITY);
    player.flipX = true;
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(WALKING_VELOCITY);
    player.flipX = false;
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(JUMP_VELOCITY);
  }
}
