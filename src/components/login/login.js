import { Form, Button, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../context/Auth";
import { useContext, useState } from "react";
import { When } from "react-if";
import './login.scss'


export default function Login() {
    const auth = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showSignup, setSignup] = useState(false);
    const [infoUser, setInfoUser] = useState({
        userName: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const handelChange = (e) => {
        e.preventDefault();
        setInfoUser({ ...infoUser, [e.target.name]: e.target.value });
    };
    const logInHandler = (event) => {
        event.preventDefault();
        console.log(userName, password);
        auth.signIn(userName, password)
        console.log(auth.user);

    }
    const signUpHandler = (event) => {
        event.preventDefault();
        auth.signUp(infoUser.userName, infoUser.email, infoUser.password, infoUser.firstName, infoUser.lastName)
        console.log(auth.user);
        console.log(infoUser);
        setSignup(false);
    }
    return (
        <When condition={!auth.isLoggedIn}>
            <div className='signup-login'>
                <When condition={!showSignup}>
                    <div className='login-forms'>
                        <Form className='login-form' onSubmit={logInHandler}>
                            <Form.Group className="mb-3" >
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" placeholder="User Name" onChange={(e) => setUserName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <div className='login-form-footer'>
                                <Form.Group className="mb-3" >
                                    <Form.Text className="go text-muted" onClick={(e) => setSignup(true)}>
                                        Click to signup
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </div>
                </When>
                <When condition={showSignup}>
                    <div className='signup-forms'>
                        <Form className='signup-form' onSubmit={signUpHandler}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control type="text" id="userName"
                                            name="userName" onChange={handelChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" id="password"
                                            name="password" onChange={handelChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" id="firstName"
                                            name="firstName" onChange={handelChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" id="lastName"
                                            name="lastName" onChange={handelChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control type="email" id="email"
                                    name="email" onChange={handelChange} />
                            </Form.Group>
                            <div className='signup-form-footer'>
                                <Form.Group className="mb-3" >
                                    <Form.Text className="back text-muted" onClick={(e) => setSignup(false)}>
                                        Back To LogIn
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit" >
                                    Sign up
                                </Button>
                            </div>
                        </Form>
                    </div>
                </When>
            </div>
        </When>
    )
}