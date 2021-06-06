import Board from "../components/Board/Board";
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import ControlPanel from "../components/ControlPanel/ControlPanel";

const useStyles = createUseStyles({
  container: () => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }),
});

const themes = [ 
  {
    name: 'Marsian',
    backgroundHover: '#ffffaa',
    backgroundActive: '#ee2244',
    primary: '#ee2244',
    backgroundPrimary: '#ffffe0',
    background: '#ffffee',
    font: 'monospace'
  },
  {
    name: 'Periwinkle',
    primary: '#000000',
    backgroundPrimary: '#eeeeff',
    backgroundHover: '#ffffff',
    backgroundActive: '#ddeeff',
    font: 'monospace'
  },
]

function Main() {
  const [theme, setTheme] = useState(themes[0])
  const classes = useStyles({ theme });
  const [boardSettings, setBoardSettings] = useState({
    tileWidth: 100,
    tileHeight: 100,
    boardWidth: 4,
    boardHeight: 4,
  })

  return (
    <div className={classes.container}>
      <ControlPanel theme={theme} setTheme={setTheme} themes={themes} boardSettings={boardSettings} setBoardSettings={setBoardSettings} />
      <Board boardSettings={boardSettings} theme={theme} />
    </div>
  );
}
export default Main;
