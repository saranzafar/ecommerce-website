import React from 'react'
import { SectionNo1 } from "../components/home/index"
import { ProductCard, Categories, FAQs } from "../components/index"

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
                <h2 className="block text-xl font-bold text-gray-800 sm:text-2xl md:text-4xl lg:text-5xl dark:text-white mb-6 text-center">Build Better Products</h2>
                <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400 text-center mb-16">Introducing a new way for your brand to reach the creative community.</p>
                <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-6'>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
            <hr className="border-gray-500 dark:border-white w-4/5 text-center mx-auto my-24" />
            {/* section 3 */}
            <div>
                <h2 className="block text-xl font-bold text-gray-800 sm:text-2xl md:text-4xl lg:text-5xl dark:text-white mb-6 text-center">Build Better Products</h2>
                <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400 text-center mb-16">Introducing a new way for your brand to reach the creative community.</p>
                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3'>
                    <Categories />
                    <Categories />
                    <Categories />
                    <Categories />
                    <Categories />
                    <Categories />
                </div>
            </div>
            <hr className="border-gray-500 dark:border-white w-4/5 text-center mx-auto my-24" />
            {/* section 3 */}
            <div>
                <h2 className="block text-xl font-bold text-gray-800 sm:text-2xl md:text-4xl lg:text-5xl dark:text-white mb-6 text-center">Build Better Products</h2>
                <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400 text-center mb-16">Introducing a new way for your brand to reach the creative community.</p>
                <div className=''>
                    <FAQs />
                </div>
            </div>


        </div>
    )
}

export default Home