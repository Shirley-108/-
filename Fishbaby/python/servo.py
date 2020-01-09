import RPi.GPIO as GPIO 
import time
pin = 18 
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False) 
GPIO.setup(pin, GPIO.OUT) 
GPIO.output(pin, True) 

