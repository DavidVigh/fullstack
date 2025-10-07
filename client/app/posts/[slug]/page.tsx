"use client";

import { Post, User, Tag } from "@/app/types";
import Tags from "@/app/components/tags";
import axios from "axios";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import Content from "@/app/components/content";

import { GoMention } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { GoCalendar } from "react-icons/go";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    const reqPostId: string = use(params).slug;

    const [post, setPost] = useState<Post>();

    const [user, setUser] = useState<User>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postRes = await axios.get(`http://localhost:3002/posts/${reqPostId}`);
                const fetchedPost = postRes.data;
                setPost(fetchedPost);

                const userRes = await axios.get(`http://localhost:3002/users/${fetchedPost.userId}`);
                setUser(userRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [reqPostId]);

    if (post) {
        return (
            <div className="container mx-auto flex justify-center">
                <div className="m-8 bg-slate-900 rounded-2xl 
                border-1 border-sky-400/40 p-5 md:w-3/4
                ">
                    <div className="flex flex-col flex-wrap">
                        <h1 className="text-4xl font-bold self-center">{post.title}</h1>

                        <h2 className="italic self-center text-2xl mb-1">{post.author} </h2>
                        <div className="flex flex-row gap-4 self-center">
                            <GoCalendar className="self-center scale-150" />
                            <span className=" font-extralight bg-sky-800/60 px-2 py-0.5 rounded-2xl">{post.date}</span>
                        </div>
                    </div>

                    <h2 className="text-2xl md:mx-4">About:</h2>
                    <div className="flex flex-col md:flex-row md:justify-evenly md:gap-2 text-lg">
                        <Link href={{
                            pathname: `http://localhost:3000/users/${post.userId}`
                        }} className="flex flex-row gap-2 hover:text-xl w-fit hover:text-blue-400 transition-all">
                            <GoPerson className="self-center" />
                            <span>{user?.username}</span>
                        </Link>
                        <div className="h-auto w-0.25 rounded-md bg-sky-600/40"></div>
                        <a
                            href={`mailto:${user?.email}`}
                            className="flex flex-row gap-2 hover:text-xl w-fit hover:text-blue-400 transition-all"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GoMention className="self-center" />
                            <span>{user?.email}</span>
                        </a>
                    </div>

                    <h2 className="text-2xl md:mx-4">Content:</h2>
                    <Content content={post.content} />
                    <div className="flex flex-col gap-4">
                        <Tags tags={post.Tags} />
                        <Link href={{
                            pathname: `http://localhost:3000/users/${post.userId}`
                        }}
                            className="bg-sky-900 border-1 border-blue-800 hover:bg-blue-800 hover:border-blue-600 transition-all rounded-4xl
                        px-4 py-2 me-4 w-30 
                        self-center text-center">
                            User Profile</Link>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container mx-auto flex justify-center">
                <div className="m-8 bg-slate-900 rounded-2xl 
                border-1 border-sky-400/40 p-5 min-w-sm md:w-3/4
                ">
                    <h1 className="text-lg font-bold">Page not avaliable.</h1>
                </div>
            </div>
        )
    }
}