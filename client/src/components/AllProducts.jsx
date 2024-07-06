import React, { useState, useEffect } from 'react';
import axios from 'axios';
import conf from '../conf/conf';
import Cookies from 'js-cookie';
import { PageLoader } from '../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { allProductsReducer, addToCartReducer } from '../store/ecommerceSlice';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ShoppingCartIcon, HeartIcon } from "lucide-react"
import 'react-toastify/dist/ReactToastify.css';

function ProductCard() {
    const [loaderVisibility, setLoaderVisibility] = useState(true);
    const dispatch = useDispatch();
    const fetchAllProducts = useSelector((state) => state.ecommerce?.allProducts);
    const allProducts = fetchAllProducts?.products || [];

    useEffect(() => {
        const fetchData = async () => {
            if (fetchAllProducts && allProducts.length > 0) {
                setLoaderVisibility(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${conf.backendUrl}products/get-all-products?page=1&limit=30`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('accessToken')}`,
                        },
                    }
                );
                dispatch(allProductsReducer(response.data.message));
                toast.success('Products fetched successfully', {
                    position: "bottom-right",
                    autoClose: 2000,
                });
            } catch (err) {
                toast.error(`Error: ${err.message}`, {
                    position: "bottom-right",
                    autoClose: 2000,
                });
            } finally {
                setLoaderVisibility(false);
            }
        };

        fetchData();
    }, [allProducts.length, dispatch, fetchAllProducts]);

    if (loaderVisibility) {
        return <PageLoader />;
    }

    const truncateDescription = (description, wordLimit) => {
        const words = description.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : description;
    };

    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) return 0;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return totalRating / reviews.length;
    };

    const handleAddToCart = (product) => {
        const productData = {
            _id: product._id,
            primaryImage: product.primaryImage,
            price: product.sale ? product.sale : product.price,
            name: product.name,
            quantity: 1, // Default quantity to 1
        };
        dispatch(addToCartReducer(productData));
        toast.success('Product added to cart!', {
            position: "bottom-right",
        });
    };

    const toggleWishlist = async (id) => {
        await axios.post(`${conf.backendUrl}wishlist/toggle-wishlist`, { productId: id }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`,
            },
        })
            .then(response => {
                if (response.data.statuscode === 200) {
                    toast.success('Added to Wishlist',  {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else if (response.data.statuscode === 203) {
                    toast.info('Removed From Wishlist');
                }
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
                toast.error('Error handling wishlist action', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-6'>
            {allProducts.map((product) => {
                const averageRating = calculateAverageRating(product.reviews);
                return (
                    <div className="rounded-md border hover:shadow-lg hover:-translate-y-1 transition-all duration-200" key={product._id}>
                        <Link
                            to={`/product/${product._id}`}
                        >
                            <img
                                src={product.primaryImage}
                                alt={product.name}
                                className="aspect-auto w-full rounded-md md:aspect-auto md:h-[200px] lg:h-[200px] opacity-95 hover:opacity-100 duration-300 p-4 h-[200px] object-cover hover:scale-105"
                            />
                        </Link>

                        <div className="p-4">
                            <h1 className="inline-flex items-center text-lg font-semibold flex-wrap mb-3">
                                {product.name}
                                <small className='bg-gray-900 text-gray-100 px-2 rounded ml-2 pb-1 text-sm'>
                                    {product.category.name}
                                </small>
                            </h1>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`flex-shrink-0 size-5 ${index < averageRating ? 'text-yellow-400' : 'text-gray-300'} dark:${index < averageRating ? 'text-yellow-600' : 'text-neutral-600'}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                ))}
                            </div>
                            <p className="mt-3 text-sm text-gray-600">
                                {truncateDescription(product.description, 8)}
                            </p>
                            <div className="mt-3 flex items-center space-x-2">
                                <span className="block text-sm font-semibold">Original Price:</span>
                                {
                                    product.sale ? (
                                        <>
                                            <span className="block text-xs font-medium line-through">{product.price}</span>
                                            <span className="block text-xs font-medium"> {product.sale} </span>
                                        </>
                                    ) : (
                                        <span className="block text-xs font-medium">{product.price}</span>
                                    )
                                }
                            </div>
                            <div className="mt-3 flex items-center space-x-2">
                                <span className="block text-sm font-semibold">Quantity:</span>
                                <span className="block text-xs font-medium">{product.quantity}</span>
                            </div>
                            <div className="mt-3 flex items-center space-x-2">
                                <span className="block text-sm font-semibold">Reviews:</span>
                                <span className="block text-xs font-medium">{product.reviews.length}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleAddToCart(product)}
                                className="mt-4 w-full rounded-sm bg-primary px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-supportivePrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black flex gap-2 justify-center items-center"
                            >
                                <ShoppingCartIcon />
                                Add to Cart
                            </button>
                            <button
                                type="button"
                                onClick={() => toggleWishlist(product._id)}
                                className="mt-4 w-full rounded-sm text-gray-900 border border-primary px-2 py-1.5 text-sm font-semibold shadow-sm hover:bg-yellow-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black flex gap-2 justify-center items-center"
                            >
                                <HeartIcon className='text-gray-800' />
                                Add to Wishlist
                            </button>
                        </div>
                    </div>
                );
            })}
            <ToastContainer />
        </div>
    )
}

export default ProductCard;
