function return_safeEval(val){
    
    let result = Function('"use strict";return ('+val+')')();
    let b = typeof result;
    if(b == "bigint"){
        return result;    
    }else{
        let output = Math.round(result*10**11)/10**11;
    //let output = Math.round(result*2**35)/2**35; 
    return output;
    }
    /*
    */
    //return Function('"use strict";return ('+val+').toFixed(10)')();
    //return Function('"use strict";return ('+val+')')();

    //0.1 + 0.2 =0.30000000000000004
    //→10**15で誤差が消える。
    //2**35でも誤差が消えない。

    //450*1.08 =486.00000000000006
    //10**12で誤差が消える。3.141592653589793*2 =6.28318530718
    //2**42で誤差が消える。3.141592653589793*2 =6.283185307179565
    
    //66.9 * 100 =6690.000000000001
    //10**11で誤差が消える。
    
    //2.718281828459045*3.141592653589793 =8.53973422267
    //2.718281828459045*3.141592653589793 =8.539734222673566

} 

