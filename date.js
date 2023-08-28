function getDate() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Lưu ý tháng trong JavaScript bắt đầu từ 0, nên cần +1
  const year = currentDate.getFullYear();

  const monthNew = month < 10 ? `0${month}` : month;
  const formattedDate = `${hours}:${minutes}:${seconds} ${day}/${monthNew}/${year}`;
  return formattedDate;
}

module.exports = getDate;
