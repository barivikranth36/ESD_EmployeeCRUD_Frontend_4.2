import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const View = () => {
    // To get department name
    const [departmentName, setDepartmentName] = useState([])

    const [employee, setEmployee] = useState([])
    var deleteMail;
    const [success, setSuccess] = useState('');
    const[isUpdateCalled, setIsUpdateCalled] = useState(false);

    // Update Variables
    const [employeeID, setEmployeeID] = useState()
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [deptName, setDeptName] = useState('')
    const [title, setTitle] = useState('')
    const [photo_path, setPhotoPath] = useState('')

    // Update Handlers
    const handleChange_email = event => {
        setEmail(event.target.value);
    };

    const handleChange_first_name = event => {
        setFirstName(event.target.value);
    };

    const handleChange_last_name = event => {
        setLastName(event.target.value);
        // console.log(lastName)
    };

    const handleChange_department = event => {
        setDeptName(event.target.value);
        // console.log(department)
    };

    const handleChange_title = event => {
        setTitle(event.target.value);
        // console.log(title)
    };

    const handleChange_photo_path = event => {
        setPhotoPath(event.target.value);
    };

    const fetchAPI = async() => {
        await axios.get('http://localhost:8080/MicroService-1.0-SNAPSHOT/api/employee/fetch')
        .then((response)=>{
            // console.log(response.data)
            setEmployee(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    };

    const deptAPI = async() => {
        await axios.get('http://localhost:8080/MicroService-1.0-SNAPSHOT/api/department/fetch')
        .then((response)=>{
            // console.log(response.data)
            setDepartmentName(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    };

    const updateAPI = async()=>{
        await axios.post('http://localhost:8080/MicroService-1.0-SNAPSHOT/api/employee/update', {
            employee_id: employeeID,
            first_name: first_name,
            last_name: last_name,
            email: email,
            name: deptName,
            photo_path: photo_path,
            title: title
        })
        .then((response)=>{
            if(response.status === 200)
                alert("Successfully Updated")
                setIsUpdateCalled(false);
        })
        .catch((error)=>{
            alert("Unsuccessfull update!!!")
            setIsUpdateCalled(false);
        })
    }


    const deleteAPI = async() => {
        console.log("inside delete api", deleteMail);
        await axios.post('http://localhost:8080/MicroService-1.0-SNAPSHOT/api/employee/delete',{
            email:deleteMail
        })
        .then((res)=>{
            console.log(res);
            alert(`Successfully delete`);
            setSuccess(res.data);
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        fetchAPI();
    },[success]);

    return(
        <>
        { (isUpdateCalled===false) && 
        (
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Department</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (employee.length !== 0) &&
                    (employee.map((emp)=>{
                        return(
                        <tr key={emp.employee_id}>
                            <th scope="row">{emp.employee_id}</th>
                            <td>{emp.title} {emp.first_name} {emp.last_name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.name}</td>
                            <td>
                                <button className='btn btn-danger'
                                onClick={()=>{
                                    deleteMail = emp.email
                                    console.log(deleteMail);
                                    deleteAPI();
                                }}
                                >Delete</button>
                            </td>
                            <td>
                                <button className='btn btn-primary'
                                onClick={()=>{
                                    setEmployeeID(emp.employee_id)
                                    setFirstName(emp.first_name)
                                    setLastName(emp.last_name)
                                    setEmail(emp.email)
                                    setTitle(emp.title)
                                    setPhotoPath(emp.photo_path)
                                    setDeptName(emp.name)
                                    deptAPI();
                                    setIsUpdateCalled(true);
                                }}
                                >Update</button>
                            </td>
                        </tr>
                        );
                    })
                    )
                }
            </tbody>
        </table>
        )}
        {
            (isUpdateCalled) && (
                <>
                    <div>
                        <button className='btn btn-dark'
                            onClick={()=>{
                                setIsUpdateCalled(false);
                            }}
                        >Go back</button>

                        <div className="Container" style={{width:"50%", marginLeft:"25%"}}>
                            <Form onSubmit={updateAPI}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Select defaultValue={title} onChange={handleChange_title}>
                                                {/* <option>Choose...</option> */}
                                                <option>Mr.</option>
                                                <option>Miss.</option>
                                                <option>Mrs.</option>
                                        </Form.Select>
                                    </Form.Group>
                                    
                                    <Form.Group as={Col} controlId="formGridFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" defaultValue={first_name} onChange={handleChange_first_name} placeholder="First Name" />
                                    </Form.Group>
                                    
                                    <Form.Group as={Col} controlId="formGridLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" defaultValue={last_name} onChange={handleChange_last_name} placeholder="Last Name" />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">

                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" defaultValue={email} onChange={handleChange_email} placeholder="Enter email" />
                                    </Form.Group>

                                </Row>

                                <Form.Group className="mb-3" controlId="formGridPhotoPath">
                                    <Form.Label>Photo Path</Form.Label>
                                    <Form.Control defaultValue={photo_path} onChange={handleChange_photo_path} placeholder="Photo Path" />
                                </Form.Group>

                                <Row className="mb-3">
                                    
                                    <Form.Group as={Col} controlId="formGridDepartment">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Select defaultValue={deptName} onChange={handleChange_department}>
                                        <option>Choose...</option>
                                        {
                                            (departmentName.length !== 0) && 
                                            (departmentName.map((dept, i)=>{
                                                return(
                                                    <option key={i} value={dept}>{dept}</option>
                                                )
                                            }))
                                        }
                                    </Form.Select>
                                    </Form.Group>

                                </Row>

                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                            </Form>
                        </div>
                    </div>
                </>
                )
        }
        </>
    )
}

export default View