import { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartReducer, removeFromCartReducer, updateCartQuantityReducer } from '../store/ecommerceSlice';

export default function Cart() {
    const fetchCartData = useSelector((state) => state.ecommerce?.cartProducts) || [];
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const [dataToBeSend, setDataToBeSend] = useState(fetchCartData);

    console.log("Fetch cart Data = ", dataToBeSend);

    const calculateSubtotal = () => {
        return fetchCartData.reduce((total, item) => total + (item.cartProduct.price * item.cartProduct.quantity), 0);
    };

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCartReducer(productId));
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateCartQuantityReducer({ productId, quantity: newQuantity }));
        }
    };

    return (
        <Dialog className="relative z-10" open={open} onClose={setOpen}>
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
            />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            {fetchCartData.length > 0 ? (
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {fetchCartData.map((item, index) => (
                                                        <li key={index} className="flex py-6">
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img
                                                                    src={item.cartProduct.primaryImage}
                                                                    alt={item.cartProduct.name}
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            </div>
                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>{item.cartProduct.name}</h3>
                                                                        <p className="ml-4">${item.cartProduct.price}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <div className="flex items-center">
                                                                        <button
                                                                            type="button"
                                                                            className="px-2 py-1 text-gray-500"
                                                                            onClick={() => handleQuantityChange(item.cartProduct._id, item.cartProduct.quantity - 1)}
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <span className="mx-2">{item.cartProduct.quantity}</span>
                                                                        <button
                                                                            type="button"
                                                                            className="px-2 py-1 text-gray-500"
                                                                            onClick={() => handleQuantityChange(item.cartProduct._id, item.cartProduct.quantity + 1)}
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                    <div className="flex">
                                                                        <button
                                                                            type="button"
                                                                            className="font-medium text-green-600 hover:text-red-500"
                                                                            onClick={() => handleRemoveItem(item.cartProduct._id)}
                                                                            set
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-center text-gray-500">Your cart is empty.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${calculateSubtotal().toFixed(2)}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Cash on Delivery</p>
                                    <div className="mt-6">
                                        <a
                                            href="#"
                                            className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                                        >
                                            Place Order
                                        </a>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            or{' '}
                                            <button
                                                type="button"
                                                className="font-medium text-green-600 hover:text-primary"
                                                onClick={() => setOpen(false)}
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
