import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import conf from '../conf/conf';
import Cookies from 'js-cookie';
import { wishlistReducer, removeFromWishlistReducer, addToCartReducer } from '../store/ecommerceSlice';
import { PageLoader } from '../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash, ShoppingCart } from 'lucide-react';

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlistProducts = useSelector((state) => state.ecommerce.wishlistProducts);
    const [loaderVisibility, setLoaderVisibility] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(
                    `${conf.backendUrl}wishlist/get-wishlist`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('accessToken')}`,
                        },
                    }
                );
                dispatch(wishlistReducer(response.data.data));
                toast.success("Wishlist loaded successfully!");
            } catch (err) {
                toast.error("Failed to load wishlist");
            } finally {
                setLoaderVisibility(false);
            }
        };

        fetchWishlist();
    }, [dispatch]);

    const toggleWishlist = async (productId) => {
        try {
            const response = await axios.post(
                `${conf.backendUrl}wishlist/toggle-wishlist`,
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    },
                }
            );
            dispatch(wishlistReducer(response.data.data));
            toast.success("Wishlist updated successfully!");
        } catch (err) {
            toast.error("Failed to update wishlist");
        }
    };

    const removeFromWishlist = (productId) => {
        toggleWishlist(productId); // Use the toggle function to handle removing from wishlist
        dispatch(removeFromWishlistReducer(productId));
        toast.success("Removed from wishlist!");
    };

    const addToCart = (product) => {
        dispatch(addToCartReducer(product));
        toast.success("Added to cart!");
    };

    if (loaderVisibility) {
        return <PageLoader />;
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4'>
            {wishlistProducts && wishlistProducts.map((product) => (
                <div key={product._id} className="px-4 py-6 md:px-8 md:py-12 hover:shadow-lg rounded-lg transition-all duration-300 hover:-translate-y-2 hover:bg-yellow-100">
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <img src={product.primaryImage} alt={product.name} className='w-32 h-32 object-cover rounded-lg' />
                        </div>
                        <h1 className="text-xl font-semibold capitalize text-black text-center">{product.name}</h1>
                        <p className="text-sm text-gray-500 text-center">{product.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => removeFromWishlist(product._id)}
                                className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-md transition-colors duration-300 hover:bg-red-700"
                            >
                                <Trash size={16} />
                                <span>Remove</span>
                            </button>
                            <button
                                onClick={() => addToCart(product)}
                                className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-md transition-colors duration-300 hover:bg-green-700"
                            >
                                <ShoppingCart size={16} />
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default Wishlist;
