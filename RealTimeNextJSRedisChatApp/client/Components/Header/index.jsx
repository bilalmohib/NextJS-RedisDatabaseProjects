import Link from 'next/link';

const Header = () => {
    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
                {/* Container wrapper */}
                <div className="container-fluid">
                    {/* Toggle button */}
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars" />
                    </button>
                    {/* Collapsible wrapper */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* Navbar brand */}
                        <a className="navbar-brand mt-2 mt-lg-0" href="#">
                            <img src="/logo.png" height={45} title="Redis :) The most loved developers database." alt="Redis" loading="lazy" />
                        </a>
                        {/* Left links */}
                        <ul className="navbar-nav fill me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link href="/">
                                    <a className="nav-link">Home</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/AddListing">
                                    <a className="nav-link" title="Add Listing">Add Listing</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/Login">
                                    <a className="nav-link" title="Login">Login</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/Register">
                                    <a className="nav-link" title="Register">Register</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/Chat">
                                    <a className="nav-link" title="Register">Messaging</a>
                                </Link>
                            </li>
                        </ul>
                        {/* Left links */}
                    </div>
                    {/* Collapsible wrapper */}
                    {/* Right elements */}
                    <div className="d-flex align-items-center">
                        {/* Icon */}
                        <a className="text-reset me-3" title="Learn With Redis University" target="_blank" href="https://university.redis.com/">
                            <img src="https://download.logo.wine/logo/Redis/Redis-Logo.wine.png" className="rounded-circle" height={50} alt="Muhammad Bilal" title="Muhammad Bilal" loading="lazy" />
                        </a>
                        {/* Avatar */}
                        <div className="dropdown">
                            <a className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                <img src="https://media-exp2.licdn.com/dms/image/C4D03AQEXk-Oc_il_Jw/profile-displayphoto-shrink_200_200/0/1624098249818?e=1661385600&v=beta&t=0-YbW3xzYac9E5BEJJ0ShrHJsDOfw2XXoVAyfSpDhmE" className="rounded-circle" height={25} alt="Muhammad Bilal" title="Muhammad Bilal" loading="lazy" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                                <li>
                                    <a className="dropdown-item" title="Linkedin Profile" href="https://www.linkedin.com/in/muhammad-bilal-028843199/">Linkedin</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" title="Github Profile" href="https://github.com/Muhammad-Bilal-7896/">Github</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" title="Email" href="mailto:bilalmohib7896@gmail.com">bilalmohib7896@gmail.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Right elements */}
                </div>
                {/* Container wrapper */}
            </nav>
            {/* Navbar */}

        </>
    )
}
export default Header;