function function_create_help(prog_input){
    let element = document.querySelector('textarea');
    let before_end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
    //let value = element.value;

    //let reg_speech = /^speech$/g;
    //let reg_speech = /^speech[ ](.*?)$/;
 if(prog_input.match(/^help$|^Help$|^h$/) ){ element.value  = element.value.slice(0,before_end) + "\n"+ `キーワード+Enterキーで結果が出力されます。
【設定】
esc Esc ESC          :「対話」モードと「エディタ」モードの切り替え
wrap Wrap            :windows幅で折り返すか切替える
size 24              : 文字サイズを変更する
background color 色名: 背景色変更。「色名」は「red」等
version


【文字処理】
clear or ぜんけし    :全消し
replace[,]           :置換
Paste or 貼り付け or 貼付 or ペースト


【外部出力】
new or New or 新
mail or Mail
save        :save
save -svg   :SVGとして保存する
ボクセル    :3MFとして保存する為のフォーマット出力
print or Print or 印刷
speech[english]    :[]内の言葉を話す。
「あいうえお」     :「」内の言葉を話す。基本的に日本語
「You get Mail」   :「」内の言葉を話す。全部半角の場合は、英語。


【ネット接続】
wiki あ
図面電送   or LCS  or cotoha or ハイパー支援 or 根拠ツリー
G0-12345
NA00001A
G5J2TS100



【時間】
昨日
今日
明日
明後日
今週
今月
去年
今年
来年
2000年代
時間 or 今 or 時刻
now or Now or time or Time


【雛形出力】
help       :使い方
π          :円周率
e          :自然対数の底
c          :光速
ℏ         :プランク定数
線膨張係数 :
断面二次モーメント or 断面2次モーメント or 断面２次モーメント
ポアゾン比
空気       :空気の組成比
ヤング率   :金属


【図解】
けいせん or 罫線  :┌　┘が出力されます。出力後、中に文字を入れて┘の後ろでEnterを押すと罫線で文字を囲む
●→✕→▲
tree[,]
tree[,,]
branch[,,]
object[,]
merge[]


【ドット絵】
地図
国旗
城
しかく
マリオ
ルイージ
リンク
一式陸攻
ふね
いろ or 色


【ドットグラフ】
bar[10,20,30]       :縦棒グラフ
barh[10,20,30]      :横棒グラフ
plot[y=Math.sin(x)] :数式をグラフを出力1
plot[y²=(x+1)**2]   :数式をグラフを出力2
plot[r=θ]           :数式をグラフを出力（極座標）


【数式変換】
(x+1)²       :因数分解1
(ax+b)²      :因数分解2
(x+1)³       :因数分解3
5x²+3x+1=0   :二次の解の公式
(ax+b)(cy+d) :多項式に展開1
(ax+b)(cx+ds):多項式に展開2
ζ(2)       :ゼータ関数。数値は変換可能。


【計算】
45+22        :四則演算
[81]         :素因数分解をして出力
10℃         :単位を変換
20°          :ラジアンに変換
sum[]        :[]内に数値を入れて改行で
合計 or ごうけい :前行までの数値を合計する

` + element.value.slice(before_end);
}
}