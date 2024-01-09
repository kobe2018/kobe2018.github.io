
//多項式の展開
//https://tech-blog.s-yoshiki.com/2018/12/879/
//指数部と仮数部に分ける

function function_create_math_polynomial_expansion(prog_input){
    let element = document.querySelector('textarea');
    let end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
//**************************************************************   
    //const reg_math_factor = /^factor\[(\d+)\]$/;//ああgをつけないんだった。
    //const reg_math_expand_x_2 = /^(expand)\[\(x\+\d+\)²$/;
    //const reg_math_expand_x_2 = /^\((\d*)([a-z]*)([a-z])([\+\-])(\d+)*([a-z]*)\)([²³])$/;
    //const reg_math_expand_x_2 = /^\((\d*)([a-z]*)([a-z])([\+\-])(\d+)*([a-z]*)\)([(\^2)]*[²³]*[(\*\*2)]*)$/;
    const reg_math_expand_x_2 = /^\((\d*)([a-z]*)([a-z])([\+\-])(\d+)*([a-z]*)\)([(\^2)]*[(\^3)]*[²³]*[(\*\*2)]*[(\*\*3)]*)$/;
    
//(x+1)² = x²+2x+1
//(ax+b)² = a²x²+2abx+b²
//(x+1)³ = x³+3x
    if(prog_input.match(reg_math_expand_x_2)  ){
        console.log("reg_math_expand_x_2: " + prog_input.match(reg_math_expand_x_2)　);
        let str= prog_input.match(reg_math_expand_x_2);
        let output;

        if(str[7] == "²" || str[7] == "^2"|| str[7] == "**2"){//2乗ならば
            let a,a_sq,x,x_sq,pm,b,b_sq;
            let n1,n2,n2_1,n2_2,n3;
        
            if(str[1] == ""){n1="";n2_1=1;}else{n1 = str[1]**2;n2_1=str[1];}
            if(str[2] == ""){a="";a_sq="";}else{a = str[2];a_sq="²";}
            if(str[3] == ""){x="";x_sq="";}else{x = str[3];x_sq="²";}
            pm = str[4];
            if(str[5] == ""|| str[5] == undefined){n3="";n2_2=1;}else{n3 = str[5]**2;n2_2=str[5];}
            if(str[6] == ""){b="";b_sq="";}else{b = str[6];b_sq="²";}
            n2 = 2*n2_1*n2_2;

            output= n1+a+a_sq+x+x_sq+pm+n2+a+x+b+"+"+n3+b+b_sq;

        }else if(str[7] == "³" || str[7] == "^3"|| str[7] == "**3"){//3乗ならば
            let a,a_sq,x,x_sq,pm,b,b_sq;
            let a_cb,x_cb,b_cb;
            let n1,n2,n2_1,n2_2,n3,n3_1,n3_2,n4;

            if(str[1] == ""|| str[1] == undefined){n1="";n2_1=1;n3_1=1;}else{n1 = str[1]**3;n2_1=str[1]**2;n3_1=str[1];}
            if(str[2] == ""|| str[2] == undefined){a="";a_sq="";a_cb="";}else{a = str[2];a_sq="²";a_cb="³";}
            if(str[3] == ""|| str[3] == undefined){x="";x_sq="";x_cb="";}else{x = str[3];x_sq="²";x_cb="³";}
            pm = str[4];
            if(str[5] == ""|| str[5] == undefined){n2_2=1;n3_2=1;n4="";}else{n2_2=str[5];n3_2 = str[5]**2;n4=str[5]**3}
            if(str[6] == ""|| str[6] == undefined){b="";b_sq="";b_cb="";}else{b = str[6];b_sq="²";b_cb="³";}

            n2 = 3*n2_1*n2_2;
            n3 = 3*n3_1*n3_2;

            output= n1+a+a_cb+x+x_cb + pm + n2+a+a_sq+b+x+x_sq +"+"+ n3+a+b+b_sq+x + pm+n4+b+b_cb;
        }

/*
        console.log("length " + Object.keys(pf(num)).length );                
        console.log(JSON.stringify(pf(num)) );

        for(let i=0; i <Object.keys(pf(num)).length;i++  ){
            let obj_valu  = Object.values(pf(num))[i];
            console.log("obj_valu " + obj_valu);
            str = str + Object.keys(pf(num))[i] + replace_number_nomal_to_smallup(obj_valu);

            if(i+1 != Object.keys(pf(num)).length   ){
                str = str + "×";
            }
        }
*/
        //element.value =element.value.slice(0, end) + "\n"+ num + " = " + str + " = "+ JSON.stringify(pf(num)) +"" + element.value.slice(end);
        element.value =element.value.slice(0, end) +  " = " + output  + element.value.slice(end);
    }//if(prog_input.match(reg_math_expand_x_2) ){



/*******************************************
(ax+b)(cy+d) = acxy + adx + bcy +bd
(ax+b)(cx+d) = acx² + (ad+ bc)x +bd
*******************************************/
    const reg_math_2_polynomial_expansion = /^\((\d*)([a-z]*)([a-z])([\+\-])(\d+)*([a-z]*)\)\((\d*)([a-z]*)([a-z])([\+\-])(\d+)*([a-z]*)\)$/;//(ax+1)(by+1)
    if(prog_input.match(reg_math_2_polynomial_expansion)  ){
        console.log("reg_math_2_polynomial_expansion: " + prog_input.match(reg_math_2_polynomial_expansion)　);
            
        let str= prog_input.match(reg_math_2_polynomial_expansion);
        let output;
    
        //alert(str);
//        alert(str[3]+" "+str[9]);

        let a,x,pm1,b,c,y,pm2,d;
        let n11,n12,n21,n22;

        if(str[1] == ""){n11=1;}else{n11 = str[1];}
        if(str[2] == ""){a="";}else{a = str[2];}
        if(str[3] == ""){x="";}else{x = str[3];}
        pm_L = str[4];
        if(str[5] == ""|| str[5] == undefined){n12=1;}else{n12= str[5];}
        if(str[6] == ""){b="";}else{b= str[6];}
                
        if(str[7] == ""|| str[7] == undefined){n21=1;}else{n21 = str[7];}
        if(str[8] == ""){c="";}else{c = str[8];}
        if(str[9] == ""){y="";}else{y = str[9];}
        pm_R = str[10];
        if(str[11] == ""|| str[11] == undefined){n22=1;}else{n22 = str[11];}
        if(str[12] == ""){d="";}else{d = str[12];}


        if(x != y ){//(n₁₁ax + n₁₂b)(n₂₁cy + n₂₂d) = n₁₁n₂₁acxy + n₁₁n₂₂adx + n₁₂n₂₁bcy +n₁₂n₂₂bd
            let out_n11_n21,out_n11_n22,out_n12_n21,out_n12_n22;
            let pm1,pm2,pm3;
            if(n11*n21 == 1){out_n11_n21="";}else{out_n11_n21 = n11*n21}
            if(n11*n22 == 1){out_n11_n22="";}else{out_n11_n22 = n11*n22}
            if(n12*n21 == 1){out_n12_n21="";}else{out_n12_n21 = n12*n21}
            if(n12*n22 == 1){out_n12_n22="";}else{out_n12_n22 = n12*n22}
            
            if(pm_L == "-" && pm_R == "-"){pm3 ="+";}
            if(pm_L == "+" && pm_R == "-"){pm3 ="-";}
            if(pm_L == "-" && pm_R == "+"){pm3 ="-";}
            if(pm_L == "+" && pm_R == "+"){pm3 ="+";}
            
            output= out_n11_n21+a+c+x+y+  pm_L +  out_n11_n22+a+d+x + pm_R  + out_n12_n21+b+c+y  + pm3 +  out_n12_n22+b+d;

        }else if(x == y ){//(n₁₁ax+n₁₂b)(n₂₁cx+n₂₂d) = n₁₁n₂₁acx² + (n₁₁n₂₂ad + n₁₂n₂₁bc)x +n₁₂n₂₂bd
            let out_n11_n21,out_n11_n22,out_n12_n21,out_n12_n22;
            let pm1,pm2,pm3;

            if(n11*n21 == 1){out_n11_n21="";}else{out_n11_n21 = n11*n21}
            if(n11*n22 == 1){out_n11_n22="";}else{out_n11_n22 = n11*n22}
            if(n12*n21 == 1){out_n12_n21="";}else{out_n12_n21 = n12*n21}
            if(n12*n22 == 1 && b!="" && d!=""){out_n12_n22="";}else{out_n12_n22 = n12*n22}

            if(pm_L == "-" && pm_R == "-"){pm1="-";pm2="-";pm3 ="+";}
            if(pm_L == "+" && pm_R == "-"){pm1="+";pm2="-";pm3 ="-";}
            if(pm_L == "-" && pm_R == "+"){pm1="-";pm2="+";pm3 ="-";}
            if(pm_L == "+" && pm_R == "+"){pm1="+";pm2="+";pm3 ="+";}

            
            if(a=="" && b=="" && c=="" && d==""){
                output =  out_n11_n21+a+c+x+"²" +  "+(" + pm_R+ n11*n22 + pm_L + n12*n21 + ")" + x  +  pm3 + out_n12_n22+b+d + " = ";
                if(return_safeEval(pm_R+n11*n22+ pm_L + n12*n21) > 0){
                    output +=  out_n11_n21+a+c+x+"²" + "+" + return_safeEval(pm_R+n11*n22+ pm_L + n12*n21)+ x  + pm3 + out_n12_n22+b+d;
                }else{
                    output +=  out_n11_n21+a+c+x+"²" + return_safeEval(pm_R+n11*n22+ pm_L + n12*n21)+ x  + pm3 + out_n12_n22+b+d;
                }
            }else{
                output= out_n11_n21+a+c+x+"²"+  pm1 + "(" + pm2 + n11*n22+a+d+ pm1 + n12*n21+b+c +")" + x  + pm3 + out_n12_n22+b+d;
            }
            //(3x+1)(4x+2)
        }

        element.value =element.value.slice(0, end) +  " = " + output  + element.value.slice(end);
    
    }//if(prog_input.match(reg_math_2_polynomial_expansion)  ){


}//function function_create_math_polynomial_expansion(prog_input){//

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