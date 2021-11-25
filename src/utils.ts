export const parseText = (text: string) => {
  const split = text.split('\n');
  const generation = Number(split[0].slice(-2, -1));
  const size = split[1].split(' ');
  const rows = Number(size[0]);
  const cols = Number(size[1]);
  const map = split.splice(2);
  const grid: number[][] = [];

  map.forEach((item: string) => {
    const row: number[] = [];
    Array.from(item).forEach((cell) => {
      const state = cell === '.' ? 0 : 1;
      row.push(state);
    });
    grid.push(row);
  });

  return { generation, rows, cols, grid };
};

export const createText = (generation: number, grid: number[][]): string => {
  const head = `Generazione ${generation}:\n`;
  const size = `${grid.length} ${grid[0].length}\n`;
  let body = '';
  grid.forEach((row: number[]) => {
    let line = '';
    row.forEach((item: number) => {
      const char = item ? '*' : '.';
      line = line + char;
    });
    line = line + '\n';
    body = body + line;
  });

  return head + size + body;
};

export const downloadTextFile = (text: string) => {
  var c = document.createElement('a');
  c.download = 'game-next-state.txt';

  const blob = new Blob([text], {
    type: 'text/plain',
  });
  c.href = window.URL.createObjectURL(blob);
  c.click();
};
