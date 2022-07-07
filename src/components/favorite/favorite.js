import axios from 'axios';
import cookie from 'react-cookies';
import { api } from '../../context/api';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from '@mui/material/Tooltip';
import './favorite.scss';

export default function Favorite() {
    const [items, setItems] = useState([]);
    const getItems = () => {
        axios.get(`${api}/allfavoritesForUser/${cookie.load('id')}`, {
            headers: { Authorization: `Bearer ${cookie.load("token")}` },
        })
            .then((response) => {
                // console.log("gettttttt", response.data);
                setItems(response.data);
            });
    };
    const deleteItem = async (id) => {
        axios.delete(`${api}/removeFavorite/${id}`, {
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
    useEffect(() => {
        getItems()
    }, [])
    return (
        <div className="cards-favorites">
            {
                items.allItemsForUser?.map(item => {
                    return (
                        <Card className='card-favorite'  style={{ width: '24rem' }}>
                            <Card.Img variant="top" src={item.itemImage} />
                            <Card.Body>
                                <div className="card-favorites-title">
                                    <Card.Title>{item.itemName}</Card.Title>
                                    <Card.Title>Price :{item.itemPrice}$</Card.Title>
                                </div>
                                <Card.Text>
                                    {item.itemDescription}
                                </Card.Text>
                            </Card.Body>
                            <Tooltip title="Remove from favorite" arrow>

                                <DeleteIcon id="deleteB" sx={{ fontSize: 40 }} style={{ color: "red"}} onClick={() => { deleteItem(item.id) }} />
                            </Tooltip>
                        </Card>
                    )
                })
            }
        </div>
    )
}