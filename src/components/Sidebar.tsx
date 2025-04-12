"use client";
import Link from "next/link";
import { AiFillHome, AiFillSetting} from "react-icons/ai";
import {BsFillGridFill} from "react-icons/bs";
import {BiSolidCategory} from "react-icons/bi";
import {FaCodeBranch} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="bg-[#7e57c2] text-white w-20 h-screen fixed top-0 left-0 flex flex-col items-center p-4">
      <ul className="flex flex-col space-y-6">
        <li>
          <Link href="/" className="hover:text-gray-300">
            <AiFillHome size={30} />
          </Link>
        </li>
        <li>
          <Link href="/config" className="hover:text-gray-300">
            <AiFillSetting size={30} />
          </Link>
        </li>
        <li>
          <Link href="/gitconfig" className="hover:text-gray-300">
            <FaCodeBranch size={30}/>
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="hover:text-gray-300">
            <BsFillGridFill size={30}/>
          </Link>
        </li>
        <li>
          <Link href="/kubernetes" className="hover:text-gray-300">
            <BiSolidCategory size={30}/>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;