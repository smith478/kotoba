import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from './CardComponent';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserInterface {
    backendName: string;
}

// Just return something on the screen for testing purposes

const UserInterface: React.FC<UserInterface> = ({ backendName }) => {

    return (
        <div>
            <h1>{backendName}</h1>
            <CardComponent card={{ id: 1, name: 'John Doe', email: 'mail' }} />
        </div>
    );
}

export default UserInterface;