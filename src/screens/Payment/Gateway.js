import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, SafeAreaView, StatusBar, TouchableOpacity, Picker, Dimensions, AsyncStorage } from 'react-native';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import Header from '../../components/HeaderBack';
import OneSignal from 'react-native-onesignal'
import Axios from 'axios';
import { connect } from 'react-redux';
import { createTransaction } from '../../public/redux/actions/user'

class Gateway extends Component {
	constructor(props) {
		super(props)

		
		OneSignal.init("aa96fe5a-eaa7-4897-a5ed-b7ea2b8df88a")
		OneSignal.addEventListener('ids', device => {
            this.deviceID = device.userId
        });
		OneSignal.inFocusDisplaying(2)

		this.state = {
			token: '',
			name: '',
			number: '',
			expiry: '',
			cvc: '',
			type: '',
			data: this.props.navigation.state.params
		}
		this._bootstrapAsync()
	}

	_bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('token');
		console.warn(userToken)
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
        if (userToken) {
        this.setState({
          token: userToken
        })
      } else {
        this.setState({
          token: userToken
        })
      }
	  };

	componentWillUnmount() {
		this.willFocusSubscription.remove();   
	}
	  
	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus',
			  () => {
				this._bootstrapAsync();
			  }
		  );
	}

	_onChange = (form) => {
		this.setState({
			name: form.values.name,
			number: form.values.number,
			expiry: form.values.expiry,
			cvc: form.values.cvc,
			type: form.values.type || 'salah'
		});
	}

	handlePay = async () => {
		const expiry = this.state.expiry.split('/')
		
		const data = {}

		if (this.state.data.endpoint === 'rental-transaction') {
				data.product = this.state.data.transaction.product.map(item => item._id), 
				data.rentDate = this.state.data.dateNow, 
				data.returnDate = this.state.data.dateAgo, 
				data.totalPrice = this.state.data.total, 
				data.totalItem = this.state.data.transaction.product.length, 
				data.ccnumber = this.state.number, 
				data.month = parseInt(expiry[0]), 
				data.year = parseInt(expiry[1]), 
				data.cvc = parseInt(this.state.cvc)
		} else {
				data.mountain = this.state.data.mountain,
				data.totalPerson = this.state.data.totalPerson,
				data.totalPrice = this.state.data.totalPrice,
				data.leavingDate = this.state.data.leavingDate,
				data.returningDate = this.state.data.returningDate,
				data.ccnumber = this.state.number, 
				data.month = parseInt(expiry[0]), 
				data.year = parseInt(expiry[1]), 
				data.cvc = parseInt(this.state.cvc)
			
		}


		console.warn('data', data)

		await this.props.dispatch(createTransaction(this.state.data.endpoint, data, this.deviceID, this.state.token))
	}

	render() {
		console.warn(this.state.data)
		return (
			<SafeAreaView style={styles.container}>
				<Header title='Pembayaranku' navigation={this.props.navigation}/>
				<View style={[styles.container, {width: '100%'}]}>
					<StatusBar backgroundColor="transparent" barStyle="dark-content" />
					<View style={{padding: 20, alignItems: 'center'}}>
                        <CreditCardInput onChange={this._onChange} requiresName requiresName allowScroll
                        inputContainerStyle={{backgroundColor: '#00000010', paddingTop: 10, paddingLeft: 10, borderRadius: 10}}/>
                    </View>
				</View>
				<View style={{width: '100%'}}>
					<TouchableOpacity style={styles.inputBtn} onPress={() => this.handlePay()}>
						<Text style={{fontWeight: '500', fontSize: 16}}>Bayar</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		)
	}
}

export default connect(state => ({user: state.user}))(Gateway)

const styles = StyleSheet.create({
	container: {
		flex          : 1,
	},
	text: {
		fontSize: 18,
		color: '#000'
	},
	textInput: {
		height         : 50,
		width          : Dimensions.get('window').width * 0.8,
		backgroundColor: '#00000010',
		borderRadius   : 4,
		paddingLeft    : 15,
		paddingRight   : 15,
	},
	inputBtn: {
		backgroundColor: '#34c759',
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		width: '100%',
		paddingLeft    : 15,
		paddingRight   : 15,
	},
	textBtn: {
		color   : '#000',
	},
});