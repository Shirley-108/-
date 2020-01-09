#import request
import json
import serial
ser = serial.Serial("/dev/ttyACM0",9600)
count = 0
while True:
	if count == 5:
		break
	try:
		#with open("jsonStr","r",decode = "utf8") as g
		#	result_data = json.load(g)
		data_row = ser.readline()
		#print(data_row)
		data = data_row.decode()
		val = str(data).split("\r\n")[0].split(",")
		#print(val[4])
		dict = {
			"light" : float(val[0]),
			"water" : float(val[1]),
			"tdsValue" : float(val[2]),
			"voltage" : float(val[3])
		}
		check = False
		with open("/home/pi/test/view/web/sensor.json","w") as f:
			json.dump(dict,f)
			check = True
		#print(dict)
		#response = request.post(objs)
		if check:
			print("Successfully!")
			print(dict)
			#break
	except:
		count += 1
