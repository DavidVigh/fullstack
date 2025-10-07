"use client";
import { useEffect, useState } from "react";
import { User } from "@/app/types";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { CardAnimation, CardContainer } from "../motion/variants";

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
        <div className="container mx-auto my-8">
            <h1 className="text-4xl text-center font-bold my-8">List of Users</h1>
            <div
                className="flex flex-wrap justify-center gap-8">
                {users.map((user, index) => (
                    <motion.div
                    key={user.id}
                        variants={CardAnimation}
                        whileHover="hover"
                        initial="initial"
                        animate="animate"
                        // whileInView="animate" if we want it only on scroll
                        viewport={{
                            once: true
                        }}
                        custom={index}
                        className="bg-gray-900 rounded-2xl p-5 mx-4 w-64 cursor-pointer"
                    >
                        <Link key={user.id} href={{
                            pathname: `/users/${user.id}`
                        }}>
                            <h3 className="text-lg font-bold px-2">{user.username}</h3>
                            <div className="
                        bg-slate-700
                        w-full
                        rounded-2xl
                        h-0.5"/>
                            <div className="px-4 pt-2
                        flex flex-col gap-2">
                                <h2 className="text-md">Name: {user.fullname}</h2>

                                <div className="flex flex-row items-center gap-1 whitespace-nowrap">
                                    <p className="shrink-0">E-mail:</p>
                                    <span className="text-md w-40 overflow-x-auto hide-scroll-bar
                                ">{user.email}</span>
                                </div>

                                <p className="text-md">{user.Posts.length > 0 ? `Avaliable posts: ${user.Posts.length}` : "No post(s) avaliable."}</p>

                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
};