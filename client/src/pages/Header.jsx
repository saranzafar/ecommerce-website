import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight, StoreIcon, HeartIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

const menuItems = [
    {
        name: 'Home',
        to: '/',
    },
    {
        name: 'Shop',
        to: '/shop',
        dropdown: [
            { name: 'Category 1', to: '/category1' },
            { name: 'Category 2', to: '/category2' },
            { name: 'Category 3', to: '/category3' },
        ],
    },
    {
        name: 'Contact',
        to: '/contact',
    },
];

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [checkUserAuthentication, setCheckUserAuthentication] = useState(false);
    const [cartItems, setCartItems] = useState(3); // Sample cart items count
    const [wishlistItems, setWishlistItems] = useState(2); // Sample wishlist items count

    useEffect(() => {
        const userCookie = Cookies.get('user');
        const accessTokenCookie = Cookies.get('accessToken');

        if (userCookie && accessTokenCookie) {
            setCheckUserAuthentication(true);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative w-full bg-white border-b py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                <div className="inline-flex items-center space-x-2">
                    <span>
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 50 56"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                                fill="black"
                            />
                        </svg>
                    </span>
                    <span className="font-bold text-2xl">ShopVibe</span>
                </div>
                <div className="hidden grow items-start lg:flex ">
                    <ul className="ml-12 inline-flex space-x-6">
                        {menuItems.map((item) => (
                            <li key={item.name} className="relative group transition-all duration-200">
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `inline-flex items-center text-lg font-semibold ${isActive ? 'text-primary' : 'text-gray-800'} hover:text-gray-900`
                                    }
                                >
                                    {item.name}
                                    {item.dropdown && <ChevronDown className="ml-2 h-4 w-4" />}
                                </NavLink>
                                {item.dropdown && (
                                    <ul className="transition duration-200 absolute left-0 hidden w-48 bg-white border border-gray-200 shadow-lg group-hover:block">
                                        {item.dropdown.map((subItem) => (
                                            <li key={subItem.name}>
                                                <NavLink
                                                    to={subItem.to}
                                                    className="block px-4 py-2 font-semibold text-sm text-gray-800 hover:bg-gray-100"
                                                >
                                                    {subItem.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="hidden space-x-2 lg:block">
                    {checkUserAuthentication ? (
                        <div className='flex gap-x-4'>
                            <div className="relative inline-flex">
                                <NavLink to={"/cart"}>
                                    <StoreIcon className='hover:text-primary transition duration-100 text-gray-900' size={"30"} />
                                </NavLink>
                                {cartItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                                        {cartItems}
                                    </span>
                                )}
                            </div>
                            <div className="relative inline-flex">
                                <NavLink to={"/wishlist"}>
                                    <HeartIcon className='hover:text-primary transition duration-100 text-gray-900' size={"30"} />
                                </NavLink>
                                {wishlistItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                                        {wishlistItems}
                                    </span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <NavLink
                                to={"signup"}
                                className="transition duration-200 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Sign Up
                            </NavLink>
                            <NavLink
                                to={"login"}
                                className="transition duration-200 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Log In
                            </NavLink>
                        </>
                    )}
                </div>
                <div className="lg:hidden">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-800"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.to}
                                className={({ isActive }) =>
                                    `block px-3 py-2 text-base font-semibold ${isActive ? 'text-primary' : 'text-gray-800'} hover:text-gray-900`
                                }
                            >
                                {item.name}
                                {item.dropdown && <ChevronRight className="ml-2 h-4 w-4" />}
                            </NavLink>
                        ))}
                        <div className="mt-4 space-y-1">
                            {checkUserAuthentication ? (
                                <div className='flex gap-x-4'>
                                    <div className="relative inline-flex">
                                        <NavLink to={"/cart"}>
                                            <StoreIcon className='hover:text-primary transition duration-100 text-gray-900' size={"30"} />
                                        </NavLink>
                                        {cartItems > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                                                {cartItems}
                                            </span>
                                        )}
                                    </div>
                                    <div className="relative inline-flex">
                                        <NavLink to={"/wishlist"}>
                                            <HeartIcon className='hover:text-primary transition duration-100 text-gray-900' size={"30"} />
                                        </NavLink>
                                        {wishlistItems > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                                                {wishlistItems}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <NavLink
                                        to={"signup"}
                                        className="block rounded-md bg-transparent px-3 py-2 text-base font-semibold text-black hover:bg-black/10"
                                    >
                                        Sign Up
                                    </NavLink>
                                    <NavLink
                                        to={"login"}
                                        className="block rounded-md bg-primary px-3 py-2 text-base font-semibold text-white hover:bg-primary/90"
                                    >
                                        Log In
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
