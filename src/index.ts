import { Game } from './classes/Game';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Error: Please provide a list of moves as arguments.');
  process.exit(1);
}

const game = new Game(args);
game.play();
