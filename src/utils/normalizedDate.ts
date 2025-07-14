const normalizedDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-CA").format(new Date(date));
};

export default normalizedDate;
