import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#bff0fd'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    // description: {
    //     width: '85%',
    //     textAlign: 'right',
    //     borderRightColor: borderColor,
    //     borderRightWidth: 1,
    //     paddingRight: 8,
    // },
    set: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
    subuh: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
    zohor: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
    asar: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
    maghrib: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
    isyak: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const InvoiceTableFooter = ({items}) => {
    // const total = items.map(item => item.qty * item.rate)
    //     .reduce((accumulator, currentValue) => accumulator + currentValue , 0)
    return(    
        <View style={styles.row}>
            <Text style={styles.set}>{' '}</Text>
            <Text style={styles.subuh}>{' '}</Text>
            <Text style={styles.zohor}>{' '}</Text>
            <Text style={styles.asar}>{' '}</Text>
            <Text style={styles.maghrib}>{' '}</Text>
            <Text style={styles.isyak}>{' '}</Text>
            {/* <Text style={styles.description}>TOTAL</Text> */}
            {/* <Text style={styles.total}>{ Number.parseFloat(total).toFixed(2)}</Text> */}
        </View>
    )
};
  
  export default InvoiceTableFooter