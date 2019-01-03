export default function() {
  const { player } = this;

  // Prevent the update loop from running when player is undefined
  if (player === null) return;

  // Listen for controls, perform animations and physics
  player.update();
}
