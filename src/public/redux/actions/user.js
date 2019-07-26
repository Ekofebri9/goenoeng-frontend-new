import axios from 'axios'
// import console = require('console');
const Url = 'https://menung.herokuapp.com'
export const login = (email, password, level) => {
    return {
        type: 'POST_USER',
        payload: axios.post(`${Url}/users/auth/${level}`,
            {
                email: email,
                password: password
            }, { headers: { 'x-app-name': 'menung982998372771' } })
    }
}
export const register = (email, password, name, address, phone) => {
    return {
        type: 'POST_REGISTER',
        payload: axios.post(`${Url}/users/register`,
            {
                email: email,
                password: password,
                password_confirmation: password,
                name: name,
                address: address,
                phone: phone
            }, { headers: { 'x-app-name': 'menung982998372771' } })
    }
}

export const fetchPartner = (token) => {
    console.log(token)
    return {
        type: 'FETCH_PARTNER',
        payload: axios.get(`${Url}/partners/details`,
            { headers: { 'x-app-name': 'menung982998372771', 'x-auth-token': token } })
    }
}

export const fetchUser = (token) => {
    console.log(token)
    return {
        type: 'FETCH_USER',
        payload: axios.get(`${Url}/users/details`,
            { headers: { 'x-app-name': 'menung982998372771', 'x-auth-token': token } })
    }
}

export const updatePartner = (token, data) => {
    console.log("data")
    console.log(data)
    let body = new FormData();
    if (data.imageProfile !== '') {
        body.append('images', {
            uri: data.image.uri,
            name: data.image.fileName,
            type: 'image/jpg'
        })
    }
    body.append('name', data.name)
    body.append('description', data.description)
    body.append('address', data.address)
    body.append('phone', data.hp)
    // body.append('phone', data.hp)
    return {
        type: 'UPDATE_PARTNER',
        payload: axios.patch(`${Url}/partners/`, body
            // {
            //     name: data.name,
            //     description: data.description,
            //     address: data.address,
            //     phone: data.hp,
            //     image: data.imageProfile.uri
            // }
            , {
                headers: {
                    'x-app-name': 'menung982998372771',
                    'x-auth-token': token
                }
            })
    }
}

export const updateUser = (token, data) => {
    return {
        type: 'UPDATE_USER',
        payload: axios.patch(`${Url}/users/details`,
            {
                name: data.name,
                // image: data.description,
                address: data.address,
                phone: data.hp,
                gender: data.gender,
                image: data.imageProfile.uri
            }, {
                headers: {
                    'x-app-name': 'menung982998372771',
                    'x-auth-token': token
                }
            })
    }
}  

export const addProduct = (token, data) => {
    console.log(token)
    console.log(data)
    let body = new FormData();
    if (data.imageProfile !== '') {
        body.append('images', {
            uri: data.image.uri,
            name: data.image.fileName,
            type: 'image/jpg'
        })
    }
    body.append('name_product', data.name)
    body.append('price', data.price)
    body.append('stok', data.stock)
    body.append('description', data.description)
    return {
        type: 'ADD_PRODUCT',
        payload: axios.post(`${Url}/partners/product/add`, body
        ,{ headers: { 'x-app-name': 'menung982998372771', 'x-auth-token': token }})
    }
}  

export const editProduct = (token, data) => {
    // console.log(token)
    // console.log(data)
    // let body = new FormData();
    // if (data.imageProfile !== '') {
    //     body.append('images', {
    //         uri: data.image.uri,
    //         name: data.image.fileName,
    //         type: 'image/jpg'
    //     })
    // }
    // body.append('name_product', data.name)
    // body.append('price', data.price)
    // body.append('stok', data.stock)
    // body.append('description', data.description)
    return {
        type: 'EDIT_PRODUCT',
        payload: axios.patch(`${Url}/partners/product/${data.id}`,
        {
            name_product: data.name,
            // image: data.description,
            price: data.prce,
            stok: data.stock,
            description: data.description,
            // image: data.imageProfile.uri
        }
        ,{ headers: { 'x-app-name': 'menung982998372771', 'x-auth-token': token}})
    }
}  

export const registerUser = (email,password,name,address,phone) => {
    return {
        type: 'POST_REGISTER',
        payload: axios.post(`${Url}/users/register`,
        {
            email: email,
            password: password,
            password_confirmation: password,
            name: name,
            address: address,
            phone: phone
        },{ headers: { 'x-app-name': 'menung982998372771' }})
    }
} 

export const registerPartner = (email,password,name,address,phone,latitude, longitude) => {
    return {
        type: 'POST_REGISTER',
        payload: axios.post(`${Url}/users/register`,
        {
            email: email,
            password: password,
            password_confirmation: password,
            name: name,
            address: address,
            phone: phone,
            latitude: latitude,
            longitude: longitude
        },{ headers: { 'x-app-name': 'menung982998372771' }})
    }
}

exports.createTransaction = (data, playerId, token) => {
    return {
        type: 'ADD_TRANSACTION',
        payload: axios.post(`https://menung.herokuapp.com/rental-transaction?playerId=${playerId}`, data, {
			headers: { 'x-app-name': 'menung982998372771', 'x-auth-token': token }
		})
    }
}