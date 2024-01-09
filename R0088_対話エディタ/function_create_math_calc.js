function function_create_math_calc(prog_input){
    let element = document.querySelector('textarea');
    let end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
    //let value = element.value;
    let input_stirng;
//**************************************************************
    let reg_Multiple_lines_kagi_kakko_of_end = /^\]$/;
    if(prog_input.match(reg_Multiple_lines_kagi_kakko_of_end) ){
        let before_end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
        let str_split = element.value.slice(0,before_end).split("\n");
        console.log(str_split.length +  "行目です: "+ str_split.slice(-1)[0] );

        let string_of_Multiple_lines　= "";
        for(let i = str_split.length-2; i > -1; i--){
            //string_line = str_split.slice(-1)[0].slice(1,before_end);//「>以降の文字」
            console.log("▶行数"+i+" → "+str_split[i]);
            
            if(str_split[i] === "calc[" ){
                input_stirng = string_of_Multiple_lines;
                let output_of_calc = return_str_of_calc(input_stirng);

                element.value =element.value.slice(0, end) +"\n"+ output_of_calc +"" + element.value.slice(end);        
                break;
            }
            string_of_Multiple_lines = str_split[i] +"\n"+ string_of_Multiple_lines; 
        }
    }
}//if(prog_input.match(reg_Multiple_lines_kagi_kakko_of_end) ){


function return_str_of_calc(input_str){
    //let array_inner = input_str.split(/[^0-9.]+/).map(Number);//配列に変換後、型を数値に変換する。
    //let array_inner = input_str.split(/\n/);
    let array_inner = input_str.split(/\n/);
    return_console(array_inner);

    let obj = [];
    for(let vl of array_inner){
        //obj.push(vl.split(/:|[0-9.]+/));
        //obj.push(vl.split(/([^0-9.]+)([=＝:：])([0-9.]+)(.*)/));
        //obj.push(vl.split(/(.*)([=＝:：])([\d.]+|.*)/));//決定

        if(vl.split(/(.*)([=＝:：])([\d.]+|.*)/)[2] == "=" || vl.split(/(.*)([=＝:：])([\d.]+|.*)/)[2] == "＝"   ){//＝ならば
            obj.push(vl.split(/(.*)([=＝:：])(.*)/));
        }else{
            obj.push(vl.split(/(.*)([=＝:：])([\d.]+|.*)/));//決定
        }
        //obj.push(vl.split(/:/));

        //console.log("obj "+obj);
    } 
    
    console.log("★行毎に、正規表現で分割して配列とする★\n",obj);
    /*
    console.log("★★★");
    console.log(obj[1]);
    console.log(obj[2]);
    console.log(obj[2][0]);
    console.log(obj[2][1]);
    console.log(obj[3]);
    console.log(obj[4]);
*/
    let output_str_start = "";
    let output_str_be = "";
    let output_str_af = "";
    let output_str;
    for(let itr_eq of obj){
        //if(itr_eq[2] =="="){
        if(itr_eq[2].match(/=|＝/)){
            output_str_start = itr_eq[1];
            output_str_be = itr_eq[3];
            output_str_af = itr_eq[3];
            break;
        }
    }

    const reg_number =  /[0-9０-９.．]+/;
    for(let itr of obj){
        if(String(itr[3]).match(reg_number)   ){//数値ならば一致。matchは、stringしか受け付けてないようですね。知らんかった。
            console.log("itr[1] & itr[3] " + itr[1] + " "+ itr[3]);
            //JavaScriptで文字列を全置換するには、正規表現を用いるか、split join メソッドを組み合わせるテクニックを用いる必要があります。
            output_str_af = output_str_af.split(itr[1]).join("("+itr[3]+")");
            //output_str_af = output_str_af.replace(itr[1],"("+itr[3]+")");
        }
    }
    
    output_str_af = output_str_af.replace(/(.*)\/(.*)/g,"$1/($2)");//(数字)/(数字)終
    output_str_af = output_str_af.replace(/π/g,"(3.14159265359)");
    //output_str_af = output_str_af.replace(/(.*)\/(.*)([ \+\-\*\%])(.*)/g,"$1/($2)$3$4");//(数字)/(数字)終

    output_str_af = output_str_af.replace(/＋/g,"+").replace(/－/g,"-").replace(/✕/g,"*").replace(/×/g,"*");
    output_str_af = output_str_af.replace(/㏒(\d+)/g,"Math.log(($1))"  ).replace(/log(\d+)/g,"Math.log(($1))"   );
    output_str_af = output_str_af.replace(/²/g,"**2").replace(/³/g,"**3").replace(/⁴/g,"**4").replace(/⁵/g,"**5");
    output_str_af = output_str_af.replace(/\)\(/g,")*(").replace(/(\d)\(/g,"$1*(");//「)(」→「)*(」　と　「数字(」→「数字*(」
    output_str_af = output_str_af.replace(/\(([\d.]+)\)/g,"$1");//「(数字)」　→「数字」

    output_str = output_str_start + " = "+output_str_be + " = " + output_str_af + " = " + return_safeEval(output_str_af);
    return output_str;
}//function return_str_of_bar(input_str){
//**************************************************************
function return_console(array_inner){
    console.log("array_inner: ",array_inner);
    console.log("max: ", Math.max(...array_inner) );
    console.log("length: ", array_inner.length );
}