import React, { Component } from 'react';
import { Dimensions, Alert, StatusBar, AsyncStorage, StyleSheet, Modal, TouchableHighlight, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { Container, Icon, Picker, DatePicker, Header, Content, Form, Item, Input, Label, Button, Text, View, Footer } from 'native-base';
// import firebase from 'firebase'
// import User from './User'
// import MapView from 'react-native-maps';
// import { SafeAreaView } from 'react-navigation';
// const { height } = Dimensions.get('window');
import NumericInput from 'react-native-numeric-input';
import { SafeAreaView } from 'react-navigation';
import NumberFormat from 'react-number-format';
// NumericInput.style.input.color = 'red';

export default class BookingMountain extends Component {

    constructor(props) {
        super(props);
        let date = new Date();

// add a day

        this.state = {
            maxDate: date.setDate(date.getDate() + 30),
            goingDate: new Date(),
            comeBackDate: new Date(),
            countPeople: 1,
            totalPrice:props.navigation.getParam('mountainPrice'),
        };
        this.setGoingDate = this.setGoingDate.bind(this);
        this.setComeBackDate = this.setComeBackDate.bind(this);
    }

    setGoingDate(newDate) {
        this.setState({ goingDate: newDate })
    }

    setComeBackDate(newDate) {
        this.setState({ comeBackDate: newDate })
    }

    onChangeCountPeople = countPeople => {
        this.setState({ countPeople })
        this.setState({ totalPrice: countPeople * this.props.navigation.getParam('mountainPrice') })
    };

    onValueChange(value) {
        this.setState({
            gender: value
        });
    }

    render() {
        // let scrollEnabled = this.state.screenHeight > (height);
        return (
            <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 20, color: 'white', backgroundColor: '#34c759' }}>Atas Nama User</Text>
            <SafeAreaView
                style={{ flex: 1, width: '100%'}}
            >
                <Container style={{ flex: 1}}>
                    <Content style={{ backgroundColor: 'white'}}>
                        {/* <Image
              source={require('../Images/21f8ed58-7416-4ef7-8680-bb5eb6b4aeaf_200x200.png')}
              style={{ alignSelf: 'center', width: 150, height: 150 }}
            /> */}
                        <Form 
                        style={{ alignItems: 'center' }}
                        >
                            <Item style={{
                                marginVertical: 10,
                                paddingHorizontal: 16,
                                width: '100%',
                                flexDirection:'row',
                                flex:1
                            }}
                            >
                                <View style={{flex:3}}>
                                <Label>Tanggal Berangkat</Label>
                                </View>
                                <View style={{flex:0}}>
                                <Label >:</Label>
                                </View>
                                <View style={{flex:2}}>
                                <DatePicker
                                    defaultDate={new Date()}
                                    minimumDate={new Date()}
                                    maximumDate={this.state.maxDate}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText='Pilih Tanggal'
                                    placeHolderTextStyle={{ color: "#34c759" }}
                                    textStyle={{ color: "#34c759" }}
                                    onDateChange={this.setGoingDate}
                                    disabled={false}
                                />
                                </View>
                            </Item>
                            <Item style={{
                            marginVertical: 10,
                            paddingHorizontal: 16,
                            width: '100%',
                            flexDirection:'row',
                            flex:1
                        }}
                            >
                                <View style={{flex:3}}>
                                <Label >Tanggal Pulang</Label>
                                </View>
                                <View style={{flex:0}}>
                                <Label >:</Label>
                                </View>
                                {/* <Label style={{flex:1, color: '#34c759' }}>:</Label> */}
                                <View style={{flex:2}}>
                                <DatePicker
                                    defaultDate={new Date()}
                                    minimumDate={new Date()}
                                    maximumDate={this.state.maxDate}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText='Pilih Tanggal'
                                    placeHolderTextStyle={{ color: "#34c759" }}
                                    textStyle={{ color: "#34c759" }}
                                    onDateChange={this.setComeBackDate}
                                    disabled={false}
                                />
                            </View>
                            </Item>
                            <Item style={{
                            marginVertical: 10,
                            paddingHorizontal: 16,
                            width: '100%',
                            flexDirection:'row',
                            flex:1
                            }}
                            >
                                <View style={{flex:3}}>
                                <Label >Harga per-Pendaki</Label>
                                </View>
                                <View style={{flex:0}}>
                                <Label >:</Label>
                                </View>
                                <View style={{flex:2}}>
                                <NumberFormat 
                                value={this.props.navigation.getParam('mountainPrice')} 
                                displayType={'text'} 
                                thousandSeparator={true} prefix={' Rp '} 
                                renderText={value => <Text style={{color:'#34c759'}}>{value}</Text>} 
                                />
                                {/* <Text style={{color:'#34c759'}}>Rp {this.state.totalPrice}</Text> */}
                                </View>
                            </Item>
                            <Item style={{
                            marginVertical: 10,
                            paddingHorizontal: 16,
                            flexDirection: 'row',
                            width: '100%',
                            flex:1
                            }}
                            >
                                <View style={{flex:3}}>
                                <Label >Jumlah Orang</Label>
                                </View>
                                <View style={{flex:0}}>
                                <Label >:</Label>
                                </View>
                                <View style={{flex:2}}>
                                <NumericInput 
                                // style={{
                                //     input: {
                                //         color: '#34c759'
                                //     }
                                // }}
                                    // onChange={value => item.qty= value }
                                    textColor='#34c759'
                                    iconStyle={{ color: '#34c759' }} 
                                    // size = {10}
                                    minValue = {1}
                                    totalWidth={100}
                                    type ={'up-down'} 
                                    value={this.state.countPeople}
                                    // iconSize={10}
                                    totalHeight={40} 
                                    onChange={this.onChangeCountPeople}
                                />
                                </View>
                                
                            </Item>
                            <Item style={{
                            marginVertical: 10,
                            paddingHorizontal: 16,
                            width: '100%',
                            flexDirection:'row',
                            flex:1
                            }}
                            >
                                <View style={{flex:3}}>
                                <Label >Total Harga</Label>
                                </View>
                                <View style={{flex:0}}>
                                <Label >:</Label>
                                </View>
                                <View style={{flex:2}}>
                                <NumberFormat 
                                value={this.state.totalPrice} 
                                displayType={'text'} 
                                thousandSeparator={true} prefix={' Rp '} 
                                renderText={value => <Text style={{color:'#34c759'}}>{value}</Text>} 
                                />
                                {/* <Text style={{color:'#34c759'}}>Rp {this.state.totalPrice}</Text> */}
                                </View>
                            </Item>
                        </Form>
                    
                    </Content>
                    <Footer style={{backgroundColor:'transparent'}}>
                        
                    <Button
                                onPress={() => this.props.navigation.navigate('Gateway', {
                                    endpoint: 'booking', 
                                    mountain: this.props.navigation.state.params.mountainId,
                                    totalPerson: this.state.countPeople,
                                    totalPrice: this.state.totalPrice,
                                    leavingDate: this.state.goingDate,
                                    returningDate: this.state.comeBackDate
                                })}
                                style={{
                                    justifyContent: 'center', 
                                    alignSelf: 'center', 
                                    width: '100%',
                                    backgroundColor: '#34c759',
                                    marginTop:10
                                }}
                            >
                                <Text >Booking Sekarang</Text>
                            </Button>
                    </Footer>
                </Container>
            </SafeAreaView>
            </View>
        );
    }
}