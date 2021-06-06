import React from 'react'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: ({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 300,
    fontFamily: theme.font,
    margin: 15
  }),
  button: ({ theme }) => ({
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    marginLeft: 5,
    border: `4px solid ${theme.primary}`,
    borderRadius: 10,
    '&:hover': {
      background: theme.backgroundHover
    },
    '&:active': {
      background: theme.backgroundActive,
      color: theme.backgroundPrimary,
    }
  }),
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200
  }
});

const Setting = ({ minimum, label, settingKey, settings, setBoardSettings, theme, increment }) => {
  const classes = useStyles({ boardSettings: settings, theme });
  return (
    <div className={classes.container}>
      <div className={classes.labelContainer}>
        <h2 className={classes.label}>
          {label}:
        </h2>
        <h2 className={classes.label}>
          {settings[settingKey]}
        </h2>
      </div>
      <div className={classes.buttonsContainer}>
        <div className={classes.button} onClick={
          () => {
            setBoardSettings((previous) => {
              return {
                ...previous,
                [settingKey]: previous[settingKey] + increment
              }
            })
          }
        }>
          <h2>+</h2>
        </div>
        <div className={classes.button} onClick={
          () => {
            setBoardSettings((previous) => {
              const value = previous[settingKey] - increment;
              if(value < minimum) return previous;
              return {
                ...previous,
                [settingKey]: value
              }
            })
          }}>
          <h2>-</h2>
        </div>
      </div>
    </div>
  )
}

export default Setting;