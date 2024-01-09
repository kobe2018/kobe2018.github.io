function save(save_type,text){
    let blob = new Blob([text], {type: "text/plain"}); // バイナリデータを作ります。
    let today = new Date();
    let month =  today.getMonth()  +1;
    let month2 =  ('00' + month ).slice( -2 );
    let dd =  ('00' + today.getDate()).slice(-2);
    let hh = ( '00' + today.getHours() ).slice(-2);
    let mm = ( '00' + today.getMinutes() ).slice(-2);
    let ss = ( '00' + today.getSeconds() ).slice(-2);

// aタグを利用してイベントを発火させます
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.target = '_blank';
    a.download = today.getFullYear() +"_"+ month2 + "_"+ dd +"_"+ hh + "h" +  mm  + "m" + ss + "s"+ '_FileName.'+save_type;
    a.click();
}

function function_change_background_color(prog_input){
    let element = document.querySelector('textarea');
    let reg_background_color = /^backgroundcolor[ ](.*?)$/;//ああgをつけないんだった。
    if(prog_input.match(reg_background_color) ){
        let type_color = prog_input.match(reg_background_color)[1];
        element.style.backgroundColor =  type_color;
    }
}

function function_change_font_size(prog_input){
    let element = document.querySelector('textarea');
    let reg_font_size = /^size[ ](.*?)$/;//ああgをつけないんだった。
    if(prog_input.match(reg_font_size) ){
        let font_size_str = prog_input.match(reg_font_size)[1];
        element.style.fontSize =  font_size_str + "px";
    }
}

function function_change_scale(prog_input){
    let element = document.querySelector('textarea');
    let reg_scale = /^scale[ ](.*?)$/;//ああgをつけないんだった。
    if(prog_input.match(reg_scale) ){
        let scale_str = prog_input.match(reg_scale)[1];
        //alert(scale_str);
        element.style.transform = "scale(" +scale_str+")";
    }
}

function function_replace(prog_input){
    let reg_replace = /^replace\[(.*?),(.*?)\]$/;
    if(prog_input.match(reg_replace)){
        let before_str = prog_input.match(reg_replace)[1];
        var regExp_before_str = new RegExp( before_str, "g" ) ;
        let after_str =  prog_input.match(reg_replace)[2];
        element.value = element.value.replace(regExp_before_str,after_str);
        //element.value =value.slice(0, end).replace(regExp_before_str,after_str);
    }
}

function scroll_most_bottom(){
    let element = document.querySelector("textarea");
    console.log("st " + element.scrollTop);
    console.log("sh " + element.scrollHeight);
    console.log("ch " + element.clientHeight);
    //ページの最下部に移動する場合は以下で可能
    let bottom = element.scrollHeight - element.clientHeight;
    console.log("bottom " + bottom);
    element.scrollTop  = bottom; 
}

