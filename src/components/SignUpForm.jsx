import React, {useEffect, useState} from "react"
import axios from "axios"
import {getPositions, getToken} from "../api"

const defaultFormFields = {
  name: "",
  email: "",
  phone: "",
  position_id: "1",
  photo: "",
}

const SignUpForm = ({onSubmit}) => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {name, email, phone, position_id, photo} = formFields
  const [positions, setPositions] = useState([])
  const [tokenData, setTokenData] = useState("")

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
    "Content-Type": "application/json",
    "token": tokenData
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

    formdata.append("photo", photo)
    formdata.append("name", name)
    formdata.append("email", email)
    formdata.append("phone", phone)
    formdata.append("position_id", position_id)

    axios.post("https://frontend-test-assignment-api.abz.agency/api/v1/users",
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
    <div className="sign-up-form">
      <div className="sign-up-form-title">Working with POST request</div>
      <form onSubmit={handleSubmit} className="">
        <div className="form-control">
          <input onChange={handleChange}
                 className="form-input"
                 placeholder=" "
                 name="name"
                 value={name}
                 type="text"
                 minLength="2"
                 maxLength="60"
                 required
          />
          <label className="form-label">Name</label>
          <span className="form-message">Username should contain 2-60 characters</span>
        </div>

        <div className="form-control">
          <input onChange={handleChange}
                 className="form-input"
                 placeholder=" "
                 name="email"
                 value={email}
                 type="email"
                 minLength="2"
                 maxLength="100"
                 pattern="^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$"
                 required
          />
          <label className="form-label">Email</label>
          <span className="form-message">User email, must be a valid email according to RFC2822</span>
        </div>
        <div className="form-control">
          <input onChange={handleChange}
                 className="form-input"
                 placeholder=" "
                 name="phone"
                 value={phone}
                 type="phone"
                 pattern="^[\+]{0,1}380([0-9]{9})$"
                 required
          />
          <label className="form-label">Phone</label>
          <span className="form-message">User phone number. Number should start with code of Ukraine +380</span>
        </div>

        <div onChange={handleChange} className="positions">
          <span className="positions-title">Select your position</span>
          {positions.map((position) => {
            return (
              <div key={position.id} className="positions-control">
                <input name="position_id"
                       className="positions-item"
                       value={position.id}
                       type="radio"
                       required
                />
                <label className="position-label">{position.name}</label>
              </div>
            )
          })}
        </div>
        <div className="form-control">
          <input onChange={handleFile}
                 className="inputfile"
                 type="file"
                 name="photo"
                 required
          />
          <label>Upload</label>
        </div>

        <button type="submit" value="Submit">Submit</button>
      </form>
    </div>
  )
}

export default SignUpForm