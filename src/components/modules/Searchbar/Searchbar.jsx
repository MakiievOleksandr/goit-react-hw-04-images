import { useState } from 'react';
import PropTypes from 'prop-types';

import scss from './searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setsearchQuery] = useState('');

  const handleInputChange = ({ target }) => {
    const { value } = target;
    setsearchQuery(value);
  };

  const handleSearchButton = evt => {
    evt.preventDefault();
    if (searchQuery.trim() === '') {
      alert('Enter something');
      return;
    }
    onSubmit(searchQuery);

    setsearchQuery('');
  };

  return (
    <header className={scss.searchbar}>
      <form className={scss.searchForm} onSubmit={handleSearchButton}>
        <button className={scss.searchForm__button} type="submit">
          <span className={scss.searchFormButton__label}>Search</span>
        </button>
        <input
          className={scss.searchForm__input}
          name="searchQuery"
          value={searchQuery}
          type="text"
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
