import moment from 'moment';

export const searchDateToDateRange = search => {
  let date = undefined;
  switch (search) {
  case 'soon':
    date = {
      startDate: moment().toDate(),
      endDate: moment()
        .add(5, 'h')
        .toDate()
    };
    break;
  case 'today':
    date = {
      startDate: moment().toDate(),
      endDate: moment()
        .add(1, 'd')
        .toDate()
    };
    break;
  case 'week':
    date = {
      startDate: moment()
        .startOf('day')
        .toDate(),
      endDate: moment()
        .day(8)
        .startOf('day')
        .toDate()
    };
    break;
  case 'weekend':
    date = {
      startDate: moment()
        .day(6)
        .startOf('day')
        .toDate(),
      endDate: moment()
        .day(8)
        .startOf('day')
        .toDate()
    };
    break;
  }
  if (!date && search && search.from && search.to) {
    date = { startDate: search.from, endDate: search.to };
  }
  return date;
};

export const displayDateFromNow = dateRange => {
  if (!dateRange) {
    return 'anytime';
  } else if (dateRange.startDate && dateRange.startDate > Date.now()) {
    return moment(dateRange.startDate).fromNow();
  } else if (dateRange.endDate && dateRange.endDate > Date.now()) {
    return `anytime in the next ${moment(dateRange.endDate).fromNow(true)}`;
  } else {
    return 'past';
  }
};
