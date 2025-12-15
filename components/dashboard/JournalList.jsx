"use client";
import useSWR from "swr";
import { FaMessage } from "react-icons/fa6";
import Image from "next/image";
import axiosClient from "@/lib/axios";
import { FormatTanggal } from "@/lib/FormatTanggal";
import ModalComponent from "./ModalComponen";
import { IoSend } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useActionState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import { CreateComment } from "@/app/dashboard/Actions/action";

import { FaPencil } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";

const JournalList = ({ Result }) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(false);

  const fetcher = async () => {
    const response = await axiosClient.get("/journal");
    return response.data;
  };

  const { data, mutate } = useSWR("journal", fetcher, {
    fallbackData: Result,
  });

  const { data: journal } = data;

  const [getUsers, setGetUsers] = useState(false);
  useEffect(() => {
    const StoreLocal = localStorage.getItem("users");
    if (StoreLocal) {
      setGetUsers(JSON.parse(StoreLocal));
    }
  }, []);

  // CREATE COMMENT
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const res = await CreateComment(prevState, formData, selectedJournal.id);
      if (res.success) mutate("journal");
      return res;
    },
    {}
  );

  dayjs.extend(relativeTime);

  useEffect(() => {
    if (state?.success === true) {
      setOpen(false);
      toast.success(state.message);
    }

    if (state?.success === false) {
      setOpen(false);
      toast.error(state.error);
    }
  }, [state]);

  // ============================
  // DROPDOWN
  // ============================
  const [dropdown, setDropdown] = useState(null);

  const handleDropdown = (id) => {
    if (isOpen) {
      setDropdown((prev) => (prev === id ? null : id));
    }
  };

  // Tutup dropdown ketika modal ditutup
  const closeModal = () => {
    setDropdown(null);
    setEditMode(false);
    setEditValue("");
    setEditId(null);
    setOpen(false);
  };

  // ============================
  // DELETE COMMENT
  // ============================
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/comment/${id}`);
      toast.success("Berhasil menghapus komentar");
      setOpen(false);
      mutate("journal");
    } catch (error) {
      console.log(error);
      toast.error("Gagal Menghapus Komentar");
    }
  };

  // ============================
  // EDIT COMMENT
  // ============================
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState(null);

  const handleStartEdit = (comment) => {
    setEditMode(true);
    setEditValue(comment.komentar);
    setEditId(comment.id);
    setDropdown(null);
  };

  const handleSaveEdit = async () => {
    try {
      await axiosClient.patch(`/comment/${editId}`, {
        content: editValue,
      });

      toast.success("Komentar berhasil diperbarui");
      setEditMode(false);
      setEditValue("");
      setEditId(null);

      setOpen(false);
      mutate("journal");
    } catch (error) {
      console.log(error);
      toast.error("Gagal memperbarui komentar");
    }
  };

  useEffect(() => {
    mutate();
  }, []);
  return (
    <>
      {journal && journal.length > 0 ? (
        journal.map((Journal, index) => (
          <div key={index} className="w-full  px-2">
            <div className="bg-white text-sm border-b border-b-slate-300  w-full rounded rounded-b-none h-12 flex p-2 gap-3 items-center">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                  <Image
                    width={20}
                    height={20}
                    alt="profile"
                    src={`${process.env.NEXT_PUBLIC_API}/profile/profile-default.png`}
                  />
                </div>
              </div>

              <h1 className="font-semibold capitalize  w-full">
                {Journal.StudentJournal.User.username}
              </h1>

              <div className="flex justify-end items-center text-xs w-full">
                <p>Published {FormatTanggal(Journal.createdAt)}</p>
              </div>
            </div>

            <div className="card bg-base-100 w-full rounded-t-none  shadow-sm">
              <figure>
                <Image
                  className="w-full aspect-video object-cover object-center"
                  width={20}
                  height={20}
                  src={`${process.env.NEXT_PUBLIC_API}/journal/${Journal.photo}`}
                  alt={Journal.title}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{Journal.title}</h2>
                <p>{Journal.description}</p>
                <p>
                  Lokasi :{" "}
                  <span className="font-semibold">{Journal.location}</span>
                </p>

                <div className="card-actions  justify-end">
                  <button
                    className="btn bg-transpram shadow text-white"
                    onClick={() => {
                      setSelectedJournal(Journal);
                      setOpen(true);
                    }}
                  >
                    <FaMessage />
                    {Journal.JournalComment.length}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-2xl text-center capitalize">
          DATA JOURNAL MASIH KOSONG
        </h1>
      )}

      {/* MODAL COMMENT */}
      <ModalComponent
        open={isOpen}
        close={closeModal}
        bottomModal={true}
        Padding={true}
        Margin={true}
      >
        <div className="relative">
          <div className="p-5  border-b border-b-gray-200">
            <h1 className="text-xl font-semibold">Berikan Komentar</h1>
          </div>

          {selectedJournal.JournalComment?.length > 0 ? (
            selectedJournal.JournalComment.map((comment, index) => (
              <div key={index} className="p-5 text-sm wrap-break-word mt-2">
                <div className="bg-white shadow w-full h-10 p-2 ">
                  <div className="flex w-full gap-4 text-sm  items-center">
                    <div className="avatar">
                      <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                        <Image
                          width={20}
                          height={20}
                          alt="profile"
                          src={`${process.env.NEXT_PUBLIC_API}/profile/profile-default.png`}
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <h1 className="capitalize font-semibold">
                        {comment?.CommentStudents?.User?.username}
                      </h1>
                    </div>

                    <div className="flex w-full justify-end items-center">
                      <span className="mr-3 ">
                        {dayjs(comment.createdAt).fromNow()}
                      </span>

                      {getUsers.studentId === comment.CommentStudents.id && (
                        <div className="relative">
                          <button onClick={() => handleDropdown(comment.id)}>
                            <BsThreeDotsVertical size={20} />
                          </button>

                          {dropdown === comment.id && (
                            <div className=" bg-white shadow absolute p-5 top-10 right-0 w-50 flex-col gap-4 flex z-50">
                              <button
                                onClick={() => handleStartEdit(comment)}
                                className="btn w-full bg-transpram text-white"
                              >
                                <FaPencil />
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(comment.id)}
                                className="btn w-full bg-red-500 text-white"
                              >
                                <FaTrashCan />
                                Hapus
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* COMMENT / EDIT FORM */}
                <div className="p-2 py-3 bg-white border border-gray-200">
                  {editMode && editId === comment.id ? (
                    <div className="flex flex-col gap-3">
                      <textarea
                        className="textarea textarea-bordered w-full outline-0"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="btn bg-transpram text-white"
                      >
                        Simpan
                      </button>
                    </div>
                  ) : (
                    <p>{comment.komentar}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center text-sm my-5">Komentar Masih Kosong</h1>
          )}

          {/* Input Tambah Komentar */}
          <div className="bg-white mt-20 border border-gray-200 sticky bottom-0  z-10 p-5 w-full">
            <form
              action={formAction}
              className="flex justify-center items-center gap-2 w-full"
            >
              <label className="floating-label">
                <span>Masukan Komentar</span>
                <input
                  type="text"
                  placeholder="Masukan Komentar"
                  required
                  name="content"
                  className="input input-md w-full outline-0"
                />
              </label>

              <button className="btn bg-transpram text-white">
                {isPending ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <IoSend />
                )}
              </button>
            </form>
          </div>
        </div>
      </ModalComponent>
    </>
  );
};

export default JournalList;
