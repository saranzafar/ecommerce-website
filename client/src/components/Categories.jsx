import React, { useState, useEffect } from 'react'
import { Copy, ArrowRight, Store } from 'lucide-react'
import axios from 'axios';
import conf from '../conf/conf';
import Cookies from 'js-cookie';
import Success from '../components/alerts/Success';
import Danger from '../components/alerts/Danger';
import { PageLoader } from '../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { categoryReducer } from '../store/ecommerceSlice';

export default function Categories() {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisibilityS, setAlertVisibilityS] = useState(false);
    const [alertVisibilityD, setAlertVisibilityD] = useState(false);
    const [loaderVisibility, setLoaderVisibility] = useState(true);
    const dispatch = useDispatch();
    const fetchCategories = useSelector((state) => state.ecommerce?.categories);
    const categories = fetchCategories[0]?.products

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
                setAlertMessage(err.message);
                setAlertVisibilityD(true);
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
            <Success message={alertMessage} alertVisibilityCheck={alertVisibilityS} />
            <Danger message={alertMessage} alertVisibilityCheck={alertVisibilityD} />
            {categories && categories.map((category) => (

                <div key={category._id} className="px-2 py-2 md:px-6 md:py-10 hover:shadow-lg rounded-lg transition-all duration-300 hover:-translate-y-2 hover:bg-yellow-100">
                    <div className="">
                        <div className="space-y-3">
                            <span className="inline-block rounded-full bg-gray-100 p-3 text-black hover:text-primarys">
                                <Store size={20} className='text-primary' />
                            </span>
                            <h1 className="text-xl font-semibold capitalize text-black">{category.name}</h1>
                            <p className="text-sm text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod
                                dignissimos vel non corrupti doloribus voluptatum eveniet
                            </p>
                            <a
                                href="#"
                                className="-mx-1 inline-flex transform items-center text-sm font-semibold capitalize text-black transition-colors duration-300 hover:underline"
                            >
                                <span className="mx-1">read more</span>
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
