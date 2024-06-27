import React from 'react'

function Home() {
    return (
        <div className='w-auto'>
            <div className='max-w-screen-xl text-center mx-auto main-container'>
                <div className='grid grid-cols-2'>
                    <div className=' flex flex-col border items-center'>
                        <h1
                            className=' text-5xl font-semibold font-serif'
                        >Just Buy It!</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore similique suscipit itaque illo nam, laboriosam esse unde earum voluptate quisquam libero maxime delectus. Ab reiciendis laboriosam eligendi excepturi unde voluptatibus?</p>
                    </div>
                    <div id="default-carousel" className="w-full mx-auto items-center " data-carousel="slide">
                        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="https://t3.ftcdn.net/jpg/00/70/38/52/360_F_70385271_bLH529ZIJ5pA6jQ0JedCl8SdJilalSqD.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                            </div>
                            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPLDQCFHei_LaOOxqwDYXVxOzKpe3sOytyhA&s" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                            </div>
                            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="/https://wallpapercave.com/wp/wp3137847.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                            </div>
                            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSoRXi8Acym-kXqKRZNbOOPCLWxvqZHqp71g&s" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                            </div>
                            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="https://wallpapercave.com/wp/wp3137847.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                            </div>
                        </div>
                        <div className="flex justify-center bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                            <button type="button" className="w-3 h-3 rounded-full dot-btn" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home