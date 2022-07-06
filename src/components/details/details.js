import { Card } from 'react-bootstrap'
import axios from 'axios';
import { api } from '../../context/api';
import cookie from 'react-cookies';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './details.scss';

export default function Details() {
    const [item, setItem] = useState([]);
    const params = useParams();

    const getItem = () => {
        axios.get(`${api}/item/${params.id}`, {
            headers: { Authorization: `Bearer ${cookie.load("token")}` },
        })
            .then((response) => {
                // console.log("gettttttt", response.data);
                setItem(response.data);
            });
    };
    useEffect(() => {
            getItem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='details'>
            {
                item.item?<Card className='card-details' style={{ width: '30rem' }}>
                    <Card.Img variant="top" src={item.item.itemImage} />
                    <Card.Body>
                        <div className='card-details-title' >
                        <Card.Title>{item.item.itemName}</Card.Title>
                        <Card.Title>Price :{item.item.itemPrice}$</Card.Title>
                        </div>
                        <Card.Text>
                            {item.item.itemDescription}
                        </Card.Text>
                    </Card.Body>
                </Card>:<div>Loading...</div> 
            }
        </div>
    )
}
