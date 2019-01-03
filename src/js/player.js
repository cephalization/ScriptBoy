import {
  JUMP_VELOCITY,
  MAXIMUM_JUMPS,
  WALKING_VELOCITY,
} from '@src/js/constants';

/**
 * The player class
 *
 * Handles all player related information:
 * Physics,
 * Jumping,
 * Animations,
 * Controls
 *
 * Before instantiation, ensure that a sprite sheet is loaded for the player.
 * setupAnimations() may need to be updated if the spritesheet changes and frames are reordered.
 */
export default class Player {
  constructor(scene, x, y, key = 'player') {
    this.scene = scene;

    this.sprite = this.scene.physics.add
      .sprite(x, y, key)
      .setBounce(0.15)
      .setScale(1.5)
      .setCollideWorldBounds(true);

    this.playerAnimations = {
      stand: `${key}_stand`,
      walk: `${key}_walk`,
      airborn: `${key}_airborn`,
      jump: `${key}_jump`,
      doubleJump: `${key}_double jump`,
    };
  }

  /* Dynamic Player Information */
  jumpHeight = JUMP_VELOCITY;
  jumpsLeft = MAXIMUM_JUMPS;
  jumpLock = false;

  /* Useful getters to phaser properties */
  getAnims = () => this.sprite.anims;
  getBody = () => this.sprite.body;
  getControls = () => this.scene.cursors;

  /* Human readable statuses translated from phaser properties */
  getStatus = () => ({
    // Check if the player is touching the ground
    isGrounded: this.sprite.body.touching.down,
  });

  /* Functions for tracking how many times the player has jumped in air */
  getJumpsLeft = () => this.jumpsLeft;
  decrementJumpsLeft = () => this.jumpsLeft--;
  resetJumpsLeft = () => (this.jumpsLeft = MAXIMUM_JUMPS);

  /* Functions for tracking when the player is allowed to jump */
  enableJumpLock = () => (this.jumpLock = true);
  disableJumpLock = () => (this.jumpLock = false);
  getJumpLock = () => this.jumpLock;

  /* Functions for tracking how high the player can jump */
  setJumpHeight = height => (this.jumpHeight = height);
  getJumpHeight = () => this.jumpHeight;
  resetJumpHeight = () => (this.jumpHeight = JUMP_VELOCITY);

  /**
   * Check if the player is allowed to jump, also track x-jumping
   */
  canJump = () => {
    const {
      getStatus,
      getJumpsLeft,
      setJumpHeight,
      resetJumpHeight,
      resetJumpsLeft,
      getJumpLock,
    } = this;
    const playerStatus = getStatus();

    // When the player hits the ground, reset the double jump counter
    if (playerStatus.isGrounded) {
      resetJumpsLeft();
    }

    // Make the second jump in a double jump shorter
    if (getJumpsLeft() < MAXIMUM_JUMPS) {
      setJumpHeight(JUMP_VELOCITY + 40);
    } else {
      resetJumpHeight();
    }

    return getJumpsLeft() > 0 && !getJumpLock();
  };

  /**
   * If allowed, make the player jump
   */
  jump = () => {
    const {
      canJump,
      getBody,
      decrementJumpsLeft,
      enableJumpLock,
      getJumpHeight,
    } = this;
    const body = getBody();

    // allow jumping until the player hits the ground again or there are no more
    // jumps left
    if (canJump()) {
      decrementJumpsLeft();
      enableJumpLock();
      body.velocity.y = getJumpHeight();
    }
  };

  /**
   * Handle the animation of the player character while their velocity changes
   */
  handleAnimations = () => {
    const { getBody, getAnims, getJumpsLeft, playerAnimations } = this;
    const body = getBody();
    const anims = getAnims();
    const jumpsLeft = getJumpsLeft();

    // While the player is moving horizontally, walk
    if (body.newVelocity.x != 0) {
      anims.play(playerAnimations.walk, true);
    } else {
      anims.play(playerAnimations.stand, true);
    }

    // While the player is falling show that animation
    if (body.newVelocity.y > 1) {
      anims.play(playerAnimations.airborn);
    }

    // While the player is moving upwards, show jump animation
    if (body.newVelocity.y < 0) {
      if (jumpsLeft === 1) {
        anims.play(playerAnimations.jump);
      } else {
        anims.play(playerAnimations.doubleJump);
      }
    }
  };

  /**
   * Handle the inputs to the player character and the associated animations
   */
  handleControls = () => {
    const { getControls, sprite, jump, disableJumpLock } = this;
    const cursors = getControls();

    if (cursors.left.isDown) {
      sprite.setVelocityX(-WALKING_VELOCITY);
      sprite.flipX = true;
    } else if (cursors.right.isDown) {
      sprite.setVelocityX(WALKING_VELOCITY);
      sprite.flipX = false;
    } else {
      sprite.setVelocityX(0);
    }

    if (cursors.up.isDown) {
      jump();
    } else {
      disableJumpLock();
    }
  };

  /**
   * Track the player's position in the scene so other functions can access it
   */
  recordPosition = () => {
    const {
      sprite: { x, y },
      scene,
    } = this;

    scene.playerMeta = {
      ...scene.playerMeta,
      x,
      y,
    };
  };

  /**
   * Perform all updates to the player on each frame
   */
  update = () => {
    this.handleControls();
    this.handleAnimations();
    this.recordPosition();
  };
}
