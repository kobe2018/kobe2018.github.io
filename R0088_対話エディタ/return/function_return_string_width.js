//https://javascript.programmer-reference.com/javascript-han1zen2/
//例）半角文字は1文字、全角文字は2文字として文字数をカウントするFunction

function return_string_width(str){
  let result = 0;
  for(let i=0;i<str.length;i++){
    let chr = str.charCodeAt(i);
    if((chr >= 0x00 && chr < 0x81) ||
       (chr === 0xf8f0) ||
       //(chr >= 0xff61 && chr < 0xffa0) ||
       (chr >= 0xff61 && chr < 0xffa0) ||//半角カタカナ
       (chr >= 0xf8f1 && chr < 0xf8f4)){
      //半角文字の場合は1を加算
      result += 1;
    }else{
      //それ以外の文字の場合は2を加算
      result += 2;
    }
  }
  //結果を返す
  return result;
};
