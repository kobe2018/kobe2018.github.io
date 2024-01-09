function function_create_math_graph_bar(prog_input){
    let element = document.querySelector('textarea');
    let end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
    let value = element.value;
    let input_stirng,graph_of_str;
//**************************************************************    
		let reg_bar = /^bar\[(.*?)\]$/;//ああgをつけないんだった。
		if(prog_input.match(reg_bar) ){
			//console.log(prog_input.match(reg_bar));
			input_stirng = prog_input.match(reg_bar)[1];
			graph_of_str =return_str_of_bar(input_stirng);
			element.value =value.slice(0, end) +"\n"+ graph_of_str +"\n" + value.slice(end);
			element.setSelectionRange(end, end);
		}
//**************************************************************    
		let reg_barh = /^barh\[(.*?)\]$/;
		if(prog_input.match(reg_barh) ){
			input_stirng = prog_input.match(reg_barh)[1];
			graph_of_str = return_str_of_barh(input_stirng);
			element.value =value.slice(0, end) +"\n"+ graph_of_str +"\n" + value.slice(end);
			element.setSelectionRange(end, end);
    }
//**************************************************************
    let reg_barh_Multiple_lines_kagi_kakko_of_end = /^\]$/;
    if(prog_input.match(reg_barh_Multiple_lines_kagi_kakko_of_end) ){
        let before_end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
        let str_split = element.value.slice(0,before_end).split("\n");
        console.log(str_split.length +  "行目です: "+ str_split.slice(-1)[0] );

        let string_of_Multiple_lines　= "";
        for(let i = str_split.length-2; i > -1; i--){
            //string_line = str_split.slice(-1)[0].slice(1,before_end);//「>以降の文字」
            console.log("▶行数"+i+" → "+str_split[i]);
            
            if(str_split[i] === "barh[" ){
                console.log("★★★barh終了　→　"+string_of_Multiple_lines);
                input_stirng = string_of_Multiple_lines;
                graph_of_str = return_str_of_barh(input_stirng);
                element.value =value.slice(0, end) +"\n"+ graph_of_str +"\n" + value.slice(end);        
                break;
            }else if(str_split[i] === "bar[" ){
                console.log("★★★bar終了　→　"+string_of_Multiple_lines);
                input_stirng = string_of_Multiple_lines;
                graph_of_str = return_str_of_bar(input_stirng);
                element.value =value.slice(0, end) +"\n"+ graph_of_str +"\n" + value.slice(end);        
                break;
            }else if(str_split[i] === "sum[" ){
                console.log("★★★sum終了　→　"+string_of_Multiple_lines);
                input_stirng = string_of_Multiple_lines;
                let sum = return_sum_of_string(input_stirng);
                element.value =value.slice(0, end) +"\n"+ sum +"\n" + value.slice(end);        
                break;
            }
            string_of_Multiple_lines = str_split[i] +" "+ string_of_Multiple_lines; 
        }
        //input_stirng = string_of_Multiple_lines;
        //graph_of_str = return_str_of_barh(input_stirng);
        //element.value =value.slice(0, end) +"\n"+ graph_of_str +"\n" + value.slice(end);
				element.setSelectionRange(end,end);
    }
}//function function_create_math_graph_bar(prog_input){


function return_str_of_bar(input_str){
    let array_inner = input_str.split(/[^0-9.-]+/).map(Number);//配列に変換後、型を数値に変換する。
    return_console(array_inner);

    let output_str = "\n"+"       ├";
    let bar_gap_space =" ";
    //for(let ten_count= 10;ten_count>0;ten_count--){
    //alert("max: " + Math.max(...array_inner));
    //alert("min: " + Math.min(...array_inner));
    //alert("maxabs: " + Math.max(Math.max(...array_inner),Math.abs(Math.min(...array_inner)) ));
    if(Math.max(...array_inner) >= Math.abs(Math.min(...array_inner)) ) {
        for(let ten_count= 10;ten_count>0;ten_count--){
            //output_str += "\n" +" "+ ('      ' + (ten_count-0.5)*Math.max(...array_inner)/10 ).slice(-6) +"├";//数値の桁幅合わせ済
            output_str += "\n" +" "+ ('      ' + (ten_count-0.5)*Math.max(...array_inner)/10 ).slice(-6) +"├";//数値の桁幅合わせ済
            
            for(let element_of_array of array_inner){
                let Ratio_of_max = 10*element_of_array/Math.max(...array_inner);//7.8
                //console.log("ten_count ",ten_count ,"j ", j ," Ratio_of_max ",Ratio_of_max ," Math.ceil(Ratio_of_max) ",Math.ceil(Ratio_of_max));
                if(Ratio_of_max >=ten_count) { //7.8 > 10
                    console.log("1_Ratio_of_max < ten_count "+ Ratio_of_max+" "+ten_count);
                    output_str += "█" + bar_gap_space;
                    //console.log(Math.ceil(Ratio_of_max));//引数として与えた数以上の最小の整数を返す。7.004→8
                }else if(Math.ceil(Ratio_of_max)  ==ten_count){//Math.ceil() は、引数の数以上の最小の整数を返す。最小点整数と
                    //小数点以下を取り出し。
                    let j_Decimals = parseFloat("0."+(String(Ratio_of_max)).split(".")[1]);
                    //console.log("j_Decimals " + j_Decimals);

                    if(j_Decimals < 0.1251) {output_str += "＿";  
                    }else if(j_Decimals < 0.2501){output_str += "▁";
                    }else if(j_Decimals < 0.3751){output_str += "▂";
                    }else if(j_Decimals < 0.5001){output_str += "▃";
                    }else if(j_Decimals < 0.6251){output_str += "▄";
                    }else if(j_Decimals < 0.7501){output_str += "▅";
                    }else if(j_Decimals < 0.8751){output_str += "▆";
                    }else if(j_Decimals < 1.0000){output_str += "▇";
                    }
                    output_str += "" + bar_gap_space;
                }else{
                    output_str += "　" + bar_gap_space;
                }
            }//for(let j in vary_result_split){
        }

        //負の数
        if(Math.min(...array_inner)<0){//もし負の数が存在すれば
            for(let ten_count= -1;ten_count>-11;ten_count--){
                output_str += "\n" +" "+ ('      ' + (ten_count-0.5)*Math.max(...array_inner)/10 ).slice(-6) +"├";//数値の桁幅合わせ済
                for(let element_of_array of array_inner){
                    let Ratio_of_max = 10*element_of_array/Math.max(...array_inner);
                    if(Ratio_of_max <= ten_count) { //-2.22 < -1
                        console.log("2_Ratio_of_max < ten_count "+ Ratio_of_max+" "+ten_count);
                        output_str += "█" + bar_gap_space;
                    }else if(Math.floor(Ratio_of_max)  ==　ten_count){//Math.ceil() は、引数の数以上の最小の整数を返す。最小点整数と
                        console.log("2_2_Math.ceil(Ratio_of_max) < ten_count "+ Math.ceil(Ratio_of_max)+" "+ten_count);
                        console.log("2_2_Math.floor(Ratio_of_max) < ten_count "+ Math.floor(Ratio_of_max)+" "+ten_count);
                        let j_Decimals = parseFloat("0."+(String(Ratio_of_max)).split(".")[1]);
                        console.log("j_Decimals "+j_Decimals);
                        //if(j_Decimals < 0.1251) {output_str += "＿";  
                        //}
                        if(j_Decimals < 0.1251) {output_str += "￣";  
                        }else if(j_Decimals < 0.2501){output_str += "▔";
                        }else if(j_Decimals < 0.3751){output_str += "🮂";
                        }else if(j_Decimals < 0.5001){output_str += "🮃";
                        }else if(j_Decimals < 0.6251){output_str += "▀";
                        }else if(j_Decimals < 0.7501){output_str += "🮄";
                        }else if(j_Decimals < 0.8751){output_str += "🮅";
                        }else if(j_Decimals < 1.0000){output_str += "🮆";
                        }
                        output_str += "" + bar_gap_space;
                    }else{
                        output_str += "　" + bar_gap_space;
                    }
                }
            }
        }//if(Math.min(...array_inner)<0){//もし負の数が存在すれば
    }
    return output_str;
}//function return_str_of_bar(input_str){
//**************************************************************


function return_str_of_barh(input_str){
    let array_inner = input_str.split(/[^0-9.]+/).map(Number);//配列に変換後、型を数値に変換する。
    return_console(array_inner);
    let split_num =10;

    let output_str = ""+"　　　　"+"　".repeat(split_num-1)+" ↓"+Math.max(...array_inner);
    output_str += "\n"+"　　　　"+"┬".repeat(split_num+1)+"";
    for(let j of array_inner){
        //output_str += "\n" +" "+ ('      ' + (i-0.5)*Math.max(...array_inner)/10 ).slice(-6) +"├";//数値の桁幅合わせ済
        let Ratio_of_max = j/Math.max(...array_inner)*split_num;
        output_str += "\n　　　　";
        for(let i= 1; i<split_num+1; i++){
            //console.log("i ", i ,"j ", j ," Ratio_of_max ",Ratio_of_max ," Math.ceil(Ratio_of_max) ",Math.ceil(Ratio_of_max));
            if(Ratio_of_max > i) { 
                output_str += "█";//1
                //console.log(Math.ceil(Ratio_of_max));//引数として与えた数以上の最小の整数を返す。7.004→8
            }else if(Ratio_of_max == i){
                output_str += "█"+ j;//1
            }else if(Math.ceil(Ratio_of_max)  == i){
                //小数点以下を取り出し。
                let j_Decimals = parseFloat("0."+(String(Ratio_of_max)).split(".")[1]);
                //console.log("j_Decimals ",j_Decimals);
                if(j_Decimals == 0) {output_str += "　"+j;//0
                }else if(j_Decimals < 0.1251) {output_str += "⎸"+j;//9
                }else if(j_Decimals < 0.2501){output_str += "▏"+j;//8
                }else if(j_Decimals < 0.3751){output_str += "▎"+j;//7
                }else if(j_Decimals < 0.5001){output_str += "▍"+j;//6
                }else if(j_Decimals < 0.6251){output_str += "▌"+j;//5
                }else if(j_Decimals < 0.7501){output_str += "▋"+j;//4
                }else if(j_Decimals < 0.8751){output_str += "▊"+j;//3
                }else if(j_Decimals < 1.0000){output_str += "▉"+j;//2
                }
            }
        }//for(let i= 9; i>1; i--){
    }//for(let j in vary_result_split){
    return output_str;
}//function return_str_of_barh(input_str){

function return_sum_of_string(input_str){
    //let val_sum;
    let array_inner = input_str.split(/[^0-9.]+/).map(Number);//配列に変換後、型を数値に変換する。
    return_console(array_inner);
    
    let val_sum = array_inner.join(" + ").slice( 0, -4 );//末尾から4文字を削除
    let output_str = "sum["+ val_sum +"]= " + return_safeEval(val_sum);
    return output_str;
}//function return_sum_of_string(input_str){




//**************************************************************
function return_console(array_inner){
    console.log("array_inner: ",array_inner);
    console.log("max: ", Math.max(...array_inner) );
    console.log("length: ", array_inner.length );
}

//198,130,126,134