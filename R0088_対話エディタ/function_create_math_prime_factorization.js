
//https://tech-blog.s-yoshiki.com/2018/12/879/
//指数部と仮数部に分ける

//素因数分解
//function function_create_math_factor(prog_input){//
function function_create_math_prime_factorization(prog_input){//
    let element = document.querySelector('textarea');
    let end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
//**************************************************************   
    //const reg_math_factor = /^factor\[(\d+)\]$/;//ああgをつけないんだった。
    //const reg_math_factor = /^(factor)\[(\d+)(\])*$|^(素因数分解)(\d+)$/;
    const reg_math_factor = /^\[(\d+)(\])*$/;
    
    if(prog_input.match(reg_math_factor)  ){
        console.log("reg_math_factor: " + prog_input.match(reg_math_factor)　);
        let num;

        if(prog_input.match(reg_math_factor)[0]){
            num = prog_input.match(reg_math_factor)[1];
        }

        /*factorの場合
        if(prog_input.match(reg_math_factor)[1] == "factor"){
            num = prog_input.match(reg_math_factor)[2];
        }else if(prog_input.match(reg_math_factor)[4] == "素因数分解"){            
            num = prog_input.match(reg_math_factor)[5];
        }
        */

        console.log(pf(num) );
        console.log(Object.keys(pf(num)) );
        console.log("length " + Object.keys(pf(num)).length );
        
        //console.log(Object.keys(pf(num))[0] );
        //console.log(Object.keys(pf(num))[1] );
        
        console.log(JSON.stringify(pf(num)) );

        let str = "";
        
        for(let i=0; i <Object.keys(pf(num)).length;i++  ){
            let obj_valu  = Object.values(pf(num))[i];
            console.log("obj_valu " + obj_valu);
            str = str + Object.keys(pf(num))[i] + replace_number_nomal_to_smallup(obj_valu);

            if(i+1 != Object.keys(pf(num)).length   ){
                str = str + "×";
            }
        }
        //element.value =element.value.slice(0, end) + "\n"+ num + " = " + str + " = "+ JSON.stringify(pf(num)) +"" + element.value.slice(end);
        //element.value =element.value.slice(0, end) + "\n"+ num + " = " + str  + element.value.slice(end);
        element.value =element.value.slice(0, end) +  " = " + str  + element.value.slice(end);
        
    }//if(prog_input.match(reg_math_factor) ){

}

function replace_number_nomal_to_smallup(num){
    console.log(num);
    let result = String(num).replace(/0/g,"⁰")
        .replace(/1/g,"¹")
        .replace(/2/g,"²")
        .replace(/3/g,"³")
        .replace(/4/g,"⁴")
        .replace(/5/g,"⁵")
        .replace(/6/g,"⁶")
        .replace(/7/g,"⁷")
        .replace(/8/g,"⁸")
        .replace(/9/g,"⁹");
    return result;
}

function pf(n){//
    let result = {};

    if (n === "1") {
        let resutl1 = {"1":1}; 
        return resutl1
    }

    let init = 2;

    while (n !== 1) {
        let i = init;
        while (i < Number.MAX_SAFE_INTEGER) {
            if (n % i === 0) {
                n /= i;
                if (!(result[i] > 0)) {
                    result[i] = 0;
                }
                result[i]++;
                break;
            }
            i++;
        }
        init = i;
    }
    return result;
}