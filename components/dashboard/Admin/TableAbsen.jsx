"use client";

import axiosClient from "@/lib/axios";
import { FormatJam, FormatTanggalAbsen } from "@/lib/FormatTanggal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaFileExcel } from "react-icons/fa6";
import useSWR from "swr";
import ModalComponent from "../ModalComponen";

export default function TableAbsen({ Result }) {
  //KELAS
  const KELAS = [
    "XII TKR 1",
    "XII TKR 2",
    "XII TKR 3",
    "XII TKJ 1",
    "XII TKJ 2",
    "XII TKJ 3",
    "XII AKL ",
  ];

  //ABSNE
  const ABSEN = ["Masuk", "Izin", "Alpha"];

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [kelas, setKelas] = useState("");
  const [status, setStatus] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [openPhoto, setOpenPhoto] = useState(false);

  const fetcher = async () => {
    const res = await axiosClient.get("/siswa/absen", {
      params: { page, limit, kelas, status },
    });
    return res.data;
  };

  const { data, mutate } = useSWR(["absen", page, kelas, status], fetcher);

  const absen = data?.absen || [];
  const totalPage = data?.totalPage || 0;

  // ---------------------------
  //  Pagination Simple Function
  // ---------------------------
  const paginationNumbers = () => {
    let pages = [];

    if (totalPage <= 6) {
      for (let i = 1; i <= totalPage; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages = [1, 2, 3, 4, "...", totalPage];
      } else if (page >= totalPage - 2) {
        pages = [
          1,
          "...",
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage,
        ];
      } else {
        pages = [1, "...", page - 1, page, page + 1, "...", totalPage];
      }
    }

    return pages;
  };

  return (
    <>
      {/* filter */}
      <div className="flex justify-between mb-4">
        <label className="floating-label">
          <select
            onChange={(e) => {
              setKelas(e.target.value);
              setPage(1);
            }}
            className="select w-full outline-0"
            value={kelas}
          >
            <option disabled>Filter Kelas</option>
            {KELAS.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        {/* Export To Excel */}
        {absen.length !== 0 && (
          <div>
            <Link
              href={`${process.env.NEXT_PUBLIC_API}/api/v1/siswa/absen/export?kelas=${kelas}&status=${status}`}
              className="btn bg-transpram text-white"
              download={true}
            >
              <FaFileExcel /> Export To Excel
            </Link>
          </div>
        )}
        <label className="floating-label">
          <select
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="select w-full outline-0"
            value={status}
          >
            <option disabled>Filter Absen</option>
            {ABSEN.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* TABLE */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Photo</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Lokasi</th>
              <th>Status</th>
              <th>Tanggal</th>
              <th>Jam</th>
            </tr>
          </thead>

          <tbody>
            {absen?.map((u, i) => (
              <tr key={i}>
                <td>{(page - 1) * limit + (i + 1)}</td>
                <td>{u.Absensi.User.username}</td>
                <td>{u.Absensi.kelas}</td>
                <td
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedPhoto(
                      `${process.env.NEXT_PUBLIC_API}/absen/${u.photo}`
                    );
                    setOpenPhoto(true);
                  }}
                >
                  <Image
                    className="rounded"
                    alt={u.Absensi.User.username}
                    width={50}
                    height={50}
                    src={`${process.env.NEXT_PUBLIC_API}/absen/${u.photo}`}
                  />
                </td>

                <td>{u.latitude}</td>
                <td>{u.longitude}</td>
                <td>{u.location}</td>
                <td>
                  <span
                    className={`badge text-white ${
                      u.absen === "Masuk" ? "bg-transpram" : "bg-red-500"
                    }`}
                  >
                    {u.absen}
                  </span>
                </td>
                <td>{FormatTanggalAbsen(u.createdAt)}</td>
                <td>{FormatJam(u.createdAt)}</td>
              </tr>
            ))}

            {!absen?.length && (
              <tr>
                <td colSpan="10" className="text-center text-gray-500">
                  Data Absen kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Photo preview 	 */}
      <ModalComponent open={openPhoto} close={() => setOpenPhoto(false)}>
        <h1 className="px-5 text-xl font-semibold">Preview Image</h1>

        <div className="w-full rounded bg-gray-200 p-5">
          {selectedPhoto && (
            <Image
              src={selectedPhoto}
              width={800}
              height={800}
              alt="Preview"
              className="rounded-lg w-full h-auto object-contain"
              priority
            />
          )}
        </div>
      </ModalComponent>

      {/* -------------------- */}
      {/*      PAGINATION      */}
      {/* -------------------- */}
      <div className="flex justify-center md:justify-start mt-4 gap-2">
        {/* Prev */}
        <button
          className="btn btn-sm bg-transpram text-white disabled:bg-transpram/50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {/* Numbers */}
        {paginationNumbers().map((num, i) => (
          <button
            key={i}
            className={`btn btn-sm ${
              num === page ? "bg-transpram text-white" : ""
            }`}
            disabled={num === "..."}
            onClick={() => num !== "..." && setPage(num)}
          >
            {num}
          </button>
        ))}

        {/* Next */}
        <button
          className="btn btn-sm bg-transpram text-white disabled:bg-transpram/50"
          disabled={page === totalPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
