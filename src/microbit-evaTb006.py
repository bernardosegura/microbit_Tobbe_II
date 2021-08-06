def on_bluetooth_connected():
    TobbieII.vibrate(2)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    TobbieII.shake_head(2)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def on_button_pressed_a():
    global show_Ojos
    show_Ojos = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_uart_data_received():
    global RX_Data, isWalk, hora, minutos, segundos, show_Ojos
    RX_Data = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
    if True:
        # parseFloat(PLOT_DATA[1])
        # parseFloat(PLOT_DATA[1])
        if RX_Data.substr(0, 3).compare("det") == 0:
            isWalk = 0
            TobbieII.stopturn()
            TobbieII.stopwalk()
        elif RX_Data.substr(0, 3).compare("der") == 0:
            isWalk = 0
            TobbieII.stopwalk()
            TobbieII.rightward()
        elif RX_Data.substr(0, 3).compare("izq") == 0:
            isWalk = 0
            TobbieII.stopwalk()
            TobbieII.leftward()
        elif RX_Data.substr(0, 3).compare("atr") == 0:
            isWalk = 1
            TobbieII.backward()
            TobbieII.stopturn()
        elif RX_Data.substr(0, 3).compare("cam") == 0:
            isWalk = 1
            TobbieII.forward()
            TobbieII.stopturn()
        elif RX_Data.substr(0, 2).compare("h-") == 0 and not (is_na_n(parse_float(RX_Data.replace("h-", "")))):
            # PLOT_DATA = RX_Data.split("-")
            # PLOT_DATA[1])
            if parse_float(RX_Data.replace("h-", "")) < 12 and parse_float(RX_Data.replace("h-", "")) > 0:
                hora = parse_float(RX_Data.replace("h-", ""))
        elif RX_Data.substr(0, 2).compare("m-") == 0 and not (is_na_n(parse_float(RX_Data.replace("m-", "")))):
            # PLOT_DATA = RX_Data.split("-")
            if parse_float(RX_Data.replace("m-", "")) < 60 and parse_float(RX_Data.replace("m-", "")) > 0:
                minutos = parse_float(RX_Data.replace("m-", ""))
        elif RX_Data.substr(0, 2).compare("s-") == 0 and not (is_na_n(parse_float(RX_Data.replace("s-", "")))):
            # PLOT_DATA = RX_Data.split("-")
            if parse_float(RX_Data.replace("s-", "")) < 60 and parse_float(RX_Data.replace("s-", "")) > 0:
                segundos = parse_float(RX_Data.replace("s-", ""))
        elif RX_Data.substr(0, 4).compare("btnA") == 0:
            show_Ojos = 1
        elif RX_Data.substr(0, 4).compare("btnB") == 0:
            show_Ojos = 0
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.NEW_LINE),
    on_uart_data_received)

def on_button_pressed_b():
    global show_Ojos
    show_Ojos = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

horario = ""
isWalk = 0
segundos = 0
minutos = 0
hora = 0
show_Ojos = 0
RX_Data = ""
# let PLOT_DATA: number[] = []
bluetooth.start_uart_service()
TobbieII.stopwalk()
TobbieII.stopturn()
RX_Data = ""
show_Ojos = 1
hora = 12
minutos = 0
segundos = 0
isWalk = 0
while True:
    showTxt = 0
    if showTxt == 0:
        if show_Ojos == 1:
            if hora > 12:
                hora = 1
            TobbieII.drawface("C00272727")
            basic.pause(1000)
            segundos += 1
            if segundos > 59:
                minutos += 1
            if minutos > 59:
                hora += 1
                minutos = 0
            TobbieII.drawface("C00272727")
            basic.pause(900)
            TobbieII.drawface("C00")
            basic.pause(100)
            TobbieII.drawface("C00272727")
            segundos += 1
            if segundos > 59:
                minutos += 1
            if minutos > 59:
                hora += 1
                minutos = 0
        else:
            if hora > 12:
                hora = 1
            if minutos > 59:
                minutos = 0
                hora += 1
            if segundos > 59:
                segundos = 0
            horario = "C"
            if hora < 10:
                horario = "" + horario + "0" + str(hora)
            else:
                horario = "" + horario + str(hora)
            if minutos < 10:
                horario = "" + horario + "0" + str(minutos) + "00"
            else:
                if minutos - 31 > 0:
                    if minutos - 31 < 10:
                        horario = "" + horario + "310" + str((minutos - 31))
                    else:
                        horario = "" + horario + "31" + str((minutos - 31))
                else:
                    horario = "" + horario + str(minutos) + "00"
            if segundos < 10:
                horario = "" + horario + "0" + str(segundos) + "00"
            else:
                if segundos - 31 > 0:
                    if segundos - 31 < 10:
                        horario = "" + horario + "310" + str((segundos - 31))
                    else:
                        horario = "" + horario + "31" + str((segundos - 31))
                else:
                    horario = "" + horario + str(segundos) + "00"
            TobbieII.drawface(horario)
            basic.pause(1000)
            segundos += 1
            if segundos > 59:
                minutos += 1
            if minutos > 59:
                hora += 1
                minutos = 0
    if TobbieII.lblock(300):
        if isWalk != 0:
            TobbieII.backward()
            TobbieII.leftward()
            TobbieII.leftward()
            TobbieII.leftward()
            TobbieII.stopturn()
    else:
        if TobbieII.rblock(200):
            if isWalk != 0:
                TobbieII.backward()
                TobbieII.rightward()
                TobbieII.rightward()
                TobbieII.rightward()
                TobbieII.stopturn()