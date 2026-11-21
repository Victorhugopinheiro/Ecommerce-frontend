"use client"

import { useEffect, useRef, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import gtaBanner from "../../../public/bannerGta.jpg";
import gtaBanner2 from "../../../public/ChooseYourSidee.jpg";

// Add more full-size banner images here to get more slides
const slides = [
    { src: gtaBanner.src, mobileSrc: "/ImageMainMobile.jpg", alt: "Recem chegados" },
    { src: gtaBanner2.src, mobileSrc: "/ImageMainMobile.jpg", alt: "Recem chegados" },
    { src: "/mainBanner.jfif", mobileSrc: "/ImageMainMobile.jpg", alt: "Recem chegados" },
]

function HeroBanner() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const autoplay = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
    )

    useEffect(() => {
        if (!api) return
        const onSelect = () => setCurrent(api.selectedScrollSnap())
        onSelect()
        api.on("select", onSelect)
        return () => {
            api.off("select", onSelect)
        }
    }, [api])

    return (
        <Carousel
            setApi={setApi}
            opts={{ loop: slides.length > 1 }}
            plugins={slides.length > 1 ? [autoplay.current] : []}
            className="relative"
        >
            <CarouselContent className="mt-10 ">
                {slides.map((slide, index) => (
                    <CarouselItem key={index} className="pl-0">
                        <img
                            className="hidden md:block w-full max-w-[1400px] h-auto mx-auto rounded-md select-none"
                            src={slide.src}
                            alt={slide.alt}
                            draggable={false}
                        />

                        <img
                            className="block md:hidden w-full h-auto select-none"
                            src={slide.mobileSrc}
                            alt={slide.alt}
                            draggable={false}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>

            {slides.length > 1 && (
                <>
                    <CarouselPrevious className="left-4 hidden sm:inline-flex hover:border-green-700 hover:text-green-700" />
                    <CarouselNext className="right-4 hidden sm:inline-flex hover:border-green-700 hover:text-green-700" />

                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Ir para o slide ${index + 1}`}
                                onClick={() => api?.scrollTo(index)}
                                className={`h-1.5 rounded-full transition-all ${index === current ? "w-6 bg-green-700" : "w-3 bg-white/50"}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </Carousel>
    )
}

export default HeroBanner