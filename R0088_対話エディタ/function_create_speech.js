function function_create_speech(prog_input){
    let element = document.querySelector('textarea');
    let end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
    const speech_rate_J = 2;
    const speech_rate_E = 0.7;

    let reg_speech = /^speech\[(.*?)\]$/;
    if(prog_input.match(reg_speech) ){
        //発音機能をインスタンス化
        console.log(prog_input.match(reg_speech)    );
        console.log(prog_input.match(reg_speech)[1] );
        let msg = new SpeechSynthesisUtterance();
        let voices = window.speechSynthesis.getVoices(); 
        //let voices_E = window.speechSynthesis.getVoices();  
        //let voices_J = window.speechSynthesis.getVoices();
        msg.volume = 1.0;//音量 min 0 ~ max 1
        msg.pitch = 1.0;//音程
        if(prog_input.match(reg_speech)[1].match(/^[\x20-\x7e]*$/) ){//アスキー文字のみか？               
        //if(prog_input.match(reg_speech)[1].match(/^[a-zA-Z]/) ){//アスキー文字のみか？          
            console.log("en-US");
            msg.lang = 'en-US';
            msg.voice = voices[10];  //7 Google 日本人の音声
            msg.rate = speech_rate_E;//速度
        }else{//アスキー文字のみか？          
            console.log("ja-JP");
            msg.lang = 'ja-JP';
            //msg.voice = voices_J[1];  //7 Google 日本人の音声
            msg.rate = speech_rate_J;//速度
        }
        msg.text= prog_input.match(reg_speech)[1];
        speechSynthesis.speak(msg);
        //element.value =value.slice(0, end) + value.slice(end);
    }

    
    let reg_speech_left_kagi_kakko = /^「(.*?)$/;
    if(prog_input.match(reg_speech_left_kagi_kakko) ){
        console.log(prog_input.match(reg_speech_left_kagi_kakko)    );
        console.log(prog_input.match(reg_speech_left_kagi_kakko)[1] );
        let msg = new SpeechSynthesisUtterance();
        msg.volume = 1.0;//音量
        msg.pitch = 1.0;//音程
                        
        if(prog_input.match(reg_speech_left_kagi_kakko)[1].match(/^[\x20-\x7e」]*$/) ){//アスキー文字のみか？               
            console.log("en-US");
            msg.lang = 'en-US';
            msg.rate = speech_rate_E;//速度
        }else{//アスキー文字のみか？          
            console.log("ja-JP");
            msg.lang = 'ja-JP';
            msg.rate = speech_rate_J;//速度
        }
        msg.text= prog_input.match(reg_speech_left_kagi_kakko)[1];
        speechSynthesis.speak(msg);
    }

    let reg_speech_right_kagi_kakko_Multiple_lines = /^」(.*?)$|^「」/;
    if(prog_input.match(reg_speech_right_kagi_kakko_Multiple_lines) ){
        let before_end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
        let str_split = element.value.slice(0,before_end).split("\n");
        console.log(str_split.length +  "行目です: "+ str_split.slice(-1)[0] );

        //alert(str_split.length);
        let string_of_Multiple_lines　= "";
        for(let i = str_split.length-2; i > 2; i--){
            //string_line = str_split.slice(-1)[0].slice(1,before_end);//「>以降の文字」
            console.log("行数"+i+"→"+str_split[i]);
            
            if(str_split[i]  ==">「"){
                console.log("終了　→　"+string_of_Multiple_lines);
            }else{
                string_of_Multiple_lines = str_split[i] + string_of_Multiple_lines; 
            }
        }
        let msg = new SpeechSynthesisUtterance();
        msg.volume = 1.0;//音量
        msg.pitch = 1.0;//音程
        if(string_of_Multiple_lines.match(/^[\x20-\x7e]*$/) ){//アスキー文字のみか？               
            console.log("en-US");
            msg.lang = 'en-US';
            msg.rate = speech_rate_E;//速度
        }else{//アスキー文字のみか？          
            console.log("ja-JP");
            msg.lang = 'ja-JP';
            msg.rate = speech_rate_J;//速度
        }
        msg.text= string_of_Multiple_lines;
        speechSynthesis.speak(msg);
    }


    let reg_speech_double_quotation = /^"(.*?)$/;
    if(prog_input.match(reg_speech_double_quotation) ){
        console.log(prog_input.match(reg_speech_double_quotation)    );
        console.log(prog_input.match(reg_speech_double_quotation)[1] );
        let msg = new SpeechSynthesisUtterance();
        let voices = window.speechSynthesis.getVoices(); 
        
        console.log("en-US");
        msg.lang = 'en';
        msg.rate = speech_rate_E;//速度 min 0 ~ max 10
        msg.volume = 1.0;//音量 min 0 ~ max 1
        msg.pitch = 1.0;//音程 min 0 ~ max 2
        //msg.voice = voices[0];  // 
        //console.log(voices[0]);
        //console.log(msg);
        
        /*
        if(prog_input.match(reg_speech_double_quotation)[1].match(/^[\x20-\x7e]*$/) ){//アスキー文字のみか？               
            console.log("en-US");
            msg.lang = 'en-US';
            msg.rate = 1.0;//速度
        }else{//アスキー文字のみか？          
            console.log("ja-JP");
            msg.lang = 'ja-JP';
            msg.rate = 3.0;//速度
        }
        */
        msg.text= prog_input.match(reg_speech_double_quotation)[1];
        speechSynthesis.speak(msg);
    }
}
    /*
        msg.text= `I am english  0 voice man.`;
        speechSynthesis.speak(msg);
//4 韓国人
//5　中国人
    //msg.voice = voices[5];  //4 
    //msg.text= `I am english 4-voice. 我是日本人。您是中国人嗎? 我都看東京.再見　謝謝`;　　　　　　　　　　　　　　　　　　

    /*
0   Google US English en-US 
 1   Google UK English Male en-GB 
 2   Google UK English Female en-GB 
 3   Google Español es-ES 
 4   Google Français fr-FR 
 5   Google Italiano it-IT 
 6   Google Deutsch de-DE 
 7   Google 日本人 ja-JP 
 8   Google 한국의 ko-KR 
 9   Google 中国的 zh-CN 
 10  Alex en-US 
 11  Agnes en-US 
 12  Albert en-US 
 13  Bad News en-US 
 14  Bahh en-US 
 15  Bells en-US 
 16  Boing en-US 
 17  Bruce en-US 
 18  Bubbles en-US 
 19  Cellos en-US 
 20  Deranged en-US 
 21  Fred en-US
 22  Good News en-US 
 23  Hysterical en-US 
 24  Junior en-US 
 25  Kathy en-US 
 26  Pipe Organ en-US 
 27  Princess en-US 
 28  Ralph en-US 
 29  Trinoids en-US 
 30  Vicki en-US 
 31  Victoria en-US 
 32  Whisper en-US 
 33  Zarvox en-US
 */