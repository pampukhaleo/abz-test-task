import React, {useEffect, useState} from 'react';
import axios from "axios";

const defaultFormFields = {
    name: '',
    email: '',
    phone: '',
    position_id: '1',
    photo: '',
}

function SignUpForm () {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { name, email, phone, position_id, photo } = formFields

    const [positions, setPositions] = useState([])
    const [tokenData, setTokenData] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({...formFields, [name]: value})
    }

    const handleFile = (event) => {
        let file = event.target.files[0]
        setFormFields({...formFields, photo: file})
        console.log(photo)
    }

    useEffect(() => {
        axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
            .then(function (response) {
                // handle success
                setTokenData(response.data.token)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then(function (response) {
                // handle success
                setPositions(response.data.positions)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [])

    const headers = {
        'Content-Type': 'application/json',
        'token': tokenData
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        let formdata = new FormData()

        formdata.append('photo', photo)
        formdata.append('name', name)
        formdata.append('email', email)
        formdata.append('phone', phone)
        formdata.append('position_id', position_id)

        axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users',
            formdata,
            {
            headers: headers
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name
                    <input onChange={handleChange}
                           name='name'
                           value={name}
                           placeholder='Your name'
                           type='text' />
                </label>
                <label>Email
                    <input onChange={handleChange}
                           name='email'
                           value={email}
                           placeholder='Email'
                           type='email' />
                </label>
                <label>Phone
                    <input onChange={handleChange}
                           name='phone'
                           value={phone}
                           placeholder='Phone'
                           type='phone' />
                </label>
                <select onChange={handleChange}
                        name='position_id'
                        value={position_id} >
                    {
                        positions.map((position) => {
                            return <option
                                key={position.id}
                                value={position.id} >
                                    {position.name}
                            </option>
                        })
                    }
                </select>
                <label>Upload photo
                    <input type='file'
                           name='photo'
                           onChange={handleFile}
                           />
                </label>
                <button type='submit' value='Submit'>Submit</button>
            </form>
        </div>
    );
}

export default SignUpForm;