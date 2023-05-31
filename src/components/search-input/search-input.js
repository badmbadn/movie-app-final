import { Input } from 'antd';
import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import './search-input.css';

const SearchInput = ({ setQuery, query }) => {
  const [value, setValue] = useState(query);
  const updateSearchValue = useCallback(
    debounce((str) => {
      setQuery(str);
    }, 500),
    []
  );
  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  return (
    <form className="form-input">
      <Input
        type="search"
        value={value}
        placeholder="Type to search..."
        className="search-input"
        onChange={onChangeInput}
      />
    </form>
  );
};

export default SearchInput;
