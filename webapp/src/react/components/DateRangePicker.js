import React, { Fragment } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class DateRabgePicker extends React.Component {
  static defaultProps = {
    numberOfMonths: 1
  };
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      from: undefined,
      to: undefined
    };
  }
  handleDayClick(day) {
    const range =
      this.state.from && this.state.to
        ? this.getInitialState()
        : DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }
  handleResetClick(event) {
    this.setState(this.getInitialState());
    event.preventDefault();
  }
  handleSearchClick(event) {
    this.props.handleSearchClick(this.state);
    event.preventDefault();
  }
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div>
        <div className="row p-2 justify-content-center ">
          <div className="col-12">
            <DayPicker
              className="Selectable w-100"
              numberOfMonths={this.props.numberOfMonths}
              selectedDays={[from, { from, to }]}
              modifiers={modifiers}
              onDayClick={this.handleDayClick}
            />
          </div>
        </div>
        <div className="row border-top pt-2">
          <div className="col-6 align-content-center">
            {!from && !to && 'select dates'}
            {from && !to && `${from.toLocaleDateString()}`}
            {from &&
              to &&
              `${from.toLocaleDateString()} -
            ${to.toLocaleDateString()}`}
          </div>
          <div className="col-6">
            <Fragment>
              {from && (
                <button
                  className="btn btn-outline-primary"
                  onClick={this.handleResetClick}>
                  Reset
                </button>
              )}
              {to && (
                <button
                  className="btn btn-outline-primary ml-1"
                  onClick={this.handleSearchClick}>
                  Search
                </button>
              )}
            </Fragment>
          </div>
        </div>
      </div>
    );
  }
}
