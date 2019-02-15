import moment from 'moment';

export const displayDateFromNow = dateInterval => {
  if (!dateInterval) {
    return 'anytime';
  } else if (dateInterval.startDate && dateInterval.startDate > Date.now()) {
    return moment(dateInterval.startDate).fromNow();
  } else if (dateInterval.endDate && dateInterval.endDate > Date.now()) {
    return `anytime in the next ${moment(dateInterval.endDate).fromNow(true)}`;
  } else {
    return 'passed';
  }
};
