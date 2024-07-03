import React from 'react'
import { AllProducts } from "../components/index.js"

function Shop() {
    return (
        <div>
            <div>
                <h2 className="block text-xl font-bold text-gray-800 sm:text-2xl md:text-4xl lg:text-5xl dark:text-white mb-6 text-center">Build Better Products</h2>
                <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400 text-center mb-16">Introducing a new way for your brand to reach the creative community.</p>
                <AllProducts />
            </div>
        </div>
    )
}

export default Shop