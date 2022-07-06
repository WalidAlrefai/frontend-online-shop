import AddItem from "./addItem/addItem";
import { useEffect, useState } from "react";
import cookie from "react-cookies";
import axios from 'axios';
import { Card, Button, Modal, Form, Row } from "react-bootstrap";
import { When } from "react-if";
import { Link } from "react-router-dom";
import { api } from '../../context/api';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Tooltip from '@mui/material/Tooltip';
import { pink } from '@mui/material/colors';
import './main.scss'



export default function Main() {
    const [items, setItems] = useState([]);
    const [id, setId] = useState('');
    const [show, setShow] = useState(false);
    const [itemUpdated, setItemUpdated] = useState({
        itemName: "",
        itemImage: "",
        itemDescription: "",
        itemPrice: 0,
    });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addItemToFav = async (item) => {
        axios.post(`${api}/addFavorite`, {
            itemName: item.itemName,
            itemImage: item.itemImage,
            itemDescription: item.itemDescription,
            itemPrice: item.itemPrice,
            userId: cookie.load('id'),
        }, {
            headers: { Authorization: `Bearer ${cookie.load("token")}` },
        }).then(response => {
            console.log(response.data)

        })

    };
    const updateItem = async () => {
        axios.put(`${api}/updateItem/${id}`, {
            itemName: itemUpdated.itemName,
            itemImage: itemUpdated.itemImage,
            itemDescription: itemUpdated.itemDescription,
            itemPrice: itemUpdated.itemPrice,
        }, {
            headers: { Authorization: `Bearer ${cookie.load("token")}` },
        }).then(response => {
            console.log(response.data)
        }).finally(() => {
            getItems();
        })
    };
    const getItems = () => {
        axios.get(`${api}/items`, {
            headers: { Authorization: `Bearer ${cookie.load("token")}` },
        })
            .then((response) => {
                console.log("gettttttt", response.data);
                setItems(response.data);
            });
    };
    const deleteItem = async (id) => {
        axios.delete(`${api}/deleteItem/${id}`, {
            headers: { Authorization: `Bearer ${cookie.load("token")}` },
        }).then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            getItems();
        }
        )
    }
    const handelChange = (e) => {
        e.preventDefault();
        setItemUpdated({ ...itemUpdated, [e.target.name]: e.target.value });
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        updateItem();
        handleClose();
    }
    function selectID(id) {
        setId(id);
        handleShow();
    }
    useEffect(() => {
            getItems();
    }, []);

    return (
        <div className='main'>
            <div style={{margin:'0 0 0 1.9%'}} >
                <AddItem  />
            </div>
            <div className="card-items">
                {
                    items.items?.map((item) => {
                        let linkUrl = `/item/${item.id}`;
                        return (
                            <div>
                                <Card className="item-card" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.itemImage} />
                                    <Card.Body>
                                        <Card.Title>{item.itemName}</Card.Title>
                                    </Card.Body>
                                    <div className='card-footer'>
                                        <div className="view-details">
                                            <Link to={linkUrl} size="small" color="primary">
                                                VIEW DETAILS
                                            </Link>
                                        </div>
                                        <div className="btn-cards">
                                            <When condition={item.userId === cookie.load("id")}>
                                                <Tooltip title="Delete Item" arrow>
                                                    <DeleteIcon id="deleteB" sx={{ fontSize: 30 }} style={{ color: "red" }} onClick={() => { deleteItem(item.id) }} />
                                                </Tooltip>
                                                <Tooltip title="Update Item" arrow>
                                                    <EditIcon id="editB"
                                                        style={{ color: "yellow" }}
                                                        sx={{ fontSize: 30 }}
                                                        onClick={() => { selectID(item.id) }}
                                                    />
                                                </Tooltip>
                                            </When>
                                            <Tooltip title="Add to favorite" arrow>
                                                <FavoriteOutlinedIcon id='favoriteB' onClick={() => { addItemToFav(item) }} sx={{ color: pink[500] }} />
                                            </Tooltip>
                                        </div>
                                    </div>
                                    {/* <AddShoppingCartIcon sx={{ fontSize: 40 }}/> */}
                                </Card>


                                <Modal show={show} onHide={handleClose} class="modal-dialog modal-lg">
                                    <Modal.Header closeButton>
                                        <Modal.Title style={{ color: "#005240" }}>
                                            Update Items
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
                                                    placeholder="itemName"
                                                    type="text"
                                                    onChange={handelChange}
                                                    defaultValue={item.itemName}
                                                />
                                                <Form.Control
                                                    id="itemImage"
                                                    name="itemImage"
                                                    placeholder="itemImage"
                                                    type="text"
                                                    onChange={handelChange}
                                                    defaultValue={item.itemImage}
                                                />
                                                <Form.Control
                                                    id="itemPrice"
                                                    name="itemPrice"
                                                    placeholder="itemPrice"
                                                    type="number"
                                                    onChange={handelChange}
                                                    defaultValue={item.itemPrice}
                                                />
                                                <Form.Group>
                                                    <textarea
                                                        rows="4" cols="50"
                                                        onChange={handelChange}
                                                        id="itemDescription" className="input-class" name="itemDescription" placeholder="Item description"
                                                        defaultValue={item.itemDescription}
                                                    />
                                                </Form.Group>
                                                <Button color="success" style={{ marginTop: "20px" }} type='submit'>
                                                    Update
                                                </Button>
                                            </Row>
                                        </Form>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}