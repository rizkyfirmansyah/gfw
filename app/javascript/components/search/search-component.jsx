import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import debounce from 'lodash/debounce';

import searchIcon from 'assets/icons/search.svg';
import './search-styles.scss';
import 'styles/themes/search/search-light.scss'; // eslint-disable-line

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.input
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input !== this.props.input) {
      this.setState({ search: nextProps.input });
    }
  }

  handleChange = value => {
    this.setState({ search: value });
    this.debouncedChange();
  };

  debouncedChange = debounce(() => {
    const { onChange } = this.props;
    if (onChange) {
      this.props.onChange(this.state.search);
    }
  }, 150);

  render() {
    const { search } = this.state;
    const {
      input,
      placeholder,
      handleKeyUp,
      disabled,
      className,
      theme
    } = this.props;
    return (
      <div
        className={`c-search ${theme || 'theme-search-light'} ${className ||
          ''}`}
      >
        <input
          type="text"
          className="input text"
          placeholder={placeholder}
          onChange={e => this.handleChange(e.target.value)}
          value={search}
          onKeyUp={handleKeyUp}
          disabled={disabled}
        />
        <Icon icon={searchIcon} className="icon" />
      </div>
    );
  }
}

Search.propTypes = {
  input: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  handleKeyUp: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  theme: PropTypes.string
};

Search.defaultProps = {
  input: ''
};

export default Search;
