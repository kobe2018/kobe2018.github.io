function function_create_math_zeta(prog_input){
    let element = document.querySelector('textarea');
    let before_end = element.selectionEnd;//selectionEnd プロパティは、選択範囲の末尾のオフセットを取得する。
   
    let reg_zeta = /^ζ\(([\w.])\)$/;
    if(prog_input.match(reg_zeta) ){
        let before_s = prog_input.match(reg_zeta)[1];
        let s = prog_input.match(reg_zeta)[1]
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
        .replace(/s/g,"ˢ")
        .replace(/x/g,"ˣ");

        let input_str = `      ∞  1     1    1    1    1    1    1
ζ(${before_s})=∑ ── = ─ + ─ + ─ + ─ + ─ + ─ + …
    n=1  n${s}    1${s}　 2${s}　 3${s}　 4${s}　 5${s}　 6${s}`;

    element.value  = element.value.slice(0,before_end) + "\n"+  input_str + element.value.slice(before_end);
}

    let reg_coefficient_of_thermal_expansion = /^線膨張係数$/;
    if(prog_input.match(reg_coefficient_of_thermal_expansion) ){

        input_str = `（10−6/K）
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 ↓110
物質                  │線膨張率          │┬┬┬┬┬┬┬┬┬┬┬
水銀                  │60                │█████▍60
アルミニウム          │23                │██⎸23
黄銅                  │19                │█▋19
コンクリート          │12                │█⎸12
鉄・鋼                │12.1（S30C：11.5）│█⎸12.1
無水ケイ酸            │0.5               │⎸0.5
ダイヤモンド          │1.1               │⎸1.1
グラファイト          │4.5～5.5程度      │▍5
パイレックスガラス    │3.2               │▎3.2
タングステン          │4.3               │▍4.3
炭化ケイ素 (SiC)      │6.6               │▌6.6
クロム                │6.8               │▌6.8
粘土                  │8                 │▋8
硬質ガラス            │8.5               │▊8.5
アランダム            │8.7               │▊8.7
白金                  │9                 │▊9
煉瓦                  │9.5               │▊9.5
酸化マグネシウム      │9.7               │▉9.7
アンチモン            │12                │█⎸12
炭素鋼                │10.8              │▉10.8
ステンレス鋼 (SUS410) │10.4              │▉10.4
ステンレス鋼 (SUS304) │17.3              │█▌17.3
コバルト              │12.4              │█▏12.4
ニッケル              │12.8              │█▏12.8
ビスマス              │13.3              │█▏13.3
金                    │14.3              │█▎14.3
銅                    │16.8              │█▌16.8
フッ化カルシウム      │19.5              │█▊19.5
ケイ素                │2.4               │▏2.4
マグネシウム          │25.4              │██▎25.4
亜鉛                  │30.2              │██▋30.2
スズ                  │26.9              │██▍26.9
カドミウム            │28.8              │██▌28.8
鉛                    │29.1              │██▋29.1
塩化ナトリウム        │40.5              │███▋40.5
氷 (0℃)              │50.7              │████▌50.7
硫黄                  │64                │█████▊64
ナトリウム            │75                │██████▊75
カリウム              │83                │███████▌83
パラフィン            │110               │██████████110
ゴム                  │110               │██████████110`;
        element.value  = element.value.slice(0,before_end) + "\n"+  input_str + element.value.slice(before_end);
}


let reg_combined_gas_law = /^ボイル＝シャルルの法則$|^ボイル・シャルルの法則$|^ボイルシャルルの法則$/;
if(prog_input.match(reg_combined_gas_law) ){

    input_str = `P₁V₁   P₂V₂
── = ──
 T₁     T₂`;
    element.value  = element.value.slice(0,before_end) + "\n"+  input_str + element.value.slice(before_end);
}


let reg_moment_of_inertia_of_area = /^断面二次モーメント$|^断面2次モーメント$|^断面２次モーメント$/;
if(prog_input.match(reg_moment_of_inertia_of_area) ){

    input_str = `┌────┬────────┬──────┬──────┐
│        │断面形状        │断面二次    │断面係数    │
│        │                │モーメント  │[mm³]       │
│        │                │[mm⁴]       │            │
├────┼────────┼──────┼──────┤
│角棒    │　┌──┐　⭱  │　bh³       │　bh²       │
│        │…┼……┼…│h │I=─‒       │Z=─‒       │
│        │　└──┘　⭳  │　12        │　 6        │
│        │　⭰──⭲      │            │            │
│        │　　 b          │            │            │
├────┼────────┼──────┼──────┤
│中実丸棒│直径dの円       │πd⁴         │πd³         │
│        │                │─‒         │─‒         │
│        │                │64          │32          │
├────┼────────┼──────┼──────┤
│中空丸棒│外直径d₂        │ π          │ π　d₂⁴-d₁⁴ │
│        │内直径d₁        │─(d₂⁴-d₁⁴) │─・────│
│        │の円            │64          │64　　d₂    │
└────┴────────┴──────┴──────┘`;
    element.value  = element.value.slice(0,before_end) + "\n"+  input_str + element.value.slice(before_end);
}

let reg_Poisson_s_ratio = /^ポアゾン比$/;
if(prog_input.match(reg_Poisson_s_ratio) ){

    input_str = ``;
    element.value  = element.value.slice(0,before_end) + "\n"+  input_str + element.value.slice(before_end);
}

let reg_air = /^空気$/;
if(prog_input.match(reg_air) ){

    input_str = `┌─────┬───┬──────┐
│成分      │化学式│体積比 割合 │
│　　　　　│　　　│（vol%）    │
├─────┼───┼──────┤
│窒素      │N₂    │78.084      │██████████
│酸素      │O₂    │20.9476     │██▋
│アルゴン  │Ar    │0.934       │⎸
│二酸化炭素│CO₂   │0.039       │⎸
│ネオン    │Ne    │0.001818    │⎸
│ヘリウム  │He    │0.000524    │⎸
│メタン    │CH₄   │0.000181    │⎸
│クリプトン│Kr    │0.000114    │⎸
│その他    │      │            │
└─────┴───┴──────┘`;
    element.value  = element.value.slice(0,before_end) + "\n"+  input_str + element.value.slice(before_end);
}

let reg_Young_s_modulus = /^ヤング率$/;
if(prog_input.match(reg_Young_s_modulus) ){

    input_str = `材料                        │ヤング率E　[GPa] [10⁹Pa]
　　　　　　　　　　　　　　│　　　　　　　　　 ↓600
──────────────┤┬┬┬┬┬┬┬┬┬┬┬
PTFE (テフロン)             │⎸0.5
ポリエチレン                │⎸0.4～1.3
ポリプロピレン              │⎸1.5〜2
ポリアセタールコポリマー    │⎸2.75
ポリスチレン                │⎸3〜3.5
ポリカーボネート            │⎸2.3
ナイロン                    │⎸1.2〜2.9
チーク 木材                 │▏13
高強度コンクリート (圧縮時) │▍30
マグネシウム合金            │▋45
アルミニウム                │█▏70.3
アルミ合金                  │█▎69〜76
ガラス                      │█▎80.1
黄銅                        │█▋103
チタン                      │█▊107
銅                          │██▏129.8
鋳鉄                        │██▌152.3
鋼                          │███▌216
鉛                          │▎16.1
金                          │█▎78
銀                          │█▍82.7
亜鉛                        │▊48
ベリリウム                  │████▊287
タングステン                │█████▋345
モリブデン                  │█████▍324
炭化ケイ素                  │██████████〜600
ジルコニア                  │████▏〜250
酸化アルミニウム(アルミナ)  │██████▋〜400
オスミウム                  │█████████▏550
炭化タングステン            │█████████▏450〜650

`;
    element.value  = element.value.slice(0,before_end) + "\n"+  input_str + element.value.slice(before_end);
}

}//function function_create_math_zeta(prog_input){