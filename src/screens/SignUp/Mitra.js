import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView, Dimensions, View, TouchableOpacity, StatusBar, PermissionsAndroid, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';
import { registerPartner } from '../../public/redux/actions/user';

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0060;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Mitra extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			phone: '',
			name: '',
			address: '',
			password: '',
			valPassword: '',
			longitude: 0,
			latitude: 0,
			latitudeDelta: LATITUDE_DELTA,
			longitudeDelta: LONGITUDE_DELTA,
			error: '',
			permission: false,
			errName: false,
			errAddress: false,
			errEmail: false,
			errPhone: false,
			errPassword: false,
			errValPassword: false,
			level: 'partner',
		}
	}

	handleSignUp = () => {
		const { navigation } = this.props
		if (this.state.name == '' || this.state.address == '' || this.state.email == '' || this.state.password == '' || this.state.phone == '' || this.state.varPassword == '' || this.state.errName !== false || this.state.errAddress !== false || this.state.errEmail !== false || this.state.errPassword !== false || this.state.errPhone !== false || this.state.errValPassword !== false) {
			alert('Data yang anda masukkan salah')
		} else {
			const { email, password, name, address, phone, level, latitude, longitude } = this.state;
			this.props.dispatch(registerPartner(email,password,name,address,phone, level,latitude, longitude)).then(() => alert("Tekan tombol kembali untuk masuk"))
		}
	}

	async componentWillMount() {
		this.requestMaps()
	}

	requestMaps = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				this.setState({ permission: true })
				this.getLocation()
				console.log('You can use Maps');
			} else {
				alert('Maps tidak akan berfungsi jika anda tidak memberi izin lokasi')
			}
		} catch (err) {
			console.warn(err);
		}
	}

	getLocation = async () => {
		if (this.permission = true) {
			await Geolocation.getCurrentPosition(
				async (position) => {
					await this.setState({
						longitude: position.coords.longitude,
						latitude: position.coords.latitude
					})
				},
				(error) => {
					console.warn(error.code, error.message);
				},
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
			)
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
			<ScrollView styles={{ flex: 1 }}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.container}>
						<StatusBar backgroundColor="#fff" barStyle="dark-content" />

						<TextInput
							placeholder="Nama Toko"
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
						<MapView
							ref={map => this.map = map}
							provider={PROVIDER_GOOGLE}
							style={styles.map}
							region={{
								latitude: this.state.latitude,
								longitude: this.state.longitude,
								latitudeDelta: this.state.latitudeDelta,
								longitudeDelta: this.state.longitudeDelta,
							}}
						>
							<Marker
								coordinate={{
									latitude: this.state.latitude,
									longitude: this.state.longitude,
								}}
								title={'Toko Saya'}
								draggable
								onDragEnd={(e) => {
									this.setState({
										longitude: e.nativeEvent.coordinate.longitude,
										latitude: e.nativeEvent.coordinate.latitude
									})
								}}

							/>
						</MapView>
						<Text style={{ alignSelf: 'center', color: '#ff3399' }}>
							Tahan marker untuk mengubah lokasi !
					</Text>
						<View style={{ padding: 14 }}>
							<Text>
								Already have an account?&nbsp;
							<Text onPress={() => this.props.navigation.navigate('Login')} style={styles.textBtn}>
									Login
							</Text>
							</Text>
						</View>
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
export default connect(mapStateToProps)(Mitra)

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
	map: {
		height: 150,
		width: '80%',
		backgroundColor: '#00000010',
		borderRadius: 10,
		paddingLeft: 15,
		paddingRight: 15,
		marginBottom: 5,
	}
});