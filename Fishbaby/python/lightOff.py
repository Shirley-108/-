import RPi.GPIO as GPIO
import time
pin = 21 

GPIO.setmode(GPIO.BCM) 
GPIO.setwarnings(False)
GPIO.setup(pin, GPIO.OUT)

#GPIO.output(pin, GPIO.HIGH)
#time.sleep(10)
GPIO.output(pin, GPIO.LOW)
#time.sleep(5)

#GPIO.cleanup()
