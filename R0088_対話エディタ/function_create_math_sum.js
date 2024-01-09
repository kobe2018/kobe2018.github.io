function function_create_math_sum(prog_input){
    let element = document.querySelector('textarea');
    let end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
//**************************************************************
    let reg_Multiple_lines_sum = /^合計$|^ごうけい$/;
    if(prog_input.match(reg_Multiple_lines_sum) ){
        let before_end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
        let str_split = element.value.slice(0,before_end).split("\n");
        console.log(str_split.length +  "行目です: "+ str_split.slice(-1)[0] );
        
        let string_of_Multiple_lines　= "";
        for(let i = str_split.length-2; i > -1; i--){
            //string_line = str_split.slice(-1)[0].slice(1,before_end);//「>以降の文字」
            console.log("▶行数"+i+" → "+str_split[i]);
            
            string_of_Multiple_lines = str_split[i] +"\n"+ string_of_Multiple_lines; 
        }
        //alert(string_of_Multiple_lines);
        
        let output_of_calc = return_str_of_sum(string_of_Multiple_lines);
        
        element.value =element.value.slice(0, end) +"　"+ output_of_calc +"" + element.value.slice(end);        
    }
}//if(prog_input.match(reg_Multiple_lines_sum) ){


const reg_number2 =  /(.*?)([\d\.]+)(.*)/;

function return_str_of_sum(input_str){
    //let array_inner = input_str.split(/[^0-9.]+/).map(Number);//配列に変換後、型を数値に変換する。
    //let array_inner = input_str.split(/\n/);
    let array_inner = input_str.split(/\n/);
    return_console(array_inner);
    let obj = [];

    for(let vl of array_inner){   
        //if(String(vl).match(reg_number2)   ){//数値ならば一致。matchは、stringしか受け付けてないようですね。知らんかった。
        if(reg_number2.test(vl)   ){
            //console.log("█→ " + vl.replace(reg_number2,"$1") + " █→ " + vl.replace(reg_number2,"$2") +" █→ " + vl.replace(reg_number2,"$3") );
            obj.push(vl.replace(reg_number2,"$2") );
        }

    } 
    console.log("★行毎に、正規表現で分割して配列とする★\n",obj);
    let string_joint = obj.join("+");//「+」を挟んで文字列結合する。1+2+3+4+5
        
    output_str = string_joint + "= "+ return_safeEval(string_joint);
    return output_str;
}//function return_str_of_bar(input_str){

//**************************************************************
function return_console(array_inner){
    console.log("array_inner: ",array_inner);
    console.log("max: ", Math.max(...array_inner) );
    console.log("length: ", array_inner.length );
}