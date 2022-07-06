import React, { useState, useEffect } from 'react';
import JWT from 'jwt-decode';
import axios from 'axios';
import cookie from 'react-cookies';
import base64 from 'base-64';

import { api } from './api'
export const AuthContext = React.createContext();


export default function Auth(props) {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const signUp = async (userName, email, password, firstName = "", lastName = "") => {
        axios.post(`${api}/signup`, {
            userName: userName,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
            .then(res => {
                console.log(res);
        })
    }
    const signIn = async (userName, password) => {
        console.log({userName, password});
        axios.post(`${api}/signin`, {
            userName: userName,
            password: password
        }, { headers: { 'Authorization': `Basic ${base64.encode(`${userName}:${password}`)}` } }).then(res => {
            console.log(res.data,'res.data');
            validToken(res.data);
        })
    }
    const signOut = () => {
        setIsLoggedIn(false);
        setUser({});
        cookie.remove('token');
        cookie.remove('id');
        cookie.remove('username')
        // setTimeout(() =>window.location.reload(),50)
    }
    const validToken = (user) => {
        if (user) {
            const validUser = JWT(user.userInfo.token);
            console.log(user)
            if (validUser) {
                setUser(user.userInfo);
                setIsLoggedIn(true);
                cookie.save('username', user.userInfo.userName)
                cookie.save('token', user.userInfo.token);
                console.log(user)
                cookie.save('id', user.userInfo.id)
                console.log({isLoggedIn});
            } else {
                setIsLoggedIn(false);
                setUser({});
            }
        } else {
            setIsLoggedIn(false);
            setUser({});
        }
    }
    const Authorized = (action) => {
        return user?.action?.includes(action);
    }
    const state = {
        user,
        isLoggedIn,
        signUp,
        signIn,
        signOut,
        Authorized,
        setUser,
        setIsLoggedIn,
    }
    useEffect(() => {
        const data = cookie.load('token');
        if (data) {
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}