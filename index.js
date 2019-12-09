var express = require('express');
var app = express();
const fs = require('fs');

const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {}; /* see below */

var TotalData = [];
// 期別
var govePdfPeriod = '';


function processPDFnew() {
    pdfExtract.extract("./teee.pdf", options, (err, data) => {
        if (err) return console.log(err);

        getTableOfContents1(data)

        console.log("loadingFinish");
    });
}
function processPDF() {
    pdfExtract.extract("./test2.pdf", options, (err, data) => {
        // pdfExtract.extract("./teee.pdf", options, (err, data) => {
        if (err) return console.log(err);
        // console.log(data.pages[0].content);

        // 取出目錄
        console.log("inloading");
        // 下面這邊可以取出目錄 測試階段用不到先註解 TODO 0726待解決最後一個人沒有 endpage的問題
        // getTableOfContents(data);
        getTableOfContents1(data)

        console.log("loadingFinish");

        //     var stringlist=""
        //     var breakflog = false;

        //     var countTabPage=0
        // for(let page =0 ; page<5;page++){
        //     countTabPage++;

        //     for(let content = 0; content <data.pages[page].content.length;content++){
        //         stringlist+=data.pages[page].content[content].str;
        //     if(data.pages[page].content[content].str=="申報人姓名"){
        //         breakflog =true;
        //     }
        //     if(breakflog)
        //         break;
        //     }
        //     if(breakflog)
        //       break;
        // }
        // console.log(countTabPage)
        // { name: '市長朱立倫', startpage: 61, endpage: 66 }
        // { name: '院長賴清德', startpage: 3, endpage: 6 }
        // { name: '市長韓國瑜', startpage: 151, endpage: 156 }
        // { name: '市長許立明', startpage: 147, endpage: 150 }
        // { name: '市長韓國瑜', startpage: 151, endpage: 156 }
        // { name: '王進焱', startpage: 157, endpage: 163 }
        // { name: '施俊吉', startpage: 7, endpage: 12 }
        // { name: '卓榮泰', startpage: 13, endpage: 17 }
        // { name: '范巽綠', startpage: 18, endpage: 24 }
        // { name: '古沼格', startpage: 91, endpage: 96 }
        var startpage = 207;
        var endpage = 209;
        var detailData = ""
        for (let page = startpage; page <= endpage; page++) {
            // console.log(data.pages[page].content);
            data.pages[page].content.forEach(element => {
                // console.log(element.str);
                detailData += element.str;
            });
        }
        console.log("■detailData:", detailData);
        // console.log(detailData.indexOf('公 職 人 員 信 託 財 產 管 理 或 處 分 指 示 通 知 表'));
        if (!!detailData.indexOf('公 職 人 員 信 託 財 產 管 理 或 處 分 指 示 通 知 表')) {
            // 針對各區切塊
            // var TotalData=[]
            TotalData.push({
                type: "個人資料",
                text: detailData.split("（二）")[0]
            });
            TotalData.push(
                {
                    type: "不動產",
                    text: detailData.split("（二）")[1].split("（三）")[0]
                }
            );
            TotalData.push(
                {
                    type: "船舶",
                    text: detailData.split("（三）")[1].split("（四）")[0]
                }
            );
            TotalData.push(
                {
                    type: "汽車",
                    text: detailData.split("（四）")[1].split("（五）")[0]
                }
            );
            TotalData.push(
                {
                    type: "航空器",
                    text: detailData.split("（五）")[1].split("（六）")[0]
                }
            );
            TotalData.push(
                {
                    type: "現金",
                    text: detailData.split("（六）")[1].split("（七）")[0]
                }
            );
            TotalData.push(
                {
                    type: "存款",
                    text: detailData.split("（七）")[1].split("（八）")[0]
                }
            );
            TotalData.push(
                {
                    type: "有價證券",
                    text: detailData.split("（八）")[1].split("（九）")[0]
                }
            );
            TotalData.push(
                {
                    type: "珠寶、古董、字畫及其他具有相當價值之財產",
                    text: detailData.split("（九）")[1].split("（十）")[0]
                }
            );
            TotalData.push(
                {
                    type: "債權",
                    text: detailData.split("（十）")[1].split("（十一）")[0]
                }
            );
            TotalData.push(
                {
                    type: "債務",
                    text: detailData.split("（十一）")[1].split("（十二）")[0]
                }
            );
            TotalData.push(
                {
                    type: "事業投資",
                    text: detailData.split("（十二）")[1].split("（十三）")[0]
                }
            );
            TotalData.push(
                {
                    type: " 備 註",
                    text: detailData.split("（十三）")[1].split("公 職 人 員 信 託 財 產 申 報 表")[0]
                }
            );
            TotalData.push(
                {
                    type: "公 職 人 員 信 託 財 產 申 報 表",
                    text: detailData.split("公 職 人 員 信 託 財 產 申 報 表")[1]
                }
            );
            console.log("TotalData:", TotalData);



            // sortTypeOne();
            // sortTypeTwo();
            // sortTypeThree();
            // sortTypeFour();
            // sortTypeFive();
            // sortTypeSix();
            // sortTypeSeven();
            // sortTypeEight();
            // sortTypeNine();
            // sortTypeTen();
            // sortTypeEleven();
            // sortTypetwelve();
            // sortTypethirteen();



        } else {
            console.log('先不做信託管理及處分通知表');
        }

    });


    // let file = './pdf/teee.pdf'

    // let opts = {
    //     format: 'jpeg',
    //     out_dir: path.dirname(file),
    //     out_prefix: path.basename(file, path.extname(file)),
    //     page: null
    // }


    // pdf.convert(file, opts)
    //     .then(res => {
    //         console.log('Successfully converted');
    //         pdf.info(file)
    //             .then(pdfinfo => {
    //                 console.log(pdfinfo);
    //                 console.log(pdfinfo.pages);

    //             });
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     })
}





// var TotalData= [ 
//     { type: '個人資料',    text:     '監察院公報 ............. 廉 政 專 刊 第 150 期 149 公 職 人 員 財 產 申 報 表 申報人姓名 韓國瑜 服務機關 1.高雄市政府 職稱 1.市長 2.  2.  申  報  日 108年03月14日 申報類別 就(到)職申報 配  偶  及  未 成  年  子 女 配  偶  及  未 成  年  子 女 稱   謂 姓   名 稱   謂 姓   名 配偶 李佳芬 子女 韓○ ' },    
// { type: '不動產',    text:     '不動產 1.土地 土地坐落 面積(平方公尺) 權 利 範 圍(持分) 所 有 權 人 登記(取得)時間 登記(取得)原因 取  得  價  額 雲林縣古坑鄉田心段 (自用房屋之坐落 基地) 1,662.53 全部  李佳芬 91年10月30日 買賣  3,656,400 (超過五年)     土             地          變             動             情             形 土地坐 落 面積(平方公尺) 權 利 範 圍(持分) 所 有 權 人 變動時間 變動原因 變動時之價額 本欄空白             2.建物（房屋及停車位） 建物標示 面積(平方公尺) 權 利  範 圍(持分) 所 有 權 人 登記(取得)時間 登記(取得)原因 取  得  價  額 雲林縣古坑鄉田心段  426.11 全部  李佳芬 91年10月30日 買賣 4,720,000 (超過五年)     建             物          變             動             情             形 建物標示 面積(平方公尺) 權 利 範 圍(持分) 所 有 權 人 變動時間 變動原因 變動時之 價額 本欄空白             ' },  
// { type: '船舶',    text:     '船舶 種類 總噸數 船  籍  港 所有人 登記(取得)時間 登記(取得)原因 取  得  價  額 本欄空白       ' },  
// { type: '汽車',    text:     '汽車（含大型重型機器腳踏車） 廠牌型號 汽缸容量 所有人 登記(取得)時間 登記(取得)原因 取  得  價  額 MITSUBISHI 1,798 李佳芬 103年05月16日 買賣 800,000 (超過五年) 監察院公報 ............. 廉 政 專 刊 第 150 期 150 LEXUS 1,998 李佳芬 107年04月20日 買賣 2,200,000 ' },  
// { type: '航空器',    text:     '航空器 型式 製造廠名稱 國 籍 標 示及  編  號 所有人 登記(取得)時間 登記(取得)原因 取  得  價  額 本欄空白             ' },  
// { type: '現金',    text:     '現金（指新臺幣、外幣之現金或旅行支票）（總金額：新臺幣     元） 幣別 所有人 外    幣    總    額 新臺幣總額或折合新臺幣總額 本欄空白       ' },       
// { type: '存款',    text:     '存款（指新臺幣、外幣之存款）（總金額：新臺幣45,596,744元） 存放機構 (應 敘 明 分 支 機 構) 種類 幣別 所   有   人 外   幣   總   額 新 臺 幣 總 額  或 折 合 新   臺   幣   總   額 國泰世華商業銀行雙和分行 活期存款 新臺幣 韓國瑜  8,493 國泰世華商業銀行慶城分行 活期存款 新臺幣 韓國瑜  26 玉山商業銀行斗 六分行 活期存款 新臺幣 李佳芬  1,921,907 玉山商業銀行斗六分行 活期存款 澳幣 李佳芬 412.96 8,969.49 玉山商業銀行斗六分行 活期存款 加拿大幣 李佳芬 75,224.73 1,737,691.26 玉山商業銀行斗六分行 活期存款 人民幣 李佳芬 34,687.72 158,488.19 玉山商業銀行斗六分行 活期存款 日圓 李佳芬 4,500 1,236.60 玉山商業銀行斗六分行 活期存款 美元 李佳芬 17,388.18 536,251.47 玉山商業銀行斗六分行 活期存款 南非幣 李佳芬 6,490.62 13,552.41 國泰世華商業銀行斗六簡易型分行 活期存款 新臺幣 李佳芬  299,509 合作金庫商業銀行雲林分行 活期存款 新臺幣 李佳芬  3,186,446 臺灣土地銀行雙和分行 活期存款 新臺幣 李佳芬  277,853 彰化商業銀行斗六分行 活期存款 新臺幣 李佳芬  153,294 斗六大崙郵局(雲林2支) 活期存款 新臺幣 韓○  1,054,494 彰化商業銀行西螺分行 活期存款 新臺幣 李佳芬  3,048,470 高雄銀行市府分行  活期存款 新臺幣 韓國瑜  611,765 台灣新光商業銀行五常分行 活期存款 新臺幣 韓國瑜  30,566,149 日盛銀行內湖分行 活期存款 新臺幣 韓國瑜  17,340 監察院公報 ............. 廉 政 專 刊 第 150 期 151 玉山商業銀行斗六分行 活期存款 新臺幣 李佳芬  1,994,809 ' },  
// { type: '有價證券',    text:     '有價證券（總價額：新臺幣14,041,203元） 1.股票（總價額：新臺幣2,307,690元） 名稱 所有人 股數 票面價額 外幣幣別 新臺幣總額或折合新臺幣總額 強普生技股 份有限公司 (未交付信託原因：非國內上市、上櫃股票)  韓國瑜 120,769 10 新臺幣 1,207,690 晶隼科技股份有限公司 (未交付信託原因：非國內上市、上櫃股票)  李佳芬 110,000 10 新臺幣 1,100,000 2.債券（總價額：新臺幣     元） 名稱 代碼 所  有  人 買賣機構 單    位    數 票  面  價  額 外 幣 幣 別 新臺幣總額或折合新臺幣總額 本欄空白               3.基金受益憑證 （總價額：新臺幣11,733,513元） 名稱 所   有   人 受 託 投 資 機 構 單   位   數 票面價額 （單位淨值） 外 幣 幣 別 新臺幣總額或折合新臺幣總額 鋒裕匯理II-新興市場債券UXD美元 李佳芬 玉山銀行 1,728.395 44.61 美元 2,377,878.13 保德信印度機會債券基金配息型-美元 李佳芬 玉山銀行 8,258.20 10.5256 美元 2,680,690.20 鋒裕匯理II-新興市場債券UXD美元 李佳芬 玉山銀行 1,728.395 44.61 美元 2,377,878.13 鋒裕匯理II-新興市場債券UXD美元 李佳芬 玉山銀行 864.198 44.61 美元 1,188,939.75 鋒裕匯理II-新興市場債券UXD美元 李佳芬 玉山銀行 864.198 44.61 美元 1,188,939.75 鋒裕匯理II-新興市場債券U股 澳幣收益穩定配息 李佳芬 玉山銀行 1,018.893 44.32 澳幣 980,817.37 鋒裕匯理II-新興市場債券U股李佳芬 玉山銀行 533.812 841.89 南非幣 938,370.13 監察院公報 ............. 廉 政 專 刊 第 150 期 152 南非幣收益穩定配息 4.其他有價證券（總價額：新臺幣     元） 名稱 所有人 單    位    數 價額 外 幣 幣 別 新臺幣總額或折合新臺幣總額 本欄空白           ' },  
// { type: '珠寶、古董、字畫及其他具有相當價值之財產',    text:     '珠寶、古董、字畫及其他具有相當價值之財產 1.珠寶、古董、字畫及其他具有相當價值之財產（總價額：新臺幣     元） 財產種類 項/件 所有人 價額 本欄空白    2.保險 保險公司 保險名稱 要保人 備註 南山人壽保險股份有限公司 南山人壽增集利增額終身壽險 李佳芬  南山人壽保險股份有限公司 南山人壽增集利增額終身壽險 李佳 芬  南山人壽保險股份有限公司 南山人壽增集利增額終身壽險 李佳芬  南山人壽保險股份有限公司 南山人壽添美福美元利率變動型終身壽險 李佳芬  南山人壽保險股份有限公司 南山康樂限期繳費終身壽險 李佳芬  南山人壽保險股份有限公司 南山康寧終身壽險 韓國瑜  國泰人壽保險股份有限公司 國泰人壽珍鑫福終身壽險 韓國瑜  南山人壽保險股份有限公司 新二十年期繳費特別增值分紅終身壽險 李佳芬  南山人壽保險股份有限公司 南山康寧終身壽險 李佳芬  中國人壽保險股份有限公司 中國人壽鑫萬利終身壽 險 李佳芬  南山人壽保險股份有限公司 南山新新增額養老保險 李佳芬  南山人壽保險股份有限公司 南山好吉利二十一年期還本養老保險 李佳芬  臺灣人壽保險股份有限公 司 大都會人壽-鑫安保險 李佳芬  南山人壽保險股份有限公司 南山美滿還本終身保險 李佳芬  南山人壽保險股份有限公司 南山美滿還本終身保險 李佳芬  臺灣人壽保險股 份有限公司 台灣人壽新安慶終身壽險 李佳芬  南山人壽保險股份有限公司 南山312還本終身保險 李佳芬  監察院公報 ............. 廉 政 專 刊 第 150 期 153 臺灣人壽保險股份有限公司 台灣人壽富利人生終身壽險A型 李佳芬  ' },  
// { type: '債權',    text:     '債權（總金額：新臺幣   元） 種類 債權人 債務人及地址 餘額 取得(發生)時間 取得(發生)原因 本欄空白           ' },  
// { type: '債務',    text:     '債務（總金額：新臺幣12,878,861元） 種類 債務人 債權人及地址 餘額 取得(發生)時間 取得(發生)原因 房屋貸款 李佳芬 玉山銀行  臺北市松山區民生東路  12,000,000 108年02月18日 個人理財 信用貸款 李佳芬 玉山銀行  臺北市松山區民生東路  878,861 104年01月28日 個人理財 ' },  
// { type: '事業投資',    text:     '事業投資（總金額：新臺幣 10,000,000元） 投資人 投   資   事   業   名   稱 投   資  事  業  地   址 投 資 金 額 取得(發生)時間 取得(發生)原因 李佳芬 翰霖坊建設 雲林縣西螺鎮大同路189號  10,000,000 99年08月09日 事業投資 ' },  
// { type: ' 備 註',    text:     '備 註 玉山商業銀行斗六分行 活期存款 戶名：韓國瑜 金額 0元 玉山商業銀行斗六分行 外幣存款 戶名：韓國瑜 金額 0元 ▓本人、配偶及未成年子女名下之財產，符 合公職人員財產申報法第７條規定者，業已與 玉山商業銀行 完成信託，特此聲明。  此 致                      監 察 院 以上資料，本人係依法誠實申報，如有不實，願負法律責任                  申報人：韓國瑜 監察院公報 ............. 廉 政 專 刊 第 150 期 154 公 職 人 員 信 託 財 產 申 報 表 申報人姓名 韓國瑜 服務機關 1.高雄市政府 職稱 1.市長 2.  2.  申  報  日 108年03月14日 申報類別 就(到)職申報 配  偶  及  未 成  年  子 女 配  偶  及  未 成  年  子 女 稱   謂 姓   名 稱   謂 姓   名 配偶 李佳芬 子女 韓○     受託人 玉山商業銀行 負責人姓名 曾國烈 （二）不動產 1.土地 土地坐落 面積(平方公尺) 權 利 範 圍 (持分) 信   託   前 所 有 權 人 受託人 移  轉  登  記 完  成  日  期 雲林縣斗六市溝子埧段柴裡小段  73 13分之1  李佳芬 玉山商業銀行 108年03月13日 雲林縣斗六市溝子埧段柴裡小段  193 全部  李佳芬 玉山商業銀行 108年03月13日 雲林縣斗六市溝子埧段柴裡小段  817 13分之1  李佳芬 玉山商業銀行 108年03月13日 雲林縣斗六市大崙段茄苳腳小段  1,324 全部  李佳芬 玉山商業銀行 108年03月13日 2.建物(房屋及停車位) 建物標示 面積(平方公尺) 權 利 範 圍 (持分) 信   託   前 所 有 權 人 受託人 移  轉  登   記 完  成  日  期 雲林縣斗六市溝子埧段柴裡小段  473.90 全部  李佳芬 玉山商業銀行 108年03月13日 （三）國內上市(櫃)股票（總價額：新臺幣1,000,000元） 名稱 股數 信 託 前 所 有 人 受託人 移  轉  日  期 票面價額 總額 合一  100,000 韓國瑜 玉山商業銀行 108年03月08日 10 1,000,000 （四）備註 本欄空白 此 致           監 察 院 以上資料，本人係依法誠實申報，如有不實，願負法律責任                  申報人：韓國瑜 ' } 
// ]

function sortTypeOne() {
    let name = getDataWithStringBetween("申報人姓名", "服務機關", TotalData[0].text);
    console.log(name);
    // 服務機關
    let serviceAgency = getDataWithStringBetween("服務機關", "職稱", TotalData[0].text);
    console.log(serviceAgency);
    // 職稱
    let jobTitle = getDataWithStringBetween("職稱", "申  報  日", TotalData[0].text);
    console.log(jobTitle);
    // 申 報 日
    let reportDay = getDataWithStringBetween("申  報  日", "申報類別", TotalData[0].text);
    console.log(reportDay);
    // 申報類別 declarationCategory
    let declarationCategory = getDataWithStringBetween("申報類別", "配  偶", TotalData[0].text);
    console.log(declarationCategory);
    // 配偶及其子女資料
    let famliy = TotalData[0].text.split("姓   名")[2];
    console.log(famliy);
}

function sortTypeTwo() {
    // 按照1,2 將土地及建物分開  這邊是土地
    let land = getDataWithStringBetween("不動產 1.土地", "2.建物", TotalData[1].text);
    console.log("    TotalData[1].text:", TotalData[1].text);

    console.log("land:", land);
    // 將土地及土地變動情形分開
    let land1 = getDataWithStringBetween("取  得  價  額", "土             地          變             動             情             形", land)
    console.log(land1);
    // 這邊是建物
    //     let land =getDataWithStringBetween("不動產 1.土地","2.建物",TotalData[1].text);
    // console.log(land);
    let building = TotalData[1].text.split("2.建物")[1].replace(" ", "");
    console.log("building:", building);
}



function sortTypeThree() {
    //船舶
}

function sortTypeFour() {
    // 汽車（含大型重型機器腳踏車）
    let car = TotalData[3].text.split("取  得  價  額")[1];
    console.log(car);

}
function sortTypeFive() {
    // （五）航空器
};
function sortTypeSix() {
    // （六）現金（指新臺幣、外幣之現金或旅行支票）（總金額：新臺幣 
    // let moneyTotal =getDataWithStringBetween("不動產 1.土地","2.建物",TotalData[1].text);
    //     console.log(land);
};
function sortTypeSeven() {
    // 去掉頁尾及頁碼
    // 廉 政 專 刊 第 150 期
    let newData = "";
    console.log("TotalData[6].text", TotalData[6].text);
    console.log("TotalData[6].text", TotalData[6].text.indexOf("監察院公報 ............. 廉 政 專 刊 第 150 期 "));
    if (TotalData[6].text.indexOf("監察院公報 ............. 廉 政 專 刊 第 150 期 ") > 0) {
        let deleTitleAndPageNum = TotalData[6].text.split("監察院公報 ............. 廉 政 專 刊 第 150 期 ")[1].split(" ");

        //去出頁碼
        deleTitleAndPageNum.shift()
        console.log("deleTitleAndPageNum3:", deleTitleAndPageNum);
        console.log("deleTitleAndPageNum4:", deleTitleAndPageNum.join(" "));

        newData = TotalData[6].text.split("監察院公報 ............. 廉 政 專 刊 第 150 期 ")[0] + deleTitleAndPageNum.join(" ");
        console.log('----------1---------');
        console.log(newData);
        console.log('----------1---------');

        TotalData[6].text = newData
    }

    //更新回去 


    // 將來可抽開


    // （七）存款（指新臺幣、外幣之存款）（總金額：新臺幣 18,479,564 元）
    let bankSavingsTotal = getDataWithStringBetween("）（總金額：", "）", TotalData[6].text);
    console.log("bankSavingsTotal:", bankSavingsTotal);
    let bankSavingsList = TotalData[6].text.split("臺   幣   總   額 ")[1];
    console.log('-------------------');
    console.log("分割後存款帳戶:", bankSavingsList.split(" "));
    let bankSaveingDataList = [];
    // bankSavingsList.split(" ").forEach((data)=>{
    //     // /6

    // })
    let saveData = {};
    for (let i = 0; i < bankSavingsList.split(" ").length; i++) {
        let modI = i % 6
        let tempData = bankSavingsList.split(" ")[i];
        if (i !== 0 && modI == 0) {
            bankSaveingDataList.push(JSON.parse(JSON.stringify(saveData)));
            saveData = {};
        }
        switch (modI) {
            case 0:
                // 行名
                saveData.bankName = tempData;
                break;
            case 1:
                // 存款類別
                saveData.saveType = tempData;
                break;
            case 2:
                // 幣別
                saveData.moneyType = tempData;
                break;
            case 3:
                // 戶名
                saveData.accountName = tempData;
                break;
            case 4:
                // 等值外幣金額
                saveData.sameOutSideValue = tempData;
                break;
            case 5:
                // 台幣金額
                saveData.twd = tempData;
                break;

        }

    }
    bankSaveingDataList.forEach((d) => {
        console.log("data:", d);
    })

    console.log('-------------------');
    console.log("bankSavingsList:", bankSavingsList);

};
function sortTypeEight() {
    console.log("處理有價證券1:");
    TotalData[7].text = removeTitleAndPageNum(TotalData[7]);
    console.log("處理有價證券2:", TotalData[7].text);
    //（八） 有價證券（總價額：新臺幣7,220元）
    let financialSecuritiesTotal = getDataWithStringBetween("（總價額：", "）", TotalData[7].text);
    console.log("financialSecuritiesTotal(有價證卷總價值):", financialSecuritiesTotal);
    let stockList = getDataWithStringBetween("1.股票", "2.債券", TotalData[7].text);

    let stockTotalValue = getDataWithStringBetween("（總價額：", "）", stockList);
    console.log("stockTotalValue:", stockTotalValue);
    console.log("stockList:", stockList);
    // 2.債券
    let bondList = getDataWithStringBetween("2.債券", "3.基金受益憑證", TotalData[7].text);
    let bondTotalValue = getDataWithStringBetween("（總價額：", "）", bondList);
    // console.log("bondTotalValue:", bondTotalValue);
    // console.log("bondList:", bondList);
    // 3.基金受益憑證
    console.log(" 3.基金受益憑證");
    let fundList = getDataWithStringBetween("3.基金受益憑證", "4.其他有價證券", TotalData[7].text);
    let fundTotalValue = getDataWithStringBetween("（總價額：", "）", fundList);

    // console.log("fundTotalValue:", fundTotalValue);
    // console.log("fundList:", fundList);
    // 名稱 所   有   人 受 託 投 資 機 構 單   位   數 票面價額 （單位淨值） 外 幣 幣 別 新臺幣總額或折合新臺幣總額
    let fundData = fundList.split('新臺幣總額或折合新臺幣總額 ')[1];
    // console.log('fundData:', fundData);

    // fundData.split(' ').forEach((data)=>{
    // })
    const fundObject = {
        fundName: '',
        fundHolder: '',
        fundBank: '',
        fundUnit: '',
        fundNetValue: '',
        fundForeignCurrency: '',
        fundTaiwanPrice: ''
    };
    let tempFoundData = fundData.split(' ').filter((e) => { return e });
    // console.log('tempFoundData:', tempFoundData);
    fundObjectList = [];
    // console.log('tempFoundData.length', tempFoundData.length);
    for (let i = 0; i < tempFoundData.length; i++) {
        // console.log('tempFoundData:', tempFoundData[i]);
        switch (i % 7) {
            case 0:
                fundObject.fundName = tempFoundData[i];
                break;
            case 1:
                fundObject.fundHolder = tempFoundData[i];
                break;
            case 2:
                fundObject.fundBank = tempFoundData[i];
                break;
            case 3:
                fundObject.fundUnit = tempFoundData[i];
                break;

            case 4:
                fundObject.fundNetValue = tempFoundData[i];
                break;
            case 5:
                fundObject.fundForeignCurrency = tempFoundData[i];
                break;
            case 6:
                // 20191206 先不細作  資料面要再想怎麼切 還是手工處理之類的
                // 會出現黏住的情形    // { fundName: '鋒裕匯理II-新興市場債券U股李佳芬',
                fundObject.fundTaiwanPrice = tempFoundData[i];
                // if()
                if (fundObject.fundBank.replace(/[^0-9]/ig, "")) {
                    // 銀行名稱 被數字吃走
                    // 取出上一個明子
                    // console.log('fundObjectList[fundObjectList.length-1].fundName:', fundObjectList[fundObjectList.length - 1].fundHolder);
                    fundObject.fundName = fundObject.fundName.split(fundObjectList[fundObjectList.length - 1].fundHolder)[0];
                    fundObject.fundHolder = fundObjectList[fundObjectList.length - 1].fundHolder;
                    fundObject.fundBank = tempFoundData[i - 5];
                    fundObject.fundUnit = tempFoundData[i - 4];
                    fundObject.fundNetValue = tempFoundData[i - 3];
                    fundObject.fundForeignCurrency = tempFoundData[i - 2];
                    fundObject.fundTaiwanPrice = tempFoundData[i - 1];
                    fundObjectList.push(JSON.parse(JSON.stringify(fundObject)));

                } else {
                    fundObjectList.push(JSON.parse(JSON.stringify(fundObject)));
                }
                // fundUnit: '1,018.893', val.replace(/[^0-9]/ig,"")

                //清空
                fundObject.fundName = '';
                fundObject.fundHolder = '';
                fundObject.fundBank = '';
                fundObject.fundUnit = '';
                fundObject.fundNetValue = '';
                fundObject.fundForeignCurrency = '';
                fundObject.fundTaiwanPrice = '';

                break;
        }
    }
    console.log('fundObjectList:', fundObjectList);
    // 4.其他有價證券
    console.log("4.其他有價證券");
    let elseHaveValueBondList = TotalData[7].text.split("4.其他有價證券")[1]
    let elseHaveValueBondTotalValue = getDataWithStringBetween("（總價額：", "）", elseHaveValueBondList);

    console.log("elseHaveValueBondTotalValue:", elseHaveValueBondTotalValue);
    console.log("elseHaveValueBondList:", elseHaveValueBondList);

};

function sortTypeNine() {


    console.log("珠寶、古董、字畫及其他具有相當價值之財產:");
    TotalData[8].text = removeTitleAndPageNum(TotalData[8]);
    console.log("處理有價證券:", TotalData[8].text);

    // 先用2.保險將兩段資料分開
    console.log('TotalData[8].text:', TotalData[8].text.split('2.保險'));
    let anotherData = TotalData[8].text.split('2.保險');

    let elseValueTotal = getDataWithStringBetween("1.珠寶、古董、字畫及其他具有相當價值之財產（", "）", anotherData[0]);
    console.log("elseValueTotal(珠寶、古董、字畫及其他具有相當價值之財產) 總額:", elseValueTotal);
    // let elseValueList = anotherData[0].split("價額 ")[1];
    // let elseValueList = anotherData[0].split("價額 ")[1];
    let elseValueList = getDataWithStringBetween(" 價額 ", "2.保險", anotherData[0]);

    console.log("elseValueList:", elseValueList);
    // 20190827做到保險
    // 2.保險 保險公司 保險名稱 要保人 備註 新光人壽 新光人壽健康百分百終身健康保險 吳○倫  新光人壽 新光人壽安心久久手術醫療終身健康保 
    // 險 吳○倫  紐約人壽 終身壽險保險 陳怡寧  紐約人壽 終身壽險保險 陳怡寧  紐約人壽 終身壽險保險 吳堂成  國泰人壽 國泰美滿人生202終身壽險 吳堂成  國泰人壽 國泰 
    // 人壽新真安心住院醫療終身保險 吳堂成
    // 過調備註之前
    // console.log('sss:',anotherData[1].indexOf('空白'));
    if (anotherData[1].split(' 備註 ')[1].indexOf('空白') >= 0) {
        console.log('沒有保險');
    } else {
        console.log('有保險');
        console.log(anotherData[1].split("備註 ")[1]);
        console.log(anotherData[1].split("備註 ")[1].split("  "));
        let filteredArray = anotherData[1].split("備註 ")[1].split("  ").filter((e) => { return e });
        console.log("filteredArray:", filteredArray);
        // let insuranceData = filteredArray.split(" ");
        // 保險公司 保險名稱 保險人

        let insuranceList = [];
        filteredArray.forEach((iData) => {
            const insuranceDataJson = {
                insuranceCom: '',
                insuranceName: '',
                insurancePeople: ''
            };
            let insuranceData = iData.split(" ");
            insuranceDataJson.insuranceCom = insuranceData[0];
            insuranceDataJson.insuranceName = insuranceData[1];
            insuranceDataJson.insurancePeople = insuranceData[2];
            insuranceList.push(insuranceDataJson)
        })
        console.log('insuranceList:', insuranceList);
    }

    // console.log("insurance:",insuranceData.length);

    // elseValueList.

};
// 債權（
function sortTypeTen() {
    TotalData[9].text = removeTitleAndPageNum(TotalData[9]);
    console.log("債權（:", TotalData[9].text);
    console.log("債權總額:", getDataWithStringBetween('債權（總金額：新臺幣', '） 種類', TotalData[9].text));
};
// 債務
function sortTypeEleven() {
    TotalData[10].text = removeTitleAndPageNum(TotalData[10]);
    console.log("）債務（:", TotalData[10].text);
};
// 事業投資（
function sortTypetwelve() {
    TotalData[11].text = removeTitleAndPageNum(TotalData[11]);
    console.log("事業投資（:", TotalData[11].text);
};
// 備註
function sortTypethirteen() {
    TotalData[12].text = removeTitleAndPageNum(TotalData[12]);
    console.log("（十三）備 註 :", TotalData[12].text);
};

function getDataWithStringBetween(str1, str2, txt) {
    // console.log("str1:",str1);
    // console.log("str2:",str2)
    // console.log("txt:",txt)
    // console.log("txt.split(str1)[1]:",txt.split(str1)[1])
    if (txt.split(str1)[1] == undefined) {
        // 找不到 去除空白再找找
        str1 = str1.replace(/\s+/g, "");
        // console.log("變更後txt:",str1);
    }
    // console.log("txt.split(str2)[0]:",txt.split(str2)[0])
    txt.split(str1)[1]
    return txt.split(str1)[1].split(str2)[0].replace(" ", "");
}

// 移除頁尾的 文字及頁碼
function removeTitleAndPageNum(textObj) {
    let newData = textObj.text;
    for (let i = 0; i < 300; i++) {
        if (textObj.text.indexOf("監察院公報 ............. 廉 政 專 刊 第 " + i.toString() + " 期 ") > 0) {

            let deleTitleAndPageNum = textObj.text.split("監察院公報 ............. 廉 政 專 刊 第 " + i.toString() + " 期 ")[1].split(" ");
            //去出頁碼
            deleTitleAndPageNum.shift()
            newData = textObj.text.split("監察院公報 ............. 廉 政 專 刊 第 " + i.toString() + " 期 ")[0] + deleTitleAndPageNum.join(" ");
        }
    }
    return newData;
}

function getTableOfContents1(data) {
    govePdfPeriod = 0;
    let dataArray = [];
    let stringlist = ""
    let rootPageCount = 0;
    // for(let page =0 ; page<data.pages.length;page++){
    // console.log("data.pages:",data.pages);
    // 頁數是亂的
    data.pages.sort((a, b) => {
        return a.pageInfo.num - b.pageInfo.num
    })

    for (let page = 0; page < data.pages.length; page++) {
        console.log(data.pages[page].pageInfo.num);
        // 頁數是亂的
        // console.log(data.pages[page].content.length);
        // console.log(data.pages);

        // stringlist="■s■■"+page+"■■■"+stringlist;
        for (let content = 0; content < data.pages[page].content.length; content++) {
            stringlist = stringlist + data.pages[page].content[content].str;
            //    console.log(data.pages[page].content[content].length);

        }
        if (page === 0) {
            // 移除宣告 108 09 09 會拿不掉
            stringlist = stringlist.split(' 監 察 院')[0];
        }
        console.log('stringlist.split("申報人姓名").length:', stringlist.split("申報人姓名").length);
        if (stringlist.split("申報人姓名").length > 1) {
            console.log('目錄共:', page, "頁");
            rootPageCount += page - 1;
            break;
        }

    }

    console.log("rootPageCount:", rootPageCount);
    let allRootNumString = '';
    removeAnotherStringinRoot(stringlist.split("申報人姓名")[0]).replace("◆", "").split('   ').forEach((data) => {
        // console.log("stringList:",data)
        var reg = /[\u4e00-\u9fa5]/g;

        // console.log(data.replace(reg, "").replace(/[^0-9]+/g, "-"))
        allRootNumString += data.replace(reg, "").replace(/[^0-9]+/g, "-");
    });
    // console.log("allRootNumString:", allRootNumString);
    allRootNumArray = []
    allRootNumString.split('-').forEach((n) => {
        n < 1000 && n !== '' ? allRootNumArray.push(n) : '';
    })
    console.log(allRootNumArray.sort((a, b) => { return a - b }));
    // 移除只有一頁的資料
    for (let j = 0; j < allRootNumArray.length - 1; j++) {
        // 20191209 韓國瑜 150拿不調 目錄要在處理
        // if (parseInt(allRootNumArray[j]) + 1 == parseInt(allRootNumArray[j + 1])) {

        //     allRootNumArray.splice(j + 1, 1)
        //     break;
        // }
        console.log("有比對到期別:", parseInt(allRootNumArray[j]));
        console.log("govePdfPeriod:", govePdfPeriod);
        if (govePdfPeriod == parseInt(allRootNumArray[j])) {
            console.log("有比對到期別:", parseInt(allRootNumArray[j]));
            allRootNumArray.splice(j, 1)
            break;
        }

    }
    rootArray = [];
    allRootNumArray.sort((a, b) => { return a - b }).forEach((num, index, arr) => {
        // 最後不處理
        let rootNum = {
            startPage: 0,
            endPage: 0
        }
        // console.log(num);
        // if((parseInt(num)+1)!==parseInt(arr[index+1])){
        if (index == arr.length - 1) {
            rootNum.startPage = parseInt(num) + rootPageCount;
            rootNum.endPage = parseInt(num) + rootPageCount;
        } else {
            rootNum.startPage = parseInt(num) + rootPageCount;
            rootNum.endPage = arr[index + 1] - 1 + rootPageCount;
        }
        rootArray.push(rootNum);
        // }
    })

    console.log(rootArray)

    for (let i = 0; i < rootArray.length; i++) {
        let finish = queryData(rootArray[i].startPage, rootArray[i].endPage, data, dataArray);
        if (!finish) {
            break;
        }
    }
    // let data = JSON.stringify(student, null, 2);
    let data2 = JSON.stringify(dataArray, null, 2);
    fs.writeFileSync('govPeople-'+govePdfPeriod+'.json', data2);

    // 將目錄頁樹傳進查詢
}


function queryData(startpage, endpage, data, dataArray) {
    console.log('startpage:', startpage);
    console.log('endpage:', endpage);
    // var startpage = 207;
    // var endpage = 209;
    if (startpage !== endpage) {
        var detailData = ""
        for (let page = startpage; page <= endpage; page++) {
            // console.log(data.pages[page].content);
            data.pages[page].content.forEach(element => {
                // console.log(element.str);
                detailData += element.str;
            });
        }
        // console.log("■detailData:", detailData);
        let objectData = [];
        // console.log(detailData.indexOf('公 職 人 員 信 託 財 產 管 理 或 處 分 指 示 通 知 表'));
        if (!!detailData.indexOf('公 職 人 員 信 託 財 產 管 理 或 處 分 指 示 通 知 表') && !!detailData.indexOf('公 職 人 員 信 託 財 產 申 報 表')) {
            // 針對各區切塊
            // var TotalData=[]
            // 146期 更正申報會壞掉  因為缺項目   用trycatch 結束
            try {


                objectData.push({
                    type: "個人資料",
                    text: detailData.split("（二）")[0]
                });
                objectData.push(
                    {
                        type: "不動產",
                        text: detailData.split("（二）")[1].split("（三）")[0]
                    }
                );
                objectData.push(
                    {
                        type: "船舶",
                        text: detailData.split("（三）")[1].split("（四）")[0]
                    }
                );
                objectData.push(
                    {
                        type: "汽車",
                        text: detailData.split("（四）")[1].split("（五）")[0]
                    }
                );
                objectData.push(
                    {
                        type: "航空器",
                        text: detailData.split("航空器")[1].split("（六）")[0]
                    }
                );
                objectData.push(
                    {
                        type: "現金",
                        text: detailData.split("（六）")[1].split("（七）")[0]
                    }
                );
                objectData.push(
                    {
                        type: "存款",
                        text: detailData.split("（七）")[1].split("（八）")[0]
                    }
                );
                objectData.push(
                    {
                        type: "有價證券",
                        text: detailData.split("（八）")[1].split("（九）")[0]
                    }
                );
                objectData.push(
                    {
                        type: "珠寶、古董、字畫及其他具有相當價值之財產",
                        text: detailData.split("（九）")[1].split("（十）")[0]
                    }
                );
                // console.log(detailData)
                objectData.push(
                    {
                        type: "債權",
                        text: detailData.split("（十）")[1].split("（十一）")[0]
                    }
                );
                objectData.push(
                    {
                        type: "債務",
                        text: detailData.split("（十一）")[1].split("（十二）")[0]
                    }
                );
                objectData.push(
                    {
                        type: "事業投資",
                        text: detailData.split("（十二）")[1].split("（十三）")[0]
                    }
                );
                objectData.push(
                    {
                        type: " 備 註",
                        text: detailData.split("（十三）")[1].split("公 職 人 員 信 託 財 產 申 報 表")[0]
                    }
                );
                objectData.push(
                    {
                        type: "公 職 人 員 信 託 財 產 申 報 表",
                        text: detailData.split("公 職 人 員 信 託 財 產 申 報 表")[1]
                    }
                );
                // console.log("objectData:", objectData);
                // let rowData = {
                //     name: '',
                //     job: '',
                //     jobLocal: '',
                //     applyDate: '',
                //     applyType: '',
                //     spouse: '',
                //     land: '', // 土地物件
                //     build: '', // 建物物件
                // }
                // 將資料處理過轉出去  
                // 一筆資料包含姓名期別及其總額及個別類
                // rowData = sortTypePeopleData(objectData);

                // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
                // rowData= sortTypeRealEstate(objectData);
                let bb = Object.assign({},
                    sortTypePeopleData(objectData),
                    sortTypeRealEstate(objectData),
                    sortTypeShip(objectData),
                    sortTypeCar(objectData),
                    sortTypeFly(objectData),
                    sortTypeCash(objectData),
                    sortTypeBankSavings(objectData),
                    sortTypeStock(objectData),
                    sortTypeOtherProperty(objectData),
                    sortTypeClaims(objectData),
                    sortTypeDebt(objectData),
                    sortTypeCareerInvestment(objectData),
                    sortTypeNote(objectData)
                );
                // console.log("------------:", bb);
                // console.log("rowData", rowData);

                dataArray.push(bb);


                return true;
            } catch (error) {


                console.log("☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆");
                console.log("error:", error);
                console.log("☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆");
                return false
            }
        }

    } else {
        return false;
    }

}
function sortTypePeopleData(objectData) {
    let name = getDataWithStringBetween("申報人姓名", "服務機關", objectData[0].text).trim();;
    console.log("資料姓名:", name);
    // 職稱
    let jobTitle = getDataWithStringBetween("職稱", "申  報  日", objectData[0].text).split(".").join("").replace(/\d+/g, '').trim();
    // console.log(jobTitle);
    // 服務機關
    let serviceAgency = getDataWithStringBetween("服務機關", "職稱", objectData[0].text).split(".").join("").replace(/\d+/g, '').trim();
    // console.log(serviceAgency);
    // 申 報 日
    let reportDay = getDataWithStringBetween("申  報  日", "申報類別", objectData[0].text).trim();;
    // console.log(reportDay);
    // 申報類別 declarationCategory
    let declarationCategory = getDataWithStringBetween("申報類別", "配  偶", objectData[0].text).trim();;
    // console.log(declarationCategory);
    // 配偶及其子女資料
    let famliy = objectData[0].text.split("姓   名")[2].trim();
    // console.log(famliy);
    const peopleData = {
        name: name,
        job: jobTitle,
        jobLocal: serviceAgency,
        applyDate: reportDay,
        applyType: declarationCategory,
        spouse: famliy
    }
    return peopleData;
}

// 不動產
function sortTypeRealEstate(objectData) {
    // 按照1,2 將土地及建物分開  這邊是土地
    let land = getDataWithStringBetween("不動產 1.土地", "2.建物", objectData[1].text);
    // console.log("    objectData[1].text:", objectData[1].text);
    // console.log("land:", land);
    // 將土地及土地變動情形分開

    let land1 = getDataWithStringBetween("取  得  價  額", "土             地          變             動             情             形", land)

    // console.log('land1:', land1);
    // console.log('land1:', land1.split(' '));
    // 總面積

    // 如果有價格
    // 這邊是建物
    //     let land =getDataWithStringBetween("不動產 1.土地","2.建物",objectData[1].text);
    // console.log(land);
    let building = objectData[1].text.split("2.建物")[1].replace(" ", "");
    // console.log("building:", building);
    // console.log("===================================");
    const realEstate = {
        land: land1,
        build: building
    }
    return realEstate
}

function sortTypeShip(objectData) {
    //船舶
}

function sortTypeCar(objectData) {
    // 汽車（含大型重型機器腳踏車）
    let car = objectData[3].text.split("取  得  價  額")[1];
    // console.log(car);
    // console.log("------------:",car);
    const carData = {
        car: car
    }
    return carData;

}
function sortTypeFly(objectData) {
    // （五）航空器
};
function sortTypeCash(objectData) {
    // （六）現金（指新臺幣、外幣之現金或旅行支票）（總金額：新臺幣 
    // console.log("objectData[5].text:",objectData[5].text)
    let cashTotal = getDataWithStringBetween("現金（指新臺幣、外幣之現金或旅行支票）（總金額：新臺幣", "元）", objectData[5].text);

    // console.log(cashTotal);
    let cashData = {
        cash: cashTotal ? cashTotal : 0
    }
    return cashData;
};
function sortTypeBankSavings(objectData) {
    // 去掉頁尾及頁碼
    // 廉 政 專 刊 第 150 期
    let newData = "";
    // console.log("TotalData[6].text", objectData[6].text);
    // console.log("objectData[6].text", objectData[6].text.indexOf("監察院公報 ............. 廉 政 專 刊 第 150 期 "));
    if (objectData[6].text.indexOf("監察院公報 ............. 廉 政 專 刊 第 150 期 ") > 0) {
        let deleTitleAndPageNum = objectData[6].text.split("監察院公報 ............. 廉 政 專 刊 第 150 期 ")[1].split(" ");

        //去出頁碼
        deleTitleAndPageNum.shift()
        // console.log("deleTitleAndPageNum3:", deleTitleAndPageNum);
        // console.log("deleTitleAndPageNum4:", deleTitleAndPageNum.join(" "));

        newData = objectData[6].text.split("監察院公報 ............. 廉 政 專 刊 第 150 期 ")[0] + deleTitleAndPageNum.join(" ");
        // console.log('----------1---------');
        // console.log(newData);
        // console.log('----------1---------');

        objectData[6].text = newData
    }

    //更新回去 


    // 將來可抽開


    // （七）存款（指新臺幣、外幣之存款）（總金額：新臺幣 18,479,564 元）
    let bankSavingsTotal = getDataWithStringBetween("）（總金額：", "）", objectData[6].text);
    // console.log("bankSavingsTotal:", bankSavingsTotal);
    let bankSavingsList = objectData[6].text.split("臺   幣   總   額 ")[1];
    // console.log('-------------------');
    // console.log("分割後存款帳戶:", bankSavingsList.split(" "));
    let bankSaveingDataList = [];
    // bankSavingsList.split(" ").forEach((data)=>{
    //     // /6

    // })
    let saveData = {};
    // for (let i = 0; i < bankSavingsList.split(" ").length; i++) {
    //     let modI = i % 6
    //     let tempData = bankSavingsList.split(" ")[i];
    //     if (i !== 0 && modI == 0) {
    //         bankSaveingDataList.push(JSON.parse(JSON.stringify(saveData)));
    //         saveData = {};
    //     }
    //     switch (modI) {
    //         case 0:
    //             // 行名
    //             saveData.bankName = tempData;
    //             break;
    //         case 1:
    //             // 存款類別
    //             saveData.saveType = tempData;
    //             break;
    //         case 2:
    //             // 幣別
    //             saveData.moneyType = tempData;
    //             break;
    //         case 3:
    //             // 戶名
    //             saveData.accountName = tempData;
    //             break;
    //         case 4:
    //             // 等值外幣金額
    //             saveData.sameOutSideValue = tempData;
    //             break;
    //         case 5:
    //             // 台幣金額
    //             saveData.twd = tempData;
    //             break;

    //     }

    // }
    bankSaveingDataList.forEach((d) => {
        // console.log("data:", d);
    })

    // console.log('-------------------');
    // console.log("bankSavingsList:", bankSavingsList);

    let bankSavings = {
        bankSavings: bankSavingsTotal
    }
    return bankSavings;
};
function sortTypeStock(objectData) {
    // console.log("處理有價證券1:");
    objectData[7].text = removeTitleAndPageNum(objectData[7]);
    // console.log("處理有價證券2:", objectData[7].text);
    //（八） 有價證券（總價額：新臺幣7,220元）
    let financialSecuritiesTotal = getDataWithStringBetween("（總價額：", "）", objectData[7].text);
    // console.log("financialSecuritiesTotal(有價證卷總價值):", financialSecuritiesTotal);
    let stockList = getDataWithStringBetween("1.股票", "2.債券", objectData[7].text);

    let stockTotalValue = getDataWithStringBetween("（總價額：", "）", stockList);
    // console.log("stockTotalValue:", stockTotalValue);
    // console.log("stockList:", stockList);
    // 2.債券
    let bondList = getDataWithStringBetween("2.債券", "3.基金受益憑證", objectData[7].text);
    let bondTotalValue = getDataWithStringBetween("（總價額：", "）", bondList);
    // console.log("bondTotalValue:", bondTotalValue);
    // console.log("bondList:", bondList);
    // 3.基金受益憑證
    // console.log(" 3.基金受益憑證");
    let fundList = getDataWithStringBetween("3.基金受益憑證", "4.其他有價證券", objectData[7].text);
    let fundTotalValue = getDataWithStringBetween("（總價額：", "）", fundList);

    // console.log("fundTotalValue:", fundTotalValue);
    // console.log("fundList:", fundList);
    // 名稱 所   有   人 受 託 投 資 機 構 單   位   數 票面價額 （單位淨值） 外 幣 幣 別 新臺幣總額或折合新臺幣總額
    let fundData = fundList.split('新臺幣總額或折合新臺幣總額 ')[1];
    // console.log('fundData:', fundData);

    // fundData.split(' ').forEach((data)=>{
    // })
    const fundObject = {
        fundName: '',
        fundHolder: '',
        fundBank: '',
        fundUnit: '',
        fundNetValue: '',
        fundForeignCurrency: '',
        fundTaiwanPrice: ''
    };

    // if(fundData){
    //     let tempFoundData = fundData.split(' ').filter((e) => { return e });
    //     // console.log('tempFoundData:', tempFoundData);
    //     fundObjectList = [];
    //     // console.log('tempFoundData.length', tempFoundData.length);
    //     for (let i = 0; i < tempFoundData.length; i++) {
    //         // console.log('tempFoundData:', tempFoundData[i]);
    //         switch (i % 7) {
    //             case 0:
    //                 fundObject.fundName = tempFoundData[i];
    //                 break;
    //             case 1:
    //                 fundObject.fundHolder = tempFoundData[i];
    //                 break;
    //             case 2:
    //                 fundObject.fundBank = tempFoundData[i];
    //                 break;
    //             case 3:
    //                 fundObject.fundUnit = tempFoundData[i];
    //                 break;

    //             case 4:
    //                 fundObject.fundNetValue = tempFoundData[i];
    //                 break;
    //             case 5:
    //                 fundObject.fundForeignCurrency = tempFoundData[i];
    //                 break;
    //             case 6:
    //                 // 20191206 先不細作  資料面要再想怎麼切 還是手工處理之類的
    //                 // 會出現黏住的情形    // { fundName: '鋒裕匯理II-新興市場債券U股李佳芬',
    //                 fundObject.fundTaiwanPrice = tempFoundData[i];
    //                 // if()
    //                 if (fundObject.fundBank.replace(/[^0-9]/ig, "")) {
    //                     // 銀行名稱 被數字吃走
    //                     // 取出上一個明子
    //                     // console.log('fundObjectList[fundObjectList.length-1].fundName:', fundObjectList[fundObjectList.length - 1].fundHolder);
    //                     fundObject.fundName = fundObject.fundName.split(fundObjectList[fundObjectList.length - 1].fundHolder)[0];
    //                     fundObject.fundHolder = fundObjectList[fundObjectList.length - 1].fundHolder;
    //                     fundObject.fundBank = tempFoundData[i - 5];
    //                     fundObject.fundUnit = tempFoundData[i - 4];
    //                     fundObject.fundNetValue = tempFoundData[i - 3];
    //                     fundObject.fundForeignCurrency = tempFoundData[i - 2];
    //                     fundObject.fundTaiwanPrice = tempFoundData[i - 1];
    //                     fundObjectList.push(JSON.parse(JSON.stringify(fundObject)));

    //                 } else {
    //                     fundObjectList.push(JSON.parse(JSON.stringify(fundObject)));
    //                 }
    //                 // fundUnit: '1,018.893', val.replace(/[^0-9]/ig,"")

    //                 //清空
    //                 fundObject.fundName = '';
    //                 fundObject.fundHolder = '';
    //                 fundObject.fundBank = '';
    //                 fundObject.fundUnit = '';
    //                 fundObject.fundNetValue = '';
    //                 fundObject.fundForeignCurrency = '';
    //                 fundObject.fundTaiwanPrice = '';

    //                 break;
    //         }
    //     }
    // }

    // console.log('fundObjectList:', fundObjectList);
    // 4.其他有價證券
    // console.log("4.其他有價證券");

    // let elseHaveValueBondList = objectData[7].text.split("4.其他有價證券")[1]
    // let elseHaveValueBondTotalValue = getDataWithStringBetween("（總價額：", "）", elseHaveValueBondList);

    // console.log("elseHaveValueBondTotalValue:", elseHaveValueBondTotalValue);
    // console.log("elseHaveValueBondList:", elseHaveValueBondList);

    let stockTotal = {
        stock: stockTotalValue
    }

    return stockTotal;
};
function sortTypeOtherProperty(objectData) {


    // console.log("珠寶、古董、字畫及其他具有相當價值之財產:");
    objectData[8].text = removeTitleAndPageNum(objectData[8]);
    // console.log("處理有價證券:", objectData[8].text);

    // 先用2.保險將兩段資料分開
    // console.log('objectData[8].text:', objectData[8].text.split('2.保險'));
    let anotherData = objectData[8].text.split('2.保險');

    let elseValueTotal = getDataWithStringBetween("1.珠寶、古董、字畫及其他具有相當價值之財產（", "）", anotherData[0]);
    // console.log("elseValueTotal(珠寶、古董、字畫及其他具有相當價值之財產) 總額:", elseValueTotal);
    // let elseValueList = anotherData[0].split("價額 ")[1];
    // let elseValueList = anotherData[0].split("價額 ")[1];
    let elseValueList = getDataWithStringBetween(" 價額 ", "2.保險", anotherData[0]);

    // console.log("elseValueList:", elseValueList);
    // 20190827做到保險
    // 2.保險 保險公司 保險名稱 要保人 備註 新光人壽 新光人壽健康百分百終身健康保險 吳○倫  新光人壽 新光人壽安心久久手術醫療終身健康保 
    // 險 吳○倫  紐約人壽 終身壽險保險 陳怡寧  紐約人壽 終身壽險保險 陳怡寧  紐約人壽 終身壽險保險 吳堂成  國泰人壽 國泰美滿人生202終身壽險 吳堂成  國泰人壽 國泰 
    // 人壽新真安心住院醫療終身保險 吳堂成
    // 過調備註之前
    // console.log('sss:',anotherData[1].indexOf('空白'));
    if (anotherData[1].split(' 備註 ')[1].indexOf('空白') >= 0) {
        // console.log('沒有保險');
    } else {
        // console.log('有保險');
        // console.log(anotherData[1].split("備註 ")[1]);
        // console.log(anotherData[1].split("備註 ")[1].split("  "));
        let filteredArray = anotherData[1].split("備註 ")[1].split("  ").filter((e) => { return e });
        // console.log("filteredArray:", filteredArray);
        // let insuranceData = filteredArray.split(" ");
        // 保險公司 保險名稱 保險人

        let insuranceList = [];
        filteredArray.forEach((iData) => {
            const insuranceDataJson = {
                insuranceCom: '',
                insuranceName: '',
                insurancePeople: ''
            };
            let insuranceData = iData.split(" ");
            insuranceDataJson.insuranceCom = insuranceData[0];
            insuranceDataJson.insuranceName = insuranceData[1];
            insuranceDataJson.insurancePeople = insuranceData[2];
            insuranceList.push(insuranceDataJson)
        })
        // console.log('insuranceList:', insuranceList);
    }

    // console.log("insurance:",insuranceData.length);

    // elseValueList.
    let otherProperty = {
        anotherData: anotherData
    }
    return otherProperty;

};
// 債權（
function sortTypeClaims(objectData) {
    objectData[9].text = removeTitleAndPageNum(objectData[9]);
    // console.log("債權（:", objectData[9].text);
    // console.log("債權總額:", getDataWithStringBetween('債權（總金額：新臺幣', '） 種類', objectData[9].text));
    let claims = {
        claims: getDataWithStringBetween('債權（總金額：新臺幣', '） 種類', objectData[9].text)
    }
    return claims
};
// 債務
function sortTypeDebt(objectData) {
    objectData[10].text = removeTitleAndPageNum(objectData[10]);
    // console.log("）債務（:", objectData[10].text);
    let debt = {
        debt: objectData[10].text
    }
    return debt;
};
// 事業投資（
function sortTypeCareerInvestment(objectData) {
    objectData[11].text = removeTitleAndPageNum(objectData[11]);
    // console.log("事業投資（:", objectData[11].text);
    let careerInvestment = {
        sortTypeCareerInvestment: objectData[11].text
    }
    return careerInvestment;
};
// 備註
function sortTypeNote(objectData) {
    objectData[12].text = removeTitleAndPageNum(objectData[12]);
    // console.log("（十三）備 註 :", objectData[12].text);
    let note = {
        note: objectData[12].text
    }
    return note;
};







function removeAnotherStringinRoot(textObj) {

    for (let i = 0; i < 300; i++) {
        if (textObj.indexOf("監察院公報 ............. 廉 政 專 刊 第 " + i.toString() + " 期 ") > 0) {
            govePdfPeriod = i;// 要記錄現在期別
            console.log("有移除到東西:", govePdfPeriod, "----:", i);
            let deleTitleAndPageNum = textObj.split("監察院公報 ............. 廉 政 專 刊 第 " + i.toString() + " 期 ")[1].split(" ");
            //去出頁碼
            deleTitleAndPageNum.shift()
            textObj = textObj.split("監察院公報 ............. 廉 政 專 刊 第 " + i.toString() + " 期 ")[0] + deleTitleAndPageNum.join(" ");
        }
    }
    return textObj;
}
function getTableOfContents(data) {
    console.log("data:", data);
    // 目前不需要 公 職 人 員 信 託 財 產 管 理 或 處 分 指 示 通 知 表 
    let stringlist = ""
    let breakflog = false;
    // for(let page =0 ; page<data.pages.length;page++){
    let countTabPage = 0;
    for (let page = 0; page < data.pages.length; page++) {
        countTabPage++;
        console.log(page);
        console.log(data.pages[page].content.length);
        for (let content = 0; content < data.pages[page].content.length; content++) {
            stringlist += data.pages[page].content[content].str;
            if (data.pages[page].content[content].str == "申報人姓名") {
                breakflog = true;
            }
            if (breakflog)
                break;
            // console.log(data.pages[page].content[content]);
        }
        if (breakflog)
            break;
    }

    // 到開始的時候才停　才能分開目錄　　所以要退一頁回去
    countTabPage -= 1;
    console.log("countTabPage:", countTabPage);
    let peopleList = [];
    // var tabString="廉 政 專 刊  第150期◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆本期目次一、公職人員財產申報資料 局長    許秀能.....................77 行政院  新北市政府水利局 院長賴清德..................... 1 局長    古沼格.....................87 副院長   施俊吉..................... 5  新北市政府交通局 秘書長   卓榮泰.....................11 局長    鍾鳴時.....................93    教育部  新北市政府客家事務局 政務次長  范巽綠.....................16 局長    賴金河.....................98     中央選舉委員會  臺中市政府 主任委員  陳英鈐.....................23 副市長   張光瑤.................. 104    國立故宮博物院  臺中市政府民政局 院長    陳其南.....................30 局長    游湧志.................. 110    行政院環境保護署  臺中市政府財政局 副署長   蔡鴻德.....................35 局長    羅仙法.................. 114    行政院農業委員會  臺中市政府法制局 主任委員  林聰賢.....................41 局長    吳梓生.................. 118    立法院  臺中市政府原住民族事務委員會 立法委員  陳靜敏.....................45 主任委員  全秋雄.................. 127    臺北市政府社會局  臺南市政 府 局長    黃清高.....................49 處長    吳堂成.................. 130 臺北市政府觀光傳播局  臺南市政府民政局 局長    陳思宇.....................55 局長    林振祿.................. 133 新北市政府  臺南市政府財政稅務局 市長朱立倫.....................59 局長    沈盈如.................. 140  副市長   葉惠青.....................65 高雄市政府    新北市政府財政局 市長許立明.................. 145 局長    黃細清.....................70 市長韓國瑜.................. 149 新北市政府勞工局 高雄市 政府教育局 監 察 院 公 職 人 員 財 產 申 報 處 編 印中 華 民 國  108 年  06 月  14 日 出 版局長    王進焱.................. 155 花蓮縣政府    高雄市政府新聞局 處長    陳志強.................. 255 局長    張家興.................. 162 ★信託指示通知★    高雄市政府勞工局  財政部 局長    李煥熏.................. 166 政務次長  吳自心.................. 256    高雄市政府交通局  公平交易委員會 局長    黃萬發.................. 171 副主任委員 彭紹瑾.................. 257    高雄市政府都市發展局  不當 黨產處理委員會 局長    王啟川.................. 175 主任委員  林峯正.................. 260    高雄 市政府毒品防制局  臺北市政府捷運工程局 局長    宋孔慨.................. 178 局長    張澤雄.................. 261    高雄市政府研究發展考核委員會  台灣糖業股份有限公司高雄區處 主任委員  柯芷伶.................. 181 副經理   陳志成.................. 265    宜蘭縣政府 台灣糖業股份有限公司精緻農業事 處長    陳正華.................. 186 業部    新竹市政府 副執行長  陳黎珍.................. 267 處長    陳凱凌.................. 190 交通部臺灣鐵路管理局餐旅服務總 新竹市政府文化局 所 局長    廖志堅.................. 195 總經理   黃士弦.................. 268    新竹縣政府  中華郵政股份有限公司臺東郵局 縣長    楊文科.................. 199 副理    溫純祥.................. 269    彰化縣政府文化局  臺灣菸酒股份有限公司臺北營業處 局長    周馥儀.................. 205 經理    賴剛哲.................. 270 嘉義市政府 市長黃敏惠.................. 208 處長熊博安.................. 212 二、罰鍰處分案 件確定名單 處長張耀仁.................. 217 (一)監察院辦理公職人員財產申報罰鍰處    嘉義縣政府社會 局 分確定名單(108年1月至3月)......271 局長    劉志偉.................. 225 (二)監察院辦理政治獻金罰鍰處分確定名 雲林縣政府 單(108年1月至3月)..................275 處長蘇孔志.................. 229 (三)監察院辦理公職人員違反利益衝突迴 處長張凱傑.................. 232 避罰鍰處分確定名單(108年1月至3月) 花蓮縣政府 ................................................277 副縣長   張垂龍.................. 235 處長陳志強.................. 242 處長朱耀光.................. 246 三、訴願決定書    金門縣政府 (一)院台訴字第1083250002號......278 縣長    楊鎮浯.................. 251 (二)院台訴字第1083250003號......287 ★更正申報★ (三)院台訴字第1083250004號......292   (四)院台訴字第1083250005號......295  (五)院台訴字第1083250006號......301  (六)院台訴字第1083250007號......307  (七)院台訴字第1083250008號......310  (八)院台訴字第1083250009號......313  (九)院台訴字第1083250010號......317  (十)院台訴字第1083250011號......328                               監察院公報 ............. 廉 政 專 刊 第 150 期 1 公 職 人 員 財 產 申 報 表 申報人姓名";

    stringlist.split("    ").forEach((data) => {
        data.split(" ").forEach((data1, index) => {
            // console.log('wwwwww:', data1);
            if (data1.indexOf(".") > 0) {
                // console.log('data1:',data1.split("."))
                let name = data1.split(".").join("").replace(/\d+/g, '')
                if (name.length < 8) {
                    // is people can find page

                    let te = data1.split(".").join("");
                    // console.log("te:",te);
                    let num_g = te.match(/\d+/);
                    // console.log("num_g[0])",num_g);
                    if (num_g) {
                        // console.log(num_g[0]);
                        peopleList.push({
                            name: name,
                            startpage: Number(num_g[0]) + countTabPage - 1
                        })
                    } else {
                        // same row not find pagenumber just find next
                        peopleList.push({
                            name: name,
                            startpage: Number(data.split(" ")[index + 1]) + countTabPage - 1
                        })
                    }
                }
                // sort by page
                peopleList.sort((a, b) => {
                    return a.startpage - b.startpage
                })
                peopleList.forEach((data, index) => {
                    if (index < peopleList.length - 1) {
                        if (peopleList[index + 1].startpage) {
                            data.endpage = peopleList[index + 1].startpage - 1;
                        }
                    }



                })
                //    peopleList.push(data1.split(".").join("").replace(/\d+/g,''))
            }
        });
    });
    peopleList.every((data) => {
        console.log(data)
        return true
    })

}
app.get('/', function (req, res) {
    res.send('Hello World!');

    // var detailData="監察院公報 ............. 廉 政 專 刊 第 150 期 1 公 職 人 員 財 產 申 報 表 申報人姓名 賴清德 服務機關 1.行政院 職稱 1.院長 2.  2.  申  報  日 108年01月14日 申報類別 卸(離)職申報 配  偶  及  未 成  年  子 女 配  偶  及  未 成  年  子 女 稱   謂 姓   名 稱   謂 姓   名 配偶 吳玫如     （二）不動 產 1.土地 土地坐落 面積(平方公尺) 權 利 範 圍(持分) 所 有 權 人 登記(取得)時間 登記(取得)原因 取  得  價  額 臺南市中西區鹽埕段 318 3180分之320  賴清德 81年07月23日 購買  2,180,000     土             地          變             動             情             形 土地坐落 面積(平方公尺) 權 利 範 圍(持分) 所 有 權 人 變動時間 變動原因 變動時之價額 本欄空白             2.建物（房屋及停車位） 建物標示 面積(平方公尺) 權 利 範 圍(持分) 所 有 權 人 登記(取得)時間 登記(取得)原因 取  得  價  額 臺南市中西區鹽埕段  107.36 全部  賴清德 81年07月23日 購買 3,420,000     建             物          變             動 情             形 建物標示 面積(平方公尺) 權 利 範 圍(持分) 所 有 權 人 變動時間 變動原因 變動時之價額 本欄空白             （三）船舶 種類 總噸數 船  籍  港 所有人 登記(取得)時間 登記(取得)原因 取  得  價  額 本欄空白       （四）汽車（含大型重型機器腳踏車） 廠牌型號 汽缸容量 所有人 登記(取得)時間 登記(取得)原因 取  得  價  額 TOYOTA CAMRY 1,998 賴清德 95年12月 購買 750,000 （五）航空器 監察院公報 ............. 廉 政 專 刊 第 150 期 2 型式 製造廠名稱 國 籍 標 示及  編  號 所有人 登記(取得)時間 登記(取得)原因 取  得  價  額 本欄空白             （六）現金（指新臺幣、外幣之現金或旅行支票）（總金額：新臺幣     元） 幣別 所有人 外    幣    總    額 新臺幣總額或折合新臺幣總額 本欄空白       （七）存款（指新臺幣、外幣之存款）（總金額：新臺幣23,589,695元） 存放機構 (應 敘 明 分 支 機 構) 種類 幣別 所   有   人 外   幣   總   額 新 臺 幣 總 額 或 折 合 新   臺   幣   總   額 兆豐金國際商業銀行台南分行 活期存款 新臺幣 賴清德  6,600 華南商業銀行台南分行 活期存款 新臺幣 賴清德  4,100 臺灣銀行永康分行 活期存款 新臺幣 賴清德  66,930 臺灣銀行南都分行 活期存款 新臺幣 賴清德  4,077 中華郵政股份有限公司 活期存款 新臺幣 賴清德  581 中華郵政股份有限公司 活期存款 新臺幣 吳玫如  68,124 中華郵政股份有限公司 活期存款 新臺幣 賴清德  3,222,989 臺灣中小企業銀行台南分行 活期存款 新臺幣 吳玫如  599,697 臺灣中小企業銀行台南分行 活期存款 美元 吳玫如 1,433.28 44,184 臺灣中小企業銀行台南分行  活期存款 日圓 吳玫如 11,376,675 3,242,512 中國信託商業銀行西台南分行 活期存款 美元 賴清德 93.68 2,888 中國信託商業銀行西台南分行 活期存款 新臺幣 吳玫如  446 中國信託商業銀行西台南分行 活期存款 美元 吳玫如 26.17 807 中國信託商業銀行西台南分行 定期存款 美元 吳玫如 529,597.01 16,325,760 （八）有價證券（總價額 ：新臺幣     元） 1.股票（總價額：新臺幣     元） 名稱 所有人 股數 票面價額 外幣幣別 新臺幣總額或折合新臺幣總額 本欄空白           2.債券（總價額：新臺幣     元） 監察院公報 ............. 廉 政 專 刊 第 150 期 3 名稱 代碼 所  有  人 買賣機構 單    位    數 票  面  價  額 外 幣 幣 別 新臺幣總額或折合新臺幣總額 本欄空白               3.基金受益憑證 （總價額：新臺幣   元） 名稱 所   有   人 受 託 投 資 機 構 單   位   數 票面價額 （單位淨值） 外 幣 幣 別 新臺幣總額或折合新臺幣總額 本欄空白             4.其他有價證券（總價額：新臺幣     元） 名稱 所有人 單    位    數 價額 外 幣 幣 別 新臺幣總額或折合新臺幣總額  本欄空白           （九）珠寶、古董、字畫及其他具有相當價值之財產 1.珠寶、古董、字畫及其他具有相當價值之財產（總價額：新臺幣     元） 財產種類 項/件 所有 人 價額 本欄空白    2.保險 保險公司 保險名稱 要保人 備註 南山人壽 南山人壽新年年春還本終身保險 吳玫如  南山人壽 南山人壽新年年春還本終身保險 吳玫如  南山 人壽 南山人壽增鑫利外幣增額終身壽險 吳玫如  中國人壽 中國人壽保險富足一生終生壽險 吳玫如  （十）債權（總金額：新臺幣   元） 種類 債權人 債務人及地址 餘額 取得(發生)時間 取得(發生)原因 本欄空白           （十一）債務（總金額：新臺幣     元） 種類 債務人 債權人及地址 餘額 取得(發生)時間 取得(發生)原因 本欄空 白      （十二）事業投資（總金額：新臺幣      元） 投資人 投   資   事   業   名   稱 投   資  事  業  地   址 投 資 金 額 取得(發生)時間 取得(發生)原因  本欄空白          監察院公報 ............. 廉 政 專 刊 第 150 期 4 （十三）備 註 本欄空白 ▓本人、配偶及未成年子女名下之財產，非屬公職人員財產申報法第７條 規定者，應辦理財產強制信託之範圍，特此聲明。  此 致                      監 察 院 以上資料，本人係依法誠實申報，如有不實，願負法律責任                  申報人：賴清德";

    // sortTypeOne()
    processPDF();


});


app.listen(4444, function () {
    // processPDF();
    // outputJsonFile();
    processPDFnew();
    console.log('Example app listening on port 4444!');
});
