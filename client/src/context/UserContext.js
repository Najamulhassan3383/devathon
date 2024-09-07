import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { SERVER_URL } from '../key';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isUser, setIsUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['x-auth-token']);
    useEffect(() => {
        if (cookies['x-auth-token']) {
            axios.get(`${SERVER_URL}/api/user/verify`, {
                headers: {
                    'x-auth-token': cookies['x-auth-token']
                }
            }).then(res => {
                console.log(res)
                if (res.data.success) {
                    setIsUser(res.data.user);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }, [cookies]);
    useEffect(() => {
        console.log("window.innerWidth", window.innerWidth)
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <UserContext.Provider value={{ isUser, setIsUser, isMobile }}>
            {children}
        </UserContext.Provider>
    );

}