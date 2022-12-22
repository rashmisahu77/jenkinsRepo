import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';



const User = () => {

    const BaseUrl = process.env.REACT_APP_BASEURL;

    console.log("BaseUrl", BaseUrl);

    const [show, setShow] = useState(false);
    const [alluser, setAllUser] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handelChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const Submit = async (e) => {
        e.preventDefault()
        const { name, email, password } = user
        const userData = { name, email, password }
        console.log("userData", userData)

        // const apiData = {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     method: "POST",
        //     body: JSON.stringify(userData)
        // }

        const api = await axios.post(`${BaseUrl}/add`, userData)
        const response = await api.data
        console.log("response", response)

        if (response.status === 200) {
            // window.alert(response.response)
            handleClose()
        }
        if (response.status === 400) {
            window.alert(response.response)
        }

    }

    const allUser = async () => {

        const api = await axios.get(`${BaseUrl}/all-user`)
        console.log("api", api.data.user)
        setAllUser(api.data.user)
    }

    useEffect(() => {
        allUser()
    }, [0])

    return (
        <div>
            <div>
                <Button variant="primary" onClick={handleShow}>
                    Add User
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name='name' value={user.name} onChange={handelChange} placeholder="name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name='email' value={user.email} onChange={handelChange} placeholder="abc@example.com" />
                            </Form.Group>



                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>password</Form.Label>
                                <Form.Control type="password" name='password' value={user.password} onChange={handelChange} />
                            </Form.Group>

                            {/* <button >Submit</button> */}

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={Submit} >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal></div>

            <div>
                <div class="table-responsive">
                    <table class="table table-primary">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alluser && alluser?.map((data, index) => {
                                return (
                                    <tr class="">
                                        <td scope="row">{data.id}</td>
                                        <td scope="row">{data.name}</td>
                                        <td scope="row">{data.email}</td>
                                        <td scope="row">
                                            {data.role === "user" ? (<>
                                                <Button variant="success">{data.role}</Button>{' '}
                                            </>) : data.role === "employee" ? (<>
                                                <Button variant="warning">{data.role}</Button>{' '}
                                            </>) : (<><Button variant="danger">{data.role}</Button>{' '}
                                            </>)
                                            }
                                        </td>
                                        <td></td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default User