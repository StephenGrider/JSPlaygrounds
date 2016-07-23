import React from 'react';
import { connect } from 'react-redux';
import { changeTheme } from 'actions';
import { themes } from 'themes';

const Header = ({ theme, onChangeTheme}) => {
  const themesOptions = themes.map((t) => <option key={t} value={t}>{t}</option>)
  const stylesheet = theme === 'default' ? null : <link rel="stylesheet" type="text/css" href={`themes/${theme}.css`} />;
  return (
    <header className="Header">
      {stylesheet}
      <select value={theme} onChange={onChangeTheme}>{themesOptions}</select>
    </header>
  );
}

Header.displayName = 'Header';

const mapStateToProps = ({ theme }) => ({ theme });
const mapDispatchToProps = (dispatch) => ({
  onChangeTheme: (e) => dispatch(changeTheme(e.target.value))
});

export default connect(mapStateToProps,mapDispatchToProps)(Header);
