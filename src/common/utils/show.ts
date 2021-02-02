/* 转化数字为时间字符串 */
export function parseTime(num: number) {
  let min = Math.floor(num / 60);
  let sec = Math.floor(num - min * 60);
  const str = ("00" + sec).slice(-2);
  return `${min}:${str}`;
}
/* 转化数字为日期 */
export function parseDate(num: number) {
  let date = new Date(num);

  return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
}
/* 转化数字单位 */
export const changeUnit = (value: number, base = 10000, point = 0) => {
  if (!value) {
    return;
  }
  /* 通过判断转化两次单位 */
  let unit = "";
  if (value > base) {
    value = value / base;
    unit = "万";
  }
  if (value > base) {
    value = value / base;
    unit = "亿";
  }
  return value.toFixed(point).toString() + unit;
};
export const showSinger = (singers: ISinger[]) => {
  return singers ? Array.from(singers, ({ id, name }) => name).join("/") : "";
};
