import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import conf from '../conf/conf';
import Cookies from 'js-cookie';
import { wishlistReducer, removeFromWishlistReducer, addToCartReducer } from '../store/ecommerceSlice';
import { PageLoader } from '../components';
import { Trash, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const dispatch = useDispatch();
    const [loaderVisibility, setLoaderVisibility] = useState(true);
    const fetchWishlistProducts = useSelector((state) => state.ecommerce?.wishlistProducts);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (fetchWishlistProducts.length > 1) {
                setLoaderVisibility(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${conf.backendUrl}wishlist/get-wishlist`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('accessToken')}`,
                        },
                    }
                );
                dispatch(wishlistReducer(response.data.data))
            } catch (err) {
                toast.error("Failed to load wishlist", {
                    position: "bottom-right",
                    autoClose: 2000,
                });
            } finally {
                setLoaderVisibility(false);
            }
        };

        fetchWishlist();
    }, [dispatch, fetchWishlistProducts?.length]);

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
            console.log("Togglewishlist", response.data);
            toast.success("Wishlist updated successfully!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            toast.error("Failed to update wishlist", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const removeFromWishlist = async (productId) => {
        await toggleWishlist(productId);
        dispatch(removeFromWishlistReducer(productId))
        toast.success("Removed from wishlist!", {
            position: "bottom-right",
            autoClose: 2000,
        });
    };

    const addToCart = (product) => {
        dispatch(addToCartReducer(product));
        toast.success("Added to cart!", {
            position: "bottom-right",
            autoClose: 2000,
        });
    };

    if (loaderVisibility) {
        return <PageLoader />;
    }

    return (

        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-10'>
            {fetchWishlistProducts?.length === 0 ? (
                <div className="col-span-full text-center py-10">
                    <h2 className="text-2xl font-semibold">No products found</h2>
                    <p className="text-gray-500 mt-2">Goto
                        <Link to={"/"} className='text-primary hover:underline px-1'>Home</Link>
                        or
                        <Link to={"/shop"} className='text-primary hover:underline px-1'>Shop</Link>
                        page and add product to wishlist first!</p>
                </div>
            ) : (
                fetchWishlistProducts?.map((product) => (
                    <div key={product._id} className="px-4 py-6 md:px-8 md:py-12 shadow">
                        <div className="space-y-4">
                            <div className="flex justify-center">
                                <Link
                                    to={`/product/${product._id}`}
                                >
                                    <img
                                        src={product.primaryImage}
                                        alt={product.name}
                                        className="w-32 h-32 object-contain rounded-lg hover:shadow"
                                    />
                                </Link>
                            </div>
                            <h1 className="text-xl font-semibold capitalize text-black text-center">{product.name}</h1>
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => removeFromWishlist(product._id)}
                                    className="flex items-center space-x-1 px-3 py-2 border border-red-600 text-red-600 rounded-md transition-colors duration-300 hover:bg-red-600 hover:text-white"
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
                )))
            }
            <ToastContainer />
        </div>
    );
};

export default Wishlist;
