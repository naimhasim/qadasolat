import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        flexDirection: 'column',
        marginTop: 24,
        gap: 0,
        justifyContent: 'flex-start'
    },
    reportTitle:{
        color: '#61dafb',
        letterSpacing: 4,
        fontSize: 25,
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    generatedBy:{
        marginTop: 0,
        paddingTop: 0,
        color: 'black',
        textAlign: 'left',
        fontSize: 7,
    }
  });


  const InvoiceTitle = ({title}) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
        <Text style={styles.generatedBy}>Generated by Qadasolat</Text>
    </View>
  );
  
  export default InvoiceTitle