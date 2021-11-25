import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import World from './World';
import { colors } from './theme';
import Game from './game';
import { parseText } from './utils';

const App: React.FC = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [rows, setRows] = useState<string>('');
  const [cols, setCols] = useState<string>('');

  const handleUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const text = e.target.result;
      const data = parseText(text);
      const newGame = new Game(
        data.rows,
        data.cols,
        data.generation,
        data.grid
      );
      console.log(newGame);
      setGame(newGame);
    };
    reader.readAsText(file);
  };

  const handleNewGame = () => {
    setGame(null);
    if (rows && cols) {
      const newGame = new Game(Number(rows), Number(cols));
      setRows('');
      setCols('');
      setGame(newGame);
    }
  };

  return (
    <>
      {game && <Button onClick={handleNewGame}>NEW</Button>}
      <Container>
        <Global
          styles={css`
            body {
              background: ${colors.background};
            }
          `}
        />
        {game ? (
          <World game={game} />
        ) : (
          <>
            <Title>CONWAY'S GAME OF LIFE</Title>
            <Flex>
              <Box sx={{ margin: '5px' }}>
                <TextField
                  label='Rows'
                  type='number'
                  value={rows}
                  size='small'
                  onChange={(e) => {
                    const num = Number(e.target.value);
                    if (num >= 0 && num <= 100) {
                      setRows(e.target.value);
                    }
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box sx={{ margin: '5px' }}>
                <TextField
                  label='Cols'
                  type='number'
                  value={cols}
                  size='small'
                  onChange={(e) => {
                    const num = Number(e.target.value);
                    if (num >= 0 && num <= 100) {
                      setCols(e.target.value);
                    }
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Button
                variant='contained'
                onClick={handleNewGame}
                disabled={Number(rows) === 0 || Number(cols) === 0}
                size='large'
                sx={{ margin: '5px' }}
              >
                CREATE
              </Button>
              <label htmlFor='contained-button-file'>
                <Input
                  accept='text/plain'
                  id='contained-button-file'
                  multiple
                  type='file'
                  onChange={handleUpload}
                />
                <Button size='large' variant='contained' component='span'>
                  Upload
                </Button>
              </label>
            </Flex>
          </>
        )}
      </Container>
    </>
  );
};

export default App;

const Container = styled.div`
  max-width: 1200px;
  margin: 60px auto;
`;
const Input = styled.input`
  display: none;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  text-align: center;
  color: white;
`