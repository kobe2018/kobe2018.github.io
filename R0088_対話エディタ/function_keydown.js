//function keydown(element,ID_svg){
function keydown(element){
  element.addEventListener('keydown', function(e){
  //let start = element.selectionStart;//selectionStart プロパティは、選択範囲の先頭のオフセットを取得する。
    let end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
        
        //let str_split_for_svg = element.value.slice(0,end).split("\n");
        //console.log("e.keyCode",e.keyCode);
      //del :keyCode=46
      //BS :keyCode=8
      //space :keyCode=229      
        if(e.ctrlKey) if(e.keyCode === 83) save("txt",element.value); //ctrl+s
        if ( e.keyCode === 13) { // Enterキー
          let str_split = element.value.slice(0,end).split("\n");
          console.log(str_split);
        
          let prog_input = str_split.slice(-1)[0];//「文字」
          console.log("★",str_split.length +  "行目に入力しました。入力文字「"+ prog_input +"」");

        //if(str_split.slice(-1)[0].slice(0, 1)==">"){
        //element.value  = value.slice(0,end) + "\n>" +   value.slice(end);       
        //if(str_split.slice(-1)[0].startsWith(">") ){

		      if(prog_input.match(/^version$/) ){
						let version_text = "\nホタンレス対話エディタv0088  2022.02.13";
						element.value  = element.value.slice(0, element.selectionEnd) + version_text + element.value.slice(element.selectionEnd);
						element.setSelectionRange(end+version_text.length, end+version_text.length);
					}

          //「>」のなかは一番右側にカーソルを移動して、改行
          function_company_web_seach(prog_input);
          //function_company_zumen_denso_search(prog_input);//凍結
          function_company_gcode_search(prog_input);
          function_company_savvy_seach(prog_input);
          //function_company_SLS(prog_input);//凍結

          function_create_block_shape(prog_input);
          function_create_box_drawing(prog_input);
          
          function_create_help(prog_input);

          function_create_math_graph_bar(prog_input);
          function_create_math_graph_plot(prog_input);
          
          function_create_math_calc(prog_input);
          function_create_math_log(prog_input);
          function_create_math_sum(prog_input);
          function_create_math_zeta(prog_input);
          
          function_create_math_prime_factorization(prog_input);//素因数分解
          function_create_math_polynomial_expansion(prog_input);//多項式の展開
          function_create_math_Quadratic_formula(prog_input);

          function_create_speech(prog_input);    
          function_create_voxel_map(prog_input);

          function_create_map(prog_input);
          function_create_dot(prog_input);
          
          function_change_background_color(prog_input);

                    if(prog_input.match(/^clear$|^ぜんけし$/) ){
											//element.value ="";
											clear_flag =true;
										}

                    if(prog_input.match(/^save$/) ){save("txt",element.value);}

                    if(prog_input.match(/^save -svg$/) ){
                        //element.style.fontSize =  font_size_str + "px";
                        console.log(element.style.fontSize);
                          let text = return_change_textarea_to_svg("20",element.value);
                        save("svg",text);
                    }


                    if(prog_input.match(/^一昨日$/)){output_day(-2);}
                    if(prog_input.match(/^昨日$/)  ){output_day(-1);}
                    if(prog_input.match(/^今日$/)  ){output_day(0);}
                    if(prog_input.match(/^今週$/)  ){for(let i= 0;i<8;i++){output_day(i);}}
                    if(prog_input.match(/^今月$/)  ){for(let i= 0;i<32;i++){output_day(i);}}
                    if(prog_input.match(/^明日$/)  ){output_day(1);}
                    if(prog_input.match(/^明後日$/ ) ){output_day(2);}
                    if(prog_input.match(/^来週$/)  ){output_day(7);}
                    if(prog_input.match(/^来月$/)  ){output_day(30);}

                    if(prog_input.match(/^去年$/) ){output_year(-1);}
                    if(prog_input.match(/^今年$/) ){output_year(0);}
                    if(prog_input.match(/^来年$/) ){output_year(1);}

                    if(prog_input.match(/^時間$|^今$|^時刻$/) ||  prog_input.match(/^now$|^time$/)){
                        let today = new Date();
                        let hh = ( '00' + today.getHours() ).slice(-2);
                        let mm = ( '00' + today.getMinutes() ).slice(-2);
                        let ss = ( '00' + today.getSeconds() ).slice(-2);
                        if(prog_input.match(/^時間$|^今$|^時刻$/) )element.value  = element.value.slice(0,end) +"\n" + hh + "時" +  mm  + "分" + ss + "秒"+ element.value.slice(end);
                        if(prog_input.match(/^now$|^Now$|^time$|^Time$/) )element.value  = element.value.slice(0,end) +"\n" + hh + "h" +  mm  + "m" + ss + "s"+ element.value.slice(end);
                    }
                    if(prog_input.match(/^戻る$/) ){
                        //window.history.back(-1);
                        window.open('http://good.azurewebsites.net/','_blank');
                    }
                    if(prog_input.match(/^π$/) ){element.value= element.value.slice(0,end) + " =" +Math.PI + element.value.slice(end);element.setSelectionRange(end+19, end+19);}
                    if(prog_input.match(/^e$/) ){element.value= element.value.slice(0,end) + " =" +Math.E + element.value.slice(end);element.setSelectionRange(end+19, end+19);}
                    if(prog_input.match(/^c$/) ){element.value= element.value.slice(0,end) + " =299792458 m/s" + element.value.slice(end);element.setSelectionRange(end+15, end+15);}
                    if(prog_input.match(/^ℏ$/) ){element.value= element.value.slice(0,end) + " =1.054571817×10⁻³⁴ Js = 6.582119569 eVs" + element.value.slice(end);element.setSelectionRange(end+40, end+40);}

                    if(prog_input.match(/^色$|^いろ$/) ){
												element.value= element.value.slice(0,end) + "\n🟥🟧🟨🟩🟦🟪🟫⬛⬜\n🔴🟠🟡🟢🔵🟣🟤⚫⚪\n░▒▓"+ element.value.slice(end);
												element.setSelectionRange(end+38, end+38);
                    }
                    if(prog_input.match(/^paste$|^Paste$|^貼り付け$|^貼付$|^ペースト$/) ){
                        console.log(navigator.clipboard );

                        if(navigator.clipboard){
                            navigator.clipboard.readText().then(function(text){
                                console.log("text" + text);
                                element.value= element.value.slice(0,end) + "\n" +text + element.value.slice(end);   
                            });
                        }
                    }

                    if(prog_input.match(/^esc$|^Esc$|^ESC$/) ){
                        esc_flag = !esc_flag;
                        if(esc_flag){
                            //alert("対話モード\n改行毎に「>」が出力されます");
                            document.querySelector('body').style.backgroundColor = 'white';
                            element.value  = element.value.slice(0, element.selectionEnd) + "" +   element.value.slice(element.selectionEnd);
                        }else{
                            //alert("エディタモード\n毎行毎の「>」が出力されません");
                            document.querySelector('body').style.backgroundColor = 'gray';                            
                        }    
                    }

                    if(prog_input.match(/^wrap$|^Wrap$/) ){
                        if(document.querySelector("textarea").wrap=="off"){
                            document.querySelector("textarea").wrap="soft";
                            document.querySelector("textarea").style.caretColor = "red";
                            document.querySelector("textarea").style.borderColor = 'red';
                            //document.querySelector("textarea").style.borderRight = '10px';
                            document.querySelector("textarea").style.borderRightWidth = '10px';
                            
                        }else if(document.querySelector("textarea").wrap=="soft"){
                            document.querySelector("textarea").wrap="off";
                            document.querySelector("textarea").style.caretColor = "black";
                            document.querySelector("textarea").style.borderColor = 'black';
                            document.querySelector("textarea").style.borderRightWidth = '1px';
                        }
                    }

                    if(prog_input.match(/^mail$|^Mail$|^メール$/) ){
                        //window.open("mailto:goodmaiko@gmail.com",'_blank');
                        //window.open("mailto:goodmaiko@gmail.com?&body="+element.value,'_blank');
                        window.open("mailto:goodmaiko@gmail.com?body="+element.value.replace(/\n/g,"%0D%0A")    );
                        //%0D%0A　←　改行
                        //alert(element.value);
                        //window.open("mailto:goodmaiko@gmail.com"+'?cc='+'&subject='+prog_input+'&body='+element.value.replace(/\n/g,"%0D%0A")   );
                        //window.open("mailto:"+emailTo+'?cc='+emailCC+'&subject='+emailSub+'&body='+emailBody);
                        
                    }

                    if(prog_input.match(/^new$|^New$|^新$/) ){
                        //https://www.it-swarm.dev/ja/javascript/%E5%90%8C%E3%81%98%E3%82%A6%E3%82%A3%E3%83%B3%E3%83%89%E3%82%A6%E3%81%A7%E5%90%8C%E3%81%98%E3%82%BF%E3%83%96%E3%81%A7url%E3%82%92%E9%96%8B%E3%81%8F/941061118/
                        window.open('?','_blank');//
                    }

                    if(prog_input.match(/^print$|^Print$|^印刷$/) ){
                        window.print();//
                    }
                    
                    if(prog_input.match(/^(http:\/\/.*?)$|^(https:\/\/.*?)$/) ){
                        window.open(prog_input,'_blank');
                    }
                    if(prog_input.match(/^c:\\(.*?)$|^C:\\(.*?)$/) ){
                        alert("a");
                        window.open(prog_input,'_blank');
                    }
                    
                    let reg_wiki = /^wiki([ ]|　)(.*?)$/;
                    if(prog_input.match(reg_wiki) ){
                        console.log(prog_input.match(reg_wiki)   );
                        //window.open("https://ja.wikipedia.org/wiki/"+ prog_input.match(/^wiki[ ](.*?)$/)[2] ,'_blank');
                        window.open("https://ja.wikipedia.org/wiki/"+ prog_input.match(reg_wiki)[2] ,'_blank');
                        
                    }
                    
                    function_change_font_size(prog_input);
                    function_change_scale(prog_input);
                    function_replace(prog_input);

                    let reg_unit_conversion_of_Temperature = /^(\-*[\d.]*)℃$/;
                    let reg_unit_conversion_of_Fahrenheit = /^(\-*[\d.]*)℉$/;
                    let reg_unit_conversion_of_degrees = /^(\-*[\d.]*)°$/;
                    
                    if(prog_input.match(/^[\d]{3}0年代$/)){
                        output_10years_age(prog_input);
                    
                    }else if(prog_input.match(reg_unit_conversion_of_Temperature) ){
                        console.log("arguments.length "+arguments.length);
                        console.log(prog_input.match(reg_unit_conversion_of_Temperature)   );
                        
                        let K = Number(prog_input.match(reg_unit_conversion_of_Temperature)[1] )+273.15;
                        let F = 9*Number(prog_input.match(reg_unit_conversion_of_Temperature)[1]   )/5+32;
                        element.value = element.value.slice(0,end-0) +" =" + K + " [K] ="  +F +  " [℉]" + element.value.slice(end);
                    
                    }else if(prog_input.match(reg_unit_conversion_of_Fahrenheit) ){
                        console.log("arguments.length "+arguments.length);
                        console.log(prog_input.match(reg_unit_conversion_of_Fahrenheit)   );
                        
                        let C = Math.round(5*Number(prog_input.match(reg_unit_conversion_of_Fahrenheit)[1]  -32 )/9 *1000)/1000;
                        let K = C + 273.15;
                        
                        element.value = element.value.slice(0,end-0) +" =" + K + " [K] ="  +C +  " [℃]" + element.value.slice(end);
                    
                    }else if(prog_input.match(reg_unit_conversion_of_degrees) ){
                        let Unit_Radians = Number(prog_input.match(reg_unit_conversion_of_degrees)[1] )*Math.PI/180;
                        element.value = element.value.slice(0,end-0) +" =" + Unit_Radians + " [rad]" + element.value.slice(end);
                    
                    }else if(prog_input.match(/^[\d]+$|^[\d\.]+$/) ){//純粋に数字のみ
                        //なにもしない

                    }else if(prog_input.match(/^[\d]|^\-[\d]|^Math\.|^\-Math\.|^\([\d]|^\(\-[\d]|^\-\([\d]|^\(Math\.|^\-\(Math\./) ){
                        //もし**数値情報がある場合は上付き文字に置換する。
                        
                        if(prog_input.match(/\*\*([\d\(\)\+\-]+)/)   ){
                            console.log("２桁_0 ",prog_input.match(/\*\*([\d\(\)\+\-]+)/)  );   
                            let after_str_2digits = prog_input.match(/\*\*([\d\(\)\+\-]+)/).input
                            .replace(/(\*\*)([\d\(\)\+\-]+)/g, function(){
                                let str;
                                console.log("arguments[2] ",arguments[2]);
                                str = arguments[2]
                                .replace(/0/g,"⁰")
                                .replace(/1/g,"¹")
                                .replace(/2/g,"²")
                                .replace(/3/g,"³")
                                .replace(/4/g,"⁴")
                                .replace(/5/g,"⁵")
                                .replace(/6/g,"⁶")
                                .replace(/7/g,"⁷")
                                .replace(/8/g,"⁸")
                                .replace(/9/g,"⁹")
                                .replace(/\+/g,"⁺")
                                .replace(/\-/g,"⁻")
                                .replace(/\(/g,"⁽")
                                .replace(/\)/g,"⁾");
                                return str;    
                            });
                            console.log("２桁_1 ",after_str_2digits);
                            let after_str_1digits = after_str_2digits
                            .replace(/\*\*0/g,"⁰")
                            .replace(/\*\*1/g,"¹")
                            .replace(/\*\*2/g,"²")
                            .replace(/\*\*3/g,"³")
                            .replace(/\*\*4/g,"⁴")
                            .replace(/\*\*5/g,"⁵")
                            .replace(/\*\*6/g,"⁶")
                            .replace(/\*\*7/g,"⁷")
                            .replace(/\*\*8/g,"⁸")
                            .replace(/\*\*9/g,"⁹");
                            console.log("🌟🌟🌟 ",after_str_1digits);
                            element.value = element.value.slice(0,end-0) +" = " + after_str_1digits + " = " + return_safeEval(prog_input)  +"" + element.value.slice(end);
                        }else if(prog_input.match(/\*\*([\d])/)   ){
                            let after_str_1digits = prog_input.match(/\*\*([\d])/).input
                            //.replace(/(\*\*)([\d])/g, function(){
                            .replace(/\*\*0/g,"⁰")
                            .replace(/\*\*1/g,"¹")
                            .replace(/\*\*2/g,"²")
                            .replace(/\*\*3/g,"³")
                            .replace(/\*\*4/g,"⁴")
                            .replace(/\*\*5/g,"⁵")
                            .replace(/\*\*6/g,"⁶")
                            .replace(/\*\*7/g,"⁷")
                            .replace(/\*\*8/g,"⁸")
                            .replace(/\*\*9/g,"⁹");
                            element.value = element.value.slice(0,end-0) +" = " + after_str_1digits + " = " + return_safeEval(prog_input)  +"" + element.value.slice(end);
                        }else{
                            element.value = element.value.slice(0,end-0) +" = " + return_safeEval(prog_input)  +"" + element.value.slice(end);    
                        }
                       
                        //element.value = element.value.slice(0,end-0) +" =" + return_safeEval(prog_input)  +"" + element.value.slice(end);
                        //element.value = element.value.slice(0,element.selectionEnd) +"\n" + return_safeEval(prog_input)  + element.value.slice(element.selectionEnd);
                        //element.value = element.value.slice(0,end-0) +" =" + return_safeEval(prog_input)  +"" + element.value.slice(end);
                        
                        //element.setSelectionRange(end, end);//テキストの指定位置にカーソルをセット
                    }                    
                }//if ( e.keyCode === 13) { // Enterキー
            },false);//element.addEventListener('keydown', function(e){
        }