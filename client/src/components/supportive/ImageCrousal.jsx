import React from 'react'

function ImageCrousal() {
    return (
        <div>
            <div id="default-carousel" className="relative w-full" data-carousel="slide">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    <div className="hidden duration-700 ease-in-out rounded-lg" data-carousel-item>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6x6sMe_ZjMlyDaBpeq6P9Q5B3yyw6_ibYng&s" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-lg" alt="..." />
                    </div>
                    <div className="hidden duration-700 ease-in-out rounded-lg" data-carousel-item>
                        <img src="https://assets.entrepreneur.com/content/3x2/2000/20170504132157-shutterstock-587575862.jpeg?format=pjeg&auto=webp&crop=16:9" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-lg" alt="..." />
                    </div>
                    <div className="hidden duration-700 ease-in-out rounded-lg" data-carousel-item>
                        <img src="https://assets.entrepreneur.com/content/3x2/2000/essential-elements-building-ecommerce-website.jpg?format=pjeg&auto=webp&crop=16:9" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-lg" alt="..." />
                    </div>
                    <div className="hidden duration-700 ease-in-out rounded-lg" data-carousel-item>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW_zVAOvU47-n_qc1H1zpAMYLCzoomPw-eVQ&s" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-lg" alt="..." />
                    </div>
                    <div className="hidden duration-700 ease-in-out rounded-lg" data-carousel-item>
                        <img src="https://thumbs.dreamstime.com/b/e-commerce-line-einkaufsdigital-marketing-und-verkaufsgesch%C3%A4ftstechnologiekonzept-137074336.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-lg" alt="..." />
                    </div>
                </div>
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                </div>
            </div>
        </div>
    )
}

export default ImageCrousal