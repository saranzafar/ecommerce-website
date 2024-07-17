import React, { useState, useEffect } from 'react';
import { ArrowRight, Store } from 'lucide-react';
import axios from 'axios';
import conf from '../conf/conf';
import Cookies from 'js-cookie';
import { PageLoader } from '../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { categoryReducer } from '../store/ecommerceSlice';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function Categories() {
    const [loaderVisibility, setLoaderVisibility] = useState(true);
    const dispatch = useDispatch();
    const fetchCategories = useSelector((state) => state.ecommerce?.categories);
    const categories = fetchCategories;

    useEffect(() => {
        const fetchData = async () => {
            if (fetchCategories && fetchCategories.length > 1) {
                setLoaderVisibility(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${conf.backendUrl}categories/category`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('accessToken')}`,
                        },
                    }
                );
                dispatch(categoryReducer(response.data.data));
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoaderVisibility(false);
            }
        };

        fetchData();
    }, [dispatch, fetchCategories]);

    if (loaderVisibility) {
        return <PageLoader />;
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3'>
            {categories?.length === 0 ? (
                <div className="col-span-full text-center py-10">
                    <h2 className="text-2xl font-semibold">No categories found</h2>
                    <p className="text-gray-500 mt-2">There are no categories available at the moment. Please check back later.</p>
                </div>
            ) : (
                categories?.map((category) => (
                    <div key={category._id} className="px-2 py-2 md:px-6 md:py-10 hover:shadow-lg rounded-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="">
                            <div className="space-y-3">
                                <span className="inline-block rounded-full bg-gray-100 p-3 text-black hover:text-primarys">
                                    <Store size={20} className='text-primary' />
                                </span>
                                <h1 className="text-xl font-semibold capitalize text-black">{category.name}</h1>
                                <p className="text-sm text-gray-500">
                                    Discover a wide range of products in the {category.name} category. We offer high-quality items that meet your needs and preferences.
                                </p>
                                <Link
                                    to={`/category/${category._id}`}
                                    className="-mx-1 inline-flex transform items-center text-sm font-semibold capitalize text-black transition-colors duration-300 hover:underline"
                                >
                                    <span className="mx-1">Search Products</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            )}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}
