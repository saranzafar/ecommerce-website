import React, { useEffect, useState } from 'react'
import { SectionNo1 } from "../components/home/index"
import { ProductCard, Categories, Testimonial } from "../components/index"

function Home() {



    return (
        <div>
            {/* section 1 */}
            <div>
                <SectionNo1 />
            </div>
            <hr className="border-gray-500 dark:border-white w-4/5 text-center mx-auto my-24" />
            {/* section 2 */}
            <div>
                <h2 className="block text-xl font-bold text-gray-800 sm:text-2xl md:text-4xl lg:text-5xl dark:text-white mb-6 text-center">Here is Top Deals</h2>
                <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400 text-center mb-16">Explore our best-sellers with limited-time offers and Find your favorites at unbeatable prices also Shop top-rated items with limited-time savings.</p>
                <ProductCard />

            </div>
            <hr className="border-gray-500 dark:border-white w-4/5 text-center mx-auto my-24" />
            {/* section 3 */}
            <div>
                <h2 className="block text-xl font-bold text-gray-800 sm:text-2xl md:text-4xl lg:text-5xl dark:text-white mb-6 text-center">Explore Our Categories</h2>
                <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400 text-center mb-16">Dive into our diverse range of product categories, curated to meet all your needs. From the latest tech gadgets to essential household items, discover quality and variety in every section.</p>
                <Categories />
            </div>
            <hr className="border-gray-500 dark:border-white w-4/5 text-center mx-auto my-24" />
            {/* section 3 */}
            <div>
                <h2 className="block text-xl font-bold text-gray-800 sm:text-2xl md:text-4xl lg:text-5xl dark:text-white mb-6 text-center">What Our Customers Say?</h2>
                <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400 text-center mb-16">Hear from our satisfied customers who have experienced the quality and excellence of our products and services. Their stories and feedback highlight the value we strive to deliver every day.</p>
                <Testimonial />
            </div>


        </div>
    )
}

export default Home