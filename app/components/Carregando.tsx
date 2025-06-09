import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";

type CarregandoProps = {
  borda?: number;
};

export default function Carregando({ borda = 0 }: CarregandoProps) {
  return (
    <Modal transparent={true}>
      <View style={[styles.overlay, { borderRadius: borda }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});