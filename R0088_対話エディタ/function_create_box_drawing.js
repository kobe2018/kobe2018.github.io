function function_create_box_drawing(prog_input){
    let element = document.querySelector('textarea');
    let element2 = document.querySelector('#ID_textarea02');
    let select_end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
    //let input_stirng;

    let reg_keisen = /^けいせん$|^罫線$/;
    if(prog_input.match(reg_keisen) ){
        element.value =element.value.slice(0, select_end) +`\n┌

┘`+ element.value.slice(select_end);   
    }

//**************************************************************
    let reg_end_of_block = /^┘$/;
    if(prog_input.match(reg_end_of_block) ){
        let before_end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
        let str_split = element.value.slice(0,before_end).split("\n");
        console.log(str_split.length +  "行目です: "+ str_split.slice(-1)[0] );
    
        let string_of_Multiple_lines = "";
        //for(let i = str_split.length-2; i > -1; i--){
        for(let i = str_split.length-2; i > -2; i--){
            console.log("▶行数"+i+" → "+str_split[i]);
            
            if(str_split[i] === "┌" ){
                //let input_stirng = string_of_Multiple_lines;
                let output_of_block = return_Surround_with_Blocks(string_of_Multiple_lines);
                //let output_of_block_count = output_of_block.split("\n").length;//結果の行数

                //alert(element.value.slice(select_end));
                //alert(element.value.slice(select_end).split("\n").length);

                //element.value =element.value.slice(0, select_end) +"\n"+ output_of_block +"" + element.value.slice(select_end);
                //結合する
                element.value =element.value.slice(0, select_end) +"\n"+  func_push_str(element.value.slice(select_end)    , output_of_block);
                //element2.innerTEXT =element.value.slice(0, select_end) +"\n"+  push_str(element.value.slice(select_end)    , output_of_block);
                //element2.innerHTML ="<br>"+element.value.slice(0, select_end) +"\n<br>"+  push_str(element.value.slice(select_end)    , output_of_block).replace(/\n/g,"<br>");
                break;
            }
            
            string_of_Multiple_lines = str_split[i] +"\n"+ string_of_Multiple_lines; 
        }
    }
}//if(prog_input.match(reg_select_end_of_block) ){
//**************************************************************

function func_push_str(base_str , add_str){
    let base_str_array = base_str.split("\n");
    let add_str_array = add_str.split("\n");
    
    let push_str ="";

    let max = Math.max(base_str_array.length,add_str_array.length+1);
    //alert(max);

    //for(let i = 1; i < base_str_array.length; i++){
    for(let i = 1; i < max; i++){
        if(add_str_array[i-1] != null){
            //alert("not null");
            if(base_str_array[i] != null){
                push_str += base_str_array[i] + add_str_array[i-1] + "\n";
            }else{
                push_str += add_str_array[i-1] + "\n";
            }
        }else{
            //alert("null");
            push_str += base_str_array[i] + "\n";
        }
    }
    return push_str;
}



function return_Surround_with_Blocks(input_str){
    let input_str_array = input_str.split(/\n/);
    let output_str;
    let max_string_width = 0;
    //return_console2(input_str_array);
    //alert(typeof input_str_array );
    //alert(input_str_array.length);

    for(let input_str_single_line  of input_str_array){
    //例）半角文字は1文字、全角文字は2文字として文字数をカウントするFunction
        //alert(input_str_single_line +" "+return_string_width(input_str_single_line)  );

        if(return_string_width(input_str_single_line) > max_string_width){
            max_string_width = return_string_width(input_str_single_line);
            //alert("max");
        }
    } 
    //alert("最大文字幅 " + max_string_width);
	if (max_string_width % 2 != 0) {//奇数
		max_string_width = max_string_width +1;
	}

    output_str = "┌" +"─".repeat(max_string_width/2) + "┐\n";
    //alert(input_str_array.length);

    //for(let input_str_single_line  of input_str_array){
    for(let i = 0; i< input_str_array.length -1;i++){

        //let diff_width_count = max_string_width - return_string_width(input_str_single_line);
        //alert(input_str_array[i]);
        let diff_width_count = max_string_width - return_string_width(input_str_array[i] );

        //alert("差分　"+ diff_width_count);
        //output_str += "│"　+ input_str_single_line + " ".repeat(diff_width_count) + "│\n";
        output_str += "│"　+ input_str_array[i] + " ".repeat(diff_width_count) + "│\n";
    } 
    
    output_str += "└" +"─".repeat(max_string_width/2) + "┘";
    return output_str;
}

//**************************************************************

function return_console2(array_inner){
    console.log("array_inner: ",array_inner);
    console.log("max: ", Math.max(...array_inner) );
    console.log("length: ", array_inner.length );
}