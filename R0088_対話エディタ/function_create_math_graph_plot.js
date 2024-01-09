function function_create_math_graph_plot(prog_input){
    let element = document.querySelector('textarea');
    let end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
    //let reg_graph_plot = /^plot\((.*?)\)$/g;
    //let reg_graph_plot = /^plot\[(y[ ]*=[ ]*)(.*?)\]$/;
    let reg_graph_plot = /^plot\[(y)(²)*([ ]*=[ ]*)(.*?)\]$/;
    //let reg_graph_plot2 = /^plot\[(y)(²)([ ]*=[ ]*)(.*?)\]$/;
    let Mathematical_formulas;
    
    if(prog_input.match(reg_graph_plot) ){
        let str ="";
        let plot_table =[];
        let x_width = 61 ;//条件は、奇数であること
        let y_height_max=41,y_height_min=-41;//条件は、奇数であること
        document.querySelector("textarea").wrap="off";

        //step1:初期設定
        for(let x= - x_width ; x < x_width;x++){
            plot_table[x]=[];
            for(let y= y_height_max ; y > y_height_min ; y--){
                if(y==0){
                    plot_table[x][y] = "0";
                }else{
                    plot_table[x][y] = "0";
                }
            }
        }//for(let x= - x_width ; x < x_width;x++){

        Mathematical_formulas = prog_input.match(reg_graph_plot)[4];//数式

        console.log("↓plot[関数]: ");
        console.log(prog_input.match(reg_graph_plot)    );//数式を取り出す
        console.log(prog_input.match(reg_graph_plot)[2]    );//y=以降を取り出す。
        console.log(prog_input.match(reg_graph_plot)[4]    );//y=以降を取り出す。

        let scale = 10;

        //step2:関数を元に、0と1でを配列に入力        
        for(let x=-x_width ; x<x_width ; x = x + 1){
            for(let decimal=0;decimal<1;decimal=decimal+0.05){//0.05:2440, 0.03:4148

                let calc_y = return_func(Mathematical_formulas,(x+decimal)/scale )*scale;
                let y_int;

                if( calc_y > 0 ){
                    y_int = Math.trunc(calc_y);
                }else{
                    y_int = Math.floor(calc_y);
                }
                if( calc_y != 0 ){
                    if(y_height_min <= y_int  && y_int < y_height_max ){
                        plot_table[x][y_int] = "1";

                        if(prog_input.match(reg_graph_plot)[2] =="²"){
                            plot_table[x][-y_int] = "1";
                        }

                    }                        
                }
            }//for(let decimal=0;decimal<1;decimal=decimal+0.5){
        }//step2:


        
        //step3:0と1を変換する。
        for(let y= y_height_max ; y > y_height_min-1 ; y=y-2){
            for(let x=-x_width ; x<x_width - 1 ; x=x+2){
                if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "0"){
                    //console.log("y0 "+y);
                    if(x == -1 && y== -1){
                        str += "┼";
                    }else if(x == -1){
                        str += "│";
                    }else if(x == -1*scale - 1 && y== -1){
                        str += "┼";
                    }else if(x == 1*scale -1  && y== -1){
                        str += "┼";
                    }else if(y == -1){
                        str += "─";
                    }else{
                        str += "  ";
                    }
                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "1"){
                    str += "▝";
                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "0"){
                    str += "▘";
                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "1"){
                    str += "▀";


                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "0"){
                    str += "▗";
                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "1"){
                    str += "▐";
                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "0"){
                    str += "▚";
                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "1"){
                    str += "▜";


                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "0"){
                    str += "▖";
                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "1"){
                    str += "▞";
                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "0"){
                    str += "▌";
                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "1"){
                    str += "▛";


                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "0"){
                    str += "▄";
                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "1"){
                    str += "▟";
                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "0"){
                    str += "▙";
                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "1"){
                    str += "█";
                }

            }
            str += "\n";
        }
				element.value =element.value.slice(0, end) + ""+ str +"" + element.value.slice(end);
				element.setSelectionRange(end, end);
    }
//********************************************************************************************************* */
    let reg_graph_plot_polar_coordinates = /^plot\[(r)(²)*([ ]*=[ ]*)(.*?)\]$/;
    if(prog_input.match(reg_graph_plot_polar_coordinates) ){
        let str ="";
        let plot_table =[];
        let x_width = 61 ;//条件は、奇数であること
        let y_height_max=41,y_height_min=-41;//条件は、奇数であること

        //r= a+bθ   x=rcosθ   y=rsinθ
        document.querySelector("textarea").wrap="off";
        //step1:初期設定
        for(let x= - x_width ; x < x_width;x++){
            plot_table[x]=[];
            for(let y= y_height_max ; y > y_height_min ; y--){
                if(y==0){
                    plot_table[x][y] = "0";
                }else{
                    plot_table[x][y] = "0";
                }
            }
        }//for(let x= - x_width ; x < x_width;x++){

        Mathematical_formulas = prog_input.match(reg_graph_plot_polar_coordinates)[4];//数式
        console.log(prog_input.match(reg_graph_plot_polar_coordinates)    );//数式を取り出す
        console.log(prog_input.match(reg_graph_plot_polar_coordinates)[2]    );//y=以降を取り出す。
        console.log(prog_input.match(reg_graph_plot_polar_coordinates)[4]    );//y=以降を取り出す。
        let scale = 5;

        //step2:関数を元に、0と1でを配列に入力        
        //for(let x=-x_width ; x<x_width ; x = x + 1){
        for(let θ=0 ; θ<16*Math.PI ; θ = θ + Math.PI/16){
            for(let decimal=0;decimal<1;decimal=decimal+0.01){//

                //let calc_y = return_func_theta(Mathematical_formulas,(θ + decimal)/scale )*scale;
                let calc_y = return_func_theta(Mathematical_formulas,(θ + decimal) )*scale;
                let x_int,y_int;

                //if( calc_y > 0 ){
                    x_int = Math.trunc(calc_y * Math.cos(θ+decimal)    );
                    y_int = Math.trunc(calc_y * Math.sin(θ+decimal)    );
                //}

                if( calc_y != 0 ){
                    if(-x_width < x_int  && x_int < x_width ){
                        if(y_height_min < y_int  && y_int < y_height_max ){
                            plot_table[x_int][y_int] = "1";
/*
                        if(prog_input.match(reg_graph_plot)[2] =="²"){
                            plot_table[x][-x_int] = "1";
                        }
*/
                        }
                    }                        
                }
            }//for(let decimal=0;decimal<1;decimal=decimal+0.5){
        }//step2:
        
        //step3:0と1を変換する。
        for(let y= y_height_max ; y > y_height_min-1 ; y=y-2){
            for(let x=-x_width ; x<x_width - 1 ; x=x+2){
                if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "0"){
                    //console.log("y0 "+y);
                    if(x == -1 && y== -1){
                        str += "┼";
                    }else if(x == -1){
                        str += "│";
                    }else if(x == -1*scale - 1 && y== -1){
                        str += "┼";
                    }else if(x == 1*scale -1  && y== -1){
                        str += "┼";
                    }else if(y == -1){
                        str += "─";
                    }else{
                        str += "  ";
                    }
                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "1"){
                    str += "▝";
                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "0"){
                    str += "▘";
                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "1"){
                    str += "▀";


                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "0"){
                    str += "▗";
                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "1"){
                    str += "▐";
                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "0"){
                    str += "▚";
                }else if(plot_table[x][y] == "0" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "1"){
                    str += "▜";


                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "0"){
                    str += "▖";
                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "1"){
                    str += "▞";
                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "0"){
                    str += "▌";
                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "0" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "1"){
                    str += "▛";


                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "0"){
                    str += "▄";
                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "0" &&  plot_table[x+1][y+1] == "1"){
                    str += "▟";
                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "0"){
                    str += "▙";
                }else if(plot_table[x][y] == "1" &&  plot_table[x+1][y] == "1" && plot_table[x][y+1] == "1" &&  plot_table[x+1][y+1] == "1"){
                    str += "█";
                }

            }
            str += "\n";
        }
				element.value =element.value.slice(0, end) + ""+ str +"" + element.value.slice(end);
				element.setSelectionRange(end, end);

    }

}

    function return_func(input_str,input_x){
        let output_before,output_after;
        //output_before = eval(input_str.replace("x", input_x));
        console.log("a "+input_x);
        output_before = Function('"use strict";let x='+input_x+'; return ('+input_str+')')();
        //output_before = input_str.replace(/[a-zA-Z]/g, input_x);
        //output_before = input_str.replace("x", input_x);
        //output_after = return_safeEval( output_before  );//関数式に変換
        
        //output_after = return_safeEval(output_before);//関数式に変換
        //output_after = return_safeEval( input_str.replace(/[a-zA-Z]/g, input_x)  );//関数式に変換
        
        output_after = output_before;
        //console.log(output_after);
        return output_after;
    }

    function return_func_theta(input_str,input_theta){
        let output_after = Function('"use strict";let θ='+input_theta+'; return ('+input_str+')')();
        return output_after;
    }

    function return_y(input_x){
        let output;
        const scale = 3;
        let x = input_x/scale;
        //return output = 2*x;//一次曲線
        return output = x**3;//2次曲線  scale = 3
        //return output = 1/x;//反比例
        //return output = -1*x**2+10;//二次曲線
        //return output = Math.sqrt(625 - 0.5*x**2);//上円
        //return output = 20*Math.sqrt(x**3-x +2);//楕円曲線 scale = 20;
        //return output = (x)**2;
        //return output = (x-4)**2+5;
        //return output = x**3 - x**2 - 10*x-1;//x³-x²-10x-1
        //return output = 3*x**2 - 2*x - 10;//微分式3x²-2x -10

        //return output = 20*Math.sin(x) + 20/3*Math.sin(3*x) + 20/5*Math.sin(5*x);
        //return output = 20*Math.sin(x) + 20/3*Math.sin(3*x) + 20/5*Math.sin(5*x)+ 20/7*Math.sin(7*x)+ 20/9*Math.sin(9*x)+ 20/11*Math.sin(11*x)+ 20/13*Math.sin(13*x);

        //標準正規分布
        //return output = 80/Math.sqrt(2*3.141592)*Math.E**(-1*x**2/2);//scale = 10;

        //収束関数
        //return output = 130*Math.sin(x)/x;
    }//291 →　