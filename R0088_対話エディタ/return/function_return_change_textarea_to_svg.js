
function return_change_textarea_to_svg(font_size , input_textarea){
    let str_num = return_split_textarea_on_newLine(input_textarea);
    console.log("行数を表示" , str_num.length    );

    let svg_height  =   600 + str_num.length * font_size;//従来は600pt
    
    let str_svg =`<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n`;
    str_svg = str_svg + `<svg width="1600px" height="${svg_height}px" font-family="'GeoMathMono0069','ＭＳ ゴシック'" viewBox="0px 0px 1600px ${svg_height}px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n`;
    //str_svg = str_svg + `<svg width="800pt" height="${svg_height}pt" font-family="MigMix1M4Fig0054"  viewBox="0 0 800 ${svg_height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n`;

/*
    for(let i =0;i<str_num.length;i++ ){  
      console.log(str_num[i] ,"文字幅　",return_string_width(str_num[i])  );//行数を表示
      str_svg =  str_svg +`<text font-size="${font_size}px" fill="black" x="0px" y="${40+font_size*i}px" style="white-space:pre-wrap">`+
      str_num[i] + `</text>\n`
        //str_svg = str_svg +`<line x1="10" y1="${40+font_size*i}" x2="${10+5*return_string_width(str_num[i])}" y2="${40+font_size*i}" style="stroke:rgb(0,0,0);stroke-width:1" />\n`
    }
*/


    let utf8_str = [];
    for(let i =0;i<str_num.length;i++ ){
      utf8_str[i]  =Array.from(str_num[i]);
    }
    console.log("utf8_str",utf8_str);
    const array_circle = ["🔴","🟠","🟡","🟢","🔵","🟣","🟤","⚫","⚪","░","▒","▓"];
    const array_square = ["🟥","🟧","🟨","🟩","🟦","🟪","🟫","⬛","⬜","░","▒","▓"];
    const array_triangle = ["◢","◣","◥","◤","🔺"];
    
    const color_data =["#ff0000","#FF8300","#FFFF00","#00FF00","#0000FF","#FF00FF","#864A2B","#000000","#FFFFFF","#eeeeee","#999999","#666666"];
 
    for(let i =0;i<utf8_str.length;i++ ){
      for(let j =0;j < utf8_str[i].length;j++ ){
        if (array_square.includes(utf8_str[i][j]) ){  
          let Number_square = array_square.indexOf(utf8_str[i][j]) ;
          str_svg =  str_svg + `<rect x="${100 + Number(font_size*j)}" y="${300 + Number(font_size*i)}" width="${font_size}" height="${font_size}" fill="${color_data[Number_square]}" />\n`;
        }
        if (array_circle.includes(utf8_str[i][j]) ){
          let Number_circle = array_circle.indexOf(utf8_str[i][j]) ;
          str_svg =  str_svg + `<circle cx="${100 + Number(font_size*j+font_size/2)}" cy="${300 + Number(font_size*i+font_size/2)}" r="${font_size/2}" fill="${color_data[Number_circle]}" />\n`;
        }
        if (array_triangle.includes(utf8_str[i][j]) ){
          Number_circle ="black";
          let xx = 100 + Number(font_size*j);
          let yy = 300 + Number(font_size*i);

          if (array_triangle.indexOf(utf8_str[i][j]) =="0"){
          //str_svg =  str_svg + `<polygon points="${xx} ${yy},${xx+font_size*1} ${yy},${xx} ${yy-font_size*1}" fill="${color_data[7]}" />\n`;          
            str_svg =  str_svg + `<polygon points="${xx+font_size*1} ${yy},${xx+font_size*1} ${yy+font_size*1},${xx} ${yy+font_size*1}" fill="${color_data[7]}" />\n`;

          }else if (array_triangle.indexOf(utf8_str[i][j]) =="1"){
            str_svg =  str_svg + `<polygon points="${xx} ${yy},${xx+font_size*1} ${yy+font_size*1},${xx} ${yy+font_size*1}" fill="${color_data[7]}" />\n`;

          }else if (array_triangle.indexOf(utf8_str[i][j]) =="2"){
            //str_svg =  str_svg + `<polygon points="${xx} ${yy},${xx} ${yy+font_size*1},${xx-font_size*1} ${yy}" fill="${color_data[7]}" />\n`;
            str_svg =  str_svg + `<polygon points="${xx} ${yy},${xx+font_size*1} ${yy},${xx+font_size*1} ${yy+font_size*1}" fill="${color_data[7]}" />\n`;          
          }else if (array_triangle.indexOf(utf8_str[i][j]) =="3"){
            str_svg =  str_svg + `<polygon points="${xx} ${yy},${xx+font_size*1} ${yy},${xx} ${yy+font_size*1}" fill="${color_data[7]}" />\n`;          
          }
        }
        
        //str_svg =  str_svg +`<text font-size="${font_size}px" fill="black" x="${100 + font_size*i}px" y="${300 + font_size*i}px" style="white-space:pre-wrap">`+ str_num[i] + `</text>\n`
      }
    }

    //str_svg = str_svg +`<line x1="20" y1="10" x2="400" y2="280" style="stroke:rgb(0,0,0);stroke-width:1" />\n`+//斜め線
    str_svg = str_svg + "</svg>"
    return  str_svg; 
}