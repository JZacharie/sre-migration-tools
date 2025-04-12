"use client";
import Link from "next/link";
import { AiFillHome, AiFillSetting} from "react-icons/ai";
import {BsFillGridFill} from "react-icons/bs";
import {BiSolidCategory} from "react-icons/bi";

const KubernetesIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="white"
      stroke="white"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11v10h18V11l-9-8z" />
      <path d="M12 3v6" />
      <path d="M3 11h18" />
      <path d="M6 11v10" />
      <path d="M18 11v10" />
      <path d="M3 11l9-8 9 8" />
      <path d="M12 3v6" />
    </svg>
    
  );
};
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
            <KubernetesIcon/>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;