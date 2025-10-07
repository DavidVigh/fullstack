"use client";
import { User, Post } from "@/app/types"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import Tags, { CardTags } from "@/app/components/tags"
import { motion, AnimatePresence } from "motion/react";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    const reqParams = use(params);
    const userId: number = parseInt(reqParams.slug);
    const [user, setUser] = useState<User>();
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get<User>(`http://localhost:3002/users/${userId}`);
                setUser(response.data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };

        fetchUserPosts();
    }, [userId]);

    if (user) {
        if (user.Posts.length > 0) {
            const posts: Post[] = user.Posts;
            return (
                <div className="container mx-auto">
                    <h1 className="text-4xl text-center my-8 font-bold">
                        {user.username}'s posts
                    </h1>

                    <div id="horizontal-scroll"
                        className="flex flex-wrap justify-center gap-8">
                        {posts.map((post) => (
                            <motion.div
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                layout

                                key={post.id}
                                className="bg-slate-900 p-4 
                            w-xs lg:min-w-md rounded-2xl
                            flex flex-col justify-evenly gap-2">
                                <h2 className="text-2xl">{post.title}</h2>
                                <p className="text-lg">Post id: <span className="bg-slate-600 px-2 rounded-2xl">{post.id}</span></p>
                                <p>Author: {post.author ?? "Annonymus"}</p>

                                <div className="">
                                    <p className="text-md mb-2"> Tags:</p>
                                    <CardTags tags={post.Tags} />
                                </div>

                                <p>Content:</p>
                                <p className="px-4">{post.content.slice(0, 40)}...</p>
                                <div className="flex flex-row justify-evenly mt-2">
                                    <button
                                        className="bg-red-600 hover:bg-red-700 transition-all px-4 py-2 self-end text-center rounded-2xl">
                                        Delete
                                    </button>

                                    <Link href={{
                                        pathname: `/posts/${post.id}`
                                    }}
                                        className="bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 self-end text-center rounded-2xl">
                                        See Post</Link>
                                </div>
                            </motion.div>
                        ))

                        }
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="container mx-auto bg-slate-900">
                    <h1>{"No post(s) currently avaliable"}</h1>
                </div>
            )
        }
    }

    else {
        return (
            <div className="container mx-auto">
                <h1 className="text-4xl text-center my-8">
                    Loading...
                </h1>
            </div>
        )
    }


};