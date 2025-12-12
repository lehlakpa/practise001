import React, { useState, useEffect, useRef } from "react";

export default function BannerCarousel() {
    const banners = [
        {
            id: 1,
            title: "Fresh Organic Vegetables",
            subtitle: "Healthy choices for your daily meals",
            color: "bg-white",
            image: "https://thumbs.dreamstime.com/b/effective-communication-concept-flat-vector-illustration-boy-woman-exchange-ideas-fostering-understanding-clarity-307120965.jpg",
        },
        {
            id: 2,
            title: "Refreshing Beverages",
            subtitle: "Cool drinks to boost your energy",
            color: "bg-white",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHpu06q28tvi2WkAT13PZqtEbhAh-Bd1JFsQ&s",
        },
        {
            id: 3,
            title: "Tropical Fruits Collection",
            subtitle: "Handpicked fresh fruits every day",
            color: "bg-white",
            image: "https://tripwiremagazine.com/wp-content/uploads/2016/10/adobe-illustrator-catoon-tutorials_thumb.jpg",
        },
        {
            id: 4,
            title: "Snacks & Sweets",
            subtitle: "Treat yourself with tasty delights",
            color: "bg-white",
            image: "https://img.freepik.com/free-vector/open-mind-psychotherapy-composition-with-discussion-symbols-flat-vector-illustration_1284-78150.jpg",
        },
    ];

    const [current, setCurrent] = useState(0);
    const containerRef = useRef(null);

    // Auto rotate slides
    useEffect(() => {
        if (banners.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Scroll when banner changes
    useEffect(() => {
        if (containerRef.current) {
            const scrollX = containerRef.current.clientWidth * current;
            containerRef.current.scrollTo({ left: scrollX, behavior: "smooth" });
        }
    }, [current]);

    return (
        <div className="mx-4 my-4">
            {/* Banner container */}
            <div
                ref={containerRef}
                className="flex overflow-x-hidden border-2 border-black rounded-t-md rounded-b-3xl snap-x snap-mandatory gap-4 w-full"
            >
                {banners.map((banner) => (
                    <div
                        key={banner.id}
                        className={`snap-center  w-full min-w-full rounded-xl p-4 shadow-lg flex items-center justify-between ${banner.color}`}
                    >
                        <div className="w-1/2 pr-4">
                            <h3 className="text-lg font-semibold text-black">{banner.title}</h3>
                            <p className="text-xs text-gray-600">{banner.subtitle}</p>
                        </div>

                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="rounded-lg object-cover w-1/2 h-28"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-3 gap-2">
                {banners.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 
                            ${idx === current ? "bg-black scale-110" : "bg-gray-300"}`}
                    />
                ))}
            </div>
        </div>
    );
}
