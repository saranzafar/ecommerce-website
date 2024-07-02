import React from 'react'

export default function Testimonial() {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-10'>
            <section className="px-2 py-10 md:px-0">
                <div className="mx-auto max-w-4xl hover:shadow-xl hover:-translate-y-1 rounded-lg transition duration-200 p-5 hover:bg-yellow-100">
                    <div className="md:flex md:items-center md:justify-center md:space-x-2">
                        <div className="relative h-48 w-32 flex-shrink-0">
                            <img
                                className="relative h-28 w-28 rounded-full object-cover"
                                src="https://media.licdn.com/dms/image/D5612AQFGU7y3Jt4WTA/article-cover_image-shrink_720_1280/0/1661905061148?e=2147483647&v=beta&t=4dBxDajjwpEGTDHL6QxqfdRQRwMS-IegsAhKRoMbNkU"
                                alt=""
                            />
                        </div>

                        <div className="mt-10 md:mt-0">
                            <blockquote>
                                <p className="text-xl text-black">
                                    “I recently purchased a some products from this store, and I couldn't be happier with the quality. The product was exactly as described and arrived on time. The customer service team was very helpful and responsive to my inquiries. I highly recommend this store to anyone looking for reliable and quality products.”
                                </p>
                            </blockquote>
                            <p className="mt-7 text-lg font-semibold text-black">M. Ghandhi</p>
                            <p className="mt-1 text-base text-gray-600">Manager IND Company</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-2 py-10 md:px-0">
                <div className="mx-auto max-w-4xl hover:shadow-xl hover:-translate-y-1 rounded-lg transition duration-200 p-5 hover:bg-yellow-100">
                    <div className="md:flex md:items-center md:justify-center md:space-x-2">
                        <div className="relative h-48 w-32 flex-shrink-0">
                            <img
                                className="relative h-28 w-28 rounded-full object-cover"
                                src="https://pid.gov.pk/pid_beta/admin/uploads/profile/1.jpg"
                                alt=""
                            />
                        </div>

                        <div className="mt-10 md:mt-0">
                            <blockquote>
                                <p className="text-xl text-black">
                                    “Shopping here was a fantastic experience! I bought several items, including a few electronics, and everything exceeded my expectations. The website is user-friendly, making it easy to find what I needed. Plus, the delivery was quick, and the products were well-packaged. I'll definitely be returning for more purchases in the future!”
                                </p>
                            </blockquote>
                            <p className="mt-7 text-lg font-semibold text-black">M Jinnah</p>
                            <p className="mt-1 text-base text-gray-600">CEO of Pak Ltd. </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
