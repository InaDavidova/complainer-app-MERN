export default function dateFormater() {
  const timestamp = new Date();
  let day = timestamp.getDate();
  let month = timestamp.getMonth() + 1;
  let year = timestamp.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return `${year}-${month}-${day}`;
}
