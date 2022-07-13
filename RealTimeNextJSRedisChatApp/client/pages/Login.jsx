import { useEffect, useState } from "react";
import Head from 'next/head';
import Router from 'next/router'
import Link from "next/link";
//Importing Compoents
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Login() {
    const [isSSR, setIsSSR] = useState(false);
    if (typeof window !== "undefined") {
        const { pathname } = Router
    }
    else {
        console.log("Register Page Window is undefined");
    }
    ////////////////////////////////////////////////////////////////////////
    const [usersList, setUsersList] = useState([]);

    // VALUES
    // user.name = req.body.name;
    // user.password = req.body.password;
    // user.timeRegistered = req.body.timeRegistered;
    // user.isSignedIn = req.body.isSignedIn;

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [timeRegistered, setTimeRegistered] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [loggedInUserData, setLoggedInUserData] = useState(null);

    useEffect(() => {
        fetchUsersData();
        // setLoggedInUserData(loggedUserData);
    }, []);

    function fetchUsersData() {
        if (typeof window !== "undefined") {
            (async () => {
                const response = await fetch('https://redisdatabasebackend.as.r.appspot.com/user', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                    }
                });
                const content = await response.json();
                setUsersList(content);
            })();
        }
    }

    function getLoggedInUserData() {
        console.log("user data: ", usersList);
        if (usersList !== null) {
            for (let i = 0; i < usersList.length; i++) {
                if (usersList[i].isSignedIn === true) {
                    console.log("User Data Specific is equal to : ", usersList[i]);
                }
            }
        }
        else {
            console.log("User List is null");
        }
    }

    useEffect(() => {
        console.log(`The users usersList is equal to : `, usersList);
        console.log('The Logged In User Data is equal to : ', loggedUserData);

        if (typeof window !== "undefined") {
            setIsSSR(true);
        }
        else {
            setIsSSR(false);
        }
    })

    let loggedUserData = null;
    loggedUserData = getLoggedInUserData();
    console.log("loggedUserData : ", loggedUserData);

    ////////////////////////////////////////////////////////////////////////



    const loginUser = async (e) => {
        e.preventDefault();

        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].name === name && usersList[i].password === password) {
                setLoggedInUserData(usersList[i]);

                let user = {
                    name: usersList[i].name,
                    password: usersList[i].password,
                    timeRegistered: usersList[i].timeRegistered,
                    isSignedIn: true
                }

                console.log("Signed In User is Equal to :-=-=-=-= Obj ", user);

                //Saving the item to local storage
                localStorage.setItem('loggedInUserData', JSON.stringify(usersList[i]));

                // localStorage.setItem("userID", usersList[i].id);
                // localStorage.setItem("userName", usersList[i].name);
                // localStorage.setItem("userPassword", usersList[i].password);
                // localStorage.setItem("userTimeRegistered", usersList[i].timeRegistered);
                //Saving the item to local storage
                setIsSignedIn(true);
                alert("Successfully You are logged in!, Redirecting to main page");
                Router.push('/');
                return true;
            }
        }
        alert("Invalid Credentials");
    }

    return (
        <div>
            <Head>
                <title>DavesList</title>
            </Head>

            <Header />

            <div className={`container`}>
                <div className={`row`}>
                    <div className={`col-12`}>
                        <br /><br />
                        <br />
                        <h3 className='text-center text-dark mt-4'>NextJS & Redis Based DavesList Login Form</h3>
                        <br />

                        {(isSSR) ? (
                            <>
                                {(localStorage.getItem('loggedInUserData') !== null || loggedInUserData !== null) ? (
                                    <div>
                                        <h4 className='text-center text-dark mt-4'>Welcome {JSON.parse(localStorage.getItem('loggedInUserData')).name}! You are logged In</h4>
                                        <br />
                                        <div className='text-center'>
                                            <button className='btn btn-danger'
                                                onClick={() => {
                                                    localStorage.removeItem('loggedInUserData');
                                                    setIsSignedIn(false);
                                                    alert("You are logged out!, Redirecting to login page");
                                                    setLoggedInUserData(null);
                                                    Router.push('/Login');
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form className='form_styling' onSubmit={loginUser}>
                                        <fieldset>
                                            <legend className="text-center text-primary">Login Here</legend>
                                            <br />
                                            {/* Email input */}
                                            <div className="form-outline mb-4">
                                                <input type="text" id="form2Example1" className="form-control border" onChange={(e) => setName(e.target.value)} />
                                                <label className="form-label" htmlFor="form2Example1">User Name</label>
                                            </div>
                                            {/* Password input */}
                                            <div className="form-outline mb-4">
                                                <input type="password" id="form2Example2" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control border" />
                                                <label className="form-label" htmlFor="form2Example2">Password</label>
                                            </div>
                                            {/* 2 column grid layout for inline styling */}
                                            <div className="row mb-4">
                                                <div className="col d-flex justify-content-center">
                                                    {/* Checkbox */}
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultValue id="form2Example31" defaultChecked />
                                                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    {/* Simple link */}
                                                    <a href="#!">Forgot password?</a>
                                                </div>
                                            </div>
                                            {/* Submit button */}
                                            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                                            {/* Register buttons */}
                                            <div className="text-center">
                                                <p>Not a member? <Link href="/Register">Register</Link></p>
                                            </div>
                                        </fieldset>
                                    </form>
                                )}
                            </>
                        ) : (
                            <h3>Login Page Window is undefined</h3>
                        )}
                        <br />
                    </div>
                </div >
            </div >
            <Footer />
        </div >
    )
}
export default Login;