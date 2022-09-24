// Relative Path: pages\index.tsx

import { useEffect, useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
//Importing Compoents
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import UsersList from "../Components/Chat/UsersList";

function Home() {

  const [isSSR, setIsSSR] = useState<boolean>(false);
  const [chatList, setChatList] = useState<any>([]);
  const [currentSelectedUser, setCurrentSelectedUser] = useState<any>(null);

  //VALUES
  // userIDSender: this.userIDSender,
  // userNameSender: this.userNameSender,
  // userIDReceiver: this.userIDReceiver,
  // userNameReceiver: this.userNameReceiver,
  // message:this.message,
  // timeSent:this.timeSent,
  // isUserOnline:this.isUserOnline

  const [message, setMessage] = useState<string>('');
  //VALUES

  const [userData, setUserData] = useState<any>(null);
  const [loggedInUserData, setLoggedInUserData] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

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
        const response = await fetch('http://localhost:8000/chat', {
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
        const response = await fetch('http://localhost:8000/user/', {
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

    console.log("The signedIn User is equal to :-=-=-=-=-=-= OBJ=> ", getLoggedInUserData());

    //Getting user data from local storage
    if (typeof window !== "undefined" && isSignedIn == false && localStorage.getItem('signedInUserId') !== null) {
      setIsSignedIn(true);
    }
    else {
      console.log("User is not signed in yet Nor is there a user in local storage");
    }
    //Getting user data from local storage
  })

  let loggedUserData: any = null;
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
      const response = await fetch('http://localhost:8000/chat', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // @ts-ignore
          userIDSender: JSON.parse(localStorage.getItem('loggedInUserData')).id,
          // @ts-ignore
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
      const messaging = await response?.json();

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
        <title>RealTimeChatApp</title>
      </Head>

      <Header />

      <div className="border">
        <div className='chatContainer'>
          {(isSSR) ? (
            <>
              {(localStorage.getItem('loggedInUserData') !== null || isSignedIn !== false) ? (
                <div>
                  {(userData !== null) ? (
                    <>
                      <div className='containerChattingSidebar'>
                        <h4 className='text-center text-dark mt-4'>👋 Welcome
                          {
                            // @ts-ignore
                            JSON.parse(localStorage.getItem('loggedInUserData')).name
                          }!
                        </h4>

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
                          userData.map((item: any, index: number) => {
                            return (
                              <div key={index}>
                                {(userData.length >= 1) ? (
                                  <>
                                    {
                                      // @ts-ignore
                                      (item.id !== JSON.parse(localStorage.getItem('loggedInUserData')).id) ? (
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
                                            loggedInUserName={
                                              // @ts-ignore
                                              JSON.parse(localStorage.getItem('loggedInUserData')).name
                                            }
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
                                  </>
                                ) : (
                                  <>
                                    <h6 style={{ marginLeft: "2%", marginRight: "2%" }} className="text-info">Please add a user to chat with them.You can add here. <Link href="/Register">Add User</Link></h6>
                                  </>
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
                                        chatList.map((item: any, index: number) => {
                                          return (
                                            <div key={index} className="mt-2">
                                              {
                                                // @ts-ignore
                                                (item.userIDSender === JSON.parse(localStorage.getItem('loggedInUserData')).id && item.userIDReceiver === currentSelectedUser.id) ? (
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

                                              {
                                                // @ts-ignore
                                                (item.userIDReceiver === JSON.parse(localStorage.getItem('loggedInUserData')).id && item.userIDSender === currentSelectedUser.id) ? (
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

                          {/* 
                              <div className="d-flex flex-row-reverse mr-2">
                                <div className="insideMainContainerChatReceiver">
                                    <h3>Message: Hello World</h3>
                                    <h6>Send by: Muhammad Bilal</h6>
                                    <h6>Time Sent : 20 July 2021</h6>
                                </div>
                              </div> 
                          */}

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
                    <Link href="/Login">Login Now</Link>
                  </div>
                  <br /><br /><br /><br /><br /><br /><br /><br /><br />
                  <Footer />
                </div>
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
export default Home;