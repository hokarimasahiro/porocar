function デモ () {
    anaL = pins.analogReadPin(AnalogPin.P1) / 4
    anaR = pins.analogReadPin(AnalogPin.P2) / 4
    porocar.plotBarGraph(anaL, anaR)
    if (anaL < 10 && anaR < 10) {
    	
    } else {
        porocar.carCtrl(100 - (anaL - anaR), 100 - (anaR - anaL))
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
radio.onReceivedString(function (receivedString) {
    saveString = receivedString
})
let right = 0
let left = 0
let y = 0
let x = 0
let anaR = 0
let anaL = 0
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
