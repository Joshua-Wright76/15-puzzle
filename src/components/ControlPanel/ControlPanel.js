import React from 'react';
import { createUseStyles } from 'react-jss';
import Setting from './components/Setting';

const useStyles = createUseStyles({
  container: ({ theme }) => ({
    border: `4px solid ${theme.primary}`,
    borderRadius: 10,
    background: theme.backgroundPrimary,
    color: theme.primary,
  }),
  themePickerContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  themeButton: ({ theme }) => ({
    border: `4px solid ${theme.primary}`,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    fontFamily: theme.font,
    '&:hover': {
      background: theme.backgroundHover
    },
    '&:active': {
      background: theme.backgroundActive,
      color: theme.backgroundPrimary,
    },
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'max-content',
    height: 'max-content',
  }),
  themeButtonSelected: ({ theme }) => ({
    background: theme.primary,
    color: theme.backgroundPrimary
  }),
  themeLabel: () => ({
    lineHeight: .05
  })
});

const ControlPanel = (props) => {
  const { theme, themes, setTheme, setBoardSettings, boardSettings } = props;
  const classes = useStyles({ ...props });

  return (
    <>
      <div className={classes.container}>
        <Setting
          increment={1}
          minimum={2}
          theme={theme}
          label="Board Width"
          settings={boardSettings}
          setBoardSettings={setBoardSettings}
          settingKey="boardWidth"
          key="boardWidth"
        />
        <Setting
          increment={1}
          minimum={2}
          theme={theme}
          label="Board Height"
          settings={boardSettings}
          setBoardSettings={setBoardSettings}
          settingKey="boardHeight"
          key="boardHeight"
        />
        <Setting
          increment={50}
          minimum={50}
          theme={theme}
          label="Tile Height"
          settings={boardSettings}
          setBoardSettings={setBoardSettings}
          settingKey="tileHeight"
          key="tileHeight"
        />
        <Setting
          increment={50}
          minimum={50}
          theme={theme}
          label="Tile Width"
          settings={boardSettings}
          setBoardSettings={setBoardSettings}
          settingKey="tileWidth"
          key="tileWidth"
        />
        <div className={classes.themePickerContainer}>
          {themes.map(item => {
            let themeButtonClassNames = classes.themeButton;
            if(item.name === theme.name) themeButtonClassNames += ` ${classes.themeButtonSelected}`;
            return (
              <div className={themeButtonClassNames}
                onClick={() => {
                  setTheme(item)
                }}
              >
                <h2 className={classes.themeLabel}>{item.name}</h2>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
};

export default ControlPanel;