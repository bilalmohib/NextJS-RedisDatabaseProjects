import { useEffect, useState } from "react";
import Head from 'next/head';
import Image from 'next/image';
//Importing Compoents
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ListContainer from '../Components/Home/ListContainer';
import UsersList from "../Components/Chat/UsersList";

function Chat() {
    const [isSSR, setIsSSR] = useState(false);

    const [chatList, setChatList] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);

    const [currentSelectedUser, setCurrentSelectedUser] = useState(null);

    //VALUES
    // userIDSender: this.userIDSender,
    // userNameSender: this.userNameSender,
    // userIDReceiver: this.userIDReceiver,
    // userNameReceiver: this.userNameReceiver,
    // message:this.message,
    // timeSent:this.timeSent,
    // isUserOnline:this.isUserOnline

    const [message, setMessage] = useState('');
    //VALUES

    const [userData, setUserData] = useState(null);
    const [loggedInUserData, setLoggedInUserData] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        //For Realtime Updates
        setInterval(() => {
            fetchDataFromAPIGetChat();
            fetchDataFromAPIGETOfUsers();
        }, 1000);
        // setLoggedInUserData(loggedUserData);
    }, []);

    function fetchDataFromAPIGetChat() {
        if (typeof window !== "undefined") {
            (async () => {
                const response = await fetch('https://redisdatabasebackend.as.r.appspot.com/chat', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                    }
                });
                const content = await response.json();
                setChatList(content);
            })();
        }
    }

    function fetchDataFromAPIGETOfUsers() {
        if (typeof window !== "undefined") {
            (async () => {
                const response = await fetch('https://redisdatabasebackend.as.r.appspot.com/user/', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                    }
                });
                const content = await response.json();
                setUserData(content);
            })();
        }
    }

    function getLoggedInUserData() {
        console.log("user data: ", userData);
        if (userData !== null) {
            for (let i = 0; i < userData.length; i++) {
                if (userData[i].isSignedIn === true) {
                    console.log("userData Specific is equal to : ", userData[i]);
                    // setLoggedInUserData(userData[i]);
                    return userData[i];
                }
            }
        }
        else {
            console.log("userData is null");
        }
    }

    useEffect(() => {
        console.log(`The Chat List is equal to : `, chatList);
        console.log('The User Data is equal to : ', userData);
        console.log('The Logged In User Data is equal to : ', loggedUserData);

        if (typeof window !== "undefined") {
            setIsSSR(true);
        }
        else {
            setIsSSR(false);
        }

        if (chatList.length !== 0) {
            setIsLoaded(true);
        }

        console.log("The signedIn User is equal to :-=-=-=-=-=-= OBJ=> ", getLoggedInUserData("loggedInUserData"));

        //Getting user data from local storage
        if (typeof window !== "undefined" && isSignedIn == false && localStorage.getItem('signedInUserId') !== null) {
            setIsSignedIn(true);
        }
        else {
            console.log("User is not signed in yet Nor is there a user in local storage");
        }
        //Getting user data from local storage
    })

    let loggedUserData = null;
    loggedUserData = getLoggedInUserData();
    console.log("loggedUserData : ", loggedUserData);

    const sendMessage = async () => {
        // userIDSender: this.userIDSender,
        // userNameSender: this.userNameSender,
        // userIDReceiver: this.userIDReceiver,
        // userNameReceiver: this.userNameReceiver,
        // message:this.message,
        // timeSent:this.timeSent,
        // isUserOnline:this.isUserOnline

        if (message !== '' && currentSelectedUser !== null && localStorage.getItem('loggedInUserData') !== null && isSSR === true) {
            const response = await fetch('https://redisdatabasebackend.as.r.appspot.com/chat', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userIDSender: JSON.parse(localStorage.getItem('loggedInUserData')).id,
                    userNameSender: JSON.parse(localStorage.getItem('loggedInUserData')).name,
                    userIDReceiver: currentSelectedUser.id,
                    userNameReceiver: currentSelectedUser.name,
                    message: message,
                    timeSent: new Date().toLocaleString(),
                    isUserOnline: true
                })
            }).catch((error) => {
                alert("Error Sending the message : " + error);
                console.log("Error Sending the message: ", error);
            })

            // Fetch the one list data from the API after the POST request
            const messaging = await response.json();

            setChatList([...chatList, messaging]);
            alert("Message Sent Successfully");
            setMessage('');
        } else {
            alert('Please fill all the fields to send a new message');
        }
    }

    return (
        <div>
            <Head>
                <title>DavesList</title>
            </Head>

            <Header />

            <div className="border">
                <div className='chatContainer'>
                    {(isSSR) ? (
                        <>
                            {(isLoaded) ? (
                                <>
                                    {(localStorage.getItem('loggedInUserData') !== null || isSignedIn !== false) ? (
                                        <div>
                                            {(userData !== null) ? (
                                                <>
                                                    <div className='containerChattingSidebar'>
                                                        <h4 className='text-center text-dark mt-4'>👋 Welcome {JSON.parse(localStorage.getItem('loggedInUserData')).name}!</h4>

                                                        <div className="text-center mb-4 mt-4">
                                                            <button className='btn btn-danger'
                                                                onClick={() => {
                                                                    localStorage.removeItem('loggedInUserData');
                                                                    setIsSignedIn(false);
                                                                    window.location.reload();
                                                                    alert("You are logged out Successfully!");
                                                                    // setLoggedInUserData(null);
                                                                    // Router.push('/');
                                                                }}
                                                            >
                                                                Logout
                                                            </button>
                                                        </div>
                                                        <h5 className="text-left mb-4" style={{ paddingLeft: "20px", paddingRight: "20px" }}>🔘 Select a User to start the chat</h5>
                                                        {
                                                            userData.map((item, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        {(item.id !== JSON.parse(localStorage.getItem('loggedInUserData')).id) ? (
                                                                            <div className="chatUsersBox" key={index}>
                                                                                <UsersList
                                                                                    index={index}
                                                                                    // name: this.name,
                                                                                    // password: this.password,
                                                                                    // timeRegistered: this.timeRegistered,
                                                                                    // isSignedIn: this.isSignedIn

                                                                                    //VALUES
                                                                                    id={item.id}
                                                                                    name={item.name}
                                                                                    timeRegistered={item.timeRegistered}

                                                                                    //OTER Important Props
                                                                                    loggedInUserName={JSON.parse(localStorage.getItem('loggedInUserData')).name}
                                                                                    //FUNCTIONS
                                                                                    chatList={chatList}
                                                                                    setChatList={setChatList}

                                                                                    currentSelectedUser={currentSelectedUser}
                                                                                    setCurrentSelectedUser={setCurrentSelectedUser}
                                                                                // userData={userData}
                                                                                />
                                                                            </div>
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className='containerChattingContainer'>
                                                        <div className="topChatSelectedUserInfoBox">
                                                            <h3 className="text-primary mt-2 ml-2">&nbsp; Current User Selected to Chat = {(currentSelectedUser === null) ? ("No User Selected") : (currentSelectedUser.name)} </h3>
                                                        </div>
                                                        <div className="containerMainChat">
                                                            <br /><br /><br />
                                                            <div className="d-flex flex-row ml-2">
                                                                <div>
                                                                    {(chatList !== null && isSSR === true) ? (
                                                                        <div>
                                                                            {(currentSelectedUser !== null) ? (
                                                                                <>
                                                                                    {
                                                                                        chatList.map((item, index) => {
                                                                                            return (
                                                                                                <div key={index} className="mt-2">
                                                                                                    {(item.userIDSender === JSON.parse(localStorage.getItem('loggedInUserData')).id && item.userIDReceiver === currentSelectedUser.id) ? (
                                                                                                        <>
                                                                                                            <div className="insideMainContainerChatSender" key={index}>
                                                                                                                <h3>Sent</h3>
                                                                                                                <div className="chatBoxHeader">
                                                                                                                    <h5 className="text-primary">{item.userNameSender}</h5>
                                                                                                                    <h6 className="text-secondary">{item.timeSent}</h6>
                                                                                                                </div>
                                                                                                                <div className="chatBoxBody">
                                                                                                                    <p className="text-dark">{item.message}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        <></>
                                                                                                    )}

                                                                                                    {(item.userIDReceiver === JSON.parse(localStorage.getItem('loggedInUserData')).id && item.userIDSender === currentSelectedUser.id) ? (
                                                                                                        <>
                                                                                                            <div className="insideMainContainerChatReceiver" key={index}>
                                                                                                                <h3>Received</h3>
                                                                                                                <div className="chatBoxHeader">
                                                                                                                    <h5 className="text-primary">{item.userNameSender}</h5>
                                                                                                                    <h6 className="text-secondary">{item.timeSent}</h6>
                                                                                                                </div>
                                                                                                                <div className="chatBoxBody">
                                                                                                                    <p className="text-dark">{item.message}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        <></>
                                                                                                    )}
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </>
                                                                            ) : (
                                                                                <div>
                                                                                    <h5 className="text-center text-dark">No User Selected. Please select a user to chat</h5>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <h3 className="text-primary">No Messages Yet</h3>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* <div className="d-flex flex-row-reverse mr-2">
                                                        <div className="insideMainContainerChatReceiver">
                                                            <h3>Message: Hello World</h3>
                                                            <h6>Send by: Muhammad Bilal</h6>
                                                            <h6>Time Sent : 20 July 2021</h6>
                                                        </div>
                                                    </div> */}

                                                        </div>
                                                        <div className="containerMessageInput">
                                                            <input className="form-control messageInput" type="text" placeholder="Enter the message here .... " value={message} onChange={(e) => setMessage(e.target.value)} title="Enter" />
                                                            <button className="btn btn-primary btn-lg" onClick={sendMessage}>Send <i className="fas fa-paper-plane"></i></button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <h3 className="text-success text-center">No Users Here <a href="/AddListing">Register Here</a></h3>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="text-center">
                                                <br /><br /><br /><br /><br /><br /><br /><br />
                                                <h4 className='text-center text-dark mt-4'>Please Register or Login to Chat with other registered users</h4>
                                                <a href="/Login">Login Now</a>
                                            </div>
                                            <br />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div class="d-flex justify-content-center">
                                        <div class="spinner-border" role="status">
                                            <h3 class="sr-only">Please wait Fetching Data from Backend Loading...</h3>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <h3>Chat Page Window is undefined</h3>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Chat;