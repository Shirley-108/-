#define TdsSensorPin A1
#define VREF 5.0      // analog reference voltage(Volt) of the ADC
#define SCOUNT  30           // sum of sample point
#include<Servo.h>
Servo myservo; // 建立Servo物件，控制伺服馬達
int analogBuffer[SCOUNT];    // store the analog value in the array, read from ADC
int analogBufferTemp[SCOUNT];
int analogBufferIndex = 0,copyIndex = 0;
float averageVoltage = 0,tdsValue = 0,temperature = 25;
int receive_pin = 8;
//int control_pin = 9;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  //Serial.begin(115200);
  pinMode(TdsSensorPin,INPUT);
  pinMode(receive_pin,INPUT);
//  pinMode(control_pin,OUTPUT);
//  digitalWrite(control_pin,LOW);
  myservo.attach(9, 500, 2400); // 修正脈衝寬度範圍
  myservo.write(90); // 一開始先置中90度
  delay(3000);
}
int light ;
void loop() {
  // put your main code here, to run repeatedly:
  //光感
  light = analogRead(A0);
//  Serial.println(light);

  //水濁度
  int sensorValue = analogRead(A2);// read the input on analog pin 0:
  float voltage = sensorValue * (5.0 / 1024.0); // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
//  Serial.println(voltage); // print out the value you read:
  delay(100);

  //水位
  int water = analogRead(A3);

  delay(100);

  
  //TDS、水質硬度
  static unsigned long analogSampleTimepoint = millis();
   if(millis()-analogSampleTimepoint > 40U)     //every 40 milliseconds,read the analog value from the ADC
   {
     analogSampleTimepoint = millis();
     analogBuffer[analogBufferIndex] = analogRead(TdsSensorPin);    //read the analog value and store into the buffer
     analogBufferIndex++;
     if(analogBufferIndex == SCOUNT) 
         analogBufferIndex = 0;
   }   
   static unsigned long printTimepoint = millis();
   if(millis()-printTimepoint > 800U)
   {
      printTimepoint = millis();
      for(copyIndex=0;copyIndex<SCOUNT;copyIndex++)
        analogBufferTemp[copyIndex]= analogBuffer[copyIndex];
      averageVoltage = getMedianNum(analogBufferTemp,SCOUNT) * (float)VREF / 1024.0; // read the analog value more stable by the median filtering algorithm, and convert to voltage value
      float compensationCoefficient=1.0+0.02*(temperature-25.0);    //temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0));
      float compensationVolatge=averageVoltage/compensationCoefficient;  //temperature compensation
      tdsValue=(133.42*compensationVolatge*compensationVolatge*compensationVolatge - 255.86*compensationVolatge*compensationVolatge + 857.39*compensationVolatge)*0.5; //convert voltage value to tds value
      //Serial.print("voltage:");
      //Serial.print(averageVoltage,2);
      //Serial.print("V   ");
      /*Serial.print("TDS Value:");
      Serial.print(tdsValue,0);
      Serial.println("ppm");*/
      //馬達
      if (digitalRead(receive_pin) == 1){
         for(int i = 500; i <= 2400; i+=100){
          myservo.writeMicroseconds(i); // 直接以脈衝寬度控制
          delay(300);
        }
      }
      
      Serial.print(light);
      Serial.print(",");
      Serial.print(water);
      Serial.print(",");
      Serial.print(tdsValue);
      Serial.print(",");
      Serial.println(voltage);
   }
//   if (millis() - past > interval) {
//    httpSend();   // 每隔5秒發送一次JSON資料
//  }
}
//String jsonStr = "{\"light\":light,\"water\":water,\"TDS\":tdsValue,\"Dirty\":voltage}";
//void httpSend() {
//  Client.stop();
// 
//  // 連線到指定伺服器的5438埠號
//  if (Client.connect(192.168.43.74,3000)) {
//    Serial.println("connected");
//　　　// 開始傳送JSON資料
//    Client.println(jsonStr.length());
//    Client.print(jsonStr);
//    past = millis();
//  } else {
//    Serial.println("connection failed");
//  }
//}

int getMedianNum(int bArray[], int iFilterLen) 
{
      int bTab[iFilterLen];
      for (byte i = 0; i<iFilterLen; i++)
    bTab[i] = bArray[i];
      int i, j, bTemp;
      for (j = 0; j < iFilterLen - 1; j++) 
      {
    for (i = 0; i < iFilterLen - j - 1; i++) 
          {
      if (bTab[i] > bTab[i + 1]) 
            {
    bTemp = bTab[i];
          bTab[i] = bTab[i + 1];
    bTab[i + 1] = bTemp;
       }
    }
      }
      if ((iFilterLen & 1) > 0)
  bTemp = bTab[(iFilterLen - 1) / 2];
      else
  bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
      return bTemp;
}
