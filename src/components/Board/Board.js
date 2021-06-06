import React, { useEffect, useState } from 'react';
import Tile from '../Tile/Tile';
import { createUseStyles } from 'react-jss';
import { pickWithIndex, chance } from '../../utils/Utils';
import _ from 'lodash';

const useStyles = createUseStyles({
  container: ({ tileWidth, tileHeight, boardWidth, boardHeight, theme }) => ({
    border: `4px solid ${theme.primary}`,
    margin: '15px',
    width: tileWidth * boardWidth,
    height: tileHeight * boardHeight,
    position: 'relative',
    borderRadius: 15,
    background: theme.backgroundPrimary,
    transition: 'width .1s, height .1s'
  })  
});

const generateRandomTilePositions = ({ numberOfTiles, boardHeight, boardWidth }) => {
  const tileNumbers = new Array(numberOfTiles)
    .fill(null)
    .map((value, index) => index);
  const tilePositions = {};
  let hasSkipped = false;
  for(let i = 0; i < boardHeight; i++){
    for(let j = 0; j < boardWidth; j++){
      if(!hasSkipped && chance(numberOfTiles)){
        hasSkipped = true;
      } else {
        if(!tileNumbers.length) break;
        const [number, indexToRemove] = pickWithIndex(tileNumbers);
        tileNumbers.splice(indexToRemove, 1);
        _.setWith(tilePositions, `[${i}]["${j}"]`, number, Object);
      }
    }
  }
  return tilePositions;
}

const findMoveableRowAndColumn = ({ tilePositions, boardHeight, boardWidth }) => {
  const columns = {};
  for(let columnIndex = 0; columnIndex < boardWidth; columnIndex++) {
    for(let rowIndex = 0; rowIndex < boardHeight; rowIndex++){
      const value = _.get(tilePositions, `${rowIndex}.${columnIndex}`);
      if(value !== undefined) {
        _.setWith(columns, `${columnIndex}.${rowIndex}`, value, Object);
      }
    }
  }
  const moveableColumn = Number(Object.keys(columns).find(columnIndex => {
    const column = columns[columnIndex];
    return Object.values(column).length < boardHeight;
  }))

  const rows = tilePositions;
  const moveableRow = Number(Object.keys(rows).find(rowIndex => {
    return Object.values(rows[rowIndex]).length < boardWidth;
  }));

  return {
    moveableRow,
    moveableColumn,
  }
}

const Board = ({
  boardSettings,
  theme
}) => {
  const {
    tileWidth,
    tileHeight,
    boardWidth,
    boardHeight,
  } = boardSettings

  const classes = useStyles({ tileWidth, tileHeight, boardWidth, boardHeight, theme });
  const numberOfTiles = boardHeight * boardWidth - 1;
  const [tilePositions, setTilePositions] = useState(
    generateRandomTilePositions({ numberOfTiles, boardWidth, boardHeight })
  );
  
  useEffect(() => {
    setTilePositions(generateRandomTilePositions({...boardSettings, numberOfTiles}))
  }, [boardSettings, numberOfTiles]);

  const { moveableColumn, moveableRow } = findMoveableRowAndColumn({ tilePositions, boardHeight, boardWidth });
  const emptySpacePosition = { x: moveableColumn, y: moveableRow };

  const slideTiles = (tilePosition) => {
    if(tilePosition.x === emptySpacePosition.x) {
      setTilePositions((previous) => {
        const newTilePositions = _.cloneDeep(previous)
        delete newTilePositions[tilePosition.y][tilePosition.x];
        const lowerBound = Math.min(tilePosition.y, emptySpacePosition.y);
        const upperBound = Math.max(tilePosition.y, emptySpacePosition.y);
        const movement = emptySpacePosition.y > tilePosition.y ? 1 : -1;
        const columnIndex = tilePosition.x;
        for(let rowIndex = lowerBound; rowIndex <= upperBound; rowIndex++){
          const number = previous[rowIndex][columnIndex];
          if(number !== undefined) {
            const newRowIndex = rowIndex + movement;
            _.setWith(newTilePositions, `${newRowIndex}.${columnIndex}` , number, Object);
          }
        } 
        return newTilePositions;
      });
    }
    if(tilePosition.y === emptySpacePosition.y) {
      setTilePositions((previous) => {
        const newTilePositions = _.cloneDeep(previous)
        delete newTilePositions[tilePosition.y][tilePosition.x];

        const lowerBound = Math.min(tilePosition.x, emptySpacePosition.x);
        const upperBound = Math.max(tilePosition.x, emptySpacePosition.x);
        const movement = emptySpacePosition.x > tilePosition.x ? 1 : -1;
        const rowIndex = tilePosition.y;
        for(let columnIndex = lowerBound; columnIndex <= upperBound; columnIndex++) {
          const number = previous[rowIndex][columnIndex];
          if(number !== undefined) {
            const newColumnIndex = columnIndex + movement;
            _.setWith(newTilePositions, `${rowIndex}.${newColumnIndex}` , number, Object);
          }
        }
        return newTilePositions;
      });
    }
  };

  let tiles = [];
  Object.keys(tilePositions).forEach(rowIndex => {
    Object.keys(tilePositions[rowIndex]).forEach(columnIndex => {
      const number = tilePositions[rowIndex][columnIndex];
      const position = { x: Number(columnIndex), y: Number(rowIndex) }
      tiles.push(
        <Tile
          number={number}
          key={number}
          position={position}
          width={tileWidth}
          height={tileHeight}
          slideTiles={slideTiles}
          theme={theme}
        />  
      )
    })
  })
  
  return (
    <>
      <div className={classes.container}>
        {tiles}
      </div>
    </>
  )
};

export default Board;