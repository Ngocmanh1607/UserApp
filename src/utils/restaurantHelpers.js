export const getDayOfWeek = () => {
  const days = [
    'Chủ nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];
  return days[new Date().getDay()];
};

export const getCurrentDaySchedule = (hours) => {
  if (!hours) return null;

  try {
    const parsedHours = JSON.parse(hours);
    const currentDay = getDayOfWeek();
    return parsedHours.find((schedule) => schedule.day === currentDay);
  } catch (error) {
    console.error('Error parsing hours:', error);
    return null;
  }
};

export const checkIsOpen = (schedule) => {
  if (!schedule) return false;

  const now = new Date();
  const [openHour, openMin] = schedule.open.split(':').map(Number);
  const [closeHour, closeMin] = schedule.close.split(':').map(Number);

  const currentTime = now.getHours() * 60 + now.getMinutes();
  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;

  // Handle cases where closing time is on the next day
  if (closeTime < openTime) {
    return currentTime >= openTime || currentTime <= closeTime;
  }

  return currentTime >= openTime && currentTime <= closeTime;
};

export const formatTime = (timeString) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};
