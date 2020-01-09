# 魚寶貝你要給我好好活著
## 動機與目的
資訊科技的進步  
物聯網與雲端技術的崛起  
行動裝置的普及  
透過行動裝置遠端玩養魚一鍵餵魚  
即時觀測與通知，出門在外免掛心  

## 介紹
即時呈現水質狀況，讓使用者判斷是否該換水  
可自動餵魚飼料和開關燈，解決出遠門無法餵魚的困擾  
讓魚寶貝安心成長 <3

## 使用的套件
Node js  
1.Express  
2.body-parser  
3.http  
4.Socket.io  
5.onoff  
6.child_process  
7.time  


## 硬體設備
![image](https://github.com/Shirley-108/Keep-holding-on-my-fish-baby-/blob/master/%E5%9C%96%E7%89%87/%E8%A8%AD%E5%82%99%E6%B8%85%E5%96%AE.png)
## 製作
### Arduino與各種感測器的製作:
1.	準備好水位感測器、TDS水質檢測模組、水濁度感測器、Arduino uno、麵包板、數條杜邦線。
2.	Arduino uno上的5V接到麵包板上的「+極」；GND接到麵包板上的「-」極。
3.	找出這三個感測器上「+」極、「-」極及可接腳位的地方(會標示S或A等)，感測器上+極接到麵包板上的「+」極；「-」極接到麵包板上的「-」極。
4.	三個感測器上可接腳位的地方接到Arduino上的腳位「ANALOG IN」。A1腳位接TDS水質檢測模組、A2腳位接水濁度感測器、A3腳位接水位感測器。

### Arduino與光敏電阻的製作:
1.	準備好一個光敏電阻、一個電阻。
2.	將光敏電阻插在麵包板上，光敏電阻一端接到麵包板上的「+」極；另一端接電阻其中一端，及用杜邦線接到Arduino上的腳位A0。電阻另外一端接到麵包板上的「-」極。
![image](https://github.com/Shirley-108/Keep-holding-on-my-fish-baby-/blob/master/%E5%9C%96%E7%89%87/Arduino%E9%9B%BB%E8%B7%AF%E5%9C%96.png)

### 撰寫Arduino程式:
1.	Download the Arduino IDE
2.	開寫(sketch_dec30a.ino)

### 樹莓派與USB LED燈、沈水過濾器(加水):
1.	繼電器可控制家電產品或其他大電流的電子產品，因此準備兩個繼電器，一個接USB LED燈，一個接沈水過濾器。
2.	兩個繼電器上的「+」極、「-」極接到麵包板上的「+」極、「-」極。
3.	兩個繼電器上的S接到麵包板上，再從麵包板接到樹莓派上的腳位。腳位38接沈水過濾器的繼電器、腳位40接LED燈的繼電器。(請參考電路圖)
4.	繼電器接USB LED燈和沈水過濾器請參考下圖。
 ![image](https://github.com/Shirley-108/Keep-holding-on-my-fish-baby-/blob/master/%E5%9C%96%E7%89%87/%E5%9C%961.png)
### 樹莓派與伺服馬達(灑魚飼料器):
1.	伺服馬達的紅線接麵包板的「+」極、咖啡色的線接「-」極、橘線接Arduino uno的腳位9。
2.	Arduino腳位8接樹莓派腳位18。
![image](https://github.com/Shirley-108/Keep-holding-on-my-fish-baby-/blob/master/%E5%9C%96%E7%89%87/%E6%A8%B9%E8%8E%93%E6%B4%BE%E9%9B%BB%E8%B7%AF%E5%9C%96.png)

## 分工
張育銓、蕭棋文、陳佳境
- 系統實作
- 文件編輯
- 簡報編輯
- 設備採買
- 設備組裝
- 熬夜三天
- Call out
