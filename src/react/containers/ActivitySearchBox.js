import React from 'react';

const ActivitySearchBox = ({ activity, handleActivitySearchSubmit }) => (
  <div>
    <form>
      <div className="search-bar rounded pt-3 p-lg-4 position-relative mt-n5 z-index-20">
        <div className="row">
          <div className="col-lg-7 d-flex align-items-center form-group">
            <input
              type="text"
              name="activity"
              placeholder="Coffee, Swimming, Hiking, ..."
              className="form-control border-0 shadow-0"
              autoComplete="off"
            />
          </div>
          <div className="col-lg-5 d-flex align-items-center form-group">
            <div className="input-label-absolute input-label-absolute-right w-100">
              <label for="location" className="label-absolute mb-0">
                <i className="fa fa-crosshairs" />
                <span className="sr-only">City</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                id="location"
                className="form-control border-0 shadow-0"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row p-1 justify-content-center">
        <div className="col-sm-6 my-1">
          <button class="btn btn-outline-primary rounded-pill w-100 py-sm-3">
            Anytime
          </button>
        </div>
        <div className="col-sm-6 my-1">
          <button class="btn btn-outline-primary rounded-pill w-100 py-sm-3">
            Today
          </button>
        </div>
        <div className="col-sm-6 my-1">
          <button class="btn btn-outline-primary rounded-pill w-100 py-sm-3">
            Tomorrow
          </button>
        </div>
        <div className="col-sm-6 my-1">
          <button class="btn btn-outline-primary rounded-pill w-100 py-sm-3">
            This Week
          </button>
        </div>
        <div className="col-sm-6 my-1">
          <button class="btn btn-outline-primary rounded-pill w-100 py-sm-3">
            Sometime <span className="float-right">></span>
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default ActivitySearchBox;
