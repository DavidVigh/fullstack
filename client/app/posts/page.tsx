"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Post, User } from "../types";
import { easeInOut, hover, motion, scale, time } from "motion/react";
import Link from "next/link";
import {  CardAnimation, CardContainer } from "../motion/variants";

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get('http://localhost:3002/posts')
            setPosts(response.data)
        }

        fetchPosts();
    }, []);

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-4xl font-bold text-center">List of posts</h1>
            <div className="flex mt-8 flex-wrap flex-row justify-center gap-4 mx-2">
                {posts.map((post, index) => (
                    <Link
                        key={post.id}
                        href={{
                            pathname: `http://localhost:3000/posts/${post.id}`
                        }}>
                        <motion.div
                            variants={CardAnimation}
                            initial="initial"
                            whileInView="animate"
                            viewport={{
                                once: true
                            }}
                            custom={index}
                            whileHover="hover"
                            className="bg-slate-900 rounded-2xl p-5 flex flex-col w-2xs md:min-w-xs m-2 h-full"
                        >
                            <div className="flex flex-row items-start justify-between gap-2">
                                <h2 className="text-2xl">{post.title}</h2>
                                <span className="px-2 py-0.5 w-fit bg-blue-900/60 rounded-full">
                                    {post.id}
                                </span>
                            </div>
                            <div className="h-0.5 bg-indigo-300 rounded-full mt-1 w-2/5 mb-2"/>
                            <h3 className="text-lg">- {post.author}</h3>
                            <h3 className="text-md italic font-light">Creator: {post.User.username}</h3>
                        </motion.div>
                    </Link>
                ))
                }
            </div>
        </div>
    );
}