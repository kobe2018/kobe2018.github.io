function keyup(element){
  //esc_flag=true;
  element.addEventListener('keyup', function(e) {
    if(e.keyCode === 27) {//esc
      esc_flag = !esc_flag;
      console.log("esc_flag ",esc_flag );
      if(esc_flag){
      //alert("対話モード\n改行毎に「>」が出力されます");        
        document.querySelector('body').style.backgroundColor = 'white';
        document.getElementById("ID_textarea01").style.caretColor = "black";
        document.querySelector('#ID_textarea01').style.color = 'black';

        document.getElementById('ID_svg').innerHTML = "";
        //document.querySelector('#ID_textarea01').style.cursor = 'auto';
        //foo.style.cursor = "auto"; // ← 要素ごとの既定のカーソルに戻ります。
        //element.value  = element.value.slice(0, element.selectionEnd) + "" +   element.value.slice(element.selectionEnd);
      }else{
        //document.querySelector('body').style.backgroundColor = 'gray';
        document.querySelector('body').style.backgroundColor = 'black';
        document.getElementById("ID_textarea01").style.caretColor = "black";//本来はwihite
        document.querySelector('#ID_textarea01').style.color = 'transparent';//文字が透明
        //document.querySelector('#ID_textarea01').style.color = 'red';//文字
                
        document.querySelector('#ID_textarea01').style.cursor = 'default';//マウスカーソルが見える。
      }
    }
		if(clear_flag){
			clear_flag =false;
			element.value="";
		}
  }, false);

    element.addEventListener('keyup', function(e) {
      let start = element.selectionStart;
      let end = element.selectionEnd;
      if(esc_flag){
        //if ( e.keyCode === 13) {//enter
        if ( e.key === "Enter") { // Enterキー
          //element.value  = element.value.slice(0, element.selectionEnd) + "" +   element.value.slice(element.selectionEnd);
          console.log("keyup_end ",end);
          console.log("keyup_after_end ",element.selectionEnd);                    
        }
        if ( e.keyCode === 13) {//enter
                //element.setSelectionRange(end+1, end+1);//テキストの指定位置にカーソルをセット
        }
      }else{ 
      }
  }, false);//    element.addEventListener('keyup', function(e) {
  


  element.addEventListener('keyup', function(e) {
    if(!esc_flag){
      svg_Syntax_highlighting(element);
    }
  }, false);
}

function svg_Syntax_highlighting(element){
  //element.addEventListener('keyup', function(e) {

  //let end = element.selectionEnd;
  //let str_split = element.value.slice(0,end).split("\n");
  let str_split = element.value.split("\n");
  //console.log(str_split);
  document.getElementById('ID_svg').innerHTML = "";
    
  for(let i =0;i <str_split.length;i++){
    let svg_text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    //let x = window.pageXOffset ;// 水平方向
    //let y = window.pageYOffset ;// 垂直方向
      
    svg_text.setAttribute('x', 11);
    svg_text.setAttribute('y', 8+(i+1)*24.4);//本当は24のはずなのに、0.4大きい。なぜ？
    svg_text.textContent = str_split[i];
    svg_text.style.whiteSpace="pre";
    //svg_text.style.fill="white";
      
      //svg_text.style="background-color:#ffffff;fill:red;";
      str_split[i] = str_split[i] 
      
          //.replaceAll("	",`<tspan style ="background-color:#ffffff;fill:white;">　　　</tspan>`)          
          //.replaceAll("<",`<tspan style ="background-color:#ffffff;fill:white;">&lt;</tspan>`)
          .replaceAll("<",`&lt;`)
          .replaceAll(">",`&gt;`)
          //.replaceAll(">",`<tspan style ="background-color:#ffffff;fill:white;">&lt;/tspan>`)
        ;
  //<tspan style ="background-color:#ffffff;fill:blue;  ">　に使われている文字が鬼門らしい。
  //「style」が使えない。 style→　yellow,red,blue
  
// ラーメンを含み、かつ、カレーを含む文字列の表現
//^(?=.*ラーメン)(?=.*カレー).*$
  
  let reg_https = /(?!href='http)(https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/g;
  //let reg_denso = /([\w]{2}[-\*][a-zA-Z0-9]{1}[0-9]{4})/g;//図面電送
  let reg_denso = /([\w]{1}[0-9]{1}[-\*][a-zA-Z0-9]{1}[0-9]{4})/g;//図面電送
  
  let c_uers = /(C:\\Users\\.+)/;
  //C:\Users\
  let reg_SLS = /(SLS[0-9]{7})/g    ;//SLS2000676
  str_split[i] = str_split[i]
    .replace(reg_https,"<tspan><a style='fill:#0000EE;' text-decoration='underline' href='$1'>$1</a></tspan>")
    .replace(reg_denso,`<tspan><a style='fill:#0000EE;' text-decoration='underline' href='http://f-dwgview.mhi.co.jp/DwgDownload/Denso.asp?zuban=$1'>$1</a></tspan>`)
    .replace(reg_SLS,"<tspan><a style='fill:#0000EE;' text-decoration='underline' href='http://foe82d.tmw.mhi.co.jp/SAVVY/attr/Search.asp?KA=13&username=&passwd=&page=Y&text=Y&Search=K&bangou=$1'>$1</a></tspan>")
    .replace(c_uers,`<tspan><a style='fill:#0000EE;' text-decoration='underline' href='file:$1'>$1</a></tspan>`)
    ;  
  /*
  str_split[i] = str_split[i]
    .replaceAll("google",`<tspan><a style="fill:#0000EE;" text-decoration="underline" href="https://www.google.com/">google</a></tspan>`)
    .replaceAll("yahoo",`<tspan><a style="fill:#0000EE;" text-decoration="underline" href="https://news.yahoo.co.jp/">yahoo</a></tspan>`)  
  ;
  */

  let str_red =[];
  /*
  let str_red =[
    "style",//色指定が限界がある。
    "blue",//blue
    "yellow",//yellow
    "red",//red
    "green",//green
    "magenta",//magenta
    "document","backgroundColor","cursor","value",//lightblue
    "function","let","true","false","innerHTML","arguments","const",//blue
    "BODY","getElementById","addEventListener","log","replaceAll","setAttribute","querySelector","split","appendChild",//yellow
    "三上","文孝","fumitaka","mikami",//red
    "1","2","3","4","5","6","7","8","9","0",//red
    //"",//green
    "if","else","for"//magenta
  ];
  */
        svg_text.innerHTML =  str_split[i]          
          .replaceAll(str_red[0], `<tspan style ="background-color:#ffffff;fill:#aaa;"> ${str_red[0]}</tspan>`)//style
          .replaceAll(str_red[1], `<tspan style ="background-color:#ffffff;fill:blue;">${str_red[1]}</tspan>`)//blue
          .replaceAll(str_red[2], `<tspan style ="background-color:#ffffff;fill:yellow;">${str_red[2]}</tspan>`)//yellow
          .replaceAll(str_red[3], `<tspan style ="background-color:#ffffff;fill:red;">${str_red[3]}</tspan>`)//red
          .replaceAll(str_red[4], `<tspan style ="background-color:#ffffff;fill:green;">${str_red[4]}</tspan>`)//green
          .replaceAll(str_red[5], `<tspan style ="background-color:#ffffff;fill:magenta;">${str_red[5]}</tspan>`)//magenta
          .replaceAll(str_red[6], `<tspan style ="background-color:#ffffff;fill:lightblue;">${str_red[6]}</tspan>`)
          .replaceAll(str_red[7], `<tspan style ="background-color:#ffffff;fill:lightblue;">${str_red[7]}</tspan>`)
          .replaceAll(str_red[8], `<tspan style ="background-color:#ffffff;fill:lightblue;">${str_red[8]}</tspan>`)
          .replaceAll(str_red[9], `<tspan style ="background-color:#ffffff;fill:lightblue;">${str_red[9]}</tspan>`)
          .replaceAll(str_red[10],`<tspan style ="background-color:#ffffff;fill:blue;">${str_red[10]}</tspan>`)
          .replaceAll(str_red[11],`<tspan style ="background-color:#ffffff;fill:blue;">${str_red[11]}</tspan>`)
          .replaceAll(str_red[12],`<tspan style ="background-color:#ffffff;fill:blue;">${str_red[12]}</tspan>`)
          .replaceAll(str_red[13],`<tspan style ="background-color:#ffffff;fill:blue;">${str_red[13]}</tspan>`)
          .replaceAll(str_red[14],`<tspan style ="background-color:#ffffff;fill:blue;">${str_red[14]}</tspan>`)
          .replaceAll(str_red[15],`<tspan style ="background-color:#ffffff;fill:blue;">${str_red[15]}</tspan>`)
          .replaceAll(str_red[16],`<tspan style ="background-color:#ffffff;fill:blue;">${str_red[16]}</tspan>`)
          .replaceAll(str_red[17],`<tspan style ="background-color:#ffffff;fill:yellow;">${str_red[17]}</tspan>`)
          .replaceAll(str_red[18],`<tspan style ="background-color:#ffffff;fill:yellow;">${str_red[18]}</tspan>`)
          .replaceAll(str_red[19],`<tspan style ="background-color:#ffffff;fill:yellow;">${str_red[19]}</tspan>`)
          .replaceAll(str_red[20],`<tspan style ="background-color:#ffffff;fill:yellow;">${str_red[20]}</tspan>`)
          .replaceAll(str_red[21],`<tspan style ="background-color:#ffffff;fill:yellow;">${str_red[21]}</tspan>`)
          .replaceAll(str_red[22],`<tspan style ="background-color:#ffffff;fill:yellow;">${str_red[22]}</tspan>`)
          .replaceAll(str_red[23],`<tspan style ="background-color:#ffffff;fill:yellow;">${str_red[23]}</tspan>`)
          .replaceAll(str_red[24],`<tspan style ="background-color:#ffffff;fill:yellow;">${str_red[24]}</tspan>`)
          .replaceAll(str_red[25],`<tspan style ="background-color:#ffffff;fill:yellow;">${str_red[25]}</tspan>`)
          .replaceAll(str_red[26],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[26]}</tspan>`)
          .replaceAll(str_red[27],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[27]}</tspan>`)
          .replaceAll(str_red[28],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[28]}</tspan>`)
          .replaceAll(str_red[29],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[29]}</tspan>`)
          .replaceAll(str_red[30],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[30]}</tspan>`)
          .replaceAll(str_red[31],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[31]}</tspan>`)
          .replaceAll(str_red[32],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[32]}</tspan>`)
          .replaceAll(str_red[33],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[33]}</tspan>`)
          .replaceAll(str_red[34],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[34]}</tspan>`)
          .replaceAll(str_red[35],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[35]}</tspan>`)
          .replaceAll(str_red[36],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[36]}</tspan>`)
          .replaceAll(str_red[37],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[37]}</tspan>`)
          .replaceAll(str_red[38],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[38]}</tspan>`)
          .replaceAll(str_red[39],`<tspan style ="background-color:#ffffff;fill:red;">${str_red[39]}</tspan>`)
          .replaceAll(str_red[40],`<tspan style ="background-color:#ffffff;fill:green;">${str_red[40]}</tspan>`)
          .replaceAll(str_red[41],`<tspan style ="background-color:#ffffff;fill:magenta;">${str_red[41]}</tspan>`)
          .replaceAll(str_red[42],`<tspan style ="background-color:#ffffff;fill:magenta;">${str_red[42]}</tspan>`)
          .replaceAll(str_red[43],`<tspan style ="background-color:#ffffff;fill:magenta;">${str_red[43]}</tspan>`)
          .replaceAll(str_red[44],`<tspan style ="background-color:#ffffff;fill:magenta;">${str_red[44]}</tspan>`)
          
          
          
          ;
          //console.log("1",svg_text);

      document.getElementById('ID_svg').appendChild(svg_text);
      }
  //}, false);
}

