import React, { Component } from 'react';
import DateRangePickerModal from '../components/modals/DateRangePickerModal';

export default class ActivitySearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
  }
  handleValueChange(event) {
    let change;
    switch (event.target.name) {
    case 'location':
      change = { location: { city: event.target.value } };
      break;
    default:
      change = { [event.target.name]: event.target.value };
    }
    change && this.props.handleSearchValueChange(change);
  }
  render() {
    const { searchValues, handleActivitySearchForDate } = this.props;
    return (
      <div>
        <form>
          <div className="search-bar rounded p-2 position-relative z-index-20">
            <div className="row">
              <div className="col-lg-7 d-flex align-items-center form-group">
                <input
                  type="text"
                  name="activity"
                  placeholder="Coffee, Swimming, Hiking, ..."
                  className="form-control border-0 shadow-0"
                  autoComplete="off"
                  value={(searchValues && searchValues.activity) || ''}
                  onChange={this.handleValueChange}
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
                    className="form-control border-0 shadow-0 disabled"
                    value={
                      (searchValues &&
                        searchValues.location &&
                        searchValues.location.city) ||
                      ''
                    }
                    onChange={this.handleValueChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div class="row py-1 justify-content-center">
          <div className="card-container m-1">
            <button
              class="btn btn-outline-primary rounded w-100 h-100 py-sm-3"
              onClick={() => handleActivitySearchForDate('soon')}>
              Soon
            </button>
          </div>
          <div className="card-container m-1">
            <button
              class="btn btn-outline-primary rounded w-100 h-100 py-sm-3"
              onClick={() => handleActivitySearchForDate('today')}>
              Today
            </button>
          </div>
          <div className="card-container m-1">
            <button
              class="btn btn-outline-primary rounded w-100 h-100 py-sm-3"
              onClick={() => handleActivitySearchForDate('week')}>
              This Week
            </button>
          </div>
          <div className="card-container m-1">
            <button
              class="btn btn-outline-primary rounded w-100 h-100 py-sm-3"
              onClick={() => handleActivitySearchForDate('weekend')}>
              This Weekend
            </button>
          </div>
          <div className="card-container m-1">
            <button
              class="btn btn-outline-primary rounded w-100 h-100 py-sm-3"
              onClick={() => handleActivitySearchForDate('anytime')}>
              Anytime
            </button>
          </div>
          <div className="card-container m-1">
            <button
              class="btn btn-outline-primary rounded w-100 h-100 py-sm-3"
              data-toggle="modal"
              data-target="#activityDateRangePicker">
              Sometime <span className="d-block float-right">></span>
            </button>
          </div>
          <DateRangePickerModal
            modalId="activityDateRangePicker"
            handleSearchClick={dateRange =>
              handleActivitySearchForDate(dateRange)
            }
          />
        </div>
      </div>
    );
  }
}
