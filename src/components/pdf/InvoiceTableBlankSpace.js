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
        // color: 'white'
    },
    set: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingLeft: 8,
        // color: 'white'
    },
    subuh: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingLeft: 8,
        // color: 'white'
    },
    zohor: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingLeft: 8,
        // color: 'white'
    },
    asar: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingLeft: 8,
        // color: 'white'
    },
    maghrib: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingLeft: 8,
        // color: 'white'
    },
    isyak: {
        width: 100/6 + '%',
        borderRightColor: borderColor,
        // borderRightWidth: 1,
        textAlign: 'center',
        paddingLeft: 8,
        // color: 'white'
    },
   
  });

const blank = [
    {
        "set": 1,
        "subuh": false ? 'X' : `${' '}`,
        "zohor": true ? 'X' : `${' '}`,
        "asar": true ? 'X' : `${' '}`,
        "maghrib": false ? 'X' : `${' '}`,
        "isyak": false ? 'X' : `${' '}`,
    }
]
const InvoiceTableBlankSpace = ({rowsCount}) => {
    const blankRows = Array(rowsCount).fill(0)
    const rows = blankRows.map( (x, i) => 
        <View style={styles.row} key={`BR${i}`}>
            <Text style={styles.set}>{blank.set}</Text>
            <Text style={styles.qty}>{blank.subuh}</Text>
            <Text style={styles.rate}>{blank.subuh}</Text>
            <Text style={styles.amount}>{blank.subuh}</Text>
            <Text style={styles.set}>{blank.subuh}</Text>
            <Text style={styles.subuh}>{blank.subuh}</Text>
            <Text style={styles.zohor}>{blank.subuh}</Text>
            <Text style={styles.asar}>{blank.subuh}</Text>
            <Text style={styles.maghrib}>{blank.subuh}</Text>
            <Text style={styles.isyak}>{blank.subuh}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableBlankSpace

