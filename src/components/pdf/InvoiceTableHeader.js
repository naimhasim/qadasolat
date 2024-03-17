import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#bff0fd'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    set: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    subuh: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    zohor: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    asar: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    maghrib: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    isyak: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        // borderRightWidth: 1,
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.set}>Set</Text>
        <Text style={styles.subuh}>Subuh</Text>
        <Text style={styles.zohor}>Zohor</Text>
        <Text style={styles.asar}>Asar</Text>
        <Text style={styles.maghrib}>Maghrib</Text>
        <Text style={styles.isyak}>Isyak</Text>
    </View>
  );
  
  export default InvoiceTableHeader