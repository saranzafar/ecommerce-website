import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import conf from '../conf/conf';
import Cookies from 'js-cookie';
import { StarIcon, UserCircle2Icon, Loader2Icon } from "lucide-react";
import { PageLoader } from '../components/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [submitReviewStatus, setSubmitReviewStatus] = useState(false);
    const [otherProducts, setOtherProducts] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', text: '' });
    const allProducts = useSelector(state => state.ecommerce?.allProducts);
    const saleProducts = useSelector(state => state.ecommerce?.saleProducts);
    const [checkWishlist, setCheckWishlist] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        let foundProduct = allProducts?.products.find(p => p._id === id) || saleProducts?.saleProducts.find(p => p._id === id) || [];
        if (foundProduct) {
            setProduct(foundProduct);
            // setOtherProducts(allProducts ? allProducts.filter(p => p.category.name === foundProduct.category.name && p.id !== foundProduct.id).slice(0, 3) : []);
        } else {
            axios.get(`${conf.backendUrl}products/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            })
                .then(response => {
                    setProduct({
                        ...response.data.message,
                        reviews: response.data.message.reviews || [],
                    });
                    setOtherProducts(allProducts ? allProducts.filter(p => p.category.name === response.data.message.category.name && p.id !== response.data.message.id).slice(0, 3) : []);
                })
                .catch(error => {
                    console.error('Error fetching product data:', error);
                    setProduct(null);
                    setOtherProducts([]);
                });
        }
    }, [id, allProducts, saleProducts, dispatch]);

    const handleReviewChange = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    const handleReviewSubmit = async () => {
        setSubmitReviewStatus(true);
        await axios.patch(`${conf.backendUrl}products/review/${id}`, newReview, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`,
            },
        })
            .then(response => {
                setNewReview({ rating: '', text: '' });
                // setAlertMessage('Review Added');
                // setAlertVisibilityS(true);
                toast.success('Review Added');
                setSubmitReviewStatus(false);
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
                // setAlertMessage('An Error Occured');
                // setAlertVisibilityD(true);
                toast.error('An Error Occured');
                setSubmitReviewStatus(false);
            });
    };

    const toggleWishlist = async () => {
        await axios.post(`${conf.backendUrl}wishlist/toggle-wishlist`, { productId: id }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`,
            },
        })
            .then(response => {
                if (response.data.statuscode === 200) {
                    // setAlertMessage('Added to Wishlist');
                    // setAlertVisibilityS(true);
                    toast.success('Added to Wishlist');
                } else if (response.data.statuscode === 203) {
                    // setAlertMessage('Removed From Wishlist');
                    // setAlertVisibilityS(true);
                    toast.info('Removed From Wishlist');
                }
                // setTimeout(() => {
                //     setAlertVisibilityS(false);
                // }, 5000);
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
                // setAlertMessage('Removed from Wishlist');
                // setAlertVisibilityD(true);
                toast.error('Error handling wishlist action');
                // setTimeout(() => {
                //     setAlertVisibilityS(false);
                // }, 5000);
            });
    };

    if (!product) {
        return <PageLoader />;
    }

    const averageRating = product?.reviews?.length
        ? (product.reviews.reduce((acc, review) => acc + (review?.rating || 0), 0) / product.reviews.length).toFixed(1)
        : '0.0';

    return (
        <div className="font-sans bg-white" key={product._id}>
            {/* <Success message={alertMessage} alertVisibilityCheck={alertVisibilityS} /> */}
            {/* <Danger message={alertMessage} alertVisibilityCheck={alertVisibilityD} /> */}
            <ToastContainer />
            <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
                    <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                        <div className="px-4 py-10 rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                            <img src={`${product.primaryImage}`} alt="Product" className="w-3/6 rounded object-cover mx-auto" />
                            <button type="button" className="absolute top-4 right-4" onClick={toggleWishlist}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#ccc" className="mr-1 hover:fill-[#333]" viewBox="0 0 64 64">
                                    <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                            {product.secondaryImages?.map((element, index) => (
                                <div key={index} className="w-28 h-28 flex items-center justify-center rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] cursor-pointer">
                                    <img src={`${element}`} alt="Product2" className="w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-extrabold text-gray-800">{product.name}</h2>
                        <small className="text-sm pt-2 text-gray-600">{product.category.name}</small>
                        <div className="flex space-x-2 mt-4">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-5 ${index < Math.round(averageRating) ? 'fill-primary' : 'fill-[#CED5D8]'}`}
                                    viewBox="0 0 14 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
                                    />
                                </svg>
                            ))}
                            <h4 className="text-gray-800 text-base">{product?.reviews?.length} Reviews</h4>
                        </div>
                        <div>
                            {product.sale ? (
                                <div className="flex flex-wrap gap-4 mt-8">
                                    <p className="text-gray-800 text-3xl font-bold">${product.sale}</p>
                                    <p className="text-gray-400 text-base">
                                        <strike>${product.price}</strike> <span className="text-sm ml-1">Tax included</span>
                                    </p>
                                </div>
                            ) : (
                                <h1>Not on sale</h1>
                            )}
                        </div>
                        <div className="mt-8 flex items-baseline">
                            <h3 className="text-xl font-bold text-gray-800">Last Updated:</h3>
                            <small className="pl-2 text-sm">{new Date(product.updatedAt).toLocaleDateString()}</small>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <button type="button" className="min-w-[200px] px-4 py-3 bg-primary hover:bg-supportivePrimary text-white text-sm font-semibold rounded">Buy now</button>
                            <button type="button" className="min-w-[200px] px-4 py-2.5 border border-primary bg-transparent hover:bg-yellow-50 text-gray-800 text-sm font-semibold rounded">Add to cart</button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                    <h3 className="text-xl font-bold text-gray-800">Product information</h3>
                    <p>{product.description}</p>
                </div>

                <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                    <h3 className="text-xl font-bold text-gray-800">Customer Reviews</h3>
                    <div className="mt-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="border-b py-4">
                                <div className="flex items-center mb-2">
                                    <UserCircle2Icon className="h-5 w-5 text-gray-500 mr-2" />
                                    <span className="text-gray-700">{review?.user?.username}</span>
                                </div>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 mt-2">{review.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-800">Write a Review</h4>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="rating" className="text-gray-700">Rating</label>
                            <select
                                name="rating"
                                value={newReview.rating}
                                onChange={handleReviewChange}
                                required
                                className="mt-1 p-2 border rounded"
                            >
                                <option aria-required value="">Select a rating</option>
                                {[...Array(5)].map((_, index) => (
                                    <option key={index} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="text" className="text-gray-700">Review</label>
                            <textarea
                                name="text"
                                value={newReview.text}
                                onChange={handleReviewChange}
                                rows="4"
                                required
                                className="mt-1 p-2 border rounded"
                            ></textarea>
                        </div>
                        {
                            submitReviewStatus ? (
                                <div className="mt-4 py-2 bg-primary text-white rounded hover:bg-supportivePrimary inline-block px-12">
                                    <Loader2Icon className='animate-spin' />
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleReviewSubmit}
                                    className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-supportivePrimary"
                                >
                                    Submit Review
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProductPage;
