import React, { useState, useEffect } from 'react';
import axios from 'axios';
import conf from '../conf/conf';
import Cookies from 'js-cookie';
import Success from '../components/alerts/Success';
import Danger from '../components/alerts/Danger';
import { PageLoader } from '../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCartIcon, HeartIcon } from "lucide-react"
import { saleProductsReducer, addToCartReducer } from '../store/ecommerceSlice';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductCard() {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisibilityS, setAlertVisibilityS] = useState(false);
    const [alertVisibilityD, setAlertVisibilityD] = useState(false);
    const [loaderVisibility, setLoaderVisibility] = useState(true);
    const dispatch = useDispatch();
    const fetchSaleProducts = useSelector((state) => state.ecommerce?.saleProducts);
    const saleProducts = fetchSaleProducts.saleProducts

    useEffect(() => {
        const fetchData = async () => {
            if (fetchSaleProducts && saleProducts?.length > 1) {
                setLoaderVisibility(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${conf.backendUrl}products/get-sale-products?page=1&limit=8`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('accessToken')}`,
                        },
                    }
                );
                dispatch(saleProductsReducer(response.data.message));
                setAlertMessage('Products fetched successfully');
                setAlertVisibilityS(true);
            } catch (err) {
                setAlertMessage(err.message);
                setAlertVisibilityD(true);
            } finally {
                setLoaderVisibility(false);
            }
        };

        fetchData();
    }, [dispatch, fetchSaleProducts, saleProducts?.length]);

    if (loaderVisibility) {
        return <PageLoader />;
    }

    const truncateDescription = (description, wordLimit) => {
        const words = description.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : description;
    };

    const handleAddToCart = (product) => {
        toast.success('Product added to cart!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        const productData = {
            _id: product._id,
            primaryImage: product.primaryImage,
            price: product.sale ? product.sale : product.price,
            name: product.name,
            quantity: 1, // Default quantity to 1
        };
        dispatch(addToCartReducer(productData));
    };

    const toggleWishlist = async (id) => {
        await axios.post(`${conf.backendUrl}wishlist/toggle-wishlist`, { productId: id }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`,
            },
        })
            .then(response => {
                if (response.data.statuscode === 200) {
                    toast.success('Added to Wishlist');
                } else if (response.data.statuscode === 203) {
                    toast.info('Removed From Wishlist');
                }
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
                toast.error('Error handling wishlist action');
            });
    };

    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-6'>
            <Success message={alertMessage} alertVisibilityCheck={alertVisibilityS} />
            <Danger message={alertMessage} alertVisibilityCheck={alertVisibilityD} />
            {saleProducts && saleProducts.map((product, index) => (
                <div className="rounded-md border hover:shadow-lg hover:-translate-y-2 transition-all duration-200" key={saleProducts[index]._id}>

                    <Link to={`/product/${product._id}`}>
                        <img
                            src={product.primaryImage}
                            alt="Laptop"
                            className="aspect-square w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px] opacity-95 hover:opacity-100 duration-200 p-4 object-cover"
                        />
                    </Link>

                    <div className='bg-primary rounded inline text-sm text-gray-100 px-1 ml-3'>Sale</div>
                    <div className="p-4">
                        <h1 className="inline-flex items-center text-lg font-semibold">{product.name} <small className='bg-gray-900 text-gray-100 px-2 rounded ml-2 pb-1 text-sm'>{product.category.name} </small> </h1>

                        <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`flex-shrink-0 size-5 ${index < product.rating ? 'text-yellow-400' : 'text-gray-300'} dark:${index < product.rating ? 'text-yellow-600' : 'text-neutral-600'}`}
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
                            {truncateDescription(product.description, 10)}
                        </p>
                        <div className="mt-3 flex items-center space-x-2">
                            <span className="block text-sm font-semibold">Original Price:</span>
                            <span className="block text-xs font-medium line-through">{product.price}</span>
                            <span className="block text-xs font-medium"> {product.sale} </span>
                        </div>
                        <div className="mt-3 flex items-center space-x-2">
                            <span className="block text-sm font-semibold">Quantity:</span>
                            <span className="block text-xs font-medium">{product.quantity}</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleAddToCart(product)}
                            className={`mt-4 w-full rounded-sm bg-primary px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-supportivePrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
                        >
                            <div className='flex flex-row p-0 m-0 items-center justify-center'>
                                <ShoppingCartIcon />
                                <div>Add To Cart</div>
                            </div>
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
            ))}
            <ToastContainer />
        </div>
    )
}

export default ProductCard;
