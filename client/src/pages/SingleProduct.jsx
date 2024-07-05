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
import { addToCartReducer } from '../store/ecommerceSlice';

function SingleProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [submitReviewStatus, setSubmitReviewStatus] = useState(false);
    const [newReview, setNewReview] = useState({ rating: '', text: '' });
    const allProducts = useSelector(state => state.ecommerce?.allProducts);
    const saleProducts = useSelector(state => state.ecommerce?.saleProducts);

    const dispatch = useDispatch();

    useEffect(() => {
        let foundProduct = allProducts?.products?.find(p => p._id === id) || saleProducts?.saleProducts?.find(p => p._id === id) || [];
        console.log("Found product = ", foundProduct);
        if (foundProduct?.length > 0) {
            setProduct(foundProduct);
            console.log("Found product = ", foundProduct);
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
                    console.log("Response = ", response);
                })
                .catch(error => {
                    console.error('Error fetching product data:', error);
                    setProduct(null);
                });
        }
    }, [id, allProducts, saleProducts, dispatch]);

    const handleReviewChange = (e) => {
        setNewReview({ ...newReview, [e?.target?.name]: e.target.value });
    };

    const handleReviewSubmit = async () => {
        setSubmitReviewStatus(true);
        await axios.patch(`${conf.backendUrl}products/review/${id}`, newReview, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`,
            },
        })
            .then(() => {
                setNewReview({ rating: '', text: '' });
                toast.success('Review Added');
                setSubmitReviewStatus(false);
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
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
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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
            <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
                    <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                        <div className="px-4 py-10 rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                            <img src={`${product.primaryImage}`} alt="Product" className="w-3/6 rounded object-cover mx-auto" />
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
                        <h2 className="text-2xl font-extrabold text-gray-800">{product?.name}</h2>
                        <small className="text-sm pt-2 text-gray-600">{product.category?.name}</small>
                        <div className="flex space-x-2 mt-4">
                            {[...Array(5)]?.map((_, index) => (
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
                            <button
                                type="button"
                                onClick={() => handleAddToCart(product)}
                                className="min-w-[200px] px-4 py-3 bg-primary hover:bg-supportivePrimary text-white text-sm font-semibold rounded">Add To Cart</button>
                            <button
                                type="button"
                                onClick={toggleWishlist}
                                className="min-w-[200px] px-4 py-2.5 border border-primary bg-transparent hover:bg-yellow-50 text-gray-800 text-sm font-semibold rounded">Add to Wishlist</button>
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
                        {product?.reviews?.map((review, index) => (
                            <div key={index} className="border-b py-4">
                                <div className="flex items-center mb-2">
                                    <UserCircle2Icon className="h-5 w-5 text-gray-500 mr-2" />
                                    <span className="text-gray-700">{review?.user?.username}</span>
                                </div>
                                <div className="flex items-center">
                                    {[...Array(5)]?.map((_, i) => (
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
                                {[...Array(5)]?.map((_, index) => (
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
            <ToastContainer />
        </div>
    );
}

export default SingleProductPage;
