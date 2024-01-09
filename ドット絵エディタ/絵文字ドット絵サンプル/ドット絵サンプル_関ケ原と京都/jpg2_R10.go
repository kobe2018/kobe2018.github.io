package main

import (
	"bytes"
	"fmt"
	"image"
	_ "image/jpeg"
	_ "image/png"
	"io"
	"io/ioutil"
	"os"
	"strconv"
)

func main() {
	// 画像ファイルを開く(書き込み元)
	//file, err := os.Open("./big_japan500_312.png")
	//file_name := "big_japan200_125"
	//file_name := "jp_211_199"
	file_name := "京都周辺"

	file, err := os.Open("./" + file_name + ".png")

	defer file.Close()

	if err != nil {
		panic(err)
	}

	buf := new(bytes.Buffer)
	io.Copy(buf, file)

	// デコードしてイメージオブジェクトを準備
	srcImg, _, err2 := image.Decode(buf)

	if err2 != nil {
		panic(err2)
	}
	srcBounds := srcImg.Bounds()
	var str string = ""
	//var dotmap [220][220]int
	//①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①①
	for v := srcBounds.Min.Y; v < 10; v++ {
		for h := srcBounds.Min.X; h < 10; h++ {
			r, g, b, _ := srcImg.At(h, v).RGBA()
			rr := float64(r) / 256
			gg := float64(g) / 256
			bb := float64(b) / 256
			str += "{" + strconv.FormatFloat(rr, 'f', 2, 64) + "," + strconv.FormatFloat(gg, 'f', 2, 64) + "," + strconv.FormatFloat(bb, 'f', 2, 64) + "}," //
		}
		str += "\n"
	}
	str += "\n"
	//②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②②
	for v := srcBounds.Min.Y; v < srcBounds.Max.Y; v++ {
		for h := srcBounds.Min.X; h < srcBounds.Max.X; h++ {

			r, g, b, _ := srcImg.At(h, v).RGBA()
			rr := float64(r) / 256
			gg := float64(g) / 256
			bb := float64(b) / 256
			for i := 0; i < 6; i++ {
				for j := 0; j < 6; j++ {
					for k := 0; k < 6; k++ {
						if float64(i*51)-25 < bb && float64((i+1)*51)-25 >= bb {
							if float64(j*51)-25 < gg && float64((j+1)*51)-25 >= gg {
								if float64(k*51)-25 < rr && float64((k+1)*51)-25 >= rr {
									str += string(59136 + 36*i + 6*j + k)
									//dotmap[v][h] = 59136 + 36*i + 6*j + k
								}
							}
						}
					}
				}
			}
		}
		str += "\n"
	} //	for v := srcBounds.Min.Y; v < 312; v++ {
	//fmt.Println("画像X:", srcBounds.Max.X, "画像Y:", srcBounds.Max.Y, "dotmap", dotmap)

	str += "\n③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③\n"

	//③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③③
	//var Quotient := srcBounds.Min.Y/8// 100の場合　商（整数）は12
	//var remainder := srcBounds.Min.Y % 8;// 100の場合　 余り4
	Quotient := srcBounds.Max.Y / 8 // 100の場合　商（整数）は12
	//remainder := srcBounds.Max.Y % 8 // 100の場合　 余り4

	//for v := srcBounds.Min.Y; v < 100; v++ {
	for v := srcBounds.Min.Y; v < Quotient; v++ { //0to 12
		for h := srcBounds.Min.X; h < srcBounds.Max.X; h++ {
			//str += string(59648)
			for num := 0; num < 8; num++ {
				//top8 := v / 8            //商
				//top_line_number := v % 8 //余り
				//fmt.Println(v, "商", top8, "余り：", top_line_number)

				//if top_line_number == 0 {
				if num == 0 {
					str += string(59648)
				}
				//r, g, b, _ := srcImg.At(h, v).RGBA()
				r, g, b, _ := srcImg.At(h, num+v*7).RGBA()

				rr := float64(r) / 256
				gg := float64(g) / 256
				bb := float64(b) / 256
				for i := 0; i < 6; i++ {
					for j := 0; j < 6; j++ {
						for k := 0; k < 6; k++ {
							if float64(i*51)-25 < bb && float64((i+1)*51)-25 >= bb {
								if float64(j*51)-25 < gg && float64((j+1)*51)-25 >= gg {
									if float64(k*51)-25 < rr && float64((k+1)*51)-25 >= rr {
										//str += string(59649 + 8*36*i + 8*6*j + 8*k + top_line_number)
										str += string(59649 + 8*(36*i+6*j+k) + num)

									}
								}
							}
						}
					}
				} //for i := 0; i < 6; i++ {
			} //for v := srcBounds.Min.Y; v < 100; v++ {
		}
		str += "\n"
	} //	for h := srcBounds.Min.X; h < 100; h++ {

	// 保存する
	b := []byte{}
	//for _, line := range str {
	ll := []byte(str)
	for _, l := range ll {
		b = append(b, l)
		//}
	}

	//err3 := ioutil.WriteFile("write500.txt", b, 0666)
	err3 := ioutil.WriteFile(file_name+".txt", b, 0666)

	if err3 != nil {
		fmt.Println(os.Stderr, err3)
		os.Exit(1)
	}
	fmt.Println("終了")

}
