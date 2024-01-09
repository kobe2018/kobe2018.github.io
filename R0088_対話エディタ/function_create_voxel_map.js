
function function_create_voxel_map(prog_input){
    let element = document.querySelector('textarea');
    let select_end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
    let input_stirng;

    let reg_voxel_test = /^テスト$|^voxel$/;
    if(prog_input.match(reg_voxel_test) ){
        element.value =element.value.slice(0, select_end) +`\n<voxel>
<am>
０１２３４５６７８９ＡＢＣＤＥＦＧ
<revolve>
🟦🟦🟦🟩🟩

　　　　　　　🟩🟩🟪🟪
🟥🟧
🟥🟥🟧
🟥🟥🟥　🟥　
　　　　🟧🟧
　　　　　　🟨
🟩　　🟩　　🟩　　🟩🟩🟩🟩🟩🟩
</voxel>`+ element.value.slice(select_end);
    }
    
    let reg_voxel_form = /^ボクセルフォーム$|^voxel$/;
    //wallスタート　⇒amが次になる。
    if(prog_input.match(reg_voxel_form) ){
        element.value =element.value.slice(0, select_end) +`\n<voxel>
<ground>
    
<wall>
    
<am>


<🟥>

<layer color="🟥">
<layer color="#ff0000">

<color>

<build>

<leftwall>

<らせん>

<extrude 押し出し>
<Revolve 回転、公転>
<rotate 自転>
<切り取り>


</voxel>
`+ element.value.slice(select_end);
    }

    let reg_voxel = /^ボクセル$|^voxel$/;
    //wallスタート　⇒amが次になる。
    if(prog_input.match(reg_voxel) ){
        element.value =element.value.slice(0, select_end) +`
wall -> amの順番で作成して下さい

<voxel>
<ground />
🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟦🟪🟫⬛⬜░▒▓ground

<wall />

　　　🟨
　　🟥🟨🟨
　🟥🟨🟨🟨🟧
🟥🟥🟥🟥🟧🟧🟧

<wall />

🟨
<am>
🟦🟦🟦🟪🟪
🟪🟪🟪🟪🟪

🟦

<am repeat="2" />

🟥🟧🟨🟩🟦🟪🟫⬛⬜░▒▓
<am>
┌─┬─┐
│１│１│
├─┼─┤
│🟧│🟧│
└─┴─┘
┏┓┗┛━┃╋
<am>
🚗🌲🌳🏠🏯🏢🌸🧱🕯⛰🏔
🛤
🛤
◢◣◤◥
あいうえお。かきくけこ。さしすせそ。たちつってと　なにぬねの　はひふへほ　まみむめも　やゆよ　らりすれろ　わをん
ぁぃぅぇぉ。がぎぐげご、ざじずぜぞ。だぢづでど　　　　　　　　ばびぶべぼ
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　ぱぴぷぺぽ

アイウエオ　カキクケコ　サイスセソ　　　　　　　
０１２３４５６７８９
</voxel>
`+ element.value.slice(select_end);
    }

//**************************************************************
    let reg_end_voxel_map = /^\<\/voxel\>$/;
    if(prog_input.match(reg_end_voxel_map) ){
        let before_end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
        let str_split = element.value.slice(0,before_end).split("\n");
        console.log("voxel " + str_split.length +  "行目です: "+ str_split.slice(-1)[0] );
    
        let string_of_Multiple_lines = "";
        for(let i = str_split.length-2; i > -2; i--){
            console.log("▶行数"+i+" → "+str_split[i]);
            
            if(str_split[i] === "<voxel>" ){
                input_stirng = string_of_Multiple_lines;
                let input_str_new_line_split = input_stirng.split("\n");                
                let [floor_z,floor_y,wall_z,wall_y,Revolve_y] = [-1,-1,0,-1,-1];


//2次元配列を初期化(3行10列の2次元配列)
let voxel_map = new Array(30);	//0～49
let voxel_type = new Array(30);	//0～49

//alert("高さ上限は" + voxel_map.length + "です。");
for (let q = 0; q < voxel_map.length; q++){  
  voxel_map[q] = new Array(30);	//0～49
  voxel_type[q] = new Array(30);	//0～49
}

//2次元配列に値をセット
for (let i = 0; i < voxel_map.length; i++){
	for (let j = 0; j < voxel_map[i].length; j++){
    voxel_map[i][j] = [];//voxel_map[i][j] = new Array(50);
    voxel_type[i][j] = [];//voxel_type[i][j] = new Array(50);
	}
}

let reg_floor_repeat_num = /^\<am repeat="(\d*)" *\/*\>$/;
let reg_wall_repeat_num = /^\<wall repeat="(\d*)" *\/*\>$/;

let repeat_n = 1;
let TagName = "am";

for(let n = 0; n < input_str_new_line_split.length-1; n++){
    if (input_str_new_line_split[n] == "<am />" || input_str_new_line_split[n] == "<am>"|| input_str_new_line_split[n] == "<am/>"||input_str_new_line_split[n] == "<積層>" ){
        //floor_zの初期値は、0 = -1 + 1;
        floor_z = floor_z +  repeat_n;
        repeat_n =1;
        floor_y = -1;
        
        if(TagName == "ground"){
          floor_z = floor_z - 1;
        }
        
        TagName = "am";
    }else if(input_str_new_line_split[n].match(reg_floor_repeat_num) ){
        floor_z = floor_z +  repeat_n;
        repeat_n = parseInt(input_str_new_line_split[n].match(reg_floor_repeat_num)[1],10);
        console.log("繰り返し回数 " + repeat_n);
        floor_y = -1;
        
        if(TagName == "ground"){
          floor_z = floor_z - 1;
        }
        
        TagName = "am";
    }else if(input_str_new_line_split[n] == "<ground />" || input_str_new_line_split[n] == "<ground>"|| input_str_new_line_split[n] == "<ground/>" ){
        //floor_zの初期値は、0 = -1 + 1;
        floor_z = floor_z +  repeat_n;
        repeat_n =1;
        floor_y = -1;
        TagName = "ground";
   
    }else if (input_str_new_line_split[n] == "<wall />" || input_str_new_line_split[n] == "<wall>"|| input_str_new_line_split[n] == "<wall/>"|| input_str_new_line_split[n] == "<壁>"){
        wall_y = wall_y +  repeat_n;
        repeat_n =1;
        wall_z = 0;
        TagName = "wall";
    }else if(input_str_new_line_split[n].match(reg_wall_repeat_num) ){                        
        wall_y = wall_y +  repeat_n;
        repeat_n = parseInt(input_str_new_line_split[n].match(reg_wall_repeat_num)[1],10);
        wall_z = 0;
        TagName = "wall";
    }else if (input_str_new_line_split[n] == "<ground />" || input_str_new_line_split[n] == "<ground>"|| input_str_new_line_split[n] == "<ground/>"){
        TagName = "ground";
    }else if (input_str_new_line_split[n] == "<revolve />" || input_str_new_line_split[n] == "<revolve>"|| input_str_new_line_split[n] == "<revolve/>"){
        //floor_zの初期値は、0 = -1 + 1;
        floor_z = floor_z +  repeat_n;
        repeat_n =1;
        floor_y = -1;
        Revolve_y = -1;
        TagName = "revolve";
    }else if (input_str_new_line_split[n] == "</am>"){
    }else if (input_str_new_line_split[n] == "</wall>"){
    }else if (input_str_new_line_split[n] == "</ground>"){
    }else{  
      let oneLine_arr = Array.from(input_str_new_line_split[n]);//サロゲートペア対応のsplit
        if(TagName == "ground" ){//平面
            floor_y++;
            let floor_z_const = floor_z;
            if (input_str_new_line_split[n] != ""){
                for (let re = 1; re <= repeat_n;re++){
                  //oneLine_arr = oneLine_arr.map(x => [x,"gournd"]);//これ動くけど4重配列になるので凍結
                  voxel_map[floor_y][floor_z] =  oneLine_arr;
                  //voxel_map[floor_y][floor_z].type =  "ground";
                  voxel_type[floor_y][floor_z] = oneLine_arr.map(x => x= "ground");
                  floor_z++;
                }
            }
            floor_z = floor_z_const;//次の行の為に、高さを初期化する。 
        }else if(TagName == "am" ){//0,積層開始
            floor_y++;
            const floor_z_const = floor_z;
            if (input_str_new_line_split[n] != ""){
                for (let re = 1; re <= repeat_n;re++){
                  if(  voxel_map[floor_y][floor_z].length > 0 ){//配列内に前任者あり
                    //if(  voxel_map[floor_y][floor_z].length >= oneLine_arr.length ){
                      
                      for(let l=0; l<oneLine_arr.length;l++){
                        if(oneLine_arr[l] !="　"){
                          //alert(" oneLine_arr[l]:"+ oneLine_arr[l] );
                          voxel_map[floor_y][floor_z][l] = oneLine_arr[l];
                          voxel_type[floor_y][floor_z][l] = "am";
                        }
                      }

                  }else{//配列内に前任者無なので、そのまま入力
                      voxel_map[floor_y][floor_z] =  oneLine_arr;
                      voxel_type[floor_y][floor_z] = oneLine_arr.map(x => x= "am");
                  }
                  floor_z++;
                }
            }
            floor_z = floor_z_const;//次の行の為に、高さを初期化する。



        }else if(TagName == "revolve" ){//軸公転
          floor_y++;
          Revolve_y++;
          const floor_z_const = floor_z;
          if (input_str_new_line_split[n] != ""){
              for (let re = 1; re <= repeat_n;re++){
                if(  voxel_map[floor_y][floor_z].length > 0 ){//配列内に前任者あり
                  //if(  voxel_map[floor_y][floor_z].length >= oneLine_arr.length ){
                    
                    for(let l=0; l<oneLine_arr.length;l++){
                      if(oneLine_arr[l] !="　"){
                        //alert(" oneLine_arr[l]:"+ oneLine_arr[l] );
                        voxel_map[floor_y][floor_z][l] = oneLine_arr[l];
                        voxel_type[floor_y][floor_z][l] = "revolve";
                        
                        //voxel_type[floor_y][floor_z].splice(0,0,oneLine_arr.map(x => x= "revolve"));
                      }
                    }
                }else{//配列内に前任者無なので、そのまま入力
                    voxel_map[floor_y][floor_z] =  oneLine_arr;
                    voxel_type[floor_y][floor_z] = oneLine_arr.map(x => x= "revolve");
                    //voxel_type[floor_y][floor_z].splice(0,0,oneLine_arr.map(x => x= "revolve"));
                }
                floor_z++;
              }
          }
          floor_z = floor_z_const;//次の行の為に、高さを初期化する。


      }else if(TagName == "wall" ){//1,壁づくり
        wall_z ++;
        let wall_y_const = wall_y;
        for (let re = 1; re <= repeat_n;re++){
                //voxel_map[wall_y][wall_z] =  arr;//これだとひっくり返るので✖
                //voxel_map[wall_y].shift();
                //voxel_map[wall_y].unshift(arr);//これだとひっくり返らないので〇
                voxel_map[wall_y].splice(0,0,oneLine_arr);//splice(start, deleteCount, item1) start:配列を変更する先頭の位置,deleteCount:startの位置から取り除く古い要素の個数,item1:配列に追加する要素
                voxel_type[wall_y].splice(0,0,oneLine_arr.map(x => x= "wall"));
            wall_y++;
        }
        wall_y = wall_y_const; 
    }
    }//for(let n = 0; n < input_str_new_line_split.length-1; n++){
}

console.log(`voxcel_map `,voxel_map);
console.log(`voxcel_type `,voxel_type);

let voxel_map_vertices = "";//vertices = 頂点
let voxel_map_triangles = "";//
let vertex_sum =0;

                for(let y = 0; y < voxel_map.length; y++){                    
                    //console.log("(6_floor数) " + voxel_map.length);
                    for(let f = 0; f < voxel_map[y].length; f++){                               
                        //console.log("(7_y方向数)" + voxel_map[f].length);
                        for(let x = 0; x <= voxel_map[y][f].length; x++){                            
                            //console.log("(8_x方向数)" + voxel_map[f][y].length);
                            let code_num = -1;                         
                            
                            if (voxel_map[y][f][x] == "🟥"){code_num = 0;
                            }else if (voxel_map[y][f][x] == "🟧"){code_num = 1;
                            }else if (voxel_map[y][f][x] == "🟨"){code_num = 2;
                            }else if (voxel_map[y][f][x] == "🟩"){code_num = 3;
                            }else if (voxel_map[y][f][x] == "🟦"){code_num = 4;
                            }else if (voxel_map[y][f][x] == "🟪"){code_num = 5;
                            }else if (voxel_map[y][f][x] == "🟫"){code_num = 6;
                            }else if (voxel_map[y][f][x] == "⬛"){code_num = 7;
                            }else if (voxel_map[y][f][x] == "⬜"){code_num = 8;
                            }else if (voxel_map[y][f][x] == "░"){code_num = 9;
                            }else if (voxel_map[y][f][x] == "▒"){code_num = 10;
                            }else if (voxel_map[y][f][x] == "▓"){code_num = 11;

                            }else if (voxel_map[y][f][x] == "◢"){code_num = 9698;
                            }else if (voxel_map[y][f][x] == "◣"){code_num = 9699;
                            }else if (voxel_map[y][f][x] == "◤"){code_num = 9700;
                            }else if (voxel_map[y][f][x] == "◥"){code_num = 9701;

                            }else if (voxel_map[y][f][x] == "."){code_num = 46;    
                            }else if (voxel_map[y][f][x] == "1"){code_num = 49;//31
                            }else if (voxel_map[y][f][x] == "2"){code_num = 50;//32
                            }else if (voxel_map[y][f][x] == "3"){code_num = parseInt("33", 16);//51
                            }else if (voxel_map[y][f][x] == "4"){code_num = 52;//34
                            }else if (voxel_map[y][f][x] == "5"){code_num = 53;//35
                            }else if (voxel_map[y][f][x] == "6"){code_num = 54;//36
                            }else if (voxel_map[y][f][x] == "7"){code_num = 55;//37
                            }else if (voxel_map[y][f][x] == "8"){code_num = 56;//38
                              
                            }else if (voxel_map[y][f][x] == "A"){code_num = 65;//41
                            }else if (voxel_map[y][f][x] == "a"){code_num = 97;//61
                            }else if (voxel_map[y][f][x] == "b"){code_num = 98;//62    
                            }else if (voxel_map[y][f][x] == "─"){code_num = 9472;//2500
                            }else if (voxel_map[y][f][x] == "━"){code_num = 9473;//2501    
                            }else if (voxel_map[y][f][x] == "│"){code_num = 9474;//2502
                            }else if (voxel_map[y][f][x] == "┃"){code_num = 9475;//2503 
                            }else if (voxel_map[y][f][x] == "┌"){code_num = 9484;//250C
                            }else if (voxel_map[y][f][x] == "┏"){code_num = 9487;//250F    
                            }else if (voxel_map[y][f][x] == "┐"){code_num = 9488;//2510
                            }else if (voxel_map[y][f][x] == "┓"){code_num = 9491;//2513    
                            }else if (voxel_map[y][f][x] == "└"){code_num = 9492;//2514
                            }else if (voxel_map[y][f][x] == "┗"){code_num = 9495;//2517    
                            }else if (voxel_map[y][f][x] == "┘"){code_num = 9496;//2518
                            }else if (voxel_map[y][f][x] == "┛"){code_num = 9499;//251B

                            }else if (voxel_map[y][f][x] == "├"){code_num = 9500;//251C
                            }else if (voxel_map[y][f][x] == "┤"){code_num = 9508;//2524
                            }else if (voxel_map[y][f][x] == "┬"){code_num = 9516;//252C
                            }else if (voxel_map[y][f][x] == "┴"){code_num = 9524;//2534        
                            }else if (voxel_map[y][f][x] == "┼"){code_num = 9532;//253C
                            }else if (voxel_map[y][f][x] == "╋"){code_num = 9547;//254B
                                
                            }else if (voxel_map[y][f][x] == "⛰"){code_num = 9968;//⛰　山

                            }else if (voxel_map[y][f][x] == "あ"){code_num = parseInt("3041", 16);  //  12353;
                            }else if (voxel_map[y][f][x] == "ぁ"){code_num = 12354;
                            }else if (voxel_map[y][f][x] == "い"){code_num = 12355;
                            }else if (voxel_map[y][f][x] == "ぃ"){code_num = 12356;
                            }else if (voxel_map[y][f][x] == "う"){code_num = 12357;
                            }else if (voxel_map[y][f][x] == "ぅ"){code_num = 12358;
                            }else if (voxel_map[y][f][x] == "え"){code_num = 12359;
                            }else if (voxel_map[y][f][x] == "ぇ"){code_num = 12360;
                            }else if (voxel_map[y][f][x] == "お"){code_num = 12361;
                            }else if (voxel_map[y][f][x] == "ぉ"){code_num = 12362;

                            }else if (voxel_map[y][f][x] == "か"){code_num = 12363;//304B
                            }else if (voxel_map[y][f][x] == "が"){code_num = 12364;
                            }else if (voxel_map[y][f][x] == "き"){code_num = 12365;
                            }else if (voxel_map[y][f][x] == "ぎ"){code_num = 12366;
                            }else if (voxel_map[y][f][x] == "く"){code_num = 12367;
                            }else if (voxel_map[y][f][x] == "ぐ"){code_num = 12368;
                            }else if (voxel_map[y][f][x] == "け"){code_num = 12369;
                            }else if (voxel_map[y][f][x] == "げ"){code_num = parseInt("3052", 16); //  12370;
                            }else if (voxel_map[y][f][x] == "こ"){code_num = 12371;
                            }else if (voxel_map[y][f][x] == "ご"){code_num = 12372;

                            }else if (voxel_map[y][f][x] == "さ"){code_num = 12373;
                            }else if (voxel_map[y][f][x] == "ざ"){code_num = 12374;    
                            }else if (voxel_map[y][f][x] == "し"){code_num = 12375;
                            }else if (voxel_map[y][f][x] == "じ"){code_num = 12376;    
                            }else if (voxel_map[y][f][x] == "す"){code_num = 12377;
                            }else if (voxel_map[y][f][x] == "ず"){code_num = 12378;    
                            }else if (voxel_map[y][f][x] == "せ"){code_num = 12379;
                            }else if (voxel_map[y][f][x] == "ぜ"){code_num = 12380;    
                            }else if (voxel_map[y][f][x] == "そ"){code_num = 12381;
                            }else if (voxel_map[y][f][x] == "ぞ"){code_num = 12382;
                                
                            }else if (voxel_map[y][f][x] == "た"){code_num = 12383;
                            }else if (voxel_map[y][f][x] == "だ"){code_num = 12384;    
                            }else if (voxel_map[y][f][x] == "ち"){code_num = 12385;
                            }else if (voxel_map[y][f][x] == "ぢ"){code_num = 12386;
                            }else if (voxel_map[y][f][x] == "っ"){code_num = 12387;
                            }else if (voxel_map[y][f][x] == "つ"){code_num = 12388;
                            }else if (voxel_map[y][f][x] == "づ"){code_num = 12389;    
                            }else if (voxel_map[y][f][x] == "て"){code_num = 12390;
                            }else if (voxel_map[y][f][x] == "で"){code_num = 12391;    
                            }else if (voxel_map[y][f][x] == "と"){code_num = 12392;
                            }else if (voxel_map[y][f][x] == "ど"){code_num = 12393;

                            }else if (voxel_map[y][f][x] == "な"){code_num = 12394;
                            }else if (voxel_map[y][f][x] == "に"){code_num = 12395;
                            }else if (voxel_map[y][f][x] == "ぬ"){code_num = 12396;
                            }else if (voxel_map[y][f][x] == "ね"){code_num = 12397;
                            }else if (voxel_map[y][f][x] == "の"){code_num = 12398;
                                
                            }else if (voxel_map[y][f][x] == "は"){code_num = 12399;
                            }else if (voxel_map[y][f][x] == "ば"){code_num = 12400;
                            }else if (voxel_map[y][f][x] == "ぱ"){code_num = 12401;    
                            }else if (voxel_map[y][f][x] == "ひ"){code_num = 12402;
                            }else if (voxel_map[y][f][x] == "び"){code_num = 12403;
                            }else if (voxel_map[y][f][x] == "ぴ"){code_num = 12404;
                            }else if (voxel_map[y][f][x] == "ふ"){code_num = 12405;
                            }else if (voxel_map[y][f][x] == "ぶ"){code_num = 12406;
                            }else if (voxel_map[y][f][x] == "ぷ"){code_num = 12407;
                            }else if (voxel_map[y][f][x] == "へ"){code_num = 12408;
                            }else if (voxel_map[y][f][x] == "べ"){code_num = 12409;
                            }else if (voxel_map[y][f][x] == "ペ"){code_num = 12410;
                            }else if (voxel_map[y][f][x] == "ほ"){code_num = 12411;
                            }else if (voxel_map[y][f][x] == "ぼ"){code_num = 12412;
                            }else if (voxel_map[y][f][x] == "ぽ"){code_num = 12413;
                           
                            }else if (voxel_map[y][f][x] == "ま"){code_num =  parseInt("307E", 16);//12414
                            }else if (voxel_map[y][f][x] == "み"){code_num =  parseInt("307F", 16); 
                            }else if (voxel_map[y][f][x] == "む"){code_num =  parseInt("3080", 16); 
                            }else if (voxel_map[y][f][x] == "め"){code_num =  parseInt("3081", 16); 
                            }else if (voxel_map[y][f][x] == "も"){code_num =  parseInt("3082", 16); 
                           
                            }else if (voxel_map[y][f][x] == "ゃ"){code_num =  parseInt("3083", 16);
                            }else if (voxel_map[y][f][x] == "や"){code_num =  parseInt("3084", 16);
                            }else if (voxel_map[y][f][x] == "ゅ"){code_num =  parseInt("3085", 16);
                            }else if (voxel_map[y][f][x] == "ゆ"){code_num =  parseInt("3086", 16);
                            }else if (voxel_map[y][f][x] == "ょ"){code_num =  parseInt("3087", 16);//12423
                            }else if (voxel_map[y][f][x] == "よ"){code_num =  parseInt("3088", 16);

                            }else if (voxel_map[y][f][x] == "ら"){code_num =  parseInt("3089", 16);
                            }else if (voxel_map[y][f][x] == "り"){code_num =  parseInt("308A", 16);
                            }else if (voxel_map[y][f][x] == "る"){code_num =  parseInt("308B", 16);
                            }else if (voxel_map[y][f][x] == "れ"){code_num =  parseInt("308C", 16);
                            }else if (voxel_map[y][f][x] == "ろ"){code_num =  parseInt("308D", 16);//12429

                           
                            }else if (voxel_map[y][f][x] == "０"){code_num = 65296;
                            }else if (voxel_map[y][f][x] == "１"){code_num = 65297;
                            }else if (voxel_map[y][f][x] == "２"){code_num = 65298;
                            }else if (voxel_map[y][f][x] == "３"){code_num = 65299;
                            }else if (voxel_map[y][f][x] == "４"){code_num = 65300;
                            }else if (voxel_map[y][f][x] == "５"){code_num = 65301;
                            }else if (voxel_map[y][f][x] == "６"){code_num = 65302;
                            }else if (voxel_map[y][f][x] == "７"){code_num = 65303;
                            }else if (voxel_map[y][f][x] == "８"){code_num = 65304;    
                            }else if (voxel_map[y][f][x] == "９"){code_num = 65305;

                            }else if (voxel_map[y][f][x] == "Ａ"){code_num = parseInt("FF21", 16);//65313
                            }else if (voxel_map[y][f][x] == "Ｂ"){code_num = 65314;
                            }else if (voxel_map[y][f][x] == "Ｃ"){code_num = parseInt("FF23", 16);//65315
                            }else if (voxel_map[y][f][x] == "Ｃ"){code_num = parseInt("FF23", 16);//
                            }else if (voxel_map[y][f][x] == "Ｄ"){code_num = parseInt("FF24", 16);//
                            }else if (voxel_map[y][f][x] == "Ｅ"){code_num = parseInt("FF25", 16);//
                            }else if (voxel_map[y][f][x] == "Ｆ"){code_num = parseInt("FF26", 16);//65318
                            }else if (voxel_map[y][f][x] == "Ｇ"){code_num = parseInt("FF27", 16);//65319
                              
                            }else if (voxel_map[y][f][x] == "ａ"){code_num = 65345;
                            }else if (voxel_map[y][f][x] == "ｂ"){code_num = 65346;

                            //}else if (voxel_map[y][f][x] == "🚗"){code_num = 128663;
                            //}else if (voxel_map[y][f][x] == "🌲"){code_num = 127794;
                            //}else if (voxel_map[y][f][x] == "🌳"){code_num = 127795;
                            //}else if (voxel_map[y][f][x] == "🏠"){code_num = 127968;
                            //}else if (voxel_map[y][f][x] == "🏯"){code_num = 127983;
                            //}else if (voxel_map[y][f][x] == "🛤"){code_num = 128740;//線路
                            //}else if (voxel_map[y][f][x] == "🏢"){code_num = 127970;//
                            //}else if (voxel_map[y][f][x] == "🌸"){code_num = 127800;
                            //}else if (voxel_map[y][f][x] == "🧱"){code_num = 129521;
                            //}else if (voxel_map[y][f][x] == "🕯"){code_num = 128367;                          
                        }

if (code_num >=0 && code_num <=11){//色正方形から、色立方体を作成する。🟥🟧🟨🟩🟦🟪🟫⬛⬜░▒▓
  if(voxel_type[y][f][x] == "ground" ){//grounadタイプならば平面
    voxel_map_vertices = voxel_map_vertices + `					<vertex x="${0+y}" y="${0+x}" z="${0+f}" />`+"\n";
    voxel_map_vertices = voxel_map_vertices + `					<vertex x="${0+y}" y="${1+x}" z="${0+f}" />`+"\n";
    voxel_map_vertices = voxel_map_vertices + `					<vertex x="${1+y}" y="${0+x}" z="${0+f}" />`+"\n";
    voxel_map_vertices = voxel_map_vertices + `					<vertex x="${1+y}" y="${1+x}" z="${0+f}" />`+"\n";
    voxel_map_triangles = func_create_Plane_from_2triangles_from_4vertices(voxel_map_triangles,vertex_sum,code_num);
    vertex_sum = vertex_sum+4;

  }else if(voxel_type[y][f][x] == "revolve" ){//軸転による回転体造形
    let Number_of_repetitions_line =0;//repetitions:四角文字が、横方向に連続どれくらい繰り返ししている値

    //横方向が四角が横方向に連続しているか？
    for(let n = x;n <= x + voxel_map[y][f].length;n++){
      if(voxel_map[y][f][n] != "" && voxel_map[y][f][n] != undefined && voxel_map[y][f][n] == voxel_map[y][f][n+1]){
        Number_of_repetitions_line++;
      }else{break;}
    }//四角の上辺の横方向で円が連続しているか？　終わり

    //元の円柱を消す 
    if(Number_of_repetitions_line>0){
      for(let xx = x+1; xx <= x + Number_of_repetitions_line; xx++){
        voxel_map[y][f][xx] ="";
      }
    }

    const div_circle = 36;//標準は36
    let semiDia = Revolve_y - y + 1;
    //alert("半径:" + semiDia + "_最大半径:" +Revolve_y + "_"+ y);
    const square_array = ["🟥","🟧","🟨","🟩","🟦","🟪","🟫","⬛","⬜"];
    let color_num = square_array.indexOf(voxel_map[y][f][x]) ;
    let Re_Line = Number_of_repetitions_line;
    if(semiDia <2){
//円柱に穴が無い場合
    //for(let updw=0;updw <2;updw++){
    let updw=0;//左端からの円
    voxel_map_vertices = voxel_map_vertices + `					<vertex x="${y+semiDia}" z="${f}" y="${(1.0*updw+f-f+x)}" />`+"\n";//左端からの円の中心
    for(let c =div_circle;c >=0; c--){        
      let rad = 2*(1*c/div_circle)*Math.PI; 
      voxel_map_vertices = voxel_map_vertices + `					<vertex x="${semiDia*Math.sin(rad)+y+semiDia}"  y="${1.0*updw+f-f+x}" z="${semiDia*Math.cos(rad)+f}" />`+"\n";
      }
    
    updw=1;//右端円
    voxel_map_vertices = voxel_map_vertices + `					<vertex x="${y+semiDia}" z="${f}" y="${(1.0*updw+f-f+x +Re_Line)}" />`+"\n";//右端円の中心
    for(let c =div_circle;c >=0; c--){        
      let rad = 2*(1*c/div_circle)*Math.PI; 
        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${semiDia*Math.sin(rad)+y+semiDia}"  y="${1.0*updw+f-f+x +Re_Line}" z="${semiDia*Math.cos(rad)+f}" />`+"\n";
      }
    //}//for(let updw=0;updw <2;updw++){
      voxel_map_triangles = func_create_Cylinder_from_96triangles_from_50vertices(voxel_map_triangles,vertex_sum,color_num,div_circle);                                
      vertex_sum = vertex_sum+div_circle * 2 +4;
    }else{
//円柱に穴がある場合
      //for(let updw=0;updw <2;updw++){
        updw=0;//左端からの円
        for(let c =div_circle;c >=0; c--){
          let rad = 2*(1*c/div_circle)*Math.PI; 
          voxel_map_vertices = voxel_map_vertices + `					<vertex x="${semiDia*Math.sin(rad)+y+semiDia}" z="${semiDia*Math.cos(rad)+f}" y="${updw+x}" />`+"\n";
        }
        for(let c =div_circle;c >=0; c--){
          let rad = 2*(1*c/div_circle)*Math.PI; 
          voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(semiDia-1)*Math.sin(rad)+y+semiDia}" z="${(semiDia-1)*Math.cos(rad)+f}" y="${updw+x}" />`+"\n";
        }

        updw=1;//右端円 
        for(let c =div_circle;c >=0; c--){
          let rad = 2*(1*c/div_circle)*Math.PI; 
          voxel_map_vertices = voxel_map_vertices + `					<vertex x="${semiDia*Math.sin(rad)+y+semiDia}" z="${semiDia*Math.cos(rad)+f}" y="${updw+x+Re_Line}" />`+"\n";
        }
        for(let c =div_circle;c >=0; c--){
          let rad = 2*(1*c/div_circle)*Math.PI; 
          voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(semiDia-1)*Math.sin(rad)+y+semiDia}" z="${(semiDia-1)*Math.cos(rad)+f}" y="${updw+x+Re_Line}" />`+"\n";
        }
        voxel_map_triangles = func_create_Cylinder_from_96triangles_from_50vertices_hole(voxel_map_triangles,vertex_sum,color_num,div_circle);
        //}//for(let updw=0;updw <2;updw++){
      vertex_sum = vertex_sum + div_circle * 4 +4;                                  
    }//else{



  }else{//amやwallタイプならば、立方体
        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${0+y}" y="${0+x}" z="${0+f}" />`+"\n";
        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${0+y}" y="${1+x}" z="${0+f}" />`+"\n";
        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${1+y}" y="${0+x}" z="${0+f}" />`+"\n";
        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${1+y}" y="${1+x}" z="${0+f}" />`+"\n";
        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${0+y}" y="${0+x}" z="${1+f}" />`+"\n";
        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${0+y}" y="${1+x}" z="${1+f}" />`+"\n";
        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${1+y}" y="${0+x}" z="${1+f}" />`+"\n";
        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${1+y}" y="${1+x}" z="${1+f}" />`+"\n";                                       
        voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,code_num);
        vertex_sum = vertex_sum+8;
    }//軸転による回転体造形終わり
}////色正方形から、色立方体を作成する。🟥🟧🟨🟩🟦🟪🟫⬛⬜░▒▓　終わり
                        

                            if (code_num >=9698 && code_num <=9701){//◢◣◤◥
                                let div = 1;
                                let triangle = {
                                     9698 : {x1:1,y1:0,x2:1,y2:1,x3:0,y3:1},//◢&#x25E2; &#9698;
                                     9699 : {x1:0,y1:0,x2:1,y2:0,x3:1,y3:1},//◣&#x25E3; &#9699;
                                     9700 : {x1:0,y1:0,x2:1,y2:0,x3:0,y3:1},//◤&#x25E4; &#9700;
                                     9701 : {x1:0,y1:1,x2:0,y2:0,x3:1,y3:1},//◥&#x25E5; &#9701;
                                };
                                let x1 = triangle[""+code_num + ""].x1;
                                let y1 = triangle[""+code_num + ""].y1;
                                let x2 = triangle[""+code_num + ""].x2;
                                let y2 = triangle[""+code_num + ""].y2;
                                let x3 = triangle[""+code_num + ""].x3;
                                let y3 = triangle[""+code_num + ""].y3;

                                voxel_map_vertices = voxel_map_vertices + `					<vertex x="${x1+y}" y="${y1+x}" z="${0+f}" />`+"\n";
                                voxel_map_vertices = voxel_map_vertices + `					<vertex x="${x2+y}" y="${y2+x}" z="${0+f}" />`+"\n";
                                voxel_map_vertices = voxel_map_vertices + `					<vertex x="${x3+y}" y="${y3+x}" z="${0+f}" />`+"\n";
                                voxel_map_vertices = voxel_map_vertices + `					<vertex x="${x1+y}" y="${y1+x}" z="${1+f}" />`+"\n";
                                voxel_map_vertices = voxel_map_vertices + `					<vertex x="${x2+y}" y="${y2+x}" z="${1+f}" />`+"\n";
                                voxel_map_vertices = voxel_map_vertices + `					<vertex x="${x3+y}" y="${y3+x}" z="${1+f}" />`+"\n";
voxel_map_triangles = func_create_TriangularPRISM_from_8triangles_from_6vertices(voxel_map_triangles,vertex_sum,"11");//11:灰色
                                vertex_sum = vertex_sum+6;      
                            }//◢◣◤◥終わり


//円で囲い１×１の円柱を作成する。
                            const circle_array = ["🔴","🟠","🟡","🟢","🔵","🟣","🟤","⚫","⚪"];
                            if (circle_array.includes(voxel_map[y][f][x]) ){
                                //repetitions:繰り返し
                              let [Number_of_repetitions_upline,Number_of_repetitions_leftline,Number_of_repetitions_downline,Number_of_repetitions_lightline] =[0,0,0,0];
                              
                              //四角の上辺の横方向で円が横方向に連続しているか？
                              for(let n = x;n <= x + voxel_map[y][f].length;n++){
                                  //alert("1:"+ n + ":"+  x + ":"+ voxel_map[y][f].length +"→"+voxel_map[y][f][n] + ":"+ voxel_map[y][f][n+1] +":"+ Number_of_repetitions_upline);    
                                if(voxel_map[y][f][n] != "" && voxel_map[y][f][n] != undefined && voxel_map[y][f][n] == voxel_map[y][f][n+1]){
                                  //alert("2:"+ n + ":"+  x + ":"+ voxel_map[y][f][n] + ":"+ voxel_map[y][f][n+1] +":"+ Number_of_repetitions_upline);
                                  Number_of_repetitions_upline++;
                                }else{
                                  break;
                                }
                              }//四角の上辺の横方向で円が連続しているか？　終わり

                              //もし四角の上辺の横方向で円が連続している場合、四角の左辺で円が縦状に連続しているか？
                              if(Number_of_repetitions_upline > 0){
                               // alert("y:" + y + " voxel_map:" + voxel_map[y][f][x] +"\n" + voxel_map[y+1][f][x] +"\n" +Number_of_repetitions_upline);
                                for(let n = y;n <= y + Number_of_repetitions_upline +0 ;n++){
                                  if(voxel_map[n][f][x] != "" && voxel_map[n][f][x] != undefined && voxel_map[n][f][x] == voxel_map[n+1][f][x]){
                                    //alert("2:"+ n + ":"+  x + ":"+"↓\n"+voxel_map[n][f][x] + "\n"+ voxel_map[n+1][f][x] +"\n:"+ Number_of_repetitions_upline);   
                                    Number_of_repetitions_leftline++;   
                                  }else{
                                    //alert(voxel_map[n][f][x] + "\n"+ voxel_map[n+1][f][x] +"break;");
                                    break;
                                  }
                                }
                              }//四角の左辺で円が縦状に連続しているか。

                              if(Number_of_repetitions_upline>0 && Number_of_repetitions_leftline >0){
                                let L = Number_of_repetitions_leftline;
                                for(let n = x;n <= x + voxel_map[y + Number_of_repetitions_leftline][f].length;n++){
                                  if(voxel_map[y+L][f][n] != "" && voxel_map[y+L][f][n] != undefined && voxel_map[y+L][f][n] == voxel_map[y+L][f][n+1]){
                                    //alert("3:"+ n + ":"+  x + ":"+"\n"+voxel_map[y+L][f][n] + "→"+ voxel_map[y+L][f][n+1] +"\n:"+ Number_of_repetitions_downline);   
                                    Number_of_repetitions_downline++;   
                                  }else{
                                    break;
                                  }
                                }
                              }
                              if(Number_of_repetitions_upline>0 && Number_of_repetitions_leftline >0 && Number_of_repetitions_downline > 0){
                                let U  =Number_of_repetitions_upline;
                                for(let n = y;n <= y + Number_of_repetitions_upline +0 ;n++){
                                  if(voxel_map[n][f][x+U] != "" && voxel_map[n][f][x+U] != undefined && voxel_map[n][f][x+U] == voxel_map[n+1][f][x+U]){
                                    //alert("4:"+ n + ":"+  x + ":"+"\n"+voxel_map[n][f][x+U] + "→"+ voxel_map[n+1][f][x+U] +"\n:"+ Number_of_repetitions_lightline);   
                                    Number_of_repetitions_lightline++;   
                                  }else{
                                    break;
                                  }
                                }
                              }//if(Number_of_repetitions_upline>0 && Number_of_repetitions_leftline >0 && Number_of_repetitions_downline > 0){
                              
  if(Number_of_repetitions_upline>0 && Number_of_repetitions_leftline >0 && Number_of_repetitions_downline >0 && Number_of_repetitions_lightline > 0){
    //alert("条件成立　"+voxel_map[y][f][x] + ":"+Number_of_repetitions_upline +":"+ Number_of_repetitions_leftline +":"+ Number_of_repetitions_downline +":"+ Number_of_repetitions_lightline);
                                let Up = (Number_of_repetitions_upline+1)/2;
                                let Le = (Number_of_repetitions_leftline+1)/2;
                                let color = circle_array.indexOf(voxel_map[y][f][x]) ;
                                const div_circle = 36;
                                  
                                //if(Number_of_repetitions_upline == 1 || Number_of_repetitions_leftline == 1 || Number_of_repetitions_downline ==1 || Number_of_repetitions_lightline == 1){
                                if(Number_of_repetitions_upline == 1 || Number_of_repetitions_leftline == 1){                            
//円柱に穴が無い場合
                                  for(let updw=0;updw <2;updw++){
                                    voxel_map_vertices = voxel_map_vertices + `					<vertex x="${Le+y}" y="${Up+x}" z="${(0.5*updw+f)}" />`+"\n";//円の中心
                                    for(let c =0;c <=div_circle; c++){
                                      let rad = 2*(1*c/div_circle)*Math.PI; 
                                      voxel_map_vertices = voxel_map_vertices + `					<vertex x="${Le*Math.sin(rad)+Le+y}" y="${Up*Math.cos(rad)+Up+x}" z="${0.5*updw+f}" />`+"\n";
                                    }
                                  }//for(let updw=0;updw <2;updw++){
                                  voxel_map_triangles = func_create_Cylinder_from_96triangles_from_50vertices(voxel_map_triangles,vertex_sum,color,div_circle);                                
                                  vertex_sum = vertex_sum+div_circle * 2 +4;
                                }else{
//円柱に穴がある場合
//alert("条件成立2　"+voxel_map[y][f][x] + ":"+Number_of_repetitions_upline +":"+ Number_of_repetitions_leftline +":"+ Number_of_repetitions_downline +":"+ Number_of_repetitions_lightline);
                                  for(let updw=0;updw <2;updw++){ 
                                    for(let c =0;c <=div_circle; c++){
                                      let rad = 2*(1*c/div_circle)*Math.PI; 
                                      voxel_map_vertices = voxel_map_vertices + `					<vertex x="${Le*Math.sin(rad)+Le+y}" y="${Up*Math.cos(rad)+Up+x}" z="${updw+f}" />`+"\n";
                                    }
                                    for(let c =0;c <=div_circle; c++){
                                      let rad = 2*(1*c/div_circle)*Math.PI; 
                                      voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(Le-1)*Math.sin(rad)+Le+y}" y="${(Up-1)*Math.cos(rad)+Up+x}" z="${updw+f}" />`+"\n";
                                    }
                                    voxel_map_triangles = func_create_Cylinder_from_96triangles_from_50vertices_hole(voxel_map_triangles,vertex_sum,color,div_circle);
                                  }//for(let updw=0;updw <2;updw++){
                                  vertex_sum = vertex_sum + div_circle * 4 +4;                                  
                                }//else{

//元の円柱を消す
                                for(let xx = x; xx <= x + Number_of_repetitions_upline; xx++){
                                  voxel_map[y][f][xx] ="";
                                  voxel_map[y+Number_of_repetitions_leftline][f][xx] ="";
                                }
                                for(let yy = y+1; yy <= y + Number_of_repetitions_leftline -1; yy++){
                                  voxel_map[yy][f][x] ="";
                                  voxel_map[yy][f][x+Number_of_repetitions_downline] ="";
                                }
  }//if(Number_of_repetitions_upline>1 && Number_of_repetitions_leftline >1 && Number_of_repetitions_downline > 1 && Number_of_repetitions_lightline > 1){
}

//１×１の円柱を作成する。
                            if (circle_array.includes(voxel_map[y][f][x]) ){//🔴🟠🟡🟢🔵🟣🟤⚫⚪
                                const div_circle = 36;
                                voxel_map_vertices = voxel_map_vertices + `					<vertex x="${0.5+y}" y="${0.5+x}" z="${0+f}" />`+"\n";//中心
                                for(let c =0;c <=div_circle; c++){
                                    let rad = 2*(1*c/div_circle)*Math.PI; 
                                    voxel_map_vertices = voxel_map_vertices + `					<vertex x="${0.5*Math.sin(rad)+0.5+y}" y="${0.5*Math.cos(rad)+0.5+x}" z="${0+f}" />`+"\n";
                                }
                                voxel_map_vertices = voxel_map_vertices + `					<vertex x="${0.5+y}" y="${0.5+x}" z="${1+f}" />`+"\n";//中心
                                for(let c =0;c <=div_circle; c++){
                                    let rad = 2*(1*c/div_circle)*Math.PI;
                                    voxel_map_vertices = voxel_map_vertices + `					<vertex x="${0.5*Math.sin(rad)+0.5+y}" y="${0.5*Math.cos(rad)+0.5+x}" z="${1+f}" />`+"\n";
                                }
                                let color = circle_array.indexOf(voxel_map[y][f][x]) ;
                                voxel_map_triangles = func_create_Cylinder_from_96triangles_from_50vertices(voxel_map_triangles,vertex_sum,color,div_circle);
                                //vertex_sum = vertex_sum+52;
                                vertex_sum = vertex_sum+div_circle * 2 +4;
                            }

                            //色見本　🟥0      🟧1     🟨2      🟩3     🟦4     🟪5     🟫6     ⬛7      ⬜8      ░9      ▒10     ▓11
                            if (code_num >=9472 && code_num <=9499){//罫線素片1
                                let div = 5;
let Box_Drawing =[//灰色11,黒7
[[  ,  ,  ,  ,  ],[ , , , , ],[ , ,11, , ],[ , ,7, , ],[],[],[],[],[],[],[],[],[ , ,  ,  ,  ],[],[],[ , , , , ],[  ,  ,  , , ],[],[],[ , , , , ],[ , ,11,  ,  ],[],[],[ , ,7, , ],[  ,  ,11, , ],[],[],[ , ,7, , ]],
[[  ,  ,  ,  ,  ],[ , , , , ],[ , ,11, , ],[ , ,7, , ],[],[],[],[],[],[],[],[],[ , ,  ,  ,  ],[],[],[ , , , , ],[  ,  ,  , , ],[],[],[ , , , , ],[ , ,11,  ,  ],[],[],[ , ,7, , ],[  ,  ,11, , ],[],[],[ , ,7, , ]],
[[11,11,11,11,11],[7,7,7,7,7],[ , ,11, , ],[ , ,7, , ],[],[],[],[],[],[],[],[],[ , ,11,11,11],[],[],[ , ,7,7,7],[11,11,11, , ],[],[],[7,7,7, , ],[ , ,11,11,11],[],[],[ , ,7,7,7],[11,11,11, , ],[],[],[7,7,7, , ]],
[[  ,  ,  ,  ,  ],[ , , , , ],[ , ,11, , ],[ , ,7, , ],[],[],[],[],[],[],[],[],[ , ,11,  ,  ],[],[],[ , ,7, , ],[  ,  ,11, , ],[],[],[ , ,7, , ],[ , ,  ,  ,  ],[],[],[ , , , , ],[  ,  ,  , , ],[],[],[ , , , , ]],
[[  ,  ,  ,  ,  ],[ , , , , ],[ , ,11, , ],[ , ,7, , ],[],[],[],[],[],[],[],[],[ , ,11,  ,  ],[],[],[ , ,7, , ],[  ,  ,11, , ],[],[],[ , ,7, , ],[ , ,  ,  ,  ],[],[],[ , , , , ],[  ,  ,  , , ],[],[],[ , , , , ]]
];
                                for(let x_n = 0; x_n < div; x_n=x_n+1){
                                    for(let y_n = 0; y_n < div; y_n=y_n+1){
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${0/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${0/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${0/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${0/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${1/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${1/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${1/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${1/div+f}" />`+"\n";
                                        let z_n = 0;
                                        z_n = code_num - 9472;
                                        if(Box_Drawing[y_n][z_n][x_n] < 13){//color_selectが🟥🟧🟨🟩🟦🟪🟫⬛⬜░▒▓の13以下であること。
                                            voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,Box_Drawing[y_n][z_n][x_n]);
                                        }
                                        vertex_sum = vertex_sum+8;
                                    }                                    
                                }
                            }//if (code_num >=9472 && code_num <=9532){////罫線素片終わり


                            if (code_num >=9500 && code_num <=9547){//罫線素片1
                                let div = 5;
let Box_Drawing3 =[//灰色11,黒7
[[ , ,11,  ,  ],[ ,,11, , ],[ , , 7,  ,  ],[ , ,11,  ,  ],[],[],[],[ , ,7,  ,  ],[  ,  ,11,,],[],[],[],[],[],[],[ , ,7, , ],[  ,  ,  ,  ,  ],[],[],[],[],[],[],[ , , , , ],[  ,  ,11,  ,  ],[],[],[],[],[],[],[ , ,7, , ],[  ,  ,11,  ,  ],[  ,  , 7,  ,  ],[],[],[ , ,7, , ],[  ,  ,11, , ],[],[],[ , ,7, , ],[],[],[],[],[],[],[ , ,7, , ]],
[[ , ,11,  ,  ],[ ,,11, , ],[ , , 7,  ,  ],[ , ,11,  ,  ],[],[],[],[ , ,7,  ,  ],[  ,  ,11,,],[],[],[],[],[],[],[ , ,7, , ],[  ,  ,  ,  ,  ],[],[],[],[],[],[],[ , , , , ],[  ,  ,11,  ,  ],[],[],[],[],[],[],[ , ,7, , ],[  ,  ,11,  ,  ],[  ,  , 7,  ,  ],[],[],[ , ,7, , ],[  ,  ,11, , ],[],[],[ , ,7, , ],[],[],[],[],[],[],[ , ,7, , ]],
[[ , ,11,11,11],[ ,,11,7,7],[ , , 7,11,11],[ , , 7,11,11],[],[],[],[ , ,7, 7, 7],[11,11,11,,],[],[],[],[],[],[],[7,7,7, , ],[11,11,11,11,11],[],[],[],[],[],[],[7,7,7,7,7],[11,11,11,11,11],[],[],[],[],[],[],[7,7,7,7,7],[11,11,11,11,11],[11,11,11, 7, 7],[],[],[ , ,7,7,7],[11,11,11, , ],[],[],[7,7,7, , ],[],[],[],[],[],[],[7,7,7,7,7]],
[[ , ,11,  ,  ],[ ,,11, , ],[ , ,11,  ,  ],[ , , 7,  ,  ],[],[],[],[ , ,7,  ,  ],[  ,  ,11,,],[],[],[],[],[],[],[ , ,7, , ],[  ,  ,11,  ,  ],[],[],[],[],[],[],[ , ,7, , ],[  ,  ,  ,  ,  ],[],[],[],[],[],[],[ , , , , ],[  ,  ,11,  ,  ],[  ,  , 7,  ,  ],[],[],[ , , , , ],[  ,  ,  , , ],[],[],[ , , , , ],[],[],[],[],[],[],[ , ,7, , ]],
[[ , ,11,  ,  ],[ ,,11, , ],[ , ,11,  ,  ],[ , , 7,  ,  ],[],[],[],[ , ,7,  ,  ],[  ,  ,11,,],[],[],[],[],[],[],[ , ,7, , ],[  ,  ,11,  ,  ],[],[],[],[],[],[],[ , ,7, , ],[  ,  ,  ,  ,  ],[],[],[],[],[],[],[ , , , , ],[  ,  ,11,  ,  ],[  ,  , 7,  ,  ],[],[],[ , , , , ],[  ,  ,  , , ],[],[],[ , , , , ],[],[],[],[],[],[],[ , ,7, , ]]
];
                                for(let x_n = 0; x_n < div; x_n=x_n+1){
                                    for(let y_n = 0; y_n < div; y_n=y_n+1){
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${0/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${0/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${0/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${0/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${1/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${1/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${1/div+f}" />`+"\n";
                                        voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${1/div+f}" />`+"\n";
                                        let z_n = 0;
                                        z_n = code_num - 9500;
                                        if(Box_Drawing3[y_n][z_n][x_n] < 13){//color_selectが🟥🟧🟨🟩🟦🟪🟫⬛⬜░▒▓の13以下であること。
                                            voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,Box_Drawing3[y_n][z_n][x_n]);
                                        }
                                        vertex_sum = vertex_sum+8;
                                    }
                                }
                            }//if (code_num >=9500 && code_num <=9){////罫線素片3終わり

const width_num_array = ["０","１","２","３","４","５","６","７","８","９",""];
//let a = parseInt("FA", 16);//１６進数文字列"FA"を、int型に変換
                            if (code_num >=65296 && code_num <=65319){//全角数字：０１２３４５６７８９　ＡＢＣＤＥＦＧ
                                let div = 6;//分割数
let width_num =[//黒7,灰色11,
    [[,11,11,11,11,],[,,  ,11, ,,],[,11,11,11,11,],[,11,11,11,11,],[,11,  ,  ,11,],[,11,11,11,11,],[,11,11,11,11,],[,11,11,11,11,],[,11,11,11,11,],[,11,11,11,11,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,  ,11,11,  ,],[,11,11,11,  ,],[,  ,11,11,  ,],[,11,11,11,  ,],[,11,11,11,11,],[,11,11,11,11,],[,  ,11,11,11,]],
    [[,11,  ,  ,11,],[,,11,11, ,,],[,  ,  ,  ,11,],[,  ,  ,  ,11,],[,11,  ,  ,11,],[,11,  ,  ,  ,],[,11,  ,  ,  ,],[,11,  ,  ,11,],[,11,  ,  ,11,],[,11,  ,  ,11,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,11,  ,  ,11,],[,11,  ,  ,11,],[,11,  ,  ,11,],[,11,  ,  ,11,],[,11,  ,  ,  ,],[,11,  ,  ,  ,],[,11,  ,  ,  ,]],
    [[,11,  ,  ,11,],[,,  ,11, ,,],[,11,11,11,11,],[,11,11,11,11,],[,11,11,11,11,],[,11,11,11,11,],[,11,11,11,11,],[,  ,  ,  ,11,],[,11,11,11,11,],[,11,11,11,11,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,11,11,11,11,],[,11,11,11,11,],[,11,  ,  ,  ,],[,11,  ,  ,11,],[,11,11,11,11,],[,11,11,11,  ,],[,11,  ,11,11,]],
    [[,11,  ,  ,11,],[,,  ,11, ,,],[,11,  ,  ,  ,],[,  ,  ,  ,11,],[,  ,  ,  ,11,],[,  ,  ,  ,11,],[,11,  ,  ,11,],[,  ,  ,  ,11,],[,11,  ,  ,11,],[,  ,  ,  ,11,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,11,  ,  ,11,],[,11,  ,  ,11,],[,11,  ,  ,11,],[,11,  ,  ,11,],[,11,  ,  ,  ,],[,11,  ,  ,  ,],[,11,  ,  ,11,]],
    [[,11,11,11,11,],[,,  ,11, ,,],[,11,11,11,11,],[,11,11,11,11,],[,  ,  ,  ,11,],[,11,11,11,11,],[,11,11,11,11,],[,  ,  ,  ,11,],[,11,11,11,11,],[,  ,  ,  ,11,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,11,  ,  ,11,],[,11,11,11,  ,],[,  ,11,11,  ,],[,11,11,11,  ,],[,11,11,11,11,],[,11,  ,  ,  ,],[,  ,11,11,11,]],
    [[,  ,  ,  ,  ,],[,,  ,  , ,,],[,  ,  ,  ,  ,],[,  ,  ,  ,  ,],[,  ,  ,  ,  ,],[,  ,  ,  ,  ,],[,  ,  ,  ,  ,],[,  ,  ,  ,  ,],[,  ,  ,  ,  ,],[,  ,  ,  ,  ,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,  ,  ,  ,  ,],[,  ,  ,  ,  ,],[,  ,  ,  ,  ,],[,  ,  ,  ,  ,],[,  ,  ,  ,  ,],[,  ,  ,  ,  ,],[,  ,  ,  ,  ,]]  
  ];
                              for(let x_n = 0; x_n < div; x_n=x_n+1){
                                for(let y_n = 0; y_n < div; y_n=y_n+1){
                                  voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${0/div+f}" />`+"\n";
                                  voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${0/div+f}" />`+"\n";
                                  voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${0/div+f}" />`+"\n";
                                  voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${0/div+f}" />`+"\n";
                                  voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${1/div+f}" />`+"\n";
                                  voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${1/div+f}" />`+"\n";
                                  voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${1/div+f}" />`+"\n";
                                  voxel_map_vertices = voxel_map_vertices + `					<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${1/div+f}" />`+"\n";
                                  let z_n = 0;
                                  z_n = code_num - 65296;
                                  if(width_num[y_n][z_n][x_n] < 13){
                                      voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,width_num[y_n][z_n][x_n]);
                                  }
                                vertex_sum = vertex_sum+8; 
                                }                                    
                              }
                            }//if (code_num >=65296 && code_num <=65305){////全角数字：０１２３４５６７８９　ＡＢＣ終わり


                            if(code_num >=12353 && code_num <=12401){//ひらがな
                                let div = 9;
let hiragana= [//色見本　🟥0      🟧1     🟨2      🟩3     🟦4     🟪5     🟫6     ⬛7      ⬜8      ░9      ▒10     ▓11
[[ , ,7, , , , , ,,],[ , , , , , , , ,,],[7, , , , , , , ,,],[ , , , , , , , ,,],[ , , ,7,7,7, , ,,],[,,,,,,,,,],[ , , ,7,7,7, , ,,],[,,,,,,,,,],[ , ,7, , , , , ,,],[,,,,,,,,,],[ , , ,7, , , , ,,],[ , , ,7, ,7, ,7,,],[ , ,7, , , , , ,,],[ , ,7, , ,7, ,7,,],[ , , , ,7, , , ,,],[ , , , ,7, , , , , ],[ , , , , , , , , , ],[ , , , , ,7, ,7, , ],[ , , , , , , , ,,],[ , , , , ,7, ,7,,],[ , ,7, , , , , ,,],[ , ,7, , ,7, ,7,,],[7, , , , , , , ,,],[7, , , , , , , ,,],[ , , ,7, , , , ,,],[ , , ,7, ,7, ,7,,],[ ,7, , , , , , ,,],[ ,7, , , ,7, ,7, , ],[ , , , , , , , , , ],[ , , , , ,7, ,7, , ],[ , ,7, , , , , , , ],[ , ,7, , ,7, ,7, , ],[ , ,7, , , , , , , ],[ , ,7, , ,7, ,7, , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , ,7, ,7, , ],[ , , , , , , , , , ],[ , , , , ,7, ,7, , ],[ , , , , , , , , , ],[ , , , , ,7, ,7, , ],[ , ,7, , , , , , , ],[7, , , , , , , , , ],[ , , , , , , , , , ],[ , ,7, , , , , ,,],[ , ,7,7,7,7, , ,,],[ , , , , , , , ,,],[ , , , , ,7, ,7, ,],[ , , , , , ,7,7, ,],[7, , , , ,7, , ,,],[7, , , , ,7, , ,,]],
[[7,7,7,7,7,7,7, ,,],[ , , , , , , , ,,],[7, , , , , ,7, ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[,,,,,,,,,],[ , , , , , , , ,,],[,,,,,,,,,],[7,7,7,7,7, , , ,,],[,,,,,,,,,],[ , , ,7, , ,7, ,,],[ , , ,7, , , , ,,],[7,7,7,7,7, , , ,,],[7,7,7,7,7, , , ,,],[ , , ,7, , , , ,,],[ , , ,7, , , , , , ],[7, , , ,7, , , , , ],[7, , , ,7, , , , , ],[ ,7,7,7,7, , , ,,],[ ,7,7,7,7, , , ,,],[ , ,7, , , , , ,,],[ , ,7, , , , , ,,],[7, , , , , , , ,,],[7, , , ,7, ,7, ,,],[ , , ,7, , , , ,,],[ , , ,7, , , , ,,],[ ,7, , ,7, , , ,,],[ ,7, , ,7, , , , , ],[ ,7,7,7,7, , , , , ],[ ,7,7,7,7, , , , , ],[7,7,7,7,7,7, , , , ],[7,7,7,7,7,7, , , , ],[7,7,7,7,7, , , , , ],[7,7,7,7,7, , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[7, , , ,7, , , , , ],[7, , , ,7, , , , , ],[7,7,7,7, , , , , , ],[7, , ,7,7,7,7, , , ],[ ,7, , , , ,7, , , ],[ ,7,7, , , , , ,,],[ ,7, , ,7, ,7, ,,],[7, , , ,7, , , ,,],[7, , , ,7, , , , ,],[7, , , ,7, ,7,7, ,],[7, , ,7,7,7,7,7,,],[7, , ,7,7,7,7,7,,]],
[[ , ,7, , , , , ,,],[ , ,7, , , , , ,,],[7, , , , , , ,7,,],[ , , , , , , , ,,],[ , ,7,7,7,7,7, ,,],[,,,,,,,,,],[ ,7,7,7,7,7,7, ,,],[,,,,,,,,,],[ , ,7, , , ,7, ,,],[,,,,,,,,,],[7,7,7,7,7, , ,7,,],[7,7,7,7,7, , ,7,,],[ , , ,7, , , , ,,],[ , , ,7, , , , ,,],[ , ,7, , , , , ,,],[ , ,7, , ,7, ,7, , ],[7, , ,7,7,7,7, , , ],[7, , ,7,7,7,7, , , ],[ , , , , , , , ,,],[ , , , , , , , ,,],[7,7,7,7,7,7, , ,,],[7,7,7,7,7,7, , ,,],[7, , , , , , , ,,],[7, , , , , , , ,,],[7,7,7,7,7,7, , ,,],[7,7,7,7,7,7, , ,,],[7,7,7,7,7,7,7, ,,],[7,7,7,7,7,7,7, , , ],[ , , ,7, , , , , , ],[ , , ,7, , , , , , ],[ ,7, , , , , , , , ],[ ,7, , , , , , , , ],[ , ,7, , , , , , , ],[ , ,7, , , , , , , ],[ , , , , , , , , , ],[7,7,7,7,7,7, , , , ],[7,7,7,7,7,7, , , , ],[7,7,7,7,7,7,7,7, , ],[7,7,7,7,7,7,7,7, , ],[ ,7, ,7, , , , , , ],[ ,7, ,7, , , , , , ],[ ,7, , , ,7, , , , ],[7, , , , , , , , , ],[ ,7, , ,7, ,7, , , ],[ , ,7, , ,7,7,7,,],[7, , , ,7, , ,7,,],[7, ,7,7,7,7, , ,,],[7, ,7,7,7,7, , , ,],[7, ,7,7,7,7, , , ,],[7, , , , ,7, , ,,],[7, , , , ,7, , ,,]],
[[ , ,7, , ,7, , ,,],[7,7,7,7,7,7, , ,,],[7, , , , , , ,7,,],[7, , , , ,7, , ,,],[ ,7, , , , , ,7,,],[,,,,,,,,,],[ , , , , ,7, , ,,],[,,,,,,,,,],[ , ,7, , , , ,7,,],[,,,,,,,,,],[ , ,7, , ,7, , ,,],[ , ,7, , ,7, ,7,,],[ ,7,7,7,7,7, , ,,],[ ,7,7,7,7,7, , ,,],[ ,7, , , , , , ,,],[ ,7, , , , , , , , ],[7, , , ,7, , , , , ],[7, , , ,7, , , , , ],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , ,7, , , , ,,],[ , , ,7, , , , ,,],[7, , , , , , , ,,],[7, , , , , , , ,,],[ , , ,7, , , , ,,],[ , , ,7, , , , ,,],[ ,7, , ,7, , , ,,],[ ,7, , ,7, , , , , ],[ , ,7, , , , , , , ],[ , ,7, , , , , , , ],[ ,7, , ,7,7,7, , , ],[ ,7, , ,7,7,7, , , ],[ ,7, , , , , , , , ],[ ,7, , , , , , , , ],[ , , , , , , , , , ],[ , , , , , ,7, , , ],[ , , , , , ,7, , , ],[ , , , , , ,7, , , ],[ , , , , , ,7, , , ],[ , ,7, , , , , , , ],[ , ,7, , , , , , , ],[7, , ,7, , ,7, , , ],[7, , , , , , , , , ],[ ,7,7,7, ,7, ,7, , ],[ ,7,7, ,7, , ,7,,],[7, , ,7, , , ,7,,],[7, , , ,7, , , ,,],[7, , , ,7, , , , ,],[7, , , ,7, , , , ,],[7, , , , ,7, , ,,],[7, , , , ,7, , ,,]],
[[ ,7,7,7,7,7,7, ,,],[ , ,7, ,7, , , ,,],[7, , , , , , ,7,,],[7, , , , , ,7, ,,],[ , , , , , , ,7,,],[,,,,,,,,,],[ , , , ,7, , , ,,],[,,,,,,,,,],[ , ,7,7,7,7, , ,,],[,,,,,,,,,],[ , ,7, , ,7, , ,,],[ , ,7, , ,7, , ,,],[ , , , ,7, , , ,,],[ , , , ,7, , , ,,],[ ,7, , , , , , ,,],[ ,7, , , , , , , , ],[7, , , ,7, , , , , ],[7, , , ,7, , , , , ],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , ,7, , , ,,],[ , , , ,7, , , ,,],[7, , , , , , , ,,],[7, , , , , , , ,,],[ ,7,7,7, , , , ,,],[ ,7,7,7, , , , ,,],[ ,7, , ,7, , , ,,],[ ,7, , ,7, , , , , ],[7,7,7,7,7,7,7, , , ],[7,7,7,7,7,7,7, , , ],[ ,7, , , , , , , , ],[ ,7, , , , , , , , ],[ ,7,7,7,7,7, , , , ],[ ,7,7,7,7,7, , , , ],[7,7,7,7, , , , , , ],[ , , , , , ,7, , , ],[ , , , , , ,7, , , ],[ , , , , ,7, , , , ],[ , , , , ,7, , , , ],[ ,7, , , , , , , , ],[ ,7, , , , , , , , ],[ , , ,7, , , , , , ],[7, , , , , , , , , ],[7, ,7,7,7, , ,7, , ],[7, ,7,7, , , ,7,,],[7, , ,7, , , ,7,,],[7, , , ,7, , , ,,],[7, , , ,7, , , , ,],[7, , , ,7, , , , ,],[7, , , , ,7, , ,,],[7, , , , ,7, , ,,]],
[[7, ,7, ,7, , ,7,,],[ ,7,7,7,7,7, , ,,],[7, , , , , , ,7,,],[7, , , , , ,7, ,,],[ , , , , , ,7, ,,],[,,,,,,,,,],[ , , ,7,7, , , ,,],[,,,,,,,,,],[ ,7,7, , , ,7, ,,],[,,,,,,,,,],[ ,7, , , ,7, , ,,],[ ,7, , , ,7, , ,,],[ , , , , ,7, , ,,],[ , , , , ,7, , ,,],[ , ,7, , , , , ,,],[ , ,7, , , , , , , ],[7, , , ,7, , , , , ],[7, , , ,7, , , , , ],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , ,7, , , ,,],[ , , , ,7, , , ,,],[7, , , , , ,7, ,,],[7, , , , , ,7, ,,],[ ,7, ,7, , , , ,,],[ ,7, ,7, , , , ,,],[ ,7, , , , , , ,,],[ ,7, , , , , , , , ],[ , , , ,7, , , , , ],[ , , , ,7, , , , , ],[7, , , , , , , , , ],[7, , , , , , , , , ],[ , , , , , ,7, , , ],[ , , , , , ,7, , , ],[ , , , ,7, , , , , ],[ , , , , ,7, , , , ],[ , , , , ,7, , , , ],[ , , , ,7, , , , , ],[ , , , ,7, , , , , ],[7, , , , , , , , , ],[7, , , , , , , , , ],[ , ,7,7,7, , , , , ],[7, , ,7, , , , , , ],[7, ,7, ,7, ,7,7, , ],[7, ,7, , , ,7,7,,],[7, , ,7, , , ,7,,],[7, ,7,7,7,7, , ,,],[7, ,7,7,7,7, , , ,],[7, , ,7,7,7, , , ,],[7, , , ,7,7,7,7,,],[7, , , ,7,7,7, ,,]],
[[7, , ,7, , , ,7,,],[7, ,7, ,7, ,7, ,,],[ ,7, ,7, , , , ,,],[ ,7, , , , , , ,,],[ , , , , ,7, , ,,],[,,,,,,,,,],[ , ,7, , ,7, , ,,],[,,,,,,,,,],[7, ,7, , , ,7, ,,],[,,,,,,,,,],[ , , , ,7, , , ,,],[ , , , ,7, , , ,,],[7, , , , , , , ,,],[7, , , , , , , ,,],[ , , ,7, , , , ,,],[ , , ,7, , , , , , ],[7, , , ,7, , , , , ],[7, , , ,7, , , , , ],[7, , , , , , , ,,],[7, , , , , , , ,,],[7, , , , , , , ,,],[7, , , , , , , ,,],[ ,7, , , ,7, , ,,],[ ,7, , , ,7, , ,,],[ , ,7,7, , , , ,,],[ , ,7,7, , , , ,,],[ ,7, , , , , , ,,],[ ,7, , , , , , , , ],[ , , ,7, , , , , , ],[ , , ,7, , , , , , ],[7, , , , , , , , , ],[7, , , , , , , , , ],[ , , , , , ,7, , , ],[ , , , , , ,7, , , ],[ , , , ,7, , , , , ],[ , , ,7,7, , , , , ],[ , , ,7,7, , , , , ],[ , , , ,7, , , , , ],[ , , , ,7, , , , , ],[ ,7, , , , , , , , ],[ ,7, , , , , , , , ],[ ,7, ,7, ,7, , , , ],[7, , , ,7,7,7, , , ],[ ,7,7, , ,7, ,7, , ],[7,7,7, , ,7, ,7,,],[ ,7, ,7, , , ,7,,],[7, ,7, ,7, , , ,,],[7, ,7, ,7, , , , ,],[7, ,7, ,7, , , , ,],[7, , ,7, ,7, , ,,],[7, , ,7, ,7, ,7,,]],
[[ ,7,7, ,7, ,7, ,,],[ ,7,7,7,7, ,7, ,,],[ , ,7, , , , , ,,],[ , ,7, , , , , ,,],[ , , , ,7, , , ,,],[,,,,,,,,,],[ ,7, , , , ,7,7,,],[,,,,,,,,,],[ ,7,7, , ,7, , ,,],[,,,,,,,,,],[ , ,7,7, , , , ,,],[ , ,7,7, , , , ,,],[ ,7,7, , , , , ,,],[ ,7,7, , , , , ,,],[ , , , ,7, , , ,,],[ , , , ,7, , , , , ],[ ,7, , ,7, , , , , ],[ ,7, , ,7, , , , , ],[ ,7,7,7,7,7,7, ,,],[ ,7,7,7,7,7,7, ,,],[ ,7,7, , , , , ,,],[ ,7,7, , , , , ,,],[ , ,7,7,7, , , ,,],[ , ,7,7,7, , , ,,],[ , , ,7, , , , ,,],[ , , ,7, , , , ,,],[ , ,7,7,7,7, , ,,],[ , ,7,7,7,7, , , , ],[ , , , ,7,7,7, , , ],[ , , , ,7,7,7, , , ],[7, , , ,7,7,7,7, , ],[7, , , ,7,7,7,7, , ],[ , ,7,7,7,7, , , , ],[ , ,7,7,7,7, , , , ],[ , , ,7, , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , ,7,7, , , ],[ , , , , ,7,7, , , ],[ , ,7,7,7,7,7, , , ],[ , ,7,7,7,7,7, , , ],[ , ,7, , , , , , , ],[ ,7, , , , , , , , ],[ , , ,7, , ,7,7, , ],[ , ,7, , , ,7,7,,],[ , ,7, , , ,7, ,,],[7, , ,7,7, , , ,,],[7, , ,7,7, , , , ,],[7, , ,7,7, , , , ,],[ ,7, , ,7,7, , ,,],[ ,7, , ,7,7, , ,,]],
[[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[,,,,,,,,,],[ , , , , , , , ,,],[,,,,,,,,,],[ , , , , , , , ,,],[,,,,,,,,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , , , ],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , ,,],[ , , , , , , , , ,],[ , , , , , , , , ,],[ , , , , , , , ,,],[ , , , , , , , ,,]]
                                ];
                                    for(let x_n = 0; x_n < div; x_n=x_n+1){
                                        for(let y_n = 0; y_n < div; y_n=y_n+1){
                                            voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${0/div+f}" />`+"\n";
                                            voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${0/div+f}" />`+"\n";
                                            voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${0/div+f}" />`+"\n";
                                            voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${0/div+f}" />`+"\n";
                                            voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${1/div+f}" />`+"\n";
                                            voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${1/div+f}" />`+"\n";
                                            voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${1/div+f}" />`+"\n";
                                            voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${1/div+f}" />`+"\n";
                                            let z_n = 0;
                                            z_n = code_num - 12353;
                                            /* 
                                            if (code_num ==12353){z_n = 0;}//あ
                                            if (code_num ==12398){z_n = 42;}//の
                                            */
                                            if(hiragana[y_n][z_n][x_n] < 13){
                                                voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,hiragana[y_n][z_n][x_n]);
                                            }
                                            vertex_sum = vertex_sum+8;
                                        }
                                    }
                                }//ひらがな終わり


                            if (voxel_map[y][f][x] =="🚗"){//code_num ==128663
                                let div = 10;
                                let car =[                   
[[ , , , , , , , , , , ],[ , , ,  , , , ,  , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , ,  , , , ,  , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , ,7,7,7, ,7,7,7, , ],[ ,0,7,11,7,0,7,11,7,0, ],[ ,0,7,7,7,0,7,7,7,0, ],[ ,2,0,0,0,0,0,0,0,2, ],[ ,0,0,0,0,0,0,0,0,0, ],[ , , ,4,0,4,4,0,4, , ],[ , , ,4,0,4,4,0,4, , ],[ , , ,0,0,0,0,0,0, , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ ,0,0,11,0,0,0,11,0,0, ],[ ,0,0,0,0,0,0,0,0,0, ],[ ,0, , , , , , , ,0, ],[ ,0,0,0, , , , , ,0, ],[ , , ,4, , , , ,4, , ],[ , , ,4, , , , ,4, , ],[ , , ,0,0,0,0,0,0, , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ ,8,0,11,0,0,0,11,0,8, ],[ ,0,0,0,0,0,0,0,0,0, ],[ ,0, , , , , , , ,0, ],[ ,0,0,0, , , , , ,0, ],[ , , ,4, , , , ,4, , ],[ , , ,4, , , , ,4, , ],[ , , ,0,0,0,0,0,0, , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ ,8,0,11,0,0,0,11,0,8, ],[ ,0,0,0,0,0,0,0,0,0, ],[ ,0, , , , , , , ,0, ],[ ,0,0,0, , , , , ,0, ],[ , , ,4, , , , ,4, , ],[ , , ,4, , , , ,4, , ],[ , , ,0,0,0,0,0,0, , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ ,0,0,11,0,0,0,11,0,0, ],[ ,0,0,0,0,0,0,0,0,0, ],[ ,0, , , , , , , ,0, ],[ ,0,0,0, , , , , ,0, ],[ , , ,4, , , , ,4, , ],[ , , ,4, , , , ,4, , ],[ , , ,0,0,0,0,0,0, , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , ,7,7,7, ,7,7,7, , ],[ ,0,7,11,7,0,7,11,7,0, ],[ ,0,7,7,7,0,7,7,7,0, ],[ ,2,0,0,0,0,0,0,0,2, ],[ ,0,0,0,0,0,0,0,0,0, ],[ , , ,4,0,4,4,0,4, , ],[ , , ,4,0,4,4,0,4, , ],[ , , ,0,0,0,0,0,0, , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , ,  , , , ,  , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , ,  , , , ,  , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , ,  , , , ,  , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]]
                                ];
                                for(let x_n = 0; x_n < div; x_n=x_n+1){
                                    for(let y_n = 0; y_n < div; y_n=y_n+1){
                                        for(let z_n = 0; z_n < div; z_n=z_n+1){
                                            let c3 = car[y_n][z_n][x_n]; 
                                            if(c3 < 13){
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,c3);
                                                vertex_sum = vertex_sum+8; 
                                            }
                                        }
                                    }
                                }
                            }
                            if (voxel_map[y][f][x] =="🌲"){//code_num ==127794
                                let div = 7;
                                let tree =[
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , ,3,3,3, , , , , , ],[ , , ,3, , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ ,3,3,3,3,3, , , , , ],[ , ,3,3,3, , , , , , ],[ , ,3,3,3, , , , , , ],[ , , ,3, , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , ,6, , , , , , , ],[ , , ,6, , , , , , , ],[ ,3,3,3,3,3, , , , , ],[ ,3,3,3,3,3, , , , , ],[ , ,3,3,3, , , , , , ],[ , ,3,3,3, , , , , , ],[ , , ,3, , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ ,3,3,3,3,3, , , , , ],[ , ,3,3,3, , , , , , ],[ , ,3,3,3, , , , , , ],[ , , ,3, , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , ,3,3,3, , , , , , ],[ , , ,3, , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]]
                                ];
                                for(let x_n = 0; x_n < div; x_n=x_n+1){
                                    for(let y_n = 0; y_n < div; y_n=y_n+1){
                                        for(let z_n = 0; z_n < div; z_n=z_n+1){
                                            let xyz3 = tree[y_n][z_n][x_n]; 
                                            if(xyz3 < 13){
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,xyz3);
                                                vertex_sum = vertex_sum+8; 
                                            }
                                        }
                                    }
                                }
                            }

                            if (voxel_map[y][f][x] =="🌳"){//code_num ==127795
                              let div = 5;
                              let tree =[
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ ,3,3,3, , , , , , , ],[ ,3,3,3, , , , , , , ],[ ,3,3,3, , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , ,6, , , , , , , , ],[ , ,6, , , , , , , , ],[ ,3, ,3, , , , , , , ],[ ,3, ,3, , , , , , , ],[ ,3,3,3, , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ ,3,3,3, , , , , , , ],[ ,3,3,3, , , , , , , ],[ ,3,3,3, , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]]
                                ];
                                for(let x_n = 0; x_n < div; x_n=x_n+1){
                                    for(let y_n = 0; y_n < div; y_n=y_n+1){
                                        for(let z_n = 0; z_n < div; z_n=z_n+1){
                                            let xyz3 = tree[y_n][z_n][x_n]; 
                                            if(xyz3 < 13){
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,xyz3);
                                                vertex_sum = vertex_sum+8; 
                                            }
                                        }
                                    }
                                }
                            }
                            if (voxel_map[y][f][x] =="🏠"){//code_num ==127968
                                let div = 9;
                                let tree =[
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ ,0,0, , , ,0,0, , , ],[ , ,0,0, ,0,0, , , , ],[ , , ,0,0,0, , , , , ],[ , , , ,0, , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , ,8,8,8,8,8, , , , ],[ , ,8,4,8,4,8, , , , ],[ , ,8,8,8,8,8, , , , ],[ , ,8,4,8,4,8, , , , ],[ ,0, ,8,8,8, ,0, , , ],[ , ,0, ,8, ,0, , , , ],[ , , ,0, ,0, , , , , ],[ , , , ,0, , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , ,8, , , ,8, , , , ],[ , ,4, , , ,4, , , , ],[ , ,8, , , ,8, , , , ],[ , ,4, , , ,4, , , , ],[ ,0, , , , , ,0, , , ],[ , ,0, , , ,0, , , , ],[ , , ,0, ,0, , , , , ],[ , , , ,0, , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , ,8, , , ,8, , , , ],[ , ,8, , , ,8, , , , ],[ , ,8, , , ,8, , , , ],[ , ,8, , , ,8, , , , ],[ ,0, , , , , ,0, , , ],[ , ,0, , , ,0, , , , ],[ , , ,0, ,0, , , , , ],[ , , , ,0, , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , ,8, , , ,8, , , , ],[ , ,4, , , ,4, , , , ],[ , ,8, , , ,8, , , , ],[ , ,4, , , ,4, , , , ],[ ,0, , , , , ,0, , , ],[ , ,0, , , ,0, , , , ],[ , , ,0, ,0, , , , , ],[ , , , ,0, , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , ,8,0,8,8,8, , , , ],[ , ,8,0,8,4,8, , , , ],[ , ,8,8,8,8,8, , , , ],[ , ,8,4,8,4,8, , , , ],[ ,0, ,8,8,8, ,0, , , ],[ , ,0, ,8, ,0, , , , ],[ , , ,0, ,0, , , , , ],[ , , , ,0, , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ ,0,0, , , ,0,0, , , ],[ , ,0,0, ,0,0, , , , ],[ , , ,0,0,0, , , , , ],[ , , , ,0, , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]]
                                ];
                                for(let x_n = 0; x_n < div; x_n=x_n+1){
                                    for(let y_n = 0; y_n < div; y_n=y_n+1){
                                        for(let z_n = 0; z_n < div; z_n=z_n+1){
                                            let xyz3 = tree[y_n][z_n][x_n]; 
                                            if(xyz3 < 13){
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,xyz3);
                                                vertex_sum = vertex_sum+8; 
                                            }
                                        }
                                    }
                                }
                            }//if (voxel_map[y][f][x] =="🏠"){//code_num ==127968

                            if (voxel_map[y][f][x] =="🏯"){//code_num ==127983
                                let div = 17;
                                let tree =[
[[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,11],[  ,  ,11,11,11,11,11,11,11,11,11,11,11,11,11,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ ,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3, ],[ ,3, , , , , , , , , , , , , ,3, ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11],[  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ],[  ,  ,11,11,11,11,11,11,11,11,11,11,11,11,11,  ,  ],[ , ,8,8,8,8,8,8,8,8,8,8,8,8,8, , ],[ , ,8, ,8,8, ,8,8,8, ,8,8, ,8, , ],[ ,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3, ],[ , ,3, , , ,3,7,8,7,3, , , ,3, , ],[ , , , , , , ,3,2,3, , , , , , , ],[ , , , , , , , ,3, , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11],[  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ],[  ,  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ,  ],[ , ,8, , , , , , , , , , , ,8, , ],[ , , , , , , , , , , , , , , , , ],[ ,3,3, , , , , , , , , , , ,3,3, ],[ , , ,3,3,3,3,3, ,3,3,3,3,3, , , ],[ , , , , , , ,3, ,3, , , , , , , ],[ , , , , , , , ,3, , , , , , , , ],[ , , ,3,3,3,3,3,3,3,3,3,3,3, , , ],[ , , ,3, , ,3,7,2,7,3, , ,3, , , ],[ , , , , , , ,3,8,3, , , , , , , ],[ , , , , , , , ,3, , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11],[  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ],[  ,  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ,  ],[ , ,8, , , , , , , , , , , ,8, , ],[ , ,8, , , , , , , , , , , ,8, , ],[ ,3,3, , , , , , , , , , , ,3,3, ],[ , , ,3, , , , , , , , , ,3, , , ],[ , , , ,8,8,8,8, ,8,8,8,8, , , , ],[ , , , ,8, ,8, , , ,8, ,8, , , , ],[ , , ,3,3,3,3,3,3,3,3,3,3,3, , , ],[ , , , ,3,3,3, , , ,3,3,3, , , , ],[ , , , , , , ,3, ,3, , , , , , , ],[ , , , , , , , ,3, , , , , , , , ],[ , , , ,3,3,3,3,3,3,3,3,3, , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11],[  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ],[  ,  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ,  ],[ , ,8, , , , , , , , , , , ,8, , ],[ , , , , , , , , , , , , , , , , ],[ ,3,3, , , , , , , , , , , ,3,3, ],[ , ,3,3, , , , , , , , , ,3,3, , ],[ , , , ,8, , , , , , , ,8, , , , ],[ , , , , , , , , , , , , , , , , ],[ , , ,3,3, , , , , , , ,3,3, , , ],[ , , , ,3,3, , , , , ,3,3, , , , ],[ , , , , ,8,8,8,8,8,8,8, , , , , ],[ , , , , ,8, ,8,8,8, ,8, , , , , ],[ , , , ,3, , , , , , , ,3, , , , ],[ , , , ,3,3,3,3,3,3,3,3,3, , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11],[  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ],[  ,  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ,  ],[ , ,8, , , , , , , , , , , ,8, , ],[ , ,8, , , , , , , , , , , ,8, , ],[ ,3,3, , , , , , , , , , , ,3,3, ],[ , ,7,3, , , , , , , , , ,3,7, , ],[ , ,3,3,8, , , , , , , ,8,3,3, , ],[ , , , ,8, , , , , , , ,8, , , , ],[ , , ,3,3, , , , , , , ,3,3, , , ],[ , , , ,3,3, , , , , ,3,3, , , , ],[ , , , , ,8, , , , , ,8, , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , ,3, , , , , , , ,3, , , , ],[ , , , , ,8, , , , , ,8, , , , , ],[ , , , ,3,3,3,3,3,3,3,3,3, , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11],[  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ],[  ,  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ,  ],[ , ,8, , , , , , , , , , , ,8, , ],[ , ,8, , , , , , , , , , , ,8, , ],[ ,3,3, , , , , , , , , , , ,3,3, ],[ , ,8, , , , , , , , , , , ,8, , ],[ , ,2, , , , , , , , , , , ,2, , ],[ , ,3,3, , , , , , , , , ,3,3, , ],[ , , ,3,3, , , , , , , ,3,3, , , ],[ , , , ,3,3, , , , , ,3,3, , , , ],[ , , , , ,8, , , , , ,8, , , , , ],[ , , , , ,8, , , , , ,8, , , , , ],[ , , , ,3, , , , , , , ,3, , , , ],[ , , , , ,8, , , , , ,8, , , , , ],[ , , , , ,8, , , , , ,8, , , , , ],[ , , , ,2,3,3,3,3,3,3,3,2, , , , ]],
[[11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11],[  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ],[  ,  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ,  ],[ , ,8, , , , , , , , , , , ,8, , ],[ , ,8, , , , , , , , , , , ,8, , ],[ ,3,3, , , , , , , , , , , ,3,3, ],[ , ,7,3, , , , , , , , , ,3,7, , ],[ , ,3,3,8, , , , , , , ,8,3,3, , ],[ , , , ,8, , , , , , , ,8, , , , ],[ , , ,3,3, , , , , , , ,3,3, , , ],[ , , , ,3,3, , , , , ,3,3, , , , ],[ , , , , ,8, , , , , ,8, , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , ,3, , , , , , , ,3, , , , ],[ , , , , ,8, , , , , ,8, , , , , ],[ , , , ,3,3,3,3,3,3,3,3,3, , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11],[  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ],[  ,  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ,  ],[ , ,8, , , , , , , , , , , ,8, , ],[ , , , , , , , , , , , , , , , , ],[ ,3,3, , , , , , , , , , , ,3,3, ],[ , ,3,3, , , , , , , , , ,3,3, , ],[ , , , ,8, , , , , , , ,8, , , , ],[ , , , , , , , , , , , , , , , , ],[ , , ,3,3, , , , , , , ,3,3, , , ],[ , , , ,3,3, , , , , ,3,3, , , , ],[ , , , , ,8,8,8,8,8,8,8, , , , , ],[ , , , , ,8, ,8,8,8, ,8, , , , , ],[ , , , ,3, , , , , , , ,3, , , , ],[ , , , ,3,3,3,3,3,3,3,3,3, , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11],[  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ],[  ,  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ,  ],[ , ,8, , , , , , , , , , , ,8, , ],[ , ,8, , , , , , , , , , , ,8, , ],[ ,3,3, , , , , , , , , , , ,3,3, ],[ , , ,3, , , , , , , , , ,3, , , ],[ , , , ,8,8,8,8, ,8,8,8,8, , , , ],[ , , , ,8, ,8, , , ,8, ,8, , , , ],[ , , ,3,3,3,3,3,3,3,3,3,3,3, , , ],[ , , , ,3,3,3, , , ,3,3,3, , , , ],[ , , , , , , ,3, ,3, , , , , , , ],[ , , , , , , , ,3, , , , , , , , ],[ , , , ,3,3,3,3,3,3,3,3,3, , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11],[  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ],[  ,  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ,  ],[ , ,8, , , , , , , , , , , ,8, , ],[ , , , , , , , , , , , , , , , , ],[ ,3,3, , , , , , , , , , , ,3,3, ],[ , , ,3,3,3,3,3, ,3,3,3,3,3, , , ],[ , , , , , , ,3, ,3, , , , , , , ],[ , , , , , , , ,3, , , , , , , , ],[ , , ,3,3,3,3,3,3,3,3,3,3,3, , , ],[ , , ,3, , ,3,7,2,7,3, , ,3, , , ],[ , , , , , , ,3,8,3, , , , , , , ],[ , , , , , , , ,3, , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11],[  ,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,  ],[  ,  ,11,11,11,11,11,11,11,11,11,11,11,11,11,  ,  ],[ , ,8,8,8,8,8,8,8,8,8,8,8,8,8, , ],[ , ,8, ,8,8, ,8,8,8, ,8,8, ,8, , ],[ ,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3, ],[ , ,3, , , ,3,7,8,7,3, , , ,3, , ],[ , , , , , , ,3,2,3, , , , , , , ],[ , , , , , , , ,3, , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,11,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,11,11],[  ,  ,11,11,11,11,11,11,11,11,11,11,11,11,11,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ ,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3, ],[ ,3, , , , , , , , , , , , , ,3, ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]],
[[11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]],
[[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ],[ , , , , , , , , , , , , , , , , ]]
                                ];
                                for(let x_n = 0; x_n < div; x_n=x_n+1){
                                    for(let y_n = 0; y_n < div; y_n=y_n+1){
                                        for(let z_n = 0; z_n < div; z_n=z_n+1){
                                            let xyz3 = tree[y_n][z_n][x_n]; 
                                            if(xyz3 < 13){
                                              /*
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                */
                                                voxel_map_vertices = func_create_8vertices_at_divided_cube_by_divX_divY_divZ_and_base_on_xyf(voxel_map_vertices,x,y,f,div,x_n,y_n,z_n);
                                                voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,xyz3);
                                                vertex_sum = vertex_sum+8; 
                                            }
                                        }
                                    }
                                }
                            }//if (voxel_map[y][f][x] =="🏯"){//code_num ==127983

                            if (voxel_map[y][f][x] =="🏢"){//code_num ==127970
                                let div = 14;
                                let tree =[
[[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[,,,,,,,,,,,,,],],
[[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[,,,,,,,,,,,,,],],
[[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[,,,,,,,,,,,,,],],
[[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[,,,,,,,,,,,,,],],
[[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[,,,,,,,,,,,,,],],
[[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[,,,,,,,,,,,,,],],
[[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[,,,,,,,,,,,,,],],
[[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[,,,,,,,,,,,,,],],
[[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 4,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 4,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[,,,,,,,,,,,,,],],
[[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[,,,,,,,,,,,,,],],
[[  , 8, 8, 8, 8,  ,  ,  ,  , 8, 8, 8, 8,  ],[  , 8, 8, 8, 8,  ,  ,  ,  , 8, 8, 8, 8,  ],[  , 8, 8, 8, 8,  ,  ,  ,  , 8, 8, 8, 8,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 4, 4, 8, 8, 4, 4, 8, 8, 4, 4, 8,  ],[  , 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  ],[,,,,,,,,,,,,,],],
[[  ,  , 3,  , 3,  ,  ,  ,  , 3,  , 3,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  , 8, 8, 8, 8, 8, 8,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[,,,,,,,,,,,,,],],
[[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  , 8, 8, 8, 8, 8, 8,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[,,,,,,,,,,,,,],],
[[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],[,,,,,,,,,,,,,],]
];
                                for(let x_n = 0; x_n < div; x_n=x_n+1){
                                    for(let y_n = 0; y_n < div; y_n=y_n+1){
                                        for(let z_n = 0; z_n < div; z_n=z_n+1){
                                            let xyz3 = tree[y_n][z_n][x_n]; 
                                            if(xyz3 < 13){
                                              /*
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                */
                                                voxel_map_vertices = func_create_8vertices_at_divided_cube_by_divX_divY_divZ_and_base_on_xyf(voxel_map_vertices,x,y,f,div,x_n,y_n,z_n);
                                                voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,xyz3);
                                                vertex_sum = vertex_sum+8; 
                                            }
                                        }
                                    }
                                }
                            }//if (voxel_map[y][f][x] =="🏢"){//code_num ==127970

                            
                            if (code_num ==128740){//🛤線路
                                let div = 8;
                                let tree =[
[[  ,  ,  ,  ,  ,  ,  ,  ],[  ,11,  ,  ,  ,  ,11,  ],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,]],
[[ 6, 6, 6, 6, 6, 6, 6, 6],[  ,11,  ,  ,  ,  ,11,  ],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,]],
[[  ,  ,  ,  ,  ,  ,  ,  ],[  ,11,  ,  ,  ,  ,11,  ],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,]],
[[ 6, 6, 6, 6, 6, 6, 6, 6],[  ,11,  ,  ,  ,  ,11,  ],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,]],
[[  ,  ,  ,  ,  ,  ,  ,  ],[  ,11,  ,  ,  ,  ,11,  ],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,]],
[[ 6, 6, 6, 6, 6, 6, 6, 6],[  ,11,  ,  ,  ,  ,11,  ],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,]],
[[  ,  ,  ,  ,  ,  ,  ,  ],[  ,11,  ,  ,  ,  ,11,  ],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,]],
[[ 6, 6, 6, 6, 6, 6, 6, 6],[  ,11,  ,  ,  ,  ,11,  ],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,],[,,,,,,,]]                                    
];
                                for(let x_n = 0; x_n < div; x_n=x_n+1){
                                    for(let y_n = 0; y_n < div; y_n=y_n+1){
                                        for(let z_n = 0; z_n < div; z_n=z_n+1){
                                            let xyz3 = tree[y_n][z_n][x_n]; 
                                            if(xyz3 < 13){
                                              /*
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
*/
                                                voxel_map_vertices = func_create_8vertices_at_divided_cube_by_divX_divY_divZ_and_base_on_xyf(voxel_map_vertices,x,y,f,div,x_n,y_n,z_n);
                                                voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,xyz3);
                                                vertex_sum = vertex_sum+8; 
                                            }
                                        }
                                    }
                                }
                            }//if (code_num ==128740){//🛤線路

                            
                            if (code_num ==127800){//🌸
                                let div = 5;
                                let tree =[
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ ,5,5,5, , , , , , , ],[ ,5,5,5, , , , , , , ],[ ,5,5,5, , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , ,6, , , , , , , , ],[ , ,6, , , , , , , , ],[ ,5, ,5, , , , , , , ],[ ,5, ,5, , , , , , , ],[ ,5,5,5, , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ ,5,5,5, , , , , , , ],[ ,5,5,5, , , , , , , ],[ ,5,5,5, , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]]
];
                                for(let x_n = 0; x_n < div; x_n=x_n+1){
                                    for(let y_n = 0; y_n < div; y_n=y_n+1){
                                        for(let z_n = 0; z_n < div; z_n=z_n+1){
                                            let xyz3 = tree[y_n][z_n][x_n]; 
                                            if(xyz3 < 13){
                                              /*
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
*/
                                                voxel_map_vertices = func_create_8vertices_at_divided_cube_by_divX_divY_divZ_and_base_on_xyf(voxel_map_vertices,x,y,f,div,x_n,y_n,z_n);
                                                voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,xyz3);
                                                vertex_sum = vertex_sum+8; 
                                            }
                                        }
                                    }
                                }
                            }//if (code_num ==){

                              if (voxel_map[y][f][x] =="🧱"){//code_num ==129521
                                    let div = 12;
                                    let tree =[
[[ 6, 6, 6, 6, 8, 1, 1, 1, 1, 1, 8, 6],[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],[ 1, 8, 6, 6, 6, 6, 6, 8, 1, 1, 1, 1],[ 1, 8, 6, 6, 6, 6, 6, 8, 1, 1, 1, 1],[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],[ 6, 6, 6, 6, 8, 1, 1, 1, 1, 1, 8, 6],[ 6, 6, 6, 6, 8, 1, 1, 1, 1, 1, 8, 6],[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],[ 1, 8, 6, 6, 6, 6, 6, 8, 1, 1, 1, 1],[ 1, 8, 6, 6, 6, 6, 6, 8, 1, 1, 1, 1],[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],[ 6, 6, 6, 6, 8, 1, 1, 1, 1, 1, 8, 6]],
[[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]],
[[ 6, 8, 1, 1, 1, 1, 1, 8, 6, 6, 6, 6],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 6, 8, 1, 1, 1, 1, 1, 8, 6, 6, 8, 6]],
[[ 6, 8, 1, 1, 1, 1, 1, 8, 6, 6, 6, 6],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 6, 8, 1, 1, 1, 1, 1, 8, 6, 6, 8, 6]],
[[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]],
[[ 6, 6, 6, 6, 8, 1, 1, 1, 1, 1, 8, 6],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 6, 6, 6, 6, 8, 1, 1, 1, 1, 1, 8, 6]],
[[ 6, 6, 6, 6, 8, 1, 1, 1, 1, 1, 8, 6],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 6, 6, 6, 6, 8, 1, 1, 1, 1, 1, 8, 6]],
[[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]],
[[ 6, 8, 1, 1, 1, 1, 1, 8, 6, 6, 6, 6],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 6, 8, 1, 1, 1, 1, 1, 8, 6, 6, 6, 6]],
[[ 6, 8, 1, 1, 1, 1, 1, 8, 6, 6, 6, 6],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 6],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 6, 8, 1, 1, 1, 1, 1, 8, 6, 6, 6, 6]],
[[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 8],[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]],
[[ 6, 6, 6, 6, 8, 1, 1, 1, 1, 1, 8, 6],[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],[ 1, 8, 6, 6, 6, 6, 6, 8, 1, 1, 1, 1],[ 1, 8, 6, 6, 6, 6, 6, 8, 1, 1, 1, 1],[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],[ 6, 6, 6, 6, 8, 1, 1, 1, 1, 1, 8, 6],[ 6, 6, 6, 6, 8, 1, 1, 1, 1, 1, 8, 6],[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],[ 1, 8, 6, 6, 6, 6, 6, 8, 1, 1, 1, 1],[ 1, 8, 6, 6, 6, 6, 6, 8, 1, 1, 1, 1],[ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],[ 6, 6, 6, 6, 8, 1, 1, 1, 1, 1, 8, 6]]
];
                                    for(let x_n = 0; x_n < div; x_n=x_n+1){
                                        for(let y_n = 0; y_n < div; y_n=y_n+1){
                                            for(let z_n = 0; z_n < div; z_n=z_n+1){
                                                let xyz3 = tree[y_n][z_n][x_n]; 
                                                if(xyz3 < 13){
                                                  /*
                                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                                    */
                                                    voxel_map_vertices = func_create_8vertices_at_divided_cube_by_divX_divY_divZ_and_base_on_xyf(voxel_map_vertices,x,y,f,div,x_n,y_n,z_n);
                                                    voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,xyz3);
                                                    vertex_sum =vertex_sum+8;
                                                }
                                            }
                                        }
                                    }
                                }//if (voxel_map[y][f][x] =="🧱"){//code_num ==129521

                        //if (code_num ==128367){//🕯ろうそく
                  if (voxel_map[y][f][x] =="🕯"){//code_num ==128367　🕯️
                    let div = 7;
                    let tree =[
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ ,8,8,8, , , , , , , ],[ , , , , , , , , , , ],[ , ,0, , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ ,8,8,8, , , , , , , ],[ ,8,8,8, , , , , , , ],[8,8,8,8,8, , , , , , ],[ , ,2, , , , , , , , ],[ ,2,0,2, , , , , , , ],[ ,0,2,0, , , , , , , ],[ , ,0, , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ ,8,8,8, , , , , , , ],[ ,8,8,8, , , , , , , ],[8,8, ,8,8, , , , , , ],[ ,2, ,2, , , , , , , ],[0,0,0,0,0, , , , , , ],[ ,2, ,2, , , , , , , ],[ ,0,0,0, , , , , , , ],[ , ,0, , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ ,8,8,8, , , , , , , ],[ ,8,8,8, , , , , , , ],[8,8,8,8,8, , , , , , ],[ , ,2, , , , , , , , ],[ ,2,0,2, , , , , , , ],[ ,0,2,0, , , , , , , ],[ , ,0, , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ ,8,8,8, , , , , , , ],[ , , , , , , , , , , ],[ , ,0,, , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]],
[[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ],[ , , , , , , , , , , ]]
];
                    for(let x_n = 0; x_n < div; x_n=x_n+1){
                        for(let y_n = 0; y_n < div; y_n=y_n+1){
                            for(let z_n = 0; z_n < div; z_n=z_n+1){
                                let xyz3 = tree[y_n][z_n][x_n]; 
                                if(xyz3 < 13){
                                  /*
                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
*/
                                    voxel_map_vertices = func_create_8vertices_at_divided_cube_by_divX_divY_divZ_and_base_on_xyf(voxel_map_vertices,x,y,f,div,x_n,y_n,z_n);
                                    voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,xyz3);
                                    vertex_sum = vertex_sum+8; 
                                }
                            }
                        }
                    }
                }//if (voxel_map[y][f][x] =="🕯"){//code_num ==128367　🕯️


if (voxel_map[y][f][x] =="⛰"){//code_num ==9968 ⛰山⛰️
    let div = 7;
    let tree =[
        [[  ,  ,  ,11,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ]],
        [[  ,11,11,  ,11,11,  ],[  ,11,11,11,11,11,  ],[  ,  ,11,11,11,  ,  ],[  ,  ,  ,11,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ]],
        [[  ,11,  ,  ,  ,11,  ],[  ,11,  ,  ,  ,11,  ],[  ,11,  ,  ,  ,11,  ],[  ,  ,11,  ,11,  ,  ],[  ,  ,11,11,11,  ,  ],[  ,  ,  ,11,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ]],
        [[11,  ,  ,  ,  ,  ,11],[  ,11,  ,  ,  ,11,  ],[  ,11,  ,  ,  ,11,  ],[  ,11,  ,  ,  ,11,  ],[  ,  ,11,  ,11,  ,  ],[  ,  ,11,  ,11,  ,  ],[  ,  ,  ,11,  ,  ,  ]],
        [[  ,11,  ,  ,  ,11,  ],[  ,11,  ,  ,  ,11,  ],[  ,11,  ,  ,  ,11,  ],[  ,  ,11,  ,11,  ,  ],[  ,  ,11,11,11,  ,  ],[  ,  ,  ,11,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ]],
        [[  ,11,11,  ,11,11,  ],[  ,11,11,11,11,11,  ],[  ,  ,11,11,11,  ,  ],[  ,  ,  ,11,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ]],
        [[  ,  ,  ,11,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ],[  ,  ,  ,  ,  ,  ,  ]]
];
    for(let x_n = 0; x_n < div; x_n=x_n+1){
        for(let y_n = 0; y_n < div; y_n=y_n+1){
            for(let z_n = 0; z_n < div; z_n=z_n+1){
                let xyz3 = tree[y_n][z_n][x_n]; 
                if(xyz3 < 13){
                  /*
                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                    voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
                  */
                    voxel_map_vertices = func_create_8vertices_at_divided_cube_by_divX_divY_divZ_and_base_on_xyf(voxel_map_vertices,x,y,f,div,x_n,y_n,z_n);
                    voxel_map_triangles = func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,xyz3);
                    vertex_sum = vertex_sum+8; 
                }
            }
        }
    }
}//if (voxel_map[y][f][x] =="⛰"){//code_num ==9968 ⛰山⛰️


        }
    }
}

                let save_text = `<?xml version="1.0" encoding="utf-8"?>` +"\n";
                save_text = save_text + `<model xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" unit="millimeter" xml:lang="ja-JP" xmlns:m="http://schemas.microsoft.com/3dmanufacturing/material/2015/02">` +"\n";
                save_text = save_text + `<resources>` +"\n";
                save_text = save_text + `<basematerials id="1">` +"\n";

                save_text = save_text + `	<base name="0_red" displaycolor="#FF0000FF" />` +"\n";//赤
                save_text = save_text + `	<base name="1_orange" displaycolor="#FF8300FF" />` +"\n";
                save_text = save_text + `	<base name="2_yellow" displaycolor="#FFFF00FF" />` +"\n";
                save_text = save_text + `	<base name="3_greeb" displaycolor="#00FF00FF" />` +"\n";
                save_text = save_text + `	<base name="4_blue" displaycolor="#0000FFFF" />` +"\n";
                save_text = save_text + `	<base name="5_magenta" displaycolor="#FF00FFFF" />` +"\n";
                save_text = save_text + `	<base name="6_chairo" displaycolor="#864A2BFF" />` +"\n";
                save_text = save_text + `	<base name="7_black" displaycolor="#000000FF" />` +"\n";
                save_text = save_text + `	<base name="8_white" displaycolor="#FFFFFFFF" />` +"\n";
                save_text = save_text + `	<base name="9_LightGrey" displaycolor="#D3D3D3D3" />` +"\n";
                save_text = save_text + `	<base name="10_Silver" displaycolor="#C0C0C0C0" />` +"\n";
                save_text = save_text + `	<base name="11_Gray" displaycolor="#808080FF" />` +"\n";
                save_text = save_text + `	<base name="12_black" displaycolor="#505050FF" />` +"\n";
                save_text = save_text + `	<base name="13_black" displaycolor="#505050FF" />` +"\n";
                save_text = save_text + `	<base name="14_black" displaycolor="#505050FF" />` +"\n";
                
                save_text = save_text + `</basematerials>` +"\n";
                //save_text = save_text + "\n";
                save_text = save_text + `	<object id="2" type="model">` +"\n";
                save_text = save_text + `		<mesh>` +"\n";
                save_text = save_text + `			<vertices>` +"\n";
                save_text = save_text + voxel_map_vertices;
                save_text = save_text + `			</vertices>` +"\n";
                save_text = save_text + `			<triangles>` +"\n";
                save_text = save_text + voxel_map_triangles;
                save_text = save_text + `			</triangles>` +"\n";
                save_text = save_text + `		</mesh>` +"\n";
                save_text = save_text + `	</object>` +"\n";
                //save_text = save_text + "\n";
                save_text = save_text + `   </resources>` +"\n";
                save_text = save_text + `	<build>` +"\n";
                save_text = save_text + `		<item objectid="2" />` +"\n";
                save_text = save_text + `	</build>` +"\n";
                save_text = save_text + `</model>`;
                
                //voxel_save("model",save_text);
                export_zip_3mf_File(save_text);
                break;
            }
            
            string_of_Multiple_lines = str_split[i] +"\n"+ string_of_Multiple_lines; 
        }
    }
}//if(prog_input.match(reg_select_end_of_block) ){
//**************************************************************

function func_create_8vertices_at_divided_cube_by_divX_divY_divZ_and_base_on_xyf(voxel_map_vertices,x,y,f,div,x_n,y_n,z_n){
  //xyz座標に作成した1×1×1空間を８分割した、8pointを作成する。
  voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
  voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
  voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
  voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+0)/div+f}" />`+"\n";
  voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
  voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+0)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
  voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+0)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
  voxel_map_vertices = voxel_map_vertices + `<vertex x="${(y_n+1)/div+y}" y="${(x_n+1)/div+x}" z="${(z_n+1)/div+f}" />`+"\n";
  return voxel_map_vertices;
}


function func_create_cube_from_12triangles_from_8vertices(voxel_map_triangles,vertex_sum,color_select){
//立方体は12の三角形から作られている。
    let v_m_t = voxel_map_triangles;
    let v_sum = vertex_sum;
    v_m_t = v_m_t + `				<triangle v1="${0+v_sum}" v2="${4+v_sum}" v3="${5+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    v_m_t = v_m_t + `				<triangle v1="${0+v_sum}" v2="${5+v_sum}" v3="${1+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    v_m_t = v_m_t + `				<triangle v1="${0+v_sum}" v2="${2+v_sum}" v3="${4+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    v_m_t = v_m_t + `				<triangle v1="${2+v_sum}" v2="${6+v_sum}" v3="${4+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    v_m_t = v_m_t + `				<triangle v1="${2+v_sum}" v2="${3+v_sum}" v3="${6+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    v_m_t = v_m_t + `				<triangle v1="${3+v_sum}" v2="${7+v_sum}" v3="${6+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    v_m_t = v_m_t + `				<triangle v1="${3+v_sum}" v2="${1+v_sum}" v3="${7+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    v_m_t = v_m_t + `				<triangle v1="${1+v_sum}" v2="${5+v_sum}" v3="${7+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    v_m_t = v_m_t + `				<triangle v1="${0+v_sum}" v2="${1+v_sum}" v3="${2+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    v_m_t = v_m_t + `				<triangle v1="${1+v_sum}" v2="${3+v_sum}" v3="${2+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    v_m_t = v_m_t + `				<triangle v1="${4+v_sum}" v2="${6+v_sum}" v3="${5+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    v_m_t = v_m_t + `				<triangle v1="${5+v_sum}" v2="${6+v_sum}" v3="${7+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    return v_m_t;
}

function func_create_Plane_from_2triangles_from_4vertices(voxel_map_triangles,vertex_sum,color_select){//平面を作る。
    //平面は2つの三角形から作られている。
    let v_m_t = voxel_map_triangles;
    let v_sum = vertex_sum;
    v_m_t = v_m_t + `				<triangle v1="${0+v_sum}" v2="${2+v_sum}" v3="${1+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    v_m_t = v_m_t + `				<triangle v1="${1+v_sum}" v2="${2+v_sum}" v3="${3+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    return v_m_t;
}



function func_create_TriangularPRISM_from_8triangles_from_6vertices(voxel_map_triangles,vertex_sum,color_select){//三角柱を作る。◢◣◥◤
    //3角柱は８つの三角形から作られている。
    let v_m_t = voxel_map_triangles;
    let v_sum = vertex_sum;
    v_m_t = v_m_t + `				<triangle v1="${0+v_sum}" v2="${2+v_sum}" v3="${1+v_sum}" pid="1" p1="${color_select}" />`+"\n";//底面→修正
    v_m_t = v_m_t + `				<triangle v1="${3+v_sum}" v2="${4+v_sum}" v3="${5+v_sum}" pid="1" p1="${color_select}" />`+"\n";//天板→修正
    v_m_t = v_m_t + `				<triangle v1="${0+v_sum}" v2="${1+v_sum}" v3="${3+v_sum}" pid="1" p1="${color_select}" />`+"\n";//
    v_m_t = v_m_t + `				<triangle v1="${1+v_sum}" v2="${4+v_sum}" v3="${3+v_sum}" pid="1" p1="${color_select}" />`+"\n";//
    v_m_t = v_m_t + `				<triangle v1="${0+v_sum}" v2="${3+v_sum}" v3="${2+v_sum}" pid="1" p1="${color_select}" />`+"\n";//
    v_m_t = v_m_t + `				<triangle v1="${2+v_sum}" v2="${3+v_sum}" v3="${5+v_sum}" pid="1" p1="${color_select}" />`+"\n";//
    v_m_t = v_m_t + `				<triangle v1="${1+v_sum}" v2="${2+v_sum}" v3="${4+v_sum}" pid="1" p1="${color_select}" />`+"\n";
    v_m_t = v_m_t + `				<triangle v1="${2+v_sum}" v2="${5+v_sum}" v3="${4+v_sum}" pid="1" p1="${color_select}" />`+"\n";//そのまま
    return v_m_t;
}

function func_create_Cylinder_from_96triangles_from_50vertices(voxel_map_triangles,vertex_sum,color_select,div_circle){//円柱を作る。
    let v_m_t = voxel_map_triangles;
    let v_sum = vertex_sum;
    let degree180 = div_circle/2;

    //console.log("func_create_Cylinder_from_8triangles_from_24vertices",voxel_map_triangles);
    //for(let up = 1; up <=div_circle;up++){
    for(let up = 1; up <=degree180;up++){
        v_m_t = v_m_t + `				<triangle v1="${0+v_sum}" v2="${up+v_sum}" v3="${up+1+v_sum}" pid="1" p1="${color_select}" />`+"\n";//上面
        //let dw = up + 26;
        let dw = up + div_circle + 2;
        v_m_t = v_m_t + `				<triangle v1="${div_circle+2+v_sum}" v2="${dw+1+v_sum}" v3="${dw+v_sum}" pid="1" p1="${color_select}" />`+"\n";//下面
        
        v_m_t = v_m_t + `				<triangle v1="${dw+1+v_sum}" v2="${up+1+v_sum}" v3="${up+v_sum}" pid="1" p1="${color_select}" />`+"\n";//側面1
        v_m_t = v_m_t + `				<triangle v1="${up+v_sum}" v2="${dw+v_sum}" v3="${dw+1+v_sum}" pid="1" p1="${color_select}" />`+"\n";//側面2     
    }
    //半割れ専用：閉じる面
    for(let up = 1; up <=1;up++){
      let dw = up + div_circle + 2;
      v_m_t = v_m_t + `				<triangle v3="${dw+0+v_sum}" v2="${dw+degree180+v_sum}" v1="${up+0+v_sum}" pid="1" p1="${color_select}" />`+"\n";//側面1 　→degree180追加
      v_m_t = v_m_t + `				<triangle v3="${up+degree180+v_sum}" v2="${up+v_sum}" v1="${dw+0+degree180+v_sum}" pid="1" p1="${color_select}" />`+"\n";//側面2     →degree180追加
    }//閉じる面終わり


    return v_m_t;
}

function func_create_Cylinder_from_96triangles_from_50vertices_hole(voxel_map_triangles,vertex_sum,color_select,div_circle){//穴あき円柱を作る。
  let v_m_t = voxel_map_triangles;
  let v_sum = vertex_sum;
  let degree180 = div_circle/2;
    
  //for(let upface_n = 0; upface_n <=div_circle;upface_n++){
  for(let upface_n = 0; upface_n <=degree180-1;upface_n++){  
    v_m_t = v_m_t + `				<triangle v1="${upface_n + div_circle+1+v_sum}" v2="${upface_n+0+v_sum}" v3="${upface_n+1+v_sum}" pid="1" p1="${color_select}" />`+"\n";//上端面
    v_m_t = v_m_t + `				<triangle v1="${upface_n + div_circle+v_sum}" v2="${upface_n+v_sum}" v3="${upface_n+div_circle+1+v_sum}" pid="1" p1="${color_select}" />`+"\n";//上端面
    let dnface_n = upface_n  + div_circle *2 +2;
    v_m_t = v_m_t + `				<triangle v1="${dnface_n + div_circle+1+v_sum}" v2="${dnface_n+1+v_sum}" v3="${dnface_n+0+v_sum}" pid="1" p1="${color_select}" />`+"\n";//下端面
    v_m_t = v_m_t + `				<triangle v1="${dnface_n + div_circle+v_sum}" v2="${dnface_n+div_circle+1+v_sum}" v3="${dnface_n+v_sum}" pid="1" p1="${color_select}" />`+"\n";//下端面
  }

  //for(let upface_n = 0; upface_n <div_circle; upface_n++){//360°円
  for(let upface_n = 0; upface_n <degree180; upface_n++){//180円
    let dnface_n = upface_n + div_circle *2 +2;      
    v_m_t = v_m_t + `				<triangle v1="${dnface_n+v_sum}" v2="${upface_n+1+v_sum}" v3="${upface_n+v_sum}" pid="1" p1="${color_select}" />`+"\n";//外側面1
    v_m_t = v_m_t + `				<triangle v1="${dnface_n+v_sum}" v2="${dnface_n+1+v_sum}" v3="${upface_n+1+v_sum}" pid="1" p1="${color_select}" />`+"\n";//外側面2
  }

  //for(let upface_n = 1; upface_n <div_circle+1; upface_n++){
  for(let upface_n = 1; upface_n <degree180+1; upface_n++){
    let d= div_circle;
    let dnface_n = upface_n + div_circle *2 +2;
    v_m_t = v_m_t + `				<triangle v1="${dnface_n+1+d+v_sum}" v2="${upface_n+d+0+v_sum}" v3="${upface_n+1+d+v_sum}" pid="1" p1="${color_select}" />`+"\n";//内側面1
    v_m_t = v_m_t + `				<triangle v1="${dnface_n+1+d+v_sum}" v2="${dnface_n+d+0+v_sum}" v3="${upface_n+d+v_sum}" pid="1" p1="${color_select}" />`+"\n";//内側面2
  }

  //上下に蓋追加　360°回転の時は見えない。
  //for(let upface_n = 0; upface_n <=0; upface_n++){//180円
  for(let upface_n = 0; upface_n <=degree180; upface_n = upface_n +degree180){//180円
    let d= div_circle;
    let dnface_n = upface_n + div_circle *2 +2;
    v_m_t = v_m_t + `				<triangle v1="${dnface_n+v_sum}" v2="${upface_n+0+v_sum}" v3="${upface_n+1+d+v_sum}" pid="1" p1="${color_select}" />`+"\n";//外側面1 →　[外][外][内d]
    v_m_t = v_m_t + `				<triangle v1="${dnface_n+1+d+v_sum}" v2="${dnface_n+0+v_sum}" v3="${upface_n+1+d+v_sum}" pid="1" p1="${color_select}" />`+"\n";//内側面1　→　[内d][外][内d]

    v_m_t = v_m_t + `				<triangle v1="${upface_n + div_circle+v_sum}" v2="${upface_n+v_sum}" v3="${upface_n+div_circle+1+v_sum}" pid="1" p1="${color_select}" />`+"\n";//上端面
    v_m_t = v_m_t + `				<triangle v1="${dnface_n + div_circle+v_sum}" v2="${dnface_n+div_circle+1+v_sum}" v3="${dnface_n+v_sum}" pid="1" p1="${color_select}" />`+"\n";//下端面
　}//半割れ専用終わり
  return v_m_t;
}


function voxel_save(save_type,text){
    let blob = new Blob([text], {type: "text/plain"}); // バイナリデータを作ります。
// aタグを利用してイベントを発火させます
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.target = '_blank';
    a.download = '3dmodel.'+save_type;
    a.click();
}

function export_zip_3mf_File(text) {
    const Context_Types_xml =`<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml" Extension="model"/>
<Default ContentType="application/vnd.openxmlformats-package.relationships+xml" Extension="rels"/>
</Types>`;

//<Default ContentType="image/jpeg" Extension="jpeg"/>
//<Default ContentType="image/png" Extension="png"/>
//<Default ContentType="application/vnd.ms-package.3dmanufacturing-3dmodeltexture" Extension="texture"/>

    const rels = `<?xml version="1.0" encoding="utf-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" Target="/3D/3dmodel.model" Id="rel0" />
</Relationships>`;

let today = new Date();
let month =  today.getMonth()  +1;
let month2 =  ('00' + month ).slice( -2 );
let dd =  ('00' + today.getDate()).slice(-2);
let hh = ( '00' + today.getHours() ).slice(-2);
let mm = ( '00' + today.getMinutes() ).slice(-2);
let ss = ( '00' + today.getSeconds() ).slice(-2);
let zip = new Zlib.Zip();
let plainData = text;

    //console.log(plainData);
    zip.addFile(strToUtf8Array(plainData), {
        filename: strToUtf8Array('3D/3dmodel.model')
    });
    zip.addFile(strToUtf8Array(Context_Types_xml), {
        filename: strToUtf8Array('[Content_Types].xml')        
    });
    zip.addFile(strToUtf8Array(rels), {
        filename: strToUtf8Array('_rels/.rels')        
    });

    var compressData = zip.compress();
    var blob = new Blob([compressData], { 'type': 'application/zip' });
    
    // aタグを利用してイベントを発火させます
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.target = '_blank';

    a.download = today.getFullYear() +"_"+ month2 + "_"+ dd +"_"+ hh + "h" +  mm  + "m" + ss + "s"+ '_.3mf';
    //a.download = 'samp.3mf';
    a.click();
}


/// 文字列をUint8Arrayに変換
  function strToUtf8Array(str) {
    let n = str.length,
        idx = -1,
        bytes = [],
        i, j, c;
    for (i = 0; i < n; ++i) {
        c = str.charCodeAt(i);
        if (c <= 0x7F) {
            bytes[++idx] = c;
        } else if (c <= 0x7FF) {
            bytes[++idx] = 0xC0 | (c >>> 6);
            bytes[++idx] = 0x80 | (c & 0x3F);
        } else if (c <= 0xFFFF) {
            bytes[++idx] = 0xE0 | (c >>> 12);
            bytes[++idx] = 0x80 | ((c >>> 6) & 0x3F);
            bytes[++idx] = 0x80 | (c & 0x3F);
        } else {
            bytes[++idx] = 0xF0 | (c >>> 18);
            bytes[++idx] = 0x80 | ((c >>> 12) & 0x3F);
            bytes[++idx] = 0x80 | ((c >>> 6) & 0x3F);
            bytes[++idx] = 0x80 | (c & 0x3F);
        }
    }
    return bytes;
};

//2022/02/11 1436 →1488 →1527
//2022/02/06 1384 →1437→1383→1455→1495
//2022/02/03 1463 →1377
//2022/02/02 1440
//2022/01/26 1176 →1228 →1291
//2022/01/25 1130 →1176
//2022/01/24 1144 →1130
//2021/06/08 1211 →1063