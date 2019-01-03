import {
  JUMP_VELOCITY,
  MAXIMUM_JUMPS,
  WALKING_VELOCITY,
} from '@src/js/constants';

/**
 * Bind animations to the scene the player lives in and the player itself
 *
 * @param {object} scene the scene that the player has been initialized in
 */
const setupAnimations = scene => {
  scene.anims.create({
    key: 'stand',
    frames: [{ key: 'player', frame: 0 }],
  });

  scene.anims.create({
    key: 'walk',
    frames: scene.anims.generateFrameNumbers('player', {
      start: 1,
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'airborn',
    frames: [{ key: 'player', frame: 5 }],
  });

  scene.anims.create({
    key: 'jump',
    frames: [{ key: 'player', frame: 3 }],
    repeat: -1,
  });

  scene.anims.create({
    key: 'double jump',
    frames: [{ key: 'player', frame: 4 }],
    repeat: -1,
  });
};

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
  constructor(scene, x, y) {
    this.scene = scene;

    setupAnimations(this.scene);
    this.sprite = this.scene.physics.add
      .sprite(x, y, 'player')
      .setBounce(0.15)
      .setScale(1.5)
      .setCollideWorldBounds(true);
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
      setJumpHeight(JUMP_VELOCITY + 60);
    } else {
      resetJumpHeight();
    }

    return getJumpsLeft() > 0 && !getJumpLock();
  };

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
    const { getBody, getAnims, getJumpsLeft } = this;
    const body = getBody();
    const anims = getAnims();
    const jumpsLeft = getJumpsLeft();

    // While the player is moving horizontally, walk
    if (body.newVelocity.x != 0) {
      anims.play('walk', true);
    } else {
      anims.play('stand', true);
    }

    // While the player is falling show that animation
    if (body.newVelocity.y > 1) {
      anims.play('airborn');
    }

    // While the player is moving upwards, show jump animation
    if (body.newVelocity.y < 0) {
      if (jumpsLeft === 1) {
        anims.play('jump');
      } else {
        anims.play('double jump');
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
   * Perform all updates to the player on each frame
   */
  update = () => {
    this.handleControls();
    this.handleAnimations();
  };
}
