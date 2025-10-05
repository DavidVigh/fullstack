"use client";
import { useEffect, useState } from "react";
import { User } from "@/app/types";
import axios from "axios";
import Link from "next/link";

export default function Page() {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const resp = await axios.get<User[]>("http://localhost:3002/users");
            setUsers(resp.data);
        }

        fetchUsers();
    }, []);
    console.log(users);

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl text-center font-bold my-8">List of Users</h1>
            <div className="flex flex-wrap justify-center gap-8">
                {users.map((user) => (
                    <div key={user.id} className="bg-gray-900 rounded-2xl p-5
                     max-w-md md:w-2xs w-sm lg:w-md">
                        <h3 className="text-lg font-bold px-2">{user.username}</h3>
                        <div className="
                        bg-slate-500
                        rounded-2xl
                        h-0.5"/>
                        <div className="px-4 pt-2
                        flex flex-wrap flex-col gap-2">
                            <h2 className="text-md">Name: {user.fullname}</h2>

                            <div className="flex flex-row items-center gap-1 whitespace-nowrap">
                                <p className="shrink-0">E-mail:</p>
                                <span className="text-md md:w-40 md:overflow-x-auto hide-scroll-bar lg:w-auto
                                ">{user.email}</span>
                            </div>

                            <p className="text-md">{user.Posts.length > 0 ? `Avaliable posts: ${user.Posts.length}` : "No post(s) avaliable."}</p>
                            <Link href={{
                                    pathname: `/users/${user.id}`
                                }}
                            className="bg-blue-600
                            hover:bg-blue-700 transition-all
                            px-4 py-2 
                            self-center text-center rounded-2xl
                            ">
                                Go to user's posts</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};