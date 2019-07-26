import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { registerUser } from '../../public/redux/actions/user';

class User extends Component {
	state = {
		email: '',
		phone: '',
		name: '',
		address: '',
		password: '',
		valPassword: '',
		level: 'user',
		errName: false,
		errAddress: false,
		errEmail: false,
		errPhone: false,
		errPassword: false,
		errValPassword: false,
	}

	handleSignUp = () => {
		if (this.state.name == '' || this.state.address == '' || this.state.email == '' || this.state.password == '' || this.state.phone == '' || this.state.varPassword == '' || this.state.errName !== false || this.state.errAddress !== false || this.state.errEmail !== false || this.state.errPassword !== false || this.state.errPhone !== false || this.state.errValPassword !== false) {
			alert('Data yang anda masukkan salah')
		} else {
			const { email, password, name, address, phone, level } = this.state;
			this.props.dispatch(registerUser(email, password, name, address, phone, level)).then(() => alert("Tekan tombol kembali untuk masuk"))
		}
	}

	onChangeName = (cName) => {
		if (cName.length < 4) {
			this.setState({
				name: cName,
				errName: 'Nama setidaknya 4 karakter'
			})
		} else {
			this.setState({
				name: cName,
				errName: false
			})
		}
	}

	onChangeAddress = (cAddress) => {
		if (cAddress.length < 20) {
			this.setState({
				address: cAddress,
				errAddress: 'Alamat setidaknya 20 karakter'
			})
		} else {
			this.setState({
				address: cAddress,
				errAddress: false
			})
		}
	}

	onChangePhone = (cPhone) => {
		let reg = /^\d{10,15}$/;
		if (reg.test(cPhone) === false) {
			this.setState({
				phone: cPhone,
				errPhone: 'Nomer Telfon tidak falid'
			})
		} else {
			this.setState({
				phone: cPhone,
				errPhone: false
			})
		}
	}

	onChangeEmail = (cEmail) => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if (reg.test(cEmail) === false) {
			this.setState({
				email: cEmail,
				errEmail: 'Alamat email tidak falid'
			})
		} else {
			this.setState({
				email: cEmail,
				errEmail: false
			})
		}
	}

	onChangePassword = (cPassword) => {
		if (cPassword.length < 6) {
			this.setState({
				password: cPassword,
				errPassword: 'Password setidaknya 6 karakter'
			})
		} else {
			this.setState({
				password: cPassword,
				errPassword: false
			})
		}
	}

	onChangeValPassword = (cValPassword) => {
		if (this.state.password != cValPassword) {
			this.setState({
				valPassword: cValPassword,
				errValPassword: 'Password tidak cocok'
			})
		} else {
			this.setState({
				valPassword: cValPassword,
				errValPassword: false
			})
		}
	}

	render() {
		return (
			<ScrollView>
				<ScrollView>
					<View style={[styles.container, { width: '100%', marginTop: 20 }]}>
						<StatusBar backgroundColor="#fff" barStyle="dark-content" />
						<TextInput
							placeholder="Nama"
							autoCapitalize="none"
							style={[styles.textInput, { marginBottom: 10, marginTop: 20 }]}
							onChangeText={this.onChangeName}
							value={this.state.name}
						/>
						{this.state.errName !== false ? <Text style={{ marginBottom: 10, color: '#ff0000' }}>{this.state.errName}</Text> : null}
						<TextInput
							placeholder="Alamat"
							autoCapitalize="none"
							style={[styles.textInput, { marginBottom: 10 }]}
							onChangeText={this.onChangeAddress}
							value={this.state.address}
							multiline={true}
							numberOfLines={3}
						/>
						{this.state.errAddress !== false ? <Text style={{ marginBottom: 10, color: '#ff0000' }}>{this.state.errAddress}</Text> : null}
						<TextInput
							placeholder="Email"
							autoCapitalize="none"
							keyboardType="email-address"
							style={[styles.textInput, { marginBottom: 10 }]}
							onChangeText={this.onChangeEmail}
							value={this.state.email}
						/>
						{this.state.errEmail !== false ? <Text style={{ marginBottom: 10, color: '#ff0000' }}>{this.state.errEmail}</Text> : null}
						<TextInput
							placeholder="Nomer Telfon"
							autoCapitalize="none"
							keyboardType='phone-pad'
							style={[styles.textInput, { marginBottom: 10 }]}
							onChangeText={this.onChangePhone}
							value={this.state.phone}
						/>
						{this.state.errPhone !== false ? <Text style={{ marginBottom: 10, color: '#ff0000' }}>{this.state.errPhone}</Text> : null}
						<TextInput
							secureTextEntry
							placeholder="Kata Sandi"
							autoCapitalize="none"
							style={[styles.textInput, { marginBottom: 10 }]}
							onChangeText={this.onChangePassword}
							value={this.state.password}
						/>
						{this.state.errPassword !== false ? <Text style={{ marginBottom: 10, color: '#ff0000' }}>{this.state.errPassword}</Text> : null}
						<TextInput
							secureTextEntry
							placeholder="Ulang Sandi"
							autoCapitalize="none"
							style={[styles.textInput, { marginBottom: 10 }]}
							onChangeText={this.onChangeValPassword}
							value={this.state.valPassword}
						/>
						{this.state.errValPassword !== false ? <Text style={{ marginBottom: 10, color: '#ff0000' }}>{this.state.errValPassword}</Text> : null}
					</View>
				</ScrollView>
				<View style={{ width: '100%' }}>
					<TouchableOpacity onPress={this.handleSignUp} style={styles.inputBtn}>
						<Text style={{ fontWeight: '500', fontSize: 16 }}>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}
const mapStateToProps = state => {
	return {
		user: state.user,
	}
}
export default connect(mapStateToProps)(User)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textInput: {
		height: 50,
		width: '80%',
		backgroundColor: '#00000010',
		borderRadius: 4,
		paddingLeft: 15,
		paddingRight: 15,
	},
	inputBtn: {
		backgroundColor: '#34c759',
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		width: '100%',
		paddingLeft: 15,
		paddingRight: 15,
	},
	textBtn: {
		color: '#000',
	},
});