/**
 * ScriptBoy
 *
 * 2019
 */
import Phaser from "phaser";

const PlayState = {

};

// Initialize the game
window.onload = () => {
 const game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
 game.state.add('play', PlayState);
 game.state.start('play');
}