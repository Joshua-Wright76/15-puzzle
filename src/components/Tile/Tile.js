import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: ({ width, height, displayPosition, theme }) => ({
    width,
    height,
    left: displayPosition.x,
    top: displayPosition.y,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'left .1s, top .1s',
  }),
  innerContainer: ({ theme }) => ({
    border: `4px solid ${theme.primary}`,
    borderRadius: 10,
    cursor: 'pointer',
    width: '80%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: `${theme.primary}`,
    fontFamily: 'monospace',
    '&:hover': {
      background: theme.backgroundHover
    },
    '&:active': {
      background: theme.backgroundActive,
      color: theme.backgroundPrimary,
    }
  })
});

const Tile = (props) => {
  const { number, position, width, height, slideTiles } = props;
  const [displayPosition, setDisplayPosition] = useState({ x: position.x * width, y: position.y * height });
  const classes = useStyles({ ...props, displayPosition });
  useEffect(() => {
    setDisplayPosition({ x: position.x * width, y: position.y * height });
  }, [position, width, height])

  const handleClick = () => {
    slideTiles(position);
  };
  return (
    <div
      className={classes.container}
    >
      <div className={classes.innerContainer} onClick={handleClick}>
        <h1>{number}</h1>
      </div>
    </div>
  )
};

export default Tile;