"use client";
import useSWR from "swr";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { FormatJam, FormatTanggalAbsen } from "@/lib/FormatTanggal";

const Table = ({ mutateTriger }) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // tetap 10

  const fetcher = async () => {
    const response = await axiosClient("/siswa/absenId", {
      params: { page, limit },
    });

    return response.data;
  };

  const { data, mutate } = useSWR(["absenId", page], fetcher);

  const siswa = data?.absen || [];

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

  useEffect(() => {
    mutate();
  }, [mutateTriger]);
  return (
    <>
      {siswa.length === 0 && (
        <h1 className="text-center my-5 text-xl capitalize">
          Absen Siswa Masih Kosong
        </h1>
      )}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr className="text-black font-semibold">
              <th>No</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Status</th>
              <th>Lokasi</th>
              <th>Jam</th>
              <th>Tanggal</th>
            </tr>
          </thead>

          <tbody>
            {siswa.map((absenSiswa, index) => (
              <tr key={index}>
                <th>{(page - 1) * limit + (index + 1)}</th>

                <td>{absenSiswa.latitude}</td>
                <td>{absenSiswa.longitude}</td>

                <td>
                  <span
                    className={`badge ${
                      absenSiswa.absen === "Alpha"
                        ? "badge-error"
                        : "bg-transpram"
                    } text-white`}
                  >
                    {absenSiswa.absen}
                  </span>
                </td>

                <td>{absenSiswa.location}</td>
                <td>{FormatJam(absenSiswa.createdAt)}</td>
                <td>{FormatTanggalAbsen(absenSiswa.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
};

export default Table;
