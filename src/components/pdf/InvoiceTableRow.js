import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#bff0fd'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    set: {
        width: 100/6 + '%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    subuh: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    zohor: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    asar: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    maghrib: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    isyak: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        // borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
  });


const InvoiceTableRow = ({items}) => {
    const rows = items.map( item => 
        <View style={styles.row} key={item.set.toString()}>
            <Text style={styles.set}>{item.set}</Text>
            <Text style={styles.subuh}>{item.subuh ? 'X' : `${' '}` }</Text>
            <Text style={styles.zohor}>{item.zohor ? 'X' : `${' '}` }</Text>
            <Text style={styles.asar}>{item.asar ? 'X' : `${' '}` }</Text>
            <Text style={styles.maghrib}>{item.maghrib ? 'X' : `${' '}` }</Text>
            <Text style={styles.isyak}>{item.isyak ? 'X' : `${' '}` }</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow