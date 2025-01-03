'use client'

import { PostDesc } from "@/type/types";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function TagList({
    categories,
    postlist
}: {
    categories: string[];
    postlist: PostDesc[];
}) {
    const [filteredPosts, setFilteredPosts] = useState(postlist);

    const categoryCnt: { [key: string]: number } = categories.reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {} as { [key: string]: number });

    const uniqueCategory = Object.keys(categoryCnt);

    const handleCategoryClick = (category: string) => {
        console.log("Category clicked:", category);
        if (category === '') {
            setFilteredPosts(postlist);
        } else {
            setFilteredPosts(postlist.filter(post => post.category === category));
        }
    };

    useEffect(() => {
        console.log("Filtered posts updated:", filteredPosts);
    }, [filteredPosts]);

    return (
        <div>
            <Button onClick={() => handleCategoryClick('')}>All Posts ({categories.length})</Button>
            {uniqueCategory.map((cat) => (
                <Button key={cat} onClick={() => handleCategoryClick(cat)}>
                    {cat} ({categoryCnt[cat]})
                </Button>
            ))}
        </div>
    );
}
