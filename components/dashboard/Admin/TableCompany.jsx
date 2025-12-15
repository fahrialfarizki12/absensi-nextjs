"use client";

import { createCompany } from "@/app/dashboard/admin/Actions/actions";
import axiosClient from "@/lib/axios";
import { useActionState, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useSWR from "swr";
import ModalComponent from "../ModalComponen";

export default function TableCompany({ Result }) {
  const [open, setOpen] = useState(false);

  const fetcher = async () => {
    const res = await axiosClient.get("/users/company/all");
    return res.data;
  };

  const { data, mutate } = useSWR("company", fetcher, {
    fallbackData: Result,
  });

  const Company = data?.data || [];

  // ACTION CREATE
  const [stateCreate, doCreate, pendingCreate] = useActionState(
    createCompany,
    {}
  );

  useEffect(() => {
    if (stateCreate?.success === true) {
      toast.success(stateCreate.message);
      setOpen(false);
      mutate();
    } else {
      setOpen(false);
      toast.success(stateCreate.message);
    }
  }, [stateCreate]);

  // DELETE
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosClient.delete(`/users/company/${id}`);
        mutate();
        Swal.fire({
          title: "Berhasil Hapus Data Perusahaan",
          text: "Succes Delete Perusahaan",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      {/* SEARCH */}
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setOpen(true)}
          className="btn bg-transpram text-white"
        >
          Create Data
        </button>
      </div>
      {/* TABLE */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Ketua Perusahaan</th>
              <th>Lokasi Perusahaan</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Company?.map((u, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.ketua_perusahaan}</td>
                <td>{u.lokasi_perusahaan}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="btn btn-sm bg-red-500 text-white"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}

            {!Company?.length && (
              <tr>
                <td colSpan="10" className="text-center text-gray-500">
                  Data Perusahaan kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <ModalComponent open={open} close={() => setOpen(false)}>
        <h1>Create Data Perusahaan</h1>

        {/* FIX: key membuat form reset saat buka Create/Edit */}
        <form action={doCreate} className="mt-6">
          <div className="mb-5">
            <label className="floating-label">
              <span>Nama Perusahaan</span>
              <input
                type="text"
                name="username"
                placeholder="Nama Perusahaan"
                className="input input-md w-full outline-0"
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="floating-label">
              <span>Ketua Perusahaan</span>
              <input
                type="text"
                name="ketua_perusahaan"
                placeholder="Ketua Perusahaan"
                className="input input-md w-full outline-0"
              />
            </label>
          </div>
          <div className="mb-5">
            <label className="floating-label">
              <span>Lokasi Perusahaan</span>
              <input
                type="text"
                name="lokasi_perusahaan"
                placeholder="Lokasi Perusahaan"
                className="input input-md w-full outline-0"
              />
            </label>
          </div>

          <button
            disabled={pendingCreate}
            className="btn w-full bg-transpram text-white disabled:bg-transpram/50"
          >
            {pendingCreate ? (
              <span className="loading loading-md loading-spinner"></span>
            ) : (
              "Create"
            )}
          </button>
        </form>
      </ModalComponent>
    </>
  );
}
