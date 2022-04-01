import React, {useEffect, useState} from "react"
import axios from "axios"
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {getPositions, getToken} from "../api"
import {Button} from "./Button";
import AfterSent from "./AfterSent";
import {yupResolver} from "@hookform/resolvers/yup";

// const schema = yup.object().shape({
//   photo: yup
//     .mixed()
//     .required("You need to provide a file")
//     .test("fileSize", "The file is too large", (value) => {
//       return value && value[0].size <= 1
//     }),
// })
//
// const schema = yup.object().shape({
//   photo: yup.file().required()
// });

// const schema = Yup.object().shape({
//   file: Yup.mixed().required('File is required'),
// })

const emailPatern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

const phonePatern = /^[\+]{0,1}380([0-9]{9})$/

const schema = yup.object().shape({
  name: yup.string().min(2).max(60).required("Name is required"),
  email: yup.string().min(2).max(100).required("Email is required")
    .matches(emailPatern, "User email, must be a valid email according to RFC2822"),
  phone: yup.string().required("Phone is required")
    .matches(phonePatern, "User phone number. Number should start with code of Ukraine +380"),
  position_id: yup.number().required(),
  photo: yup.mixed()
    .test('required', "You need to provide a file", (value) => {
      return value && value.length
    })
    .test("fileSize", "The file is too large", (value) => {
      return value && value[0] && value[0].size <= 5000
    })
    .test("type", "We only support jpeg", function (value) {
      return value && value[0] && value[0].type === "image/jpeg"
    })
})

const SignUpForm = ({onSubmit}) => {
  const [photoName, setPhotoName] = useState("")
  // const {name, email, phone, position_id, photo} = formFields
  const [positions, setPositions] = useState([])
  const [tokenData, setTokenData] = useState("")
  const [isSent, setIsSent] = useState(false)

  const {register, handleSubmit, watch, formState: {errors, isValid}, reset} = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  })


  // console.log(photoName)

  // const [isDisabled, setIsDisabled] = useState(true)

  // const handleChange = (event) => {
  //   const {name, value} = event.target
  //   setFormFields({...formFields, [name]: value})

  // let x = document.getElementById("idweneed");
  // if (window.getComputedStyle(x).display === "none") {
  //   setIsDisabled(false)
  // } else {
  //   setIsDisabled(true)
  // }
  // }
  // const handleFile = (event) => {
  //   let file = event.target.files[0]
  //   setPhotoName(file)
  //   console.log(file)
  // }
  // const photoFile = () => {
  //   let file = watch("position_id")[0]
  //   setPhotoName(file)
  // console.log(file)
  // }


  // const clearForm = () => {
  //   setFormFields(defaultFormFields)
  // }

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

  const userFormSubmit = async (data) => {
    const {name, email, phone, position_id} = data
    const photo = data.photo[0]

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
        reset()
        onSubmit()
        setIsSent(true)
      })
      .catch((error) => console.log(error))
  }


  // const isEnabled = Object.values(formFields)
  // console.log(isEnabled.join("").length)


  // let elementExists = document.getElementById("spanwenedd").style
  // let compStyles = window.getComputedStyle(elementExists, null);
  // let bgColor = elementExists.getPropertyValue("background-color");


  // console.log(errors.name)


  return (
    <div className="sign-up-form">
      {isSent
        ? <AfterSent/>
        : <div className="sign-up-form-container">
          <div className="sign-up-form-title">Working with POST request</div>
          <form onSubmit={handleSubmit(userFormSubmit)} className="form-info">
            <div className="form-control">
              <input
                className={errors.name ? `red-border form-input` : "form-input"}
                placeholder=" "
                // name="name"
                // value={name}
                type="text"

                {...register("name", {
                  required: "Поле обязательно к заполнению",
                  minLength: {
                    value: 5,
                    message: "Username should contain 2-60 characters"
                  },
                  maxLength: {
                    value: 60,
                    message: "Username should contain 2-60 characters"
                  }
                })}
              />
              <label className="form-label">Your name</label>
              {/*<span id="idweneed" className="form-message">Username should contain 2-60 characters</span>*/}
              {errors?.name && <span className="form-message">{errors?.name?.message || "Error"}</span>}
            </div>

            <div className="form-control">
              <input
                className={errors.email ? `red-border form-input` : "form-input"}
                placeholder=" "
                // name="email"
                // value={email}
                type="email"
                pattern="^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$"

                {...register("email", {
                  required: "Поле обязательно к заполнению",
                  minLength: {
                    value: 5,
                    message: "Username should contain 2-100 characters"
                  },
                  maxLength: {
                    value: 100,
                    message: "Username should contain 2-100 characters"
                  }
                })}
              />
              <label className="form-label">Email</label>
              {/*<span className="form-message">User email, must be a valid email according to RFC2822</span>*/}
              {errors?.email && <span className="form-message">{errors?.email?.message || "Error"}</span>}
            </div>

            <div className="form-control">
              <input
                className={errors.phone ? `red-border form-input` : "form-input"}
                placeholder=" "
                // name="phone"
                // value={phone}
                type="phone"

                {...register("phone", {
                  required: "User phone number. Number should start with code of Ukraine +380"
                })}

              />
              <label className="form-label">Phone</label>
              {/*<span className="form-message">User phone number. Number should start with code of Ukraine +380</span>*/}
              {errors?.phone && <span className="form-message">{errors?.phone?.message || "Error"}</span>}
            </div>

            <div className="positions">
              <span className="positions-title">Select your position</span>
              {positions.map((position) => {
                return (
                  <div key={position.id} className="positions-control">
                    <input className="positions-item"
                           type="radio"
                           value={position.id}
                           required
                           {...register("position_id")}
                    />
                    {/*<input {...register("radio")} type="radio" value="B" />*/}
                    {/*<input {...register("radio")} type="radio" value="C" />*/}
                    {/*<input name="position_id"*/}
                    {/*       className="positions-item"*/}
                    {/*       value={position.id}*/}
                    {/*       type="radio"*/}
                    {/*       required*/}
                    {/*/>*/}
                    <label className="position-label">{position.name}</label>
                  </div>
                )
              })}
            </div>

            <div className="form-control">
              <input className="input-file"
                     type="file"
                     name="photo"
                     id="file"
                     {...register("photo")}
              />

              <label htmlFor="file" className={errors.photo ? `red-border` : " "}>Upload
                {!watch("photo") || watch("photo").length === 0
                  ? <span className={errors.photo ? `red-border` : " "}>Upload your photo</span>
                  : <span>{watch("photo")[0].name}</span>}
              </label>
              {<span className="file-message">{errors?.photo?.message}</span>}
            </div>

            <div className="form-btn">
              <Button valid={!isValid} text={"Sign up"}/>
            </div>
          </form>
        </div>}
    </div>
  )
}

export default SignUpForm