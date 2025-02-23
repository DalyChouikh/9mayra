'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function StoryPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [story, setStory] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const fetchStory = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8002/story_teller?data=next');
            const text = await response.text();
            setStory(text);
        } catch (error) {
            console.error('Error fetching story:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStory();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white text-2xl">جاري تحميل القصة...</div>
            </div>
        );
    }

    const paragraphs = story.split('\n\n');
    const itemsPerPage = 3;
    const totalPages = Math.ceil(paragraphs.length / itemsPerPage);
    
    const currentParagraphs = paragraphs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="bg-[#2A3A5E]/50 p-8 rounded-2xl shadow-xl max-w-3xl w-full backdrop-blur-sm">
                {currentParagraphs.map((paragraph, index) => (
                    <p key={index} className="text-white text-xl leading-relaxed mb-6 text-right">
                        {paragraph}
                    </p>
                ))}
                
                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`bg-[#FFA987] text-white text-xl font-bold py-2 px-6 rounded-lg shadow-md transition-all ${
                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FF8A75]'
                        }`}
                    >
                        السابق
                    </button>
                    
                    <span className="text-white text-xl">
                        صفحة {currentPage} من {totalPages}
                    </span>
                    
                    {currentPage === totalPages ? (
                        <button
                            onClick={fetchStory}
                            className="bg-[#FFA987] text-white text-xl font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#FF8A75] transition-all"
                        >
                            قصة جديدة
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            className="bg-[#FFA987] text-white text-xl font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#FF8A75] transition-all"
                        >
                            التالي
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}