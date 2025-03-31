import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import MenuInferior from '../../components/menuInferior';

const SchedulingScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Gera os horários automaticamente (06:00 até 18:00, intervalos de 30 min)
  const generateTimes = () => {
    let times = [];
    for (let hour = 6; hour <= 18; hour++) {
      times.push(`${hour}:00`);
      if (hour !== 18) times.push(`${hour}:30`);
    }
    return times;
  };

  const times = generateTimes();

  // Divide os horários em grupos de 4
  const chunkTimes = (arr, size) => {
    return arr.reduce((acc, _, i) => 
      i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc
    , []);
  };

  const groupedTimes = chunkTimes(times, 4);

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Image
          source={require('../../../assets/fundoAgendar.png')}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        
        {/* Título */}
        <Text style={styles.title}>Escolha data e horário</Text>

        {/* Calendário */}
        <View style={{ paddingHorizontal: 20 }}>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#33A89E' }
            }}
            theme={{
              todayTextColor: '#33A89E',
              arrowColor: '#33A89E',
            }}
          />
        </View>

        {/* Seleção de Horário com Scroll */}
        <ScrollView style={styles.scrollContainer}>
            {groupedTimes.map((row, rowIndex) => (
              <View key={rowIndex} style={[
                styles.timeRow, 
                row.length < 4 && styles.justifyRow // Justifica última linha se houver menos de 4 itens
              ]}>
                {row.map((time) => (
                  <Button
                    key={time}
                    mode={selectedTime === time ? 'contained' : 'outlined'}
                    style={[styles.timeButton, selectedTime === time && styles.selectedTime]}
                    onPress={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </View>
            ))}
        </ScrollView>

        {/* Botão Agendar */}
        <Button
          mode="contained"
          style={styles.agendarButton}
          labelStyle={{ color: 'white' }} // Muda a cor do texto
          onPress={() => alert(`Agendado para ${selectedDate} às ${selectedTime}`)}
          disabled={!selectedDate || !selectedTime} // Bloqueia se nada for selecionado
        >
          Agendar
        </Button>
      </View>
      <MenuInferior />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    justifyContent: 'center',
    flex: 7,
  },
  backgroundImage: {
    flex: 8,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    margin: 20,
    alignSelf: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  scrollContainer: {
    maxHeight: 140, // Limita altura do scroll para não afetar layout
    marginTop: 10,
    padding: 17,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  justifyRow: {
    justifyContent: 'center', // Justifica última linha se houver menos de 4 itens
  },
  timeButton: {
    marginHorizontal: 5,
    borderRadius: 10,
    width: '22%', // Garante que 4 botões cabem na mesma linha
  },
  selectedTime: {
    backgroundColor: '#33A89E',
  },
  agendarButton: {
    backgroundColor: '#33A89E',
    borderRadius: 20,
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default SchedulingScreen;
