const formatTime = num => {
  const MINUTES_IN_HOUR = 60;
  const MINUTES_IN_DAY = 1440;
  const days = parseInt(num / MINUTES_IN_DAY);
  const hours = parseInt((num % MINUTES_IN_DAY) / MINUTES_IN_HOUR);
  const minutes = parseInt(num % MINUTES_IN_HOUR);
  return `${days} day(s) ${hours} hour(s) ${minutes} minute(s).`;
};
formatTime(1441);
