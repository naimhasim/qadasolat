import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  reportTitle: {
    fontSize: 8,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

const InvoiceThankYouMsg = () => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>Place a TICK / or CROSS X once the Qadha for that particular Salah has been prayed.</Text>
  </View>
);

export default InvoiceThankYouMsg;
