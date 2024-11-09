export const formatCurrency = (value) => {
    return `${new Intl.NumberFormat('en-US').format(value)}`;
  };