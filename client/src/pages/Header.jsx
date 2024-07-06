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
import { ChevronDown, StoreIcon, HeartIcon, BellIcon, ShoppingCartIcon } from 'lucide-react';
import { Cart } from '../pages/index';
import { useDispatch, useSelector } from 'react-redux';

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <Disclosure as="nav" className="bg-white border-b">
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
                                            </MenuButton>
                                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <MenuItem>
                                                    {({ active }) => (
                                                        <NavLink
                                                            to="/settings"
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            Settings
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
