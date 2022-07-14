import { useEffect, useState } from "react";
import Head from 'next/head';
import Image from 'next/image';
//Importing Compoents
import Header from '../Components/Header';
import Footer from '../Components/Footer';
// import TodoList from '../Components/Home/TodoList';

{/* <li onClick={()=>setCategory('News')}><a className="dropdown-item" href="#">News</a></li>
<li onClick={()=>setCategory('News')}><a className="dropdown-item" href="#">Sports</a></li>
<li><a className="dropdown-item" href="#">Politics</a></li>
 <li><a className="dropdown-item" href="#">General Knowledge</a></li>
<li><a className="dropdown-item" href="#">Entertainment</a></li>
<li><a className="dropdown-item" href="#">Science</a></li>
<li><a className="dropdown-item" href="#">Technology</a></li>
<li><a className="dropdown-item" href="#">Gaming</a></li>
<li><a className="dropdown-item" href="#">Trending</a></li>
<li><a className="dropdown-item" href="#">Fashion</a></li> */}

let Category = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
]

function AddListing() {

    const [listingList, setListingList] = useState([]);

    //VALUES
    // category: this.category,
    // title: this.title,
    // description: this.description,
    // isPublic: this.isPublic,
    // userWhoCreated: this.userWhoCreated,

    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loggedInUserData, setLoggedInUserData] = useState(null);

    useEffect(() => {
        fetchDataFromAPIGET();

        fetchDataFromAPIGETOfUsers();

        // setLoggedInUserData(loggedUserData);
    }, []);

    function fetchDataFromAPIGET() {
        if (typeof window !== "undefined") {
            (async () => {
                const response = await fetch('http://localhost:8000/listing', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                    }
                });
                const content = await response.json();
                setListingList(content);
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
        console.log(`The Listing Data is equal to : `, listingList);
        console.log('The User Data is equal to : ', userData);
        console.log('The Logged In User Data is equal to : ', loggedUserData);
    })

    let loggedUserData = null;
    loggedUserData = getLoggedInUserData();
    console.log("loggedUserData : ", loggedUserData);

    const addlistdata = async (e) => {
        e.preventDefault();
        if (JSON.parse(localStorage.getItem('loggedInUserData')) !== null && typeof window !== "undefined") {
            if (category !== '' && title !== '' && description !== '' && loggedUserData !== null) {
                e.preventDefault();
                const response = await fetch('http://localhost:8000/listing', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        category: category,
                        title: title,
                        description: description,
                        isPublic: isPublic,
                        userWhoCreated: JSON.parse(localStorage.getItem('loggedInUserData')).name,
                        timeCreated: new Date().toLocaleString()
                    })
                }).catch(err => {
                    alert("Error in Adding Listing: " + err);
                    console.log(err);
                })

                setListingList([...listingList, listing]);
                setCategory('');
                setTitle('');
                setDescription('');
                setIsPublic(false);

                // Fetch the one list data from the API after the POST request
                const listing = await response.json();
                // console.log(listing);

            } else {
                alert('Please fill all the fields to add a new listing to the api');
            }
            alert("Listing Data Added Successfully");
        } else {
            alert("Please login to add a new listing");
        }
    }

    return (
        <div>
            <Head>
                <title>RealTimeChatApp</title>
            </Head>

            <Header />

            <div className={`container`}>
                <div className={`row`}>
                    <div className={`col-12`}>
                        <br /><br /><br />
                        <h3 className='text-center text-dark mt-4'>NextJS & Redis Based ChatApplication | Add Feedback</h3>
                        <br />
                        <form className='form_styling' onSubmit={addlistdata}>
                            <fieldset>
                                <legend className="text-center text-primary">Add Your Feedback About Chat Application Here</legend>

                                <br />
                                <br />

                                {/* Select Category */}
                                <h6><span className="text-danger">*</span> Selected Score : {category}</h6>
                                <div className="dropdown">
                                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-mdb-toggle="dropdown" aria-expanded="false">
                                        Score
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {
                                            Category.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <li onClick={() => setCategory(item)}><a className="dropdown-item" href="#">{item}</a></li>
                                                    </div>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>

                                <br />

                                {/* Choose that is the Listing Is Public or Private Listing? */}
                                <div>
                                    <h5 className="text-left" style={{ fontWeight: "lighter" }}>Choose that is the Feedback Is Public or Private Listing? <span className="text-danger">*</span></h5>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" onChange={() => setIsPublic(true)} value={isPublic} checked={isPublic} name="Public" id="Public" />
                                        <label className="form-check-label" htmlFor="Public">Public</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="Private" onChange={() => setIsPublic(false)} value={isPublic} checked={!isPublic} id="Private" />
                                        <label className="form-check-label" htmlFor="Private">Private</label>
                                    </div>
                                </div>

                                <br />

                                {/* Title input */}
                                <div className="form-outline mb-4">
                                    <input type="text" id="title" className="form-control border" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the listing title here ... " />
                                    <label className="form-label" htmlFor="title">Title <span className="text-danger">*</span></label>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label" htmlFor="title">Description <span className="text-danger">*</span></label>
                                    <textarea className="form-control border" id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder="Enter the listing description here ... "></textarea>
                                </div>
                                {/* Submit button */}
                                {(category !== '' && title !== '' && description !== '' && loggedUserData !== null) ? (
                                    <>
                                        <h5 className="text-success">You are ready to post</h5>
                                        <button type="submit" className="btn btn-primary btn-block mb-4">Add Feedback to Cloud</button>
                                    </>
                                ) : (
                                    <>
                                        <h5 className="text-danger">Please fill out all the fields with * to submit the form</h5>
                                        <button type="submit" className="btn btn-primary btn-block mb-4" disabled={true}>Add Feedback to Cloud</button>
                                    </>
                                )}

                            </fieldset>
                        </form>

                        <br />

                    </div>
                </div>
            </div>
            {/* <br /><br /><br /> */}
            <Footer />
        </div>
    )
}
export default AddListing;