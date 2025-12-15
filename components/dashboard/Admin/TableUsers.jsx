"use client";

import axiosClient from "@/lib/axios";
import { useState, useActionState, useEffect } from "react";
import useSWR from "swr";
import { MdDelete } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import ModalComponent from "../ModalComponen";
import {
  CreateUsersAdmin,
  UpdateUsersAdmin,
} from "@/app/dashboard/admin/Actions/actions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function TableUsers({ Result }) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [updateUsers, setUpdateUsers] = useState(null);

  const fetcher = async () => {
    const res = await axiosClient.get("/users", {
      params: { page, limit, search },
    });
    return res.data;
  };

  const { data, mutate } = useSWR(["users", page, search], fetcher, {
    fallbackData: Result,
  });

  const users = data?.users || [];
  const totalPage = data?.totalPages || 0;

  // ACTION CREATE
  const [stateCreate, doCreate, pendingCreate] = useActionState(
    CreateUsersAdmin,
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

  // ACTION UPDATE
  const [stateUpdate, doUpdate, pendingUpdate] = useActionState(
    UpdateUsersAdmin,
    {}
  );

  useEffect(() => {
    if (stateUpdate?.success === true) {
      toast.success(stateUpdate.message);
      setOpen(false);
      mutate();
    } else {
      setOpen(false);
      toast.success(stateUpdate.message);
    }
  }, [stateUpdate]);

  // DELETE
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosClient.delete(`/users/${id}`);
        mutate();
        Swal.fire({
          title: "Berhasil Hapus Akun Users",
          text: "Succes Delete Users",
          icon: "success",
        });
      }
    });
  };

  const handleUpdate = (users) => {
    setUpdateUsers(users);
    setOpen(true);
  };

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
      {/* SEARCH */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          className="input input-md outline-0"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setOpen(true)}
          className="btn bg-transpram text-white"
        >
          Create Users
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Role</th>
              <th>Kelas</th>
              <th>Jurusan</th>
              <th>Pembimbing</th>
              <th>Perusahaan</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((u, i) => (
              <tr key={i}>
                <td>{(page - 1) * limit + (i + 1)}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.roles}</td>
                <td>{u.StudentUser?.kelas ?? "-"}</td>
                <td>{u.StudentUser?.jurusan ?? "-"}</td>
                <td>{u.StudentUser?.guruPembimbing?.username ?? "-"}</td>
                <td>{u.StudentUser?.StudentCompany?.name ?? "-"}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="btn btn-sm bg-red-500 text-white"
                  >
                    <MdDelete />
                  </button>

                  <button
                    onClick={() => {
                      handleUpdate(u);
                    }}
                    className="btn btn-sm bg-transpram text-white"
                  >
                    <RiPencilFill />
                  </button>
                </td>
              </tr>
            ))}

            {!users?.length && (
              <tr>
                <td colSpan="10" className="text-center text-gray-500">
                  Data Users kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <ModalComponent open={open} close={() => setOpen(false)}>
        <h1>{updateUsers ? "Edit Users" : "Create Users"}</h1>

        {/* FIX: key membuat form reset saat buka Create/Edit */}
        <form action={updateUsers ? doUpdate : doCreate} className="mt-6">
          {updateUsers && (
            <input type="hidden" name="id" defaultValue={updateUsers.id} />
          )}

          <div className="mb-5">
            <label className="floating-label">
              <span>Username</span>
              <input
                type="text"
                name="username"
                defaultValue={updateUsers?.username ?? ""}
                placeholder="Username"
                className="input input-md w-full outline-0"
              />
            </label>
          </div>

          <div className="mb-5">
            <label className="floating-label">
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={updateUsers?.email ?? ""}
                className="input input-md w-full outline-0"
              />
            </label>
          </div>

          <div className="mb-5">
            <label className="floating-label">
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-md w-full outline-0"
              />
            </label>
          </div>

          <div className="mb-6">
            <label className="floating-label">
              <select
                name="roles"
                defaultValue={updateUsers?.roles ?? ""}
                className="select w-full outline-0"
              >
                <option value="" disabled>
                  Pilih Role
                </option>
                <option value="admin">Admin</option>
                <option value="guru-pembimbing">Guru Pembimbing</option>
              </select>
            </label>
          </div>

          <button
            disabled={pendingCreate || pendingUpdate}
            className="btn w-full bg-transpram text-white disabled:bg-transpram/50"
          >
            {pendingCreate || pendingUpdate ? (
              <span className="loading loading-md loading-spinner"></span>
            ) : updateUsers ? (
              "Update Users"
            ) : (
              "Create Users"
            )}
          </button>
        </form>
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
