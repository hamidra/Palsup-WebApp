import React from 'react';

const SearchBar = () => (
    <div className="row align-content-center justify-content-center align-items-center">
        <label className="mb-3">Feeling like</label>
        <div className="col-12 col-sm-9 input-group mb-3">
            <input type="text" className="form-control" placeholder="Recipient's username"/>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">Button</button>
            </div>
        </div>
    </div>
);

export default SearchBar;
