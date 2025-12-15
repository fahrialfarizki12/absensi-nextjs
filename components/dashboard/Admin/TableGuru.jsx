"use client";

import axiosClient from "@/lib/axios";
import { useState, useActionState, useEffect } from "react";
import useSWR from "swr";
import { MdDelete } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import ModalComponent from "../ModalComponen";
import { createGuru } from "@/app/dashboard/admin/Actions/actions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function TableGuru({ Result }) {
  const [open, setOpen] = useState(false);

  const fetcher = async () => {
    const res = await axiosClient.get("/users/guru/pembimbing");
    return res.data;
  };

  const { data, mutate } = useSWR("guru", fetcher, {
    fallbackData: Result,
  });

  const Guru = data?.data || [];

  // ACTION CREATE
  const [stateCreate, doCreate, pendingCreate] = useActionState(createGuru, {});

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
        await axiosClient.delete(`/users/guru/pembimbing/${id}`);
        mutate();
        Swal.fire({
          title: "Berhasil Hapus Data Guru",
          text: "Succes Delete Users",
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

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Guru?.map((u, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{u.username}</td>

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

            {!Guru?.length && (
              <tr>
                <td colSpan="10" className="text-center text-gray-500">
                  Data Guru kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <ModalComponent open={open} close={() => setOpen(false)}>
        <h1>Create Data Guru</h1>

        {/* FIX: key membuat form reset saat buka Create/Edit */}
        <form action={doCreate} className="mt-6">
          <div className="mb-5">
            <label className="floating-label">
              <span>Username</span>
              <input
                type="text"
                name="username"
                placeholder="Username"
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
