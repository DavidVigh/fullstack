"use client";
import { User, Post } from "@/app/types"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, use } from "react";

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

    useEffect(() => {
        const container = document.getElementById("horizontal-scroll");
        if (!container) return;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();              // prevent vertical scroll
            container.scrollLeft += e.deltaY; // vertical movement scrolls horizontally
        };

        container.addEventListener("wheel", onWheel);

        return () => container.removeEventListener("wheel", onWheel);
    }, []);


    console.log(user);

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
                            <div key={post.id}
                                className="bg-slate-900 p-4 
                            w-xs lg:min-w-md rounded-2xl
                            flex flex-col justify-evenly gap-2">
                                <h2 className="text-2xl">{post.title}</h2>
                                <p className="text-lg">Post id: <span className="bg-slate-600 px-2 py-1 rounded-2xl">{post.id}</span></p>
                                <p>Author: {post.author ?? "Annonymus"}</p>
                                <p>Tags:</p>
                                {post.Tags.length > 0 ? (
                                    <div className="flex flex-row flex-wrap gap-2">
                                        {post.Tags.map((tag) => (
                                            <p key={tag.id}
                                                className="bg-blue-950 px-2 rounded-2xl border-1 border-sky-600">
                                                <span className="text-blue-500 me-1">#</span>{tag.name}
                                            </p>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 ps-5">No tags given</p>
                                )}

                                <p>Content:</p>
                                <p className="px-4">{post.content.slice(0, 40)}...</p>
                                <div className="flex flex-row justify-evenly mt-2">
                                    <button
                                        className="bg-red-600 hover:bg-red-700 transition-all px-4 py-2 self-end text-center rounded-2xl">
                                        Delete
                                    </button>

                                    <Link href={{
                                        pathname: `/users/${userId}/posts/${post.id}`
                                    }}
                                        className="bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 self-end text-center rounded-2xl">
                                        See Post</Link>
                                </div>
                            </div>
                        ))

                        }
                    </div>
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