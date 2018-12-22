// External Imports
import React from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const ThemeProvider = props => {
  const { storedTheme, children } = props;
  const theme = createMuiTheme(storedTheme);
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

const mapStateToProps = state => ({
  storedTheme: state.theme
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider);
