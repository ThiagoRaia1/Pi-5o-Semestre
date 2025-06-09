import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../../../context/auth";
import { agendarAula, getHorariosCheios } from "../../../services/apiAgendar";
import { getAulasSeguintes, IAula } from "../../../services/apiAulas";
import MenuInferior from "../../components/MenuInferior";
import BotaoLogout from "../../components/BotaoLogout";
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
  const [erro, setErro] = useState("");
  const [mostrarErro, setMostrarErro] = useState(false);

  let times = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const [horariosDisponiveis, setHorariosDisponiveis] =
    useState<string[]>(times);

  return (
    <>
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
              onDayPress={async (day) => {
                const selected = day.dateString;
                const dataSelecionada = new Date(selected);
                const hoje = new Date();

                if (dataSelecionada < hoje) {
                  alert("Agendamentos devem ser feitos um dia antes da data.");
                  setSelectedDate("");
                  return;
                }

                setMostrarErro(false);
                setSelectedDate(selected);
                setCarregando(true);

                try {
                  // Buscar todas as aulas futuras do aluno
                  const aulasSeguintes: IAula[] = await getAulasSeguintes(
                    usuario.login
                  );

                  // Filtra as aulas do aluno para a data selecionada
                  const aulasDoAlunoNaData = aulasSeguintes.filter((aula) => {
                    const dataAula = new Date(aula.data)
                      .toISOString()
                      .split("T")[0];
                    return dataAula === selected;
                  });

                  // Horários ocupados pelo aluno no dia
                  const horariosOcupadosAluno = aulasDoAlunoNaData.map((aula) =>
                    new Date(aula.data).toTimeString().slice(0, 5)
                  );

                  // Buscar horários cheios no backend
                  const horariosCheios = await getHorariosCheios(selected); // já deve retornar ["07:00", "10:00", etc]

                  // Unir horários ocupados e horários cheios
                  const horariosIndisponiveis = [
                    ...new Set([...horariosOcupadosAluno, ...horariosCheios]),
                  ];

                  // Filtrar horários disponíveis
                  const horariosLivres = times.filter(
                    (horario) => !horariosIndisponiveis.includes(horario)
                  );

                  setHorariosDisponiveis(horariosLivres);
                } catch (erro: any) {
                  console.error("Erro ao buscar horários:", erro.message);
                } finally {
                  setCarregando(false);
                }
              }}
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
              {horariosDisponiveis.map((time) => (
                <Picker.Item key={time} label={time} value={time} />
              ))}
            </Picker>
          </View>

          {/* Botão Agendar */}
          <TouchableOpacity
            style={styles.agendarButton}
            onPress={async () => {
              setCarregando(true);
              setMostrarErro(false);
              try {
                if (selectedDate == "" || selectedTime == "") {
                  alert(`Escolha uma data e um horário.`);
                } else {
                  const [year, month, day] = selectedDate
                    .split("-")
                    .map(Number);
                  const [hour, minute] = selectedTime.split(":").map(Number);

                  const data = new Date(year, month - 1, day, hour, minute);
                  await agendarAula(usuario.login, data);
                  alert(
                    `Agendado para ${data.toLocaleDateString()} às ${selectedTime}`
                  );
                }
              } catch (error: any) {
                setErro(error.message);
                console.log("erro: ", erro);
                setMostrarErro(true);
              } finally {
                setCarregando(false);
              }
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Agendar</Text>
          </TouchableOpacity>

          {mostrarErro && <Text style={styles.errorText}>{erro}</Text>}
        </View>
        <MenuInferior />
      </View>
      {carregando && <Carregando />}
    </>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: "center",
    flex: 1,
  },
  backgroundImage: {
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
    marginTop: 10,
    borderRadius: 20,
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#333",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  errorText: {
    color: "#e53935",
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    fontWeight: 700,
  },
});
