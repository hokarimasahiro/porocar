function デモ () {
    if (porocar.getLineColor(Position.Left, lineColor.White) && porocar.getLineColor(Position.Right, lineColor.White)) {
    	
    } else if (porocar.getLineColor(Position.Left, lineColor.White) && porocar.getLineColor(Position.Right, lineColor.Black)) {
        porocar.carCtrl(200, 0)
    } else if (porocar.getLineColor(Position.Left, lineColor.Black) && porocar.getLineColor(Position.Right, lineColor.White)) {
        porocar.carCtrl(0, 200)
    } else if (porocar.getLineColor(Position.Left, lineColor.Black) && porocar.getLineColor(Position.Right, lineColor.Black)) {
        porocar.carCtrl(200, 200)
    }
    porocar.plotBarGraph(pins.analogReadPin(AnalogPin.P1) / 4, pins.analogReadPin(AnalogPin.P2) / 4)
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