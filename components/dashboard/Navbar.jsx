"use client";

import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa6";
import { FaBookOpenReader } from "react-icons/fa6";

import { BsBuildingsFill } from "react-icons/bs";
import { PiUserSwitchBold } from "react-icons/pi";
import { PiStudentBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { limitWords } from "@/lib/TextWrap";
import { FaUserCog } from "react-icons/fa";
import axiosClient from "@/lib/axios";
import { FaUsers } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  // menu sidebar
  const menuItems = [
    // SISWA
    {
      title: "Dashboard",
      icon: <HiHome />,
      href: "/dashboard",
      roles: ["siswa", "guru-pembimbing", "admin"],
    },
    {
      title: "Absensi",
      icon: <FaUserClock />,
      href: "/dashboard/absen",
      roles: ["siswa", "guru-pembimbing", "admin"],
    },
    {
      title: "My Jurnal",
      icon: <FaBookOpenReader />,
      href: "/dashboard/my-journal",
      roles: ["siswa", "guru-pembimbing", "admin"],
    },
    {
      title: "Profile",
      icon: <FaUserCog />,
      href: "/dashboard/profile",
      roles: ["siswa", "guru-pembimbing", "admin"],
    },

    // ADMIN ONLY
    {
      title: "Data Users",
      icon: <FaUsers />,
      href: "/dashboard/admin/users",
      roles: ["admin"],
    },
    {
      title: "Data Guru",
      icon: <PiStudentBold />,
      href: "/dashboard/admin/guru",
      roles: ["admin"],
    },
    {
      title: "Data Absen",
      icon: <PiUserSwitchBold />,
      href: "/dashboard/admin/absen",
      roles: ["admin"],
    },
    {
      title: "Data Perusahaan",
      icon: <BsBuildingsFill />,
      href: "/dashboard/admin/company",
      roles: ["admin"],
    },

    // GURU PEMBIMBING
    {
      title: "Data Absen",
      icon: <PiUserSwitchBold />,
      href: "/dashboard/pembimbing/absen",
      roles: ["guru-pembimbing"],
    },
  ];

  // state konfigurasi
  const [menuList, setMenuList] = useState(false);

  const handlingMenu = () => setMenuList((prev) => !prev);
  const closeHamburger = () => setMenuList((prev) => !prev);

  // GET LOCALSTORAGE
  const [getUsers, setGetUsers] = useState(null);

  useEffect(() => {
    const StoreLocal = localStorage.getItem("users");
    if (StoreLocal) {
      setGetUsers(JSON.parse(StoreLocal));
    }
  }, []);

  // disable scroll when menu open
  useEffect(() => {
    if (menuList) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuList]);

  const handleLogout = async () => {
    try {
      await axiosClient.get("/auth/logout");
      localStorage.removeItem("users");
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* Overlay */}
      {menuList && (
        <div
          className="fixed z-15 inset-0 bg-black/50 md:hidden"
          onClick={() => setMenuList(false)}
        ></div>
      )}

      {/* Navbar Atas */}
      <nav className="flex md:left-70 z-10 md:w-[calc(100%-16rem)] fixed top-0 w-full justify-between items-center bg-white shadow h-15 px-[5%]">
        <div className="flex items-center gap-x-3 z-10">
          <Image alt="Logo" src="/logo.png" width={40} height={40} />
          <div className="flex flex-col uppercase">
            <h1 className="text-transpram font-semibold text-md">
              ABSENSI PRAKERIND
            </h1>
            <p className="text-xs">SMKS PGRI I TRANSPRAM II LABUHAN RATU</p>
          </div>
        </div>

        {/* Hamburger */}
        <button className="h-10 p-3 md:hidden" onClick={handlingMenu}>
          <FaBarsStaggered size={20} />
        </button>
      </nav>

      {/* Sidebar */}
      <div
        className={`z-20 overflow-y-auto fixed md:translate-x-0 h-screen bg-white shadow rounded transition ease-in-out left-0 top-0 w-80 md:w-70 capitalize ${
          menuList ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* WRAPPER FLEX: BIAR LOGOUT DI BAWAH */}
        <div className="p-5 flex flex-col justify-between h-full">
          {/* PROFILE */}
          <div>
            <div className="py-5 w-full border-b border-b-gray-200 flex items-center gap-3 relative">
              <div className="avatar w-13">
                <div className="ring-primary ring-offset-base-100 w-fit rounded-full ring-2 ring-offset-2">
                  <Image
                    width={40}
                    height={40}
                    alt={getUsers?.username || "Profile"}
                    src={`${process.env.NEXT_PUBLIC_API}/${getUsers?.photo}`}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="font-semibold">
                  {limitWords(getUsers?.username, 2) || "Guest"}
                </h1>
                <p className="text-sm">
                  Status:{" "}
                  <span className="font-medium">
                    {getUsers?.roles || "Siswa"}
                  </span>
                </p>
              </div>

              <button
                onClick={closeHamburger}
                className="absolute right-0 md:hidden"
              >
                <IoClose size={25} />
              </button>
            </div>

            {/* MENU LIST */}
            <ul className="mt-4 text-sm">
              {menuItems
                .filter((item) => item.roles.includes(getUsers?.roles))
                .map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => handlingMenu()}
                      className="block my-2"
                    >
                      <li
                        className={`flex items-center gap-3 p-2 rounded font-semibold transition-all 
                    ${
                      isActive
                        ? "bg-transpram text-white"
                        : "text-slate-700 hover:bg-transpram hover:text-white active:bg-transpram active:text-white"
                    }`}
                      >
                        {item.icon}
                        {item.title}
                      </li>
                    </Link>
                  );
                })}
            </ul>
          </div>

          {/* LOGOUT DI PALING BAWAH */}
          <button
            onClick={() => handleLogout()}
            className="w-full  bg-transpram text-white btn font-semibold my-5 mb-20 active:bg-transpram/50 hover:bg-transpram/50 md:mb-30"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
