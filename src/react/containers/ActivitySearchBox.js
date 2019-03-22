import React, { Component } from 'react';
import DateRangePickerModal from '../components/modals/DateRangePickerModal';

export default class ActivitySearchBox extends Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.state = {
      ...props.initialValues,
      location: { city: 'Seattle' }
    };
  }
  handleValueChange(event) {
    let update;
    switch (event.target.name) {
    case 'location':
      //change = { location: { city: event.target.value } };
      update = { location: { city: 'Seattle' } };
      break;
    default:
      update = { [event.target.name]: event.target.value };
    }
    this.setState(update);
  }
  render() {
    const { handleSearchSubmit } = this.props;
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
                  value={this.state.activity || ''}
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
                      (this.state.location && this.state.location.city) || ''
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
              onClick={() =>
                handleSearchSubmit({ ...this.state, date: 'soon' })
              }>
              Soon
            </button>
          </div>
          <div className="card-container m-1">
            <button
              class="btn btn-outline-primary rounded w-100 h-100 py-sm-3"
              onClick={() =>
                handleSearchSubmit({ ...this.state, date: 'today' })
              }>
              Today
            </button>
          </div>
          <div className="card-container m-1">
            <button
              class="btn btn-outline-primary rounded w-100 h-100 py-sm-3"
              onClick={() =>
                handleSearchSubmit({ ...this.state, date: 'week' })
              }>
              This Week
            </button>
          </div>
          <div className="card-container m-1">
            <button
              class="btn btn-outline-primary rounded w-100 h-100 py-sm-3"
              onClick={() =>
                handleSearchSubmit({ ...this.state, date: 'weekend' })
              }>
              This Weekend
            </button>
          </div>
          <div className="card-container m-1">
            <button
              class="btn btn-outline-primary rounded w-100 h-100 py-sm-3"
              onClick={() =>
                handleSearchSubmit({ ...this.state, date: 'anytime' })
              }>
              Anytime
            </button>
          </div>
          <div className="card-container m-1">
            <DateRangePickerModal
              handleSearchClick={date =>
                handleSearchSubmit({ ...this.state, date })
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
