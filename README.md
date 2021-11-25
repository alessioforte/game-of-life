# Conway's Game of Life

The Game of Life (an example of a cellular automaton) is played on an two-dimensional rectangular grid of cells. Each cell can be either alive or dead. The status of each cell changes each turn of the game (also called a generation) depending on the statuses of that cell's 8 neighbors. Neighbors of a cell are cells that touch that cell, either horizontal, vertical, or diagonal from that cell.

The initial pattern is the first generation. The second generation evolves from applying the rules simultaneously to every cell on the game board, i.e. births and deaths happen simultaneously. Afterwards, the rules are iteratively applied to create future generations. For each generation of the game, a cell's status in the next generation is determined by a set of rules. These simple rules are as follows:

If the cell is alive, then it stays alive if it has either 2 or 3 live neighbors
If the cell is dead, then it springs to life only in the case that it has 3 live neighbors.

## Application

In this application you can create a finite grid through input fields or upload an input file formatted as follows:

```
  Generation 3:
  4 8
  ........
  ....*...
  ...**...
  ........
```

As a results you can start simulations, generate the next generation and also download a text file with a representation of the state formatted as above.