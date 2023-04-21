import axios from 'axios';
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2'

function Registration() {

    const [deptName, setDeptName] = useState([])

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [photoPath, setPhotoPath] = useState('');  
    const [title, setTitle] = useState('');

    const handleChange_email = event => {
        setRegEmail(event.target.value);
    };

    const handleChange_first_name = event => {
        setFirstName(event.target.value);
    };

    const handleChange_last_name = event => {
        setLastName(event.target.value);
        // console.log(lastName)
    };

    const handleChange_department = event => {
        setDepartment(event.target.value);
        // console.log(department)
    };

    const handleChange_title = event => {
        setTitle(event.target.value);
        // console.log(title)
    };

    const handleChange_photo_path = event => {
        setPhotoPath(event.target.value);
    };

    const registerAPI = async()=>{
        // event.preventDefault();

        await axios.post('http://localhost:8080/MicroService-1.0-SNAPSHOT/api/employee/register', {
            first_name: firstName,
            last_name: lastName,
            email: regEmail,
            name: department,
            photo_path: photoPath,
            title: title
        })
        .then((response)=>{
            // console.log(response)
            if(response.status===200)
            {
                
                
                Swal.fire(
                    'Registered Successfully',
                    'The employee has been registered successfully. ',
                    'success'
                  );
            }
            
        })
        .catch((error)=>{
            console.log(error)
        })
    };

    const deptAPI = async() => {
        await axios.get('http://localhost:8080/MicroService-1.0-SNAPSHOT/api/department/fetch')
        .then((response)=>{
            // console.log(response.data)
            setDeptName(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    };

    // To run the API whenever we are on this page
    useEffect(()=>{
        deptAPI();
    },[]);

    return (
        <div className="Container" style={{width:"50%", marginLeft:"25%"}}>
            <h2>Employee Registration</h2>
            <br />
            <Form onSubmit={registerAPI}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Select defaultValue="Choose..." onChange={handleChange_title}>
                                <option>Choose...</option>
                                <option>Mr.</option>
                                <option>Miss.</option>
                                <option>Mrs.</option>
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" onChange={handleChange_first_name} placeholder="First Name" />
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" onChange={handleChange_last_name} placeholder="Last Name" />
                    </Form.Group>

                </Row>

                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={handleChange_email} placeholder="Enter email" />
                    </Form.Group>

                </Row>

                <Form.Group className="mb-3" controlId="formGridPhotoPath">
                    <Form.Label>Photo Path</Form.Label>
                    <Form.Control onChange={handleChange_photo_path} placeholder="Photo Path" />
                </Form.Group>

                <Row className="mb-3">
                    
                    <Form.Group as={Col} controlId="formGridDepartment">
                    <Form.Label>Department</Form.Label>
                    <Form.Select defaultValue="Choose..." onChange={handleChange_department}>
                        <option>Choose...</option>
                        {
                            (deptName.length !== 0) && 
                            (deptName.map((dept, i)=>{
                                return(
                                    <option value={dept}>{dept}</option>
                                )
                            }))
                        }
                    </Form.Select>
                    </Form.Group>

                </Row>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}

export default Registration;