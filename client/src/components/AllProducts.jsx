import React, { useState, useEffect } from 'react';
import axios from 'axios';
import conf from '../conf/conf';
import Cookies from 'js-cookie';
import Success from '../components/alerts/Success';
import Danger from '../components/alerts/Danger';
import { PageLoader } from '../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { allProductsReducer } from '../store/ecommerceSlice';

function ProductCard() {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisibilityS, setAlertVisibilityS] = useState(false);
    const [alertVisibilityD, setAlertVisibilityD] = useState(false);
    const [loaderVisibility, setLoaderVisibility] = useState(true);
    const dispatch = useDispatch();
    const fetchAllProducts = useSelector((state) => state.ecommerce?.allProducts);
    const allProducts = fetchAllProducts[0]?.products?.products || [];

    useEffect(() => {
        const fetchData = async () => {
            if (fetchAllProducts && fetchAllProducts.length > 1) {
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
    }, [dispatch, fetchAllProducts]);

    if (loaderVisibility) {
        return <PageLoader />;
    }

    const truncateDescription = (description, wordLimit) => {
        const words = description.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : description;
    };

    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-6'>
            <Success message={alertMessage} alertVisibilityCheck={alertVisibilityS} />
            <Danger message={alertMessage} alertVisibilityCheck={alertVisibilityD} />
            {allProducts.map((product) => (
                <div className="rounded-md border hover:shadow-lg hover:-translate-y-2 transition-all duration-200" key={product._id}>
                    <img
                        src={product.primaryImage}
                        alt={product.name}
                        className="aspect-auto w-full rounded-md md:aspect-auto md:h-[200px] lg:h-[200px] opacity-95 hover:opacity-100 duration-300 p-4 h-[200px] object-cover hover:scale-105"
                    />
                    {/* <div className='bg-primary rounded inline text-sm text-gray-100 px-1 ml-3'>Sale</div> */}
                    <div className="p-4">
                        <h1 className="inline-flex items-center text-lg font-semibold">
                            {product.name}
                            <small className='bg-gray-900 text-gray-100 px-2 rounded ml-2 pb-1 text-sm'>
                                {product.category.name}
                            </small>
                        </h1>

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
                            {truncateDescription(product.description, 8)}
                        </p>
                        <div className="mt-3 flex items-center space-x-2">
                            <span className="block text-sm font-semibold">Original Price:</span>
                            <span className="block text-xs font-medium line-through">{product.price}</span>
                            {product.sale && <span className="block text-xs font-medium"> {product.sale} </span>}
                        </div>
                        <div className="mt-3 flex items-center space-x-2">
                            <span className="block text-sm font-semibold">Quantity:</span>
                            <span className="block text-xs font-medium">{product.quantity}</span>
                        </div>
                        <button
                            type="button"
                            className="mt-4 w-full rounded-sm bg-primary px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-supportivePrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductCard;
