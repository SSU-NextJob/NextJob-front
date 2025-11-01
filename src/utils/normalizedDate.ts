const normalizedDate = (date: Date | string) => {
  if (!date) {
    return "";
  }
  return new Intl.DateTimeFormat("en-CA").format(new Date(date));
};

export const formatDateTimeForAPI = (date: Date | string) => {
  if (!date) {
    return "";
  }
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default normalizedDate;
