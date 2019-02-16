import React from 'react';

const SearchBar = ({ inputValue, handleInputChange, handleButtonClick }) => (
  <div className="row align-content-center justify-content-center align-items-center">
    <label className="mb-3">Feeling like</label>
    <div className="col-12 col-sm-9 input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={inputValue}
        onChange={event => handleInputChange(event.target.value)}
        placeholder="Coffee, Swimming, Running, ... "
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => handleButtonClick()}>
          Button
        </button>
      </div>
    </div>
  </div>
);

export default SearchBar;
