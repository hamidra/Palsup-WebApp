import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'soon', label: 'Soon' },
  { value: 'tooday', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'weekend', label: 'This weekend' },
  { value: 'anytime', label: 'Anytime' },
  { value: 'sometime', label: 'Sometime' }
];
const customStyles = {
  container: provided => ({ ...provided, width: '100%' }),
  control: provided => ({
    ...provided,
    border: '0 !important',
    // This line disable the blue border
    boxShadow: '0 !important',
    '&:hover': {
      border: '0 !important'
    }
  }),
  indicatorSeparator: provided => ({ ...provided, display: 'none' })
};

class DateDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    console.log('Option selected:', selectedOption);
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        styles={customStyles}
        value={selectedOption}
        placeholder={'When ...'}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default DateDropdown;
{
  /*<div class="row py-1 justify-content-center">
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
            <button
              class="btn btn-outline-primary rounded w-100 h-100 py-sm-3"
              data-toggle="modal"
              data-target="#activityDateRangePicker">
              Sometime <span className="d-block float-right">></span>
            </button>
          </div>
          <DateRangePickerModal
            modalId="activityDateRangePicker"
            handleSearchClick={date =>
              handleSearchSubmit({ ...this.state, date })
            }
          />
          </div>*/
}
