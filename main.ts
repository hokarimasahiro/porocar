function デモ () {
    anaL = pins.analogReadPin(AnalogPin.P1)
    anaR = pins.analogReadPin(AnalogPin.P2)
    porocar.plotBarGraph(anaL / 4, anaR / 4)
    if (anaL < whiteLebel && anaR < whiteLebel) {
    	
    } else if (anaL < whiteLebel && anaR > blackLebel) {
        left = demospeed
        right = 0
    } else if (anaL > blackLebel && anaR < whiteLebel) {
        left = 0
        right = demospeed
    } else {
        left = demospeed - (anaL - anaR) * stearing
        right = demospeed - (anaR - anaL) * stearing
    }
    if (porocar.getDistance() < 5) {
        porocar.carCtrl(0, 0)
    } else {
        porocar.carCtrl(left, right)
    }
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        porocar.setNeoColor(porocar.colors(RGBColors.Red))
    } else if (receivedNumber == 2) {
        porocar.setNeoColor(porocar.colors(RGBColors.Green))
    } else if (receivedNumber == 3) {
        porocar.setNeoColor(porocar.colors(RGBColors.Blue))
    } else if (receivedNumber == 4) {
        porocar.setNeoColor(porocar.colors(RGBColors.Yellow))
    } else if (receivedNumber == 5) {
        デモNO = 1
    } else if (receivedNumber == 6) {
        デモNO = 0
    } else {
        porocar.setNeoColor(porocar.colors(RGBColors.Black))
    }
})
input.onButtonPressed(Button.A, function () {
    デモNO = 1
    radioGroup = 99
})
radio.onReceivedString(function (receivedString) {
    saveString = receivedString
})
input.onButtonPressed(Button.B, function () {
    デモNO = 0
    radioGroup = 99
})
let y = 0
let x = 0
let right = 0
let left = 0
let anaR = 0
let anaL = 0
let blackLebel = 0
let whiteLebel = 0
let stearing = 0
let demospeed = 0
let デモNO = 0
let saveString = ""
let radioGroup = 0
porocar.setNeoBrightness(50)
porocar.setNeoColor(porocar.colors(RGBColors.Black))
basic.showIcon(IconNames.Heart)
getradiogroup.initRadioGroup()
while (radioGroup == 0) {
    radioGroup = getradiogroup.getRadioGroup(saveString)
}
watchfont.showNumber2(radioGroup)
basic.pause(1000)
saveString = ""
radio.setTransmitPower(7)
デモNO = 0
demospeed = 120
stearing = 0.15
whiteLebel = 100
blackLebel = 500
basic.forever(function () {
    if (saveString != "") {
        x = parseFloat(saveString.split(",")[1])
        y = parseFloat(saveString.split(",")[2])
        if (Math.abs(y) > 100) {
            if (Math.abs(x) < 100) {
                left = y / 2
                right = y / 2
            } else {
                left = y / 2 + x / 2
                right = y / 2 - x / 2
            }
            porocar.carCtrl(left, right)
        } else if (Math.abs(x) > 100) {
            left = x / 2
            right = x / -2
            porocar.carCtrl(left, right)
        } else if (デモNO == 0) {
            left = 0
            right = 0
            porocar.carCtrl(left, right)
        }
    }
    if (デモNO != 0) {
        デモ()
    } else {
        porocar.plotBarGraph(left, right)
    }
})
