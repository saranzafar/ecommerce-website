import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PageLoader } from '../components';
import conf from '../conf/conf';
import Cookies from 'js-cookie';
import { addToCartReducer } from '../store/ecommerceSlice';
import { ShoppingCartIcon, HeartIcon } from "lucide-react";

function CategoryProducts() {
    const [allProducts, setAllProducts] = useState([])
    const { id } = useParams();
    const [loaderVisibility, setLoaderVisibility] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${conf.backendUrl}categories/category/${id}/products?limit=10&sortType=createdAt`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('accessToken')}`,
                        },
                    }
                );
                setAllProducts(response.data.products)

            } catch (err) {
                console.log("Error:", err);
                toast.error(`Error: ${err.response?.data?.message || err.message}`,
                    {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
            } finally {
                setLoaderVisibility(false);
            }
        };

        fetchData();
    }, [id, dispatch]);

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
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const toggleWishlist = async (id) => {
        try {
            const response = await axios.post(`${conf.backendUrl}wishlist/toggle-wishlist`, { productId: id }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            });
            if (response.data.statuscode === 200) {
                toast.success('Added to Wishlist 444', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (response.data.statuscode === 203) {
                toast.info('Removed From Wishlist', { position: "bottom-right" });
            }
        } catch (error) {
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
        }
    };

    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-6'>
            {allProducts.length > 0 ? (allProducts?.map((product) => {
                const averageRating = calculateAverageRating(product.reviews);
                return (
                    <div className="rounded-md border hover:shadow-lg hover:-translate-y-1 transition-all duration-200" key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <img
                                src={product.primaryImage}
                                alt={product.name}
                                className="aspect-auto w-full rounded-md md:aspect-auto md:h-[200px] lg:h-[200px] opacity-95 hover:opacity-100 duration-300 p-4 h-[200px] object-cover hover:scale-105"
                            />
                        </Link>

                        <div className="p-4">
                            <h1 className="inline-flex items-center text-lg font-semibold flex-wrap mb-3">
                                {product.name}
                            </h1>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`flex-shrink-0 size-5 ${index < averageRating ? 'text-yellow-400' : 'text-gray-300'} dark:${index < averageRating ? 'text-yellow-600' : 'text-neutral-600'}`}
                                        xmlns="http://www.w3.org/3000/svg"
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
            })) : (
                <div className=''>
                    <img src="/imgs/product-not-found.png" alt="Product Not Found" />
                    <p className='flex justify-center items-center text-lg font-semibold'>No product found</p>
                </div>
            )}
            <ToastContainer />
        </div>
    )
}

export default CategoryProducts;
