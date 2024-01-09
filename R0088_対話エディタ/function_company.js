function function_company_savvy_seach(prog_input){
    let reg_savvy_s = /サービス部\((.*?)\)/;
    if(prog_input.match(reg_savvy_s) ){
        console.log("サービス部 " + prog_input.match(reg_savvy_s)[1]  );
        window.open('http://foe82d.tmw.mhi.co.jp/SAVVY/attr/Search.asp?KA=20&bangou=' + prog_input.match(reg_savvy_s)[1] + '&username=&passwd=&page=Y&text=Y&Search=K&login=y','_blank');
        scroll_most_bottom();
    }

    let reg_savvy_gt = /ガ技部\((.*?)\)/;
    if(prog_input.match(reg_savvy_gt) ){
        console.log("ガ技部 " + prog_input.match(reg_savvy_gt)[1] );
        window.open('http://foe82d.tmw.mhi.co.jp/SAVVY/attr/Search.asp?KA=16&bangou=' + prog_input.match(reg_savvy_gt)[1] + '&username=&passwd=&page=Y&text=Y&Search=K','_blank');
        scroll_most_bottom();
    }
}
/*
凍結
function function_company_zumen_denso_search(prog_input){
    let reg_denso = /^[\w]{2}-[\w]{5}/;
    if(prog_input.match(reg_denso) != null){
        console.log("図面→ " +prog_input.match(reg_denso) );
        console.log('http://f-dwgview.mhi.co.jp/DwgDownload/Denso.asp?zuban='+prog_input.match(reg_denso)   );
        //window.location.href = 'http://f-dwgview.mhi.co.jp/DwgDownload/Denso.asp?zuban='+prog_input.match(reg_denso); // 通常の遷移
        window.open('http://f-dwgview.mhi.co.jp/DwgDownload/Denso.asp?zuban='+prog_input.match(reg_denso)[0], '_blank'); // 新しいタブを開き、ページを表示
    }
}
*/
function function_company_gcode_search(prog_input){
    let reg_Gcode = /^([GFPM][5712][A-Z0-9]{7})/;//G5J2TS100 
    if(prog_input.match(reg_Gcode)  ){
        console.log("Gコード→ " +prog_input.match(reg_Gcode) );
        //window.location.href = 'http://lifecycle2.mhi.co.jp/FC90_PARTS/FC90POP/FC90_HOTPARTS_POP_DETAIL.asp?FC90_HOTPARTS_CODE='+prog_input;
        window.open('http://lifecycle2.mhi.co.jp/FC90_PARTS/FC90POP/FC90_HOTPARTS_POP_DETAIL.asp?FC90_HOTPARTS_CODE='+prog_input, '_blank'); // 新しいタブを開き、ページを表示 
    }
}
/*
凍結
function function_company_SLS(prog_input){
    let reg_SLS = /^SLS[0-9]{7}/    ;//SLS2000676
    if(prog_input.match(reg_SLS)  ){
        window.open('http://foe82d.tmw.mhi.co.jp/SAVVY/attr/Search.asp?KA=13&username=&passwd=&page=Y&text=Y&Search=K&bangou='+prog_input, '_blank');
    }
}
*/

function function_company_web_seach(prog_input){
  if(prog_input.match(/^図面電送$/) ){ window.open('http://qmus0680.mhi.co.jp/FZMSWeb/Default.aspx','_blank'); }
  if(prog_input.match(/^LCS$/) ){ window.open('http://lifecycle.mhi.co.jp/'); }
  if(prog_input.match(/^cotoha$/) ){ window.open('https://cotoha.mhitechnicalportal.miraitranslator.com/loggedin/translate_text.php'); }
   
  if(prog_input.match(/^ハイパー支援$/) ) { window.open('http://mpc000055824:8080/menteG2/', '_blank');} // 新しいタブを開き、ページを表示
  if(prog_input.match(/^根拠ツリー$/) ) { window.open('http://mpc000055824:8080/menteG/', '_blank');} // 新しいタブを開き、ページを表示

  if(prog_input.match(/^google$/) ) { window.open('https://www.google.co.jp/', '_blank');} // 新しいタブを開き、ページを表示
  if(prog_input.match(/^you tube$/) ) { window.open('https://www.youtube.com/?gl=JP&hl=ja', '_blank');} // 新しいタブを開き、ページを表示
}
