import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle'
import BillTo from './BillTo'
import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import logo from '../../../public/next.svg'

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });

  const Invoice = ({invoiceData}) => {

    if(invoiceData.length === 0){
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                </Page>
            </Document>
        );
    }
    
    return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Image style={styles.logo} src={logo} />
                    <InvoiceTitle title='Qadha Salah Chart'/>
                    {/* <InvoiceNo invoice={invoice}/> */}
                    {/* <BillTo invoice={invoice}/> */}
                    <InvoiceItemsTable invoice={invoiceData} />
                    <InvoiceThankYouMsg />
                </Page>
            </Document>
        )};
  
  export default Invoice