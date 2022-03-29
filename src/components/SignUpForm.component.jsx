import React, {useEffect, useState} from 'react';
import axios from "axios";

function SignUpForm(props) {
    const url = 'https://frontend-test-assignment-api.abz.agency/api/v1/users'
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        position_id: 1,
        photo: '',
    })
    const [positions, setPositions] = useState([])

    // fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token') .then(function(response) { return response.json(); }) .then(function(data) { console.log(data); }) .catch(function(error) {})
    useEffect(() => {
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

    function handle(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    function handleFile(e) {
        let file = e.target.files[0]
        setData({photo: file})
    }

    // function handlePosition(e) {
    //     let id = e.target.value
    //     setData({position_id: id})
    // }

    const headers = {
        'Content-Type': 'application/json',
        'token': "eyJpdiI6Ik9HM3gzb1ZkRStaZExSMTdaVTg3VWc9PSIsInZhbHVlIjoidkQ0WWJXQ0Y2eDBwQmp5QTFwY0NzY01PSDE2bTk4MHhlTUx2VnN1SXhUZDdkek5wYWU3T0pTdWFSaWNwa2V3bzlLY1diajV2Q2FQNkFERXNwMDhaWXc9PSIsIm1hYyI6IjQ0NGQ1Y2EzNDA4MTAwMjQ2MWFlODRlNjFjNzQ3MWRhNzkyYjQ0N2YxMzkxMThkNTMwODU5ZDBhYTNmMDg1YjgifQ=="
    }

    function submit(e) {
        e.preventDefault()

        let file = data.photo
        let formdata = new FormData()

        formdata.append('photo', file)
        formdata.append('name', data.name)
        formdata.append('email', data.email)
        formdata.append('phone', data.phone)
        formdata.append('position_id', "1")

        axios.post(url, formdata, {
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
            <form onSubmit={e => submit(e)}>
                <label>Name
                    <input onChange={e => handle(e)} id='name' placeholder='Your name' type='text' />
                </label>
                <label>Email
                    <input onChange={e => handle(e)} id='email' placeholder='Email' type='email' />
                </label>
                <label>Phone
                    <input onChange={e => handle(e)} id='phone' placeholder='Phone' type='phone' />
                </label>
                <select>
                    {
                        positions.map((position) => {
                            return <option
                                key={position.id}
                                value={position.id}>
                                    {position.name}
                            </option>
                        })
                    }
                </select>
                <label>Upload photo
                    <input type='file' name='file' onChange={e => handleFile(e)}/>
                </label>
                <button type='submit' value='Submit'>Submit</button>
            </form>
        </div>
    );
}

export default SignUpForm;