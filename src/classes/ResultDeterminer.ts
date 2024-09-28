export class ResultDeterminer {
  constructor(private moves: string[]) {}

  public determineWinner(playerMove: string, computerMove: string): string {
    const playerIndex = this.moves.indexOf(playerMove);
    const computerIndex = this.moves.indexOf(computerMove);
    const n = this.moves.length;
    const half = Math.floor(n / 2);

    const diff = (playerIndex - computerIndex + n) % n;

    if (playerIndex === computerIndex) return 'Draw';
    if (diff <= half && diff > 0) return 'Player wins';
    return 'Computer wins';
  }
}
