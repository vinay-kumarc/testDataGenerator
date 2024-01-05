import moment from "moment";

export const isBefore = (firstDate, secondDate) => {
  if (firstDate && secondDate) {
    return moment(firstDate).isBefore(moment(secondDate));
  }
  return false;
};

export const isSameOrBefore = (firstDate, secondDate) => {
  if (firstDate && secondDate) {
    return moment(firstDate).isSameOrBefore(moment(secondDate));
  }
  return false;
};

export const isInFuture = (date) => {
  return moment(date).isAfter(moment());
};

export const getMomentDate = (date) => {
  return moment(date);
};
