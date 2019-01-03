import { log } from '@src/js/util';
import { RESOLUTION } from '@src/js/constants';

/**
 * Create the game and additionally load data-uri assets as base64
 */
export default async function() {
  try {
    const { toggleCharacter, tearDownCharacter, setupCharacter } = this;
    log('Rendering assets');

    // Hotswap character model when spacebar is pressed
    this.input.keyboard.on(
      'keydown_SPACE',
      () => {
        const {
          playerMeta: { x, y },
        } = this;

        toggleCharacter();
        tearDownCharacter();
        setupCharacter(x, y);
      },
      this
    );

    // Render background
    this.add.image(0, 0, 'bg').setOrigin(0, 0);

    // Arrange some platforms
    this.generateDebugPlatforms(this);

    // Create default character
    this.setupCharacter();

    // Setup arrow key polling
    this.cursors = this.input.keyboard.createCursorKeys();

    // Instruction box
    this.add
      .text(
        RESOLUTION[0] - 384,
        16,
        'Arrows to move & jump\nSpacebar to switch characters',
        {
          font: '18px monospace',
          fill: '#000000',
          padding: { x: 20, y: 10 },
          backgroundColor: '#ffffff',
        }
      )
      .setScrollFactor(0);
  } catch (e) {
    throw new Error(`Could not load game assets! ${e}`);
  }
}
