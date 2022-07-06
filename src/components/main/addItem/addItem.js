import { Modal, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { api } from '../../../context/api';
import axios from 'axios';
import cookie from 'react-cookies';
// import "./add.css";
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import ReactTooltip from "react-tooltip";

export default function AddItem() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [infoItem, setInfoitem] = useState({
        itemName: "",
        itemImage: "",
        itemDescription: "",
        itemPrice: "teacher",
        userId: `${cookie.load('id')}`,
    });
    const addItem = async (itemName, itemImage, itemDescription, itemPrice, userId) => {
        axios.post(`${api}/createItem`, {
            itemName: itemName,
            itemImage: itemImage,
            itemDescription: itemDescription,
            itemPrice: itemPrice,
            userId: userId,
        }, {
            headers: { Authorization: `Bearer ${cookie.load("token")}` },
        }).then(response => {
            console.log(response.data)
        })
    };

    const handelChange = (e) => {
        e.preventDefault();
        setInfoitem({ ...infoItem, [e.target.name]: e.target.value });
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        addItem(infoItem.itemName, infoItem.itemImage, infoItem.itemDescription, infoItem.itemPrice, infoItem.userId);
        handleClose();
        setTimeout(() => {
            window.location.reload();
        }, 50);

    };

    return (
        <>

            <Button
                onClick={handleShow}
                data-tip="Add new Item"
                style={{ marginLeft: "20px", fontSize: "1.2rem", marginBottom: "20px" }}
            >
                Add Item
            </Button>
            {/* <ReactTooltip /> */}

            <Modal show={show} onHide={handleClose} class="modal-dialog modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#005240" }}>
                        Add New Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={handelSubmit}
                        style={{ width: "70%", margin: "auto" }}
                    >
                        <Row >
                            <Form.Control
                                id="itemName"
                                name="itemName"
                                placeholder="Enter Item Name"
                                type="text"
                                onChange={handelChange}
                            />
                        </Row>
                        <Row >
                            <Form.Control
                                id="itemImage"
                                name="itemImage"
                                placeholder="Enter Link Image"
                                type="text"
                                onChange={handelChange}
                            />
                        </Row>
                        <Row >
                            <Form.Control
                                id="itemPrice"
                                name="itemPrice"
                                placeholder="Enter Item Price"
                                onChange={handelChange}
                            />
                        </Row>
                        <Row >
                                <Form.Control
                                    as="textarea"
                                    onChange={handelChange}
                                    id="itemDescription"
                                    name="itemDescription"
                                    placeholder="Write Description Item"
                                    style={{ height: '100px' }}
                                />
                            
                        </Row>
                        <Button color="success" style={{ marginTop: "20px" }} type='submit'>
                            Add Item
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}