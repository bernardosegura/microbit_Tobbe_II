bluetooth.onBluetoothConnected(function () {
    TobbieII.vibrate(2)
})
bluetooth.onBluetoothDisconnected(function () {
    TobbieII.shake_head(2)
})
input.onButtonPressed(Button.A, function () {
    show_Ojos = 1
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    RX_Data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (true) {
        // parseFloat(PLOT_DATA[1])
        // parseFloat(PLOT_DATA[1])
        if (RX_Data.substr(0, 3).compare("det") == 0) {
            isWalk = 0
            TobbieII.stopturn()
            TobbieII.stopwalk()
        } else if (RX_Data.substr(0, 3).compare("der") == 0) {
            isWalk = 0
            TobbieII.stopwalk()
            TobbieII.rightward()
        } else if (RX_Data.substr(0, 3).compare("izq") == 0) {
            isWalk = 0
            TobbieII.stopwalk()
            TobbieII.leftward()
        } else if (RX_Data.substr(0, 3).compare("atr") == 0) {
            isWalk = 1
            TobbieII.backward()
            TobbieII.stopturn()
        } else if (RX_Data.substr(0, 3).compare("cam") == 0) {
            isWalk = 1
            TobbieII.forward()
            TobbieII.stopturn()
        } else if (RX_Data.substr(0, 2).compare("h-") == 0 && !(isNaN(parseFloat(RX_Data.replace("h-", ""))))) {
            // PLOT_DATA = RX_Data.split("-")
            // PLOT_DATA[1])
            if (parseFloat(RX_Data.replace("h-", "")) < 12 && parseFloat(RX_Data.replace("h-", "")) > 0) {
                hora = parseFloat(RX_Data.replace("h-", ""))
            }
        } else if (RX_Data.substr(0, 2).compare("m-") == 0 && !(isNaN(parseFloat(RX_Data.replace("m-", ""))))) {
            // PLOT_DATA = RX_Data.split("-")
            if (parseFloat(RX_Data.replace("m-", "")) < 60 && parseFloat(RX_Data.replace("m-", "")) > 0) {
                minutos = parseFloat(RX_Data.replace("m-", ""))
            }
        } else if (RX_Data.substr(0, 2).compare("s-") == 0 && !(isNaN(parseFloat(RX_Data.replace("s-", ""))))) {
            // PLOT_DATA = RX_Data.split("-")
            if (parseFloat(RX_Data.replace("s-", "")) < 60 && parseFloat(RX_Data.replace("s-", "")) > 0) {
                segundos = parseFloat(RX_Data.replace("s-", ""))
            }
        } else if (RX_Data.substr(0, 4).compare("btnA") == 0) {
            show_Ojos = 1
        } else if (RX_Data.substr(0, 4).compare("btnB") == 0) {
            show_Ojos = 0
        }
    }
})
input.onButtonPressed(Button.B, function () {
    show_Ojos = 0
})
let horario = ""
let isWalk = 0
let segundos = 0
let minutos = 0
let hora = 0
let show_Ojos = 0
let RX_Data = ""
// let PLOT_DATA: number[] = []
bluetooth.startUartService()
TobbieII.stopwalk()
TobbieII.stopturn()
RX_Data = ""
show_Ojos = 1
hora = 12
minutos = 0
segundos = 0
isWalk = 0
while (true) {
    let showTxt = 0
    if (showTxt == 0) {
        if (show_Ojos == 1) {
            if (hora > 12) {
                hora = 1
            }
            TobbieII.drawface("C00272727")
            basic.pause(1000)
            segundos += 1
            if (segundos > 59) {
                minutos += 1
            }
            if (minutos > 59) {
                hora += 1
                minutos = 0
            }
            TobbieII.drawface("C00272727")
            basic.pause(900)
            TobbieII.drawface("C00")
            basic.pause(100)
            TobbieII.drawface("C00272727")
            segundos += 1
            if (segundos > 59) {
                minutos += 1
            }
            if (minutos > 59) {
                hora += 1
                minutos = 0
            }
        } else {
            if (hora > 12) {
                hora = 1
            }
            if (minutos > 59) {
                minutos = 0
                hora += 1
            }
            if (segundos > 59) {
                segundos = 0
            }
            horario = "C"
            if (hora < 10) {
                horario = "" + horario + "0" + hora
            } else {
                horario = "" + horario + hora
            }
            if (minutos < 10) {
                horario = "" + horario + "0" + minutos + "00"
            } else {
                if (minutos - 31 > 0) {
                    if (minutos - 31 < 10) {
                        horario = "" + horario + "310" + (minutos - 31)
                    } else {
                        horario = "" + horario + "31" + (minutos - 31)
                    }
                } else {
                    horario = "" + horario + minutos + "00"
                }
            }
            if (segundos < 10) {
                horario = "" + horario + "0" + segundos + "00"
            } else {
                if (segundos - 31 > 0) {
                    if (segundos - 31 < 10) {
                        horario = "" + horario + "310" + (segundos - 31)
                    } else {
                        horario = "" + horario + "31" + (segundos - 31)
                    }
                } else {
                    horario = "" + horario + segundos + "00"
                }
            }
            TobbieII.drawface(horario)
            basic.pause(1000)
            segundos += 1
            if (segundos > 59) {
                minutos += 1
            }
            if (minutos > 59) {
                hora += 1
                minutos = 0
            }
        }
    }
    if (TobbieII.LBlock(300)) {
        if (isWalk != 0) {
            TobbieII.backward()
            TobbieII.leftward()
            TobbieII.leftward()
            TobbieII.leftward()
            TobbieII.stopturn()
        }
    } else {
        if (TobbieII.RBlock(200)) {
            if (isWalk != 0) {
                TobbieII.backward()
                TobbieII.rightward()
                TobbieII.rightward()
                TobbieII.rightward()
                TobbieII.stopturn()
            }
        }
    }
}
