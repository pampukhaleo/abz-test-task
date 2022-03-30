import axios from "axios"

export const getUsers = async (count) => new Promise((res, rej) => {
  axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?count=${count}`)
    .then((result) => res(result.data?.users))
    .catch((error) => rej(error))
})

export const getToken = async () => new Promise((res, rej) => {
  axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
    .then((result) => res(result.data?.token))
    .catch((error) => rej(error))
})

export const getPositions = async () => new Promise((res, rej) => {
  axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
    .then((result) => res(result.data?.positions))
    .catch((error) => rej(error))
})

