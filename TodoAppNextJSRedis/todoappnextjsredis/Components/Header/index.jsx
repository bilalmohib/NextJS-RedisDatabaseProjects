const Header = () => {
    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" target="_blank" title="Learn Redis" href="https://university.redis.com/">Learn Redis</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" target="_blank" title="Try Redis" href="https://redis.com/try-free/">Try Redis</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" target="_blank" title="Get Certified" href="https://university.redis.com/certification/">Get Certified</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" target="_blank" title="Find Redis" href="https://www.linkedin.com/company/redisinc/">Find Redis</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" target="_blank" title="Redis Users" href="https://redis.io/docs/about/users/">Redis Users</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" target="_blank" title="Redis is one of the most loved database on stack overflow survey.Lets check" href="https://insights.stackoverflow.com/survey/2021#most-loved-dreaded-and-wanted-database-love-dread">Most Loved</a>
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
                                    <a className="dropdown-item" title="Upwork Profile" href="https://www.upwork.com/freelancers/~013a136c7081592898">Upwork</a>
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