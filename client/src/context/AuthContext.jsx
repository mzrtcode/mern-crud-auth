import { createContext, useContext, useState } from 'react';
import { registerRequest } from '../api/auth';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setuser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
        console.log(res.data);
        setuser(res.data);
        setIsAuthenticated(true);
        } catch (error) {
            /* console.log(error.response.data); */
            setErrors(error.response.data);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                signup,
                user,
                isAuthenticated,
                errors
            }}>

            {children}
        </AuthContext.Provider>
    )
}