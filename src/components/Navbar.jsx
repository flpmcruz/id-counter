"use client";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

function Navbar({ session }) {
  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      <h1 className="text-xl font-bold">ID GENERATOR</h1>

      <ul className="flex gap-x-4 items-center">
        {!session?.user ? (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/api/auth/signout">Logout</Link>
            </li>
            <li className="flex items-center gap-x-2">
              <FaUserCircle size={24} />
              <span>{session.user.name || session.user.email}</span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
