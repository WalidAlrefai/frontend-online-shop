import Header from '../header/header';
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import { When } from "react-if";
import Main from '../main/main';
import {Route ,Routes} from 'react-router-dom';
import Details from '../details/details';
import Favorite from '../favorite/favorite';
export default function Home() {
    const auth = useContext(AuthContext);
    return (
        // <h1>Home</h1>
        <div>
            <When condition={auth.isLoggedIn}>
                    <Header />
                    <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/item/:id" element={<Details />} />
                    <Route path="/favorite" element={<Favorite />} />
                    </Routes>
            </When>
        </div>
    )
}