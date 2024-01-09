
function function_create_math_log(prog_input){//
    let element = document.querySelector('textarea');
    let end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
//**************************************************************   
    const reg_math_log = /^㏒|^log([\d.]+)$/;
    if(prog_input.match(reg_math_log)  ){
        let num = prog_input.match(reg_math_log)[1];
        let str = Math.log(num);
        element.value =element.value.slice(0, end) +  " = " + str  + element.value.slice(end);
    }
}//if(prog_input.match(function_create_math_log) ){

