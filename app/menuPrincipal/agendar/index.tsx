import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import MenuInferior from "../../components/MenuInferior";
import BotaoLogout from "../../components/BotaoLogout";
import { useAuth } from "../../../context/auth";
import { agendarAula } from "../../../services/apiAgendar";
import formataData from "../../utils/formataData";
import Carregando from "../../components/Carregando";

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

  // Divide os horários em grupos de 4
  const chunkTimes = (arr, size) => {
    return arr.reduce(
      (acc, _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc),
      []
    );
  };

  const groupedTimes = chunkTimes(times, 4);

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

        <Text
          style={{
            alignSelf: "center",
            justifyContent: "center",
            fontSize: 20,
            color: "white",
            textShadowColor: "black",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 10,
            marginBottom: -5,
            fontWeight: "bold",
          }}
        >
          Horários:
        </Text>

        {/* Seleção de Horário com Scroll */}
        <ScrollView style={styles.scrollContainer}>
          {groupedTimes.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={[
                styles.timeRow,
                row.length < 4 && { justifyContent: "center" },
              ]}
            >
              {row.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeTouchable,
                    selectedTime === time && { backgroundColor: "#33A89E" },
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={[
                      styles.timeText,
                      selectedTime === time && { color: "white" },
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>

        {/* Botão Agendar */}
        <TouchableOpacity
          style={styles.agendarButton}
          onPress={async () => {
            setCarregando(true);
            try {
              if (selectedDate == "" || selectedTime == "") {
                alert(`Escolha uma data e um horário.`);
              } else {
                // console.log(usuario.login);
                // console.log(selectedDate);
                // console.log(selectedTime);
                const [year, month, day] = selectedDate.split("-").map(Number);
                const [hour, minute] = selectedTime.split(":").map(Number);

                const data = new Date(year, month - 1, day, hour, minute);
                await agendarAula(usuario.login, data);
                alert(
                  `Agendado para ${formataData(
                    data.toISOString()
                  )} às ${selectedTime}`
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
};

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
  scrollContainer: {
    maxHeight: 170, // Limita altura do scroll para não afetar layout
    marginTop: 10,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 10,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  timeButton: {
    marginHorizontal: 5,
    borderRadius: 20,
    width: "22%", // Garante que 4 botões cabem na mesma linha,
    backgroundColor: "white",
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
  timeTouchable: {
    marginHorizontal: 5,
    borderRadius: 20,
    width: "22%",
    backgroundColor: "white",
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  timeText: {
    fontSize: 18,
    color: "#333",
  },
});
