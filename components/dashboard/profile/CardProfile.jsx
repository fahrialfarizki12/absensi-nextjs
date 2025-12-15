"use client";
import axiosClient from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const CardProfile = () => {
const [users,setUsers] = useState("guest")
const [guru,setGuru] = useState(null)
const [company,setCompany] = useState(null)
	const fethGuruById = async(id)=>{
		try {
		const response = await axiosClient.patch(`/users/guru/${id}`)
		setGuru(response.data.data)	
	
		} catch (error) {
		console.log("Gagal Feth Data guru")	
		}
	}

const fethCompanyById = async(id)=>{
		try {
		const response = await axiosClient.patch(`/users/company/${id}`)
		setCompany(response.data.data)	
	
		} catch (error) {
		console.log("Gagal Feth Data Company")	
		}
	}


	//useEffect 
	useEffect(()=>{
		const getUsers = localStorage.getItem("users")
		if(!getUsers){
			return
		} 
			const parseLocal = JSON.parse(getUsers)
			setUsers(parseLocal)

	
		fethGuruById(parseLocal.pembimbing)
		fethCompanyById(parseLocal.lokasiPrakerind)
	},[])
  return (
    <>
      <div className="p-5 mt-10">
        <div className="bg-white shadow w-full p-5 rounded">
          {/* profile */}
          <div className="flex w-full  bg-transpram/70 rounded p-2  justify-center">
            <div className="avatar w-13">
              <div className="ring-primary ring-offset-base-100 w-fit  rounded-full ring-2 ring-offset-2">
                <Image width={40} height={40} alt="test" src={`${process.env.NEXT_PUBLIC_API}/${users.photo}`} />
              </div>
            </div>
          </div>
          {/* Profile Status  */}
          <div className="flex mt-10 flex-col gap-3">
						<div className="capitalize">
							<h1>Nama : {users.username}</h1>
							<h3>Email : {users.email}</h3>
							<h2>Kelas : {users.kelas}</h2>
							<h5>Jurusan : {users.jurusan}</h5>
							<h4>Status : {users.roles} / Siswi</h4>
						</div>
						<div className="capitalize">
							<h1>Lokasi Prakerind : {company?.name}</h1>
							<h2>Pembimbing : {guru?.username}</h2>
						</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProfile;
