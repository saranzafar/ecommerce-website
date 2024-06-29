import React from 'react'
import { Copy, ArrowRight, Store } from 'lucide-react'

export default function Categories() {
    return (
        <div className="px-2 py-2 md:px-6 md:py-10 hover:shadow-lg rounded-lg transition-all duration-300 hover:-translate-y-2 hover:bg-yellow-100">
            <div className="">
                <div className="space-y-3">
                    <span className="inline-block rounded-full bg-gray-100 p-3 text-black hover:text-primarys">
                        <Store size={20} className='text-primary' />
                    </span>
                    <h1 className="text-xl font-semibold capitalize text-black">Copy & paste components</h1>
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
    )
}
