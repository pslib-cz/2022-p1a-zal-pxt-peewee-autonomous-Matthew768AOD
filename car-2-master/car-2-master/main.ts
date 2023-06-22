basic.showNumber(7)
radio.setGroup(4)
radio.setFrequencyBand(7)
let whiteLine = 0
let bA = false
let bB = false
let bAB = false
let stop = false
let move = false
let moveleft = false
let moveright = false
const pinC = DigitalPin.P15
const pinL = DigitalPin.P14
const pinR = DigitalPin.P13
function carMotor(ul: number = 0, ur: number = 0, ll: number = 0, lr: number = 0) {
    ul = Math.map(ll, -100, 100, -255, 255)
    ur = Math.map(lr, -100, 100, -215, 215)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -ul)
    PCAmotor.MotorRun(PCAmotor.Motors.M1, ur)
}
// c === && r === && l ===
pins.setPull(pinC, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)
// true == on black line
// false == not on black line
radio.onReceivedValue(function (name: string, value: number) {
    if (name == "bA") {
        bA = (value == 1)
        move = (value == 1)
        moveleft = (value == 1)
    } else if (name == "bAB") {
        bAB = (value == 1)
        move = (value == 1)
        moveleft = (value == 1)
    } else if (name == "stop") {
        stop = (value == 1)
        move = (value == 1)
        moveleft = (value == 1)
    } else if (name == "bB") {
        bB = (value == 1)
        move = (value == 1)
        moveright = (value == 1)
    }
})
basic.forever(function () {
    let c = (whiteLine ^ pins.digitalReadPin(pinC)) == 0 ? false : true
    let l = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true
    let r = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true
    if (move == true) {
        if (moveleft == true) {
            if (bA == true) {
                carMotor(0, 0, 99, 0)
            } else {
                carMotor(0, 0, 0, 0)
            }
            if (bAB == true) {
                carMotor(0, 0, 99, 0)
            } else {
                carMotor(0, 0, 0, 0)
            }
            if (stop == true) {
                carMotor(0, 0, 99, 0)
            } else {
                carMotor(0, 0, 0, 0)
            }
        }
        if (moveright == true) {
            if (bB == true) {
                carMotor(0, 0, 0, 99)
            } else {
                carMotor(0, 0, 0, 0)
            }
        }
    } else if (!(l) && !(r)) {
        if (c) {
            carMotor(0, 0, 50, 50)
        }
    } else if (c && l && r) {
        //basic.showArrow(ArrowNames.North)
        carMotor(0, 0, 50, 50)
    } else if (c && r && !(l) || !(c) && !(l) && r) {
        //basic.showArrow(ArrowNames.East)
        carMotor(0, 0, 0, 50)
    } else if (c && l && !(r) || !(c) && !(r) && l) {
        //basic.showArrow(ArrowNames.West)
        carMotor(0, 0, 50, 0)
    } else if (!(c) && !(l) && !(r)) {
        //basic.showArrow(ArrowNames.South)
        carMotor(0, 0, 0, 0)
    } else {
        //basic.showArrow(ArrowNames.South)
        carMotor(0, 0, 0, 0)
    }
})