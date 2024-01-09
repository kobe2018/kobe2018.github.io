function output_day(day_num){
    let element = document.querySelector('textarea');
    let end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
    let today = new Date();
    today.setDate( today.getDate() + day_num );//再定義

    let year= today.getFullYear();
    let month_plus =  today.getMonth()+1;
    let month= ( '00' + month_plus ).slice(-2);
    let day = ( '00' + today.getDate() ).slice(-2);
    let dayOfWeek = today.getDay() ; // 曜日(数値)
    let dayOfWeekStr = [ "(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)" ][dayOfWeek] ; // 曜日(日本語表記)
    element.value  = element.value.slice(0, end) +"\n" + year + "/" +  month  + "/" + day + dayOfWeekStr+ element.value.slice(end);
    element.setSelectionRange(end+14, end+14);

}

function output_year(year_num){
    let element = document.querySelector('textarea');
    let end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
    let today = new Date();
    today.setDate( today.getDate() + year_num*365 );//再定義

    let year= today.getFullYear();
    let month_plus =  today.getMonth()+1;
    let month= ( '00' + month_plus ).slice(-2);
    let day = ( '00' + today.getDate() ).slice(-2);
    let dayOfWeek = today.getDay() ; // 曜日(数値)
    let dayOfWeekStr = [ "(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)" ][dayOfWeek] ; // 曜日(日本語表記)
    element.value  = element.value.slice(0, end) +"\n" + year + "年"+ element.value.slice(end);
    element.setSelectionRange(end+6, end+6);
}


function output_10years_age(years_number){
    let element = document.querySelector('textarea');
    let end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
   console.log("years_number ",years_number);//1990年代
    let years;Number(years_number.substr(0,3)*10);
    console.log("years ",years);//1990
    
    for(let i=9;i>-1;i--){
        let years = Number(years_number.substr(0,3)*10) + i;
        element.value  = element.value.slice(0, end) +"\n" +years +"年　" + element.value.slice(end);
    }
				element.setSelectionRange(end+70, end+70);

}