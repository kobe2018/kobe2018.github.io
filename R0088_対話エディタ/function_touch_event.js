function function_touch_event(){
    window.addEventListener("touchstart",function(e){
        let element = document.querySelector('textarea');
        //alert("タッチ");
        let s = "";             // 変数sを初期化
        
       document.querySelector('span').innerText=e.touches.length;
       document.querySelector('span').innerHTML=`<SVG ></SVG>`;
       

        for (var i = 0; i < e.touches.length; i++) {
            var t = e.touches[i];       // 触れている指に関する情報を取得
          
            s += "[" + i + "]";
            s += "Hx=" + t.pageX + ",";//HTML
            s += "Hy=" + t.pageY + "";//HTML
            s += "ブx=" + t.clientX + ",";
            s += "ブy=" + t.clientX + "\n";

        }

/*
        if(e.touches.length == 2 ){
            alert("2タッチ");
        }
        if(e.touches.length == 3){
            alert("3タッチ");
        }
*/
        if(e.touches.length == 4){
            alert("4タッチ");
                element.value  = element.value.slice(0, element.selectionEnd) +`\nタッチされました。` +s +   element.value.slice(element.selectionEnd);        
        }
    }, true);
}