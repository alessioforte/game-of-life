import React, { useState, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { colors } from './theme';
import Game from './game';
import { createText, downloadTextFile } from './utils';

interface Props {
  game: Game;
}

const World: React.FC<Props> = ({ game }) => {
  const [grid, setGrid] = useState(game.grid);
  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    const next = game.generateNextGrid();
    setGrid(next);
    setTimeout(runSimulation, 100);
  }, [game]);

  const handleStart = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const handleRandom = () => {
    const rows = game.generateRandomGrid();
    setGrid(rows);
  };

  const handleClear = () => {
    const g = game.reset();
    setGrid(g);
  };

  const handleActivateCell = (position: [number, number]) => {
    const newGrid = game.activateCell(position);
    setGrid(newGrid);
  };

  const handleNext = () => {
    const nextGrid = game.generateNextGrid();
    setGrid(nextGrid);
  };

  const handleDownload = useCallback(() => {
    console.log(game);
    const next = createText(game.generation, game.grid);
    downloadTextFile(next);
  }, [game]);

  return (
    <>
      <Header>
        <Button isRunning={running} onClick={handleStart}>
          {running ? 'STOP' : 'START'}
        </Button>
        <Button onClick={handleNext}>NEXT</Button>
        <Button onClick={handleRandom}>RANDOM</Button>
        <Button onClick={handleClear}>CLEAR</Button>
        <Button onClick={handleDownload}>DOWNLOAD</Button>
      </Header>
      <Box>
        <Grid cols={game.cols}>
          {grid.map((rows, i) =>
            rows.map((_col, k) => (
              <Cell
                key={`${i}-${k}`}
                onClick={() => handleActivateCell([i, k])}
                style={{
                  backgroundColor: grid[i][k] ? colors.primary : undefined,
                }}
              />
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};

export default World;

const cellSize = 30;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;
const Button = styled.button<{ isRunning?: boolean }>`
  border: 0;
  margin: 0 10px;
  min-height: 42px;
  min-width: 100px;
  border-radius: 5px;
  ${({ isRunning }) =>
    isRunning
      ? `
    border: 1px solid #c4314b;
    color: white;
    background: #c4314b;
  `
      : `
    border: 1px solid ${colors.primary};
    color: ${colors.primary};
    background: transparent;
    &:hover {
      background: ${colors.primary};
      color: ${colors.background};
    }
  `}
  cursor: pointer;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Grid = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: ${({ cols }) => `repeat(${cols}, ${cellSize}px)`};
  grid-gap: 1px;
  padding: 1px;
  margin: auto;
`;
const Cell = styled.div`
  width: ${cellSize}px;
  height: ${cellSize}px;
  background: ${colors.flatground};
  &:hover {
    opacity: 0.3;
    cursor: pointer;
  }
`;
