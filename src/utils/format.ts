import dayjs from 'dayjs';

export const formatMonth = (date: string | Date) => {
  const today = dayjs(new Date());
  const target = dayjs(date);

  if (target.format('YYYY-MM') === today.format('YYYY-MM')) {
    return '本月';
  } else if (target.year() === today.year()) {
    return target.format('MM月');
  }
  return target.format('YYYY年MM月');
};

export const substring = (str: string,len: number) => {
  //length属性读出来的汉字长度为1
  if(str.length*2 <= len) {
    return str;
  }

  let strlen = 0;
  let s = "";

  for(let i = 0;i < str.length; i++) {
    s = s + str.charAt(i);
    if (str.charCodeAt(i) > 128) {
      strlen = strlen + 2;
      if(strlen >= len){
        return s.substring(0,s.length-1) + "...";
      }
    } else {
      strlen = strlen + 1;
      if(strlen >= len){
        return s.substring(0,s.length-2) + "...";
      }
    }
  }

  return s;
};
