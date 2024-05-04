import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    const sidebarRef = useRef(null);

    useEffect(() => {
        const sidebar = sidebarRef.current;
        const toggle = sidebar.querySelector('.toggle');
        const searchBtn = sidebar.querySelector('.search-box');
        const modeSwitch = sidebar.querySelector('.toggle-switch');
        const modeText = sidebar.querySelector('.mode-text');

        toggle.addEventListener("click", () => {
            sidebar.classList.toggle("close");
        });

        searchBtn.addEventListener("click", () => {
            sidebar.classList.remove("close");
        });

        modeSwitch.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            if (document.body.classList.contains("dark")) {
                modeText.innerText = "Light mode";
            } else {
                modeText.innerText = "Dark mode";
            }
        });
    }, []);

    return (
        <nav ref={sidebarRef} className="sidebar close">
            <header>
                <div className="image-text">
                    <span className="image">
                        <img src="logo.png" alt="" />
                    </span>

                    <div className="text logo-text">
                        <span className="name">Codinglab</span>
                        <span className="profession">Web developer</span>
                    </div>
                </div>

                <i className='bx bx-chevron-right toggle'></i>
            </header>

            <div className="menu-bar">
                <div className="menu">

                    <li className="search-box">
                        <i className='bx bx-search icon'></i>
                        <input type="text" placeholder="Search Ganes..." />
                    </li>

                    <ul className="menu-links">
                        <li className="nav-link">
                            <Link to="machine">
                                <i className='bx bx-cable-car icon'></i>
                                <span className="text nav-text">Machine</span>
                            </Link>
                        </li>

                        <li class="nav-link">
                            <Link to="command">
                                <i class='bx bx-cable-car icon'></i>
                                <span class="text nav-text">Machine</span>
                            </Link>
                        </li>

                        <li class="nav-link">
                            <Link href="#">
                                <i class='bx bx-bar-chart-alt-2 icon'></i>
                                <span class="text nav-text">Revenue</span>
                            </Link>
                        </li>

                        <li class="nav-link">
                            <Link href="#">
                                <i class='bx bx-bell icon'></i>
                                <span class="text nav-text">Notifications</span>
                            </Link>
                        </li>

                        <li class="nav-link">
                            <Link href="#">
                                <i class='bx bx-pie-chart-alt icon'></i>
                                <span class="text nav-text">Analytics</span>
                            </Link>
                        </li>

                        <li class="nav-link">
                            <Link href="#">
                                <i class='bx bx-heart icon'></i>
                                <span class="text nav-text">Likes</span>
                            </Link>
                        </li>

                        <li class="nav-link">
                            <Link href="#">
                                <i class='bx bx-wallet icon'></i>
                                <span class="text nav-text">Wallets</span>
                            </Link>
                        </li>

                    </ul>
                </div>

                <div className="bottom-content">
                    <li>
                        <Link to="#">
                            <i className='bx bx-log-out icon'></i>
                            <span className="text nav-text">Logout</span>
                        </Link>
                    </li>

                    <li className="mode">
                        <div className="sun-moon">
                            <i className='bx bx-moon icon moon'></i>
                            <i className='bx bx-sun icon sun'></i>
                        </div>
                        <span className="mode-text text">Dark mode</span>

                        <div className="toggle-switch">
                            <span className="switch"></span>
                        </div>
                    </li>

                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
