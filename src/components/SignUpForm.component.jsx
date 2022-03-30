import React, {useEffect, useState} from 'react'
import axios from "axios"
import {getPositions, getToken} from "../api"

const defaultFormFields = {
  name: '',
  email: '',
  phone: '',
  position_id: '1',
  photo: '',
}

const SignUpForm = ({onSubmit}) => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {name, email, phone, position_id, photo} = formFields

  const [positions, setPositions] = useState([])
  const [tokenData, setTokenData] = useState('')

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})
  }

  const handleFile = (event) => {
    let file = event.target.files[0]
    setFormFields({...formFields, photo: file})
  }

  const clearForm = () => {
    setFormFields(defaultFormFields)
  }

  const headers = {
    'Content-Type': 'application/json',
    'token': tokenData
  }

  useEffect(() => {
    getToken()
      .then((response) => setTokenData(response))
      .catch((error) => console.log(error))

    getPositions()
      .then((response) => setPositions(response))
      .catch((error) => console.log(error))
  }, [])

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
        clearForm()
        onSubmit()
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name
          <input onChange={handleChange}
                 name='name'
                 value={name}
                 placeholder='Your name'
                 type='text'
                 minLength='2'
                 maxLength='60'
                 required
          />
        </label>
        <label>Email
          <input onChange={handleChange}
                 name='email'
                 value={email}
                 placeholder='Email'
                 type='email'
                 minLength='2'
                 maxLength='100'
                 pattern="^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$"
                 required
          />
        </label>
        <label>Phone
          <input onChange={handleChange}
                 name='phone'
                 value={phone}
                 placeholder='Phone'
                 type='phone'
                 pattern='^[\+]{0,1}380([0-9]{9})$'
                 required
          />
        </label>
        <div onChange={handleChange}>
          {positions.map((position) => {
              return (
                <label key={position.id}>
                  <input name="position_id"
                         value={position.id}
                         type="radio"
                         required
                  /> {position.name}
                </label>)
            })
          }
        </div>
        <label>Upload photo
          <input required
                 type='file'
                 name='photo'
                 onChange={handleFile}
          />
        </label>
        <button type='submit' value='Submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignUpForm