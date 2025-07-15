const normalizedDate = (date: Date | string) => {
  if (!date) {
    return "";
  }
  return new Intl.DateTimeFormat("en-CA").format(new Date(date));
};

export default normalizedDate;
