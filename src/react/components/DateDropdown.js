import React from 'react';
import { Dropdown, Button, ButtonGroup, Card } from 'react-bootstrap';
import moment from 'moment';
import DateRangePickerModal from './modals/DateRangePickerModal';

class DateDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.getLabel = this.getLabel.bind(this);
    this.items = {
      soon: 'Soon',
      today: 'Today',
      week: 'This Week',
      weekend: 'This Weekend',
      anytime: 'Anytime',
      sometime: 'Sometime'
    };
  }

  getLabel(date) {
    let label = '';
    if (typeof date === 'string') {
      label = date;
    } else if (date && date.from && date.to) {
      let from = moment(date.from).format('MMM DD');
      let to = moment(date.to).format('MMM DD');
      label = `${from}-${to}`;
    }
    return label;
  }

  render() {
    const { date, handleClick, ...rest } = this.props;
    const items = this.items;
    return (
      <Dropdown {...rest} as={ButtonGroup}>
        <Button
          className="rounded-xl"
          onClick={event => {
            handleClick(date);
            event.preventDefault();
          }}>
          {this.getLabel(date)}
        </Button>

        <Dropdown.Toggle
          split
          className="border-left rounded-xl"
          id="dropdown-split-basic"
        />

        <Dropdown.Menu alignRight>
          {Object.keys(items).map(date => {
            if (date === 'sometime') {
              return (
                <Dropdown.Item as={Button}>
                  <DateRangePickerModal
                    handleSearchClick={date => handleClick(date)}
                  />
                </Dropdown.Item>
              );
            } else {
              return (
                <Dropdown.Item
                  onClick={event => {
                    handleClick(date);
                    event.preventDefault();
                  }}
                  as={Button}>
                  {items[date]}
                </Dropdown.Item>
              );
            }
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default DateDropdown;
