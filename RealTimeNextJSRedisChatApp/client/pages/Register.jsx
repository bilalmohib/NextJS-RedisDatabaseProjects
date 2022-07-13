import { useEffect, useState } from "react";
import Router from 'next/router'
import Head from 'next/head';
//Importing Compoents
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Register() {
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
    const [duplicate, setDuplicate] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    // const [loggedInUserData, setLoggedInUserData] = useState(null);


    useEffect(() => {
        fetchUsersData();
        // setLoggedInUserData(loggedUserData);
    }, []);

    useEffect(() => {
        checkIfUserAlreadyExists();
        if (name === '') {
            setDuplicate(null);
        }
    }, [name]);

    function checkIfUserAlreadyExists() {
        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].name === name) {
                // alert("User already exists! Not allowed to register again! Please login instead!");
                setDuplicate(true);
                return true;
            }
        }
        setDuplicate(false);
        return false;
    }

    function fetchUsersData() {
        if (typeof window !== "undefined") {
            (async () => {
                const response = await fetch('http://localhost:8000/user', {
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
                    // setLoggedInUserData(userData[i]);
                    return usersList[i];
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
    })

    let loggedUserData = null;
    loggedUserData = getLoggedInUserData();
    console.log("loggedUserData : ", loggedUserData);

    ////////////////////////////////////////////////////////////////////////

    const registerUsersData = async (event) => {
        event.preventDefault();
        if (name !== '' && password !== '' && loggedUserData !== null && duplicate === false) {
            const response = await fetch('http://localhost:8000/user', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    password: password,
                    timeRegistered: new Date().toLocaleString(),
                    isSignedIn: isSignedIn
                })
            });

            // Fetch the one list data from the API after the POST request
            const users = await response.json();
            // console.log(users);

            setUsersList([...usersList, users]);
            alert("users Data Added Successfully");
            // Resetting the form
            setName('');
            setPassword('');
            setDuplicate(null);
            fetchUsersData();
            Router.push('/Login');
        } else {
            alert('Please fill all the fields to add a new users to the api');
        }
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
                        <br /><br /><br />
                        <h3 className='text-center text-dark mt-4'>NextJS & Redis Based DavesList Registration Form</h3>
                        <br />
                        <form className='form_styling' onSubmit={registerUsersData}>
                            <fieldset>
                                <legend className="text-center text-primary">Register Here</legend>
                                <br />
                                {/* Email input */}
                                {(duplicate) ? (
                                    <div className="alert alert-danger" role="alert">
                                        <strong>Error!</strong> User already exists! Not allowed to register again! Please login instead!
                                    </div>
                                ) : (duplicate === false) ? (
                                    <div className="alert alert-success" role="alert">
                                        <strong>Success!</strong> User does not exist! You can register now!
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div className="form-outline mb-4">
                                    <input type="text" id="form2Example1" value={name} onChange={(e) => setName(e.target.value)} required className="form-control border" />
                                    <label className="form-label" htmlFor="form2Example1">User Name</label>
                                </div>
                                {/* Password input */}
                                <div className="form-outline mb-4">
                                    <input type="password" id="form2Example2" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-control border" />
                                    <label className="form-label" htmlFor="form2Example2">Password</label>
                                </div>
                                {/* Checked checkbox */}
                                <div className="form-check mb-4">
                                    <input className="form-check-input" type="checkbox" value={isSignedIn} onChange={() => setIsSignedIn(!isSignedIn)} id="flexCheckChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">Keep me Logged In</label>
                                </div>
                                {/* Submit button */}
                                <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>
                                {/* Register buttons */}
                                <div className="text-center">
                                    <p>Already Registered ? <a href="/Login">Login</a></p>
                                </div>
                            </fieldset>
                        </form>

                        <br />

                        {/* <div className='todoListContainer'>
                            {
                                todoList.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <TodoList
                                                id={item.id}
                                                index={index}
                                                title={item.title}
                                                timeSubmitted={item.timeSubmitted}
                                                completed={item.completed}
                                                //Passing States
                                                todoList={todoList}
                                                setTodoList={setTodoList}
                                                isCompleted={isCompleted}
                                                setIsCompleted={setIsCompleted}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div> */}

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
export default Register;