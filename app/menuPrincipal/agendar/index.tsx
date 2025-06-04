import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import MenuInferior from "../../components/MenuInferior";
import BotaoLogout from "../../components/BotaoLogout";
import { useAuth } from "../../../context/auth";
import { agendarAula } from "../../../services/apiAgendar";
import Carregando from "../../components/Carregando";
import { Picker } from "@react-native-picker/picker";

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};

LocaleConfig.defaultLocale = "pt-br";

export default function SchedulingScreen() {
  const { usuario } = useAuth();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Gera os horários automaticamente (06:00 até 17:00, intervalos de 1 hora)
  const generateTimes = () => {
    let times = [];
    for (let hour = 6; hour <= 17; hour++) {
      times.push(`${String(hour).padStart(2, "0")}:00`);
    }
    return times;
  };

  const times = generateTimes();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainContent}>
        <Image
          source={require("../../../assets/fundoAgendar.png")}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <BotaoLogout />
        {/* Título */}
        <Text style={styles.title}>Escolha data e horário</Text>

        {/* Calendário */}
        <View style={{ paddingHorizontal: 20 }}>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#33A89E" },
            }}
            theme={{
              todayTextColor: "#33A89E",
              arrowColor: "#33A89E",
            }}
          />
        </View>

        {/* Seleção de Horário com Scroll */}
        <Text style={[styles.title, { fontSize: 20, marginVertical: 5 }]}>
          Horário:
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTime}
            onValueChange={(itemValue) => setSelectedTime(itemValue)}
            style={[
              styles.picker,
              { outline: "none" } as any,
              !selectedDate && { color: "#999" }, // cor cinza quando desabilitado
            ]}
            mode="dropdown"
            dropdownIconColor="#33A89E"
            enabled={!!selectedDate} // habilita só se selectedDate existir
          >
            <Picker.Item label="Selecione um horário" value="" />
            {times.map((time) => (
              <Picker.Item key={time} label={time} value={time} />
            ))}
          </Picker>
        </View>

        {/* Botão Agendar */}
        <TouchableOpacity
          style={styles.agendarButton}
          onPress={async () => {
            setCarregando(true);
            try {
              if (selectedDate == "" || selectedTime == "") {
                alert(`Escolha uma data e um horário.`);
              } else {
                const [year, month, day] = selectedDate.split("-").map(Number);
                const [hour, minute] = selectedTime.split(":").map(Number);

                const data = new Date(year, month - 1, day, hour, minute);
                await agendarAula(usuario.login, data);
                alert(
                  `Agendado para ${data.toLocaleDateString()} às ${selectedTime}`
                );
              }
            } catch (erro: any) {
              console.log(erro.message);
            } finally {
              setCarregando(false);
            }
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Agendar</Text>
        </TouchableOpacity>
      </View>
      <MenuInferior />
      {carregando && <Carregando />}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: "center",
    flex: 7,
  },
  backgroundImage: {
    flex: 8,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 40,
    margin: 20,
    alignSelf: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  agendarButton: {
    backgroundColor: "#319594",
    paddingVertical: 12,
    borderRadius: 100,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    elevation: 10,
  },
  pickerContainer: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#aaa",
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#333",
    backgroundColor: "white",
    padding: 10,
    borderWidth: 0,
    borderRadius: 10,
  },
});
