import produce from 'immer';

export default class Game {
  public grid: number[][] = this.generateEmptyGrid();
  private operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];

  constructor(
    public rows: number,
    public cols: number,
    public generation: number = 0,
    grid?: number[][]
  ) {
    if (grid) {
      this.grid = grid;
    }
  }

  public generateEmptyGrid() {
    const rows = [];
    for (let i = 0; i < this.rows; i++) {
      rows.push(Array.from(Array(this.cols), () => 0));
    }
    this.grid = rows;
    return rows;
  }

  public reset() {
    this.generation = 0;
    return this.generateEmptyGrid();
  }

  public generateRandomGrid() {
    const rows = [];
    for (let i = 0; i < this.rows; i++) {
      rows.push(
        Array.from(Array(this.cols), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }
    this.grid = rows;
    this.generation = 0;
    return rows;
  }

  public generateNextGrid() {
    const next = produce(this.grid, (gridCopy: number[][]) => {
      for (let i = 0; i < this.rows; i++) {
        for (let k = 0; k < this.cols; k++) {
          let neighbors = 0;
          this.operations.forEach(([x, y]) => {
            const newI = i + x;
            const newK = k + y;
            if (
              newI >= 0 &&
              newI < this.rows &&
              newK >= 0 &&
              newK < this.cols
            ) {
              neighbors += this.grid[newI][newK];
            }
          });

          if (neighbors < 2 || neighbors > 3) {
            gridCopy[i][k] = 0;
          } else if (this.grid[i][k] === 0 && neighbors === 3) {
            gridCopy[i][k] = 1;
          }
        }
      }
    });
    this.generation++;
    this.grid = next;
    return next;
  }

  public activateCell(position: [number, number]) {
    const [i, k] = position;
    const grid = produce(this.grid, (gridCopy: number[][]) => {
      gridCopy[i][k] = this.grid[i][k] ? 0 : 1;
    });
    this.grid = grid;
    return grid;
  }
}
