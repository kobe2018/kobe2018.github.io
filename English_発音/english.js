
//const wl = await navigator.wakeLock.request('screen');
//wl.release();
// The wake lock sentinel.

let wakeLock = null;
// Function that attempts to request a wake lock.
const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock was released');
      document.getElementById('ID_wake').innerHTML = "Wake Lock was released";
    });
    console.log('Wake Lock is active');
    document.getElementById('ID_wake').innerHTML = "Wake Lock is active";

  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
    document.getElementById('ID_wake').innerHTML = `${err.name}, ${err.message}`;
  }
};

function click_speeck_type(btn_id , speech , rate_num,i){
  document.getElementById(btn_id).addEventListener("click", function(){
    speech_type(speech , rate_num,i);
  },false);
  }




function return_time(){
  let timer=new Date(); 
  //年・月・日・曜日を取得する
  let year = timer.getFullYear();
  let month = timer.getMonth()+1;
  let week = timer.getDay();
  let day = timer.getDate();
  //時・分・秒を取得する
  let hour = timer.getHours();
  let minute = timer.getMinutes();
  let second = timer.getSeconds();
  let yobi= new Array("日","月","火","水","木","金","土");
  let t = year+"年"+month+"月"+day+"日("+yobi[week] +")  "+ hour+"時" +minute+"分"+second+"秒：";
  return t;
}




let shuffle = ([...array]) => {
for (let i = array.length - 1; i >= 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}
return array;
}