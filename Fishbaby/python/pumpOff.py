import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(20, GPIO.OUT) 
GPIO.output(20, GPIO.LOW)
# GPIO.cleanup()
