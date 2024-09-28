import * as readline from 'readline';
import { HMACGenerator } from './HMACGenerator';
import { ResultDeterminer } from './ResultDeterminer';
import { HelpTable } from './HelpTable';

export class Game {
  private computerChoice: string;
  private hmacGenerator: HMACGenerator;
  private resultDeterminer: ResultDeterminer;
  private helpTable: HelpTable;

  constructor(private moves: string[]) {
    if (!this.validateMoves()) {
      process.exit(1);
    }

    this.hmacGenerator = new HMACGenerator();
    this.resultDeterminer = new ResultDeterminer(this.moves);
    this.helpTable = new HelpTable(this.moves);
    this.computerChoice = this.getRandomComputerMove();

    const hmac = this.hmacGenerator.generateHMAC(this.computerChoice);
    console.log(`\nHMAC: ${hmac}`);
  }

  private validateMoves(): boolean {
    if (this.moves.length < 3 || this.moves.length % 2 === 0) {
      console.log('Error: The number of moves must be odd and ≥ 3.');
      return false;
    }
    const uniqueMoves = new Set(this.moves);
    if (uniqueMoves.size !== this.moves.length) {
      console.log('Error: All moves must be unique.');
      return false;
    }
    return true;
  }

  private getRandomComputerMove(): string {
    const index = Math.floor(Math.random() * this.moves.length);
    return this.moves[index];
  }

  public showMenu(): void {
    console.log('\nAvailable moves:');
    this.moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log('0 - exit');
    console.log('? - help');
  }

  public async play(): Promise<void> {
    this.showMenu();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    while (true) {
      const input = await this.getUserInput(rl, '\nEnter your move: ');
      if (this.handleUserInput(input)) break;
    }

    rl.close();
  }

  private async getUserInput(
    rl: readline.Interface,
    promptText: string
  ): Promise<string> {
    return new Promise((resolve) => {
      rl.question(promptText, (answer) => resolve(answer));
    });
  }

  private handleUserInput(input: string): boolean {
    if (input === '0') {
      console.log('Exiting the game.');
      return true;
    } else if (input === '?') {
      this.helpTable.displayHelp();
      return false;
    }

    const playerIndex = parseInt(input) - 1;
    if (
      isNaN(playerIndex) ||
      playerIndex < 0 ||
      playerIndex >= this.moves.length
    ) {
      console.log('Invalid move, please try again.');
      return false;
    }

    const playerMove = this.moves[playerIndex];
    console.log(`Your move: ${playerMove}`);
    console.log(`Computer move: ${this.computerChoice}`);
    console.log(
      `Result: ${this.resultDeterminer.determineWinner(
        playerMove,
        this.computerChoice
      )}`
    );
    console.log(`HMAC key: ${this.hmacGenerator.getKey()}`);
    return true;
  }
}
