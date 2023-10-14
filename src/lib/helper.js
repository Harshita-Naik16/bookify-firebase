export const dayMonthYearFormat = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export function sortByDate(orders) {
  return orders.sort(
    (a, b) => b.data().placedOn.seconds - a.data().placedOn.seconds
  );
}
