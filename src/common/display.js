/* 转化数字为时间字符串 */
export function parseTime(num) {
  let min = Math.floor(num / 60);
  let sec = Math.floor(num - min * 60);
  sec = ("00" + sec).slice(-2);
  return `${min}:${sec}`;
}
/* 转化数字单位 */
export const changeUnit = (value, base = 10000, point = 0) => {
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

export const showSinger = singers => {
  return singers ? Array.from(singers, ({ id, name }) => name).join("/") : "";
};
