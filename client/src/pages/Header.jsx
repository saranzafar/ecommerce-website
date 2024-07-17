import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { ChevronDown, HeartIcon, BellIcon, ShoppingCartIcon, } from 'lucide-react';
import { Cart } from '../pages/index';
import { useSelector } from 'react-redux';

const menuItems = [
    {
        name: 'Home',
        to: '/',
    },
    {
        name: 'Shopping',
        to: '/shop',
    },
    {
        name: 'Contact',
        to: '/contact',
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Header() {
    const [checkUserAuthentication, setCheckUserAuthentication] = useState(false);
    const [cartVisibility, setCartVisibility] = useState(false);

    const cartItems = useSelector((state) => state.ecommerce?.cartProducts?.length);
    const wishlistItems = useSelector((state) => state.ecommerce?._wishlistItems?.length);


    useEffect(() => {
        const userCookie = Cookies.get('user');
        const accessTokenCookie = Cookies.get('accessToken');

        if (userCookie && accessTokenCookie) {
            setCheckUserAuthentication(true);
        }
    }, []);

    const handleCartClick = () => {
        setCartVisibility(!cartVisibility);
    };

    return (
        <Disclosure as="nav" className="bg-white/30 border-b backdrop-blur-sm sticky top-0 z-10">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            {cartVisibility ? <Cart /> : null}
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-800">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="size-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                    </svg>
                                    <span className="font-bold text-xl">ShopVibe</span>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {menuItems.map((item) => (
                                            <div key={item.name} className="relative group">
                                                <NavLink
                                                    to={item.to}
                                                    className={({ isActive }) =>
                                                        classNames(
                                                            isActive ? 'text-primary' : 'text-gray-800',
                                                            'inline-flex items-center text-lg font-semibold hover:text-gray-900'
                                                        )
                                                    }
                                                >
                                                    {item.name}
                                                    {item.dropdown && <ChevronDown className="ml-2 h-4 w-4" />}
                                                </NavLink>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {checkUserAuthentication ? (
                                    <div className="flex space-x-4">
                                        <div className="relative">
                                            <ShoppingCartIcon
                                                onClick={handleCartClick}
                                                className="hover:text-primary transition duration-100 text-gray-900"
                                                size={26}
                                            />
                                            {cartItems > 0 && (
                                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                                                    {cartItems}
                                                </span>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <NavLink to="/wishlist">
                                                <HeartIcon
                                                    className="hover:text-primary transition duration-100 text-gray-900"
                                                    size={26}
                                                />
                                                <span className="absolute -top-1 -right-1 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                                                </span>
                                            </NavLink>
                                            {wishlistItems > 0 && (
                                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                                                    {wishlistItems}
                                                </span>
                                            )}
                                        </div>
                                        <Menu as="div" className="relative ml-3">
                                            <MenuButton>
                                                <span className="sr-only">Open user menu</span>
                                                <BellIcon className="h-6 w-6 text-gray-800" />
                                                <span className="absolute -top-1 -right-1 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                                                </span>
                                            </MenuButton>
                                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <MenuItem>
                                                    {({ active }) => (
                                                        <NavLink
                                                            to="/notification"
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Notifications
                                                        </NavLink>
                                                    )}
                                                </MenuItem>
                                                <MenuItem>
                                                    {({ active }) => (
                                                        <NavLink
                                                            to="/signout"
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Sign out
                                                        </NavLink>
                                                    )}
                                                </MenuItem>
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                ) : (
                                    <div className="flex space-x-4">
                                        <NavLink
                                            to="/signup"
                                            className="relative inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 bg-primary text-base font-semibold text-white hover:bg-primary-700"
                                        >
                                            Signup
                                        </NavLink>
                                        <NavLink
                                            to="/login"
                                            className="relative inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 bg-primary text-base font-semibold text-white hover:bg-primary-700"
                                        >
                                            Login
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {menuItems.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as={NavLink}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        classNames(
                                            isActive ? 'bg-primary text-white' : 'text-gray-800 hover:bg-gray-100',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )
                                    }
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
