// Relative Path : Components\Chat\UsersList\index.tsx

import React, { useState, useEffect } from 'react';

interface PropsType {
    index: number;
    id: number;
    name: string;
    timeRegistered: string;
    loggedInUserName: string;
    chatList: any;
    setChatList: any;
    currentSelectedUser: any;
    setCurrentSelectedUser: any;
}

const UsersList: React.FC<PropsType> = (props) => {
    // id={item.id}
    // name={item.name}
    // timeRegistered={item.timeRegistered}
    // loggedInUserName={JSON.parse(localStorage.getItem('loggedInUserData')).name}
    const { id, name, timeRegistered, loggedInUserName, currentSelectedUser, setCurrentSelectedUser } = props;

    return (
        <button className='btn btn-light userChatSidebarDiv' onClick={() => setCurrentSelectedUser({
            name: name,
            id: id
        })} role={"button"}>
            {/* <h6>Id: {id}</h6> */}
            <h6 className='text-dark text-name-user'>{name}</h6>
            {/* <h6>Time Registered: {timeRegistered}</h6> */}
            {/* <h6>Logged In User Name: {loggedInUserName}</h6> */}
        </button>
    )
}
export default UsersList;