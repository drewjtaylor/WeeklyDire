import { createContext } from 'react';

export const UserContext = createContext({
    email: 'email@email.com',
    username: 'nobody',
    firstName: 'nobody',
    lastName: 'here',
    creator: false,
    admin: false
});