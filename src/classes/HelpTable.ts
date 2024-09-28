export class HelpTable {
  constructor(private moves: string[]) {}

  public displayHelp(): void {
    const cellWidth = 10;
    const header = [
      ' '.padEnd(cellWidth),
      ...this.moves.map((move) => move.padEnd(cellWidth)),
    ];
    console.log(header.join('|'));
    console.log('-'.repeat(header.join('|').length));

    this.moves.forEach((playerMove, playerIndex) => {
      const row = [playerMove.padEnd(cellWidth)];
      this.moves.forEach((_, computerIndex) => {
        let result;
        if (playerIndex === computerIndex) {
          result = 'Draw';
        } else if (
          (computerIndex - playerIndex + this.moves.length) %
            this.moves.length <=
          Math.floor(this.moves.length / 2)
        ) {
          result = 'Win';
        } else {
          result = 'Lose';
        }
        row.push(result.padEnd(cellWidth));
      });
      console.log(row.join('|'));
    });
  }
}
