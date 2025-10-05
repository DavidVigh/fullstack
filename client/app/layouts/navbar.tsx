"use client";
import Link from "next/link"

export default function Navbar() {
    return (
        <div className="bg-slate-800">
            <ul className="flex justify-between">
                <h3 className="text-start self-center mx-4 text-xl font-bold">Blog Page</h3>
                <div className="flex flex-wrap gap-4 p-4">
                    <Link href="/users">Users</Link>
                    <Link href="/posts">Posts</Link>
                    <Link href="/" aria-current>Home</Link>
                </div>
            </ul>
        </div>
    )
};