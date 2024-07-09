import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { PageLoader } from '../components';
import Cookies from 'js-cookie';
import conf from '../conf/conf';

function Notification() {
    const [pageLoaderVisibility, setPageLoaderVisibility] = useState(true)
    const [orderData, setOrderData] = useState(null)

    useEffect(() => {
        const fetchedData = async () => {
            try {
                const response = await axios.get(
                    `${conf.backendUrl}order/get-order`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('accessToken')}`,
                        },
                    }
                );
                setOrderData(response.data?.message)
                toast.success('Order History Fetched', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } catch (err) {
                toast.error('Error While Fetching Products', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } finally {
                setPageLoaderVisibility(false);
            }
        }
        fetchedData()
    }, [])

    if (pageLoaderVisibility) {
        return <PageLoader />
    }

    return (
        <div>
            <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full max-w-full px-3 mb-6  mx-auto">
                    <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                                    <span className="mr-3 font-semibold text-dark">Order Data</span>
                                    <span className="mt-1 font-medium text-secondary-dark text-lg/normal">All projects from the Loopple team</span>
                                </h3>
                                <div className="relative flex flex-wrap items-center my-2">
                                    <Link to="/shop" className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light"> See other Products </Link>
                                </div>
                            </div>
                            <div className="flex-auto block py-8 pt-6 px-9">
                                <div className="overflow-x-auto">
                                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                                        <thead className="align-bottom">
                                            <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                                <th className="pb-3 text-start min-w-[175px]">ADDRESS</th>
                                                <th className="pb-3 text-end min-w-[100px]">ORDER-ID</th>
                                                <th className="pb-3 text-end min-w-[100px]">QUANTITY</th>
                                                <th className="pb-3 text-end min-w-[100px]">PRICE</th>
                                                <th className="pb-3 pr-12 text-end min-w-[175px]">STATUS</th>
                                                <th className="pb-3 pr-12 text-end min-w-[100px]">ORDER-DATE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderData && orderData.map((order) => (
                                                <tr key={order._id} className="border-b border-dashed last:border-b-0">
                                                    <td className="p-3 pl-0">
                                                        <div className="flex items-center">
                                                            <div className="flex flex-col justify-start">
                                                                <p>{order.address}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 pr-0 text-end">
                                                        <span className="font-semibold text-light-inverse text-md/normal">{order._id}</span>
                                                    </td>
                                                    <td className="p-3 pr-0 text-end">
                                                        <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                                            {order.products.length} </span>
                                                    </td>
                                                    <td className="p-3 pr-0 text-end">
                                                        <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                                            {order.totalprice} </span>
                                                    </td>
                                                    <td className="p-3 pr-12 text-end">
                                                        <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"> {order.status} </span>
                                                    </td>
                                                    <td className="pr-0 text-start">
                                                        {/* <span className="font-semibold text-light-inverse text-md/normal">{order.updatedAt}</span> */}
                                                        <span className="font-semibold text-light-inverse text-md/normal">{new Date(order.updatedAt).toLocaleDateString()}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {!orderData && (
                                                <div>No Order Found. This may be due to Poor Internet</div>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Notification