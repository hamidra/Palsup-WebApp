import moment from 'moment';

export const convertSearchDateToDateRange = search => {
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

export const displayAddress = location => {
  if (location) {
    if (location.address) {
      return location.address;
    } else if (location.city || location.state) {
      let address =
        location.city && location.state
          ? `${location.city},${location.state}`
          : `${location.city || ''} ${location.state || ''}`;
      return address;
    }
  }
};

export const displayEventDate = dateRange => {
  let displayDate;
  if (!dateRange) {
    displayDate = 'Anytime';
  } else if (dateRange.startDate === dateRange.endDate) {
    displayDate = moment(dateRange.startDate).calendar();
  } else {
    displayDate = `${moment(dateRange.startDate).format('lll')} - ${moment(
      dateRange.endDate
    ).format('lll')}`;
  }
  return displayDate;
};

export const getTopN = (users, n) => {
  let topUsers = [];
  if (users) {
    let len = Math.min(users.length, n);
    for (let i = 0; i < len; i++) {
      topUsers.push(users[i]);
    }
  }
  return topUsers;
};
