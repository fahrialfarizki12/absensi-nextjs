"use client";
import useSWR from "swr";
import { useEffect, useState, useActionState } from "react";

import { BiSolidPencil } from "react-icons/bi";
import axiosClient from "@/lib/axios";
import { FormatTanggalAbsen } from "@/lib/FormatTanggal";
import Image from "next/image";
import { limitWords } from "@/lib/TextWrap";
import ModalComponent from "../ModalComponen";
import FormComponent from "../FormComponent";
import { FaFolderPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { JournalCreate, JournalUpdate } from "@/app/dashboard/Actions/action";
import { toast } from "react-toastify";

const TableJournal = ({ Result }) => {
  const [page, setPage] = useState(1);
  const [openPhoto, setOpenPhoto] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(false);
  const [coords, setCoords] = useState(null);
  const [preview, setPreview] = useState(null);
  const [limit] = useState(10); // tetap </10>
  const [edit, setEdit] = useState(null);

  const [state, formAction, isPending] = useActionState(JournalCreate, {});
  const [state2, formAction2, isPending2] = useActionState(
    (prevState, formAction) => JournalUpdate(prevState, formAction, edit?.id),
    {}
  );
  const fetcher = async () => {
    const response = await axiosClient("/journal/siswa", {
      params: { page, limit },
    });

    return response.data;
  };

  const { data, mutate } = useSWR(["journalId", page], fetcher, {
    fallbackData: Result,
  });

  const journal = data?.journal || [];

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

  //handleDelete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Postingan Journal Tidak bisa di kembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosClient.delete(`/journal/${id}`);
          Swal.fire({
            title: "Berhasil Hapus Journal",
            icon: "success",
          });
          mutate(["journalId", page]);
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error?.response?.data?.message,
            icon: "error",
          });
        }
      }
    });
  };

  //hanlde locstion
  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  };
  const handlePreview = (e) => {
    const files = e.target.files[0];
    if (!files) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(files);
    setPreview(url);
  };

  useEffect(() => {
    // Ambil hasil yang valid (state atau state2)
    const result = state?.success !== undefined ? state : state2;

    if (!result) return; // kalau belum ada hasil

    if (result.success === true) {
      toast.success(result.message);
      mutate(["journalId", page]);
      setOpen(false);
      setPreview(null);
    }

    if (result.success === false) {
      toast.error(result.error);
      setOpen(false);
      setPreview(null);
    }
  }, [state, state2]);
  // handle Edit

  const handleEdit = async (items) => {
    handleLocation();
    setEdit(items);
    setPreview(`${process.env.NEXT_PUBLIC_API}/journal/${items.photo}`);
    setOpen(true);
  };
  return (
    <>
      <div className="flex mb-5 justify-center items-center">
        <button
          onClick={() => {
            handleLocation();
            setPreview(null);
            setEdit(null);
            setOpen(true);
          }}
          className="btn bg-transpram text-white"
        >
          <FaFolderPlus />
          Create Journal
        </button>
      </div>
      {journal.length === 0 ? (
        <>
          <h1 className="text-center my-5 text-xl capitalize">
            Journal Siswa Masih Kosong
          </h1>
        </>
      ) : (
        <>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
              <thead>
                <tr className="text-black font-semibold">
                  <th>No</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Photo</th>
                  <th>Lokasi</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {journal.map((journalSiswa, index) => (
                  <tr key={index}>
                    <th>{(page - 1) * limit + (index + 1)}</th>

                    <td>{limitWords(journalSiswa.title, 5)}</td>
                    <td>{limitWords(journalSiswa.description, 5)}</td>

                    <td
                      onClick={() => {
                        setSelectedPhoto(
                          `${process.env.NEXT_PUBLIC_API}/journal/${journalSiswa.photo}`
                        );
                        setOpenPhoto(true);
                      }}
                    >
                      <Image
                        className="w-full aspect-video rounded object-center object-cover"
                        width={50}
                        alt={journalSiswa.title}
                        height={50}
                        src={`${process.env.NEXT_PUBLIC_API}/journal/${journalSiswa.photo}`}
                      />
                    </td>

                    <td>{limitWords(journalSiswa.location, 5)}</td>
                    <td>
                      <span className="badge bg-transpram text-white ">
                        {journalSiswa.status}
                      </span>
                    </td>
                    <td>{FormatTanggalAbsen(journalSiswa.createdAt)}</td>
                    <td className="flex items-center justify-center flex-col gap-2">
                      <button
                        onClick={() => handleEdit(journalSiswa)}
                        className="btn btn-sm bg-transpram text-white"
                      >
                        <BiSolidPencil />
                      </button>
                      <button
                        onClick={() => handleDelete(journalSiswa.id)}
                        className="btn btn-sm bg-red-500 text-white"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
      )}
      {/* Modal Photo preview 	 */}
      <ModalComponent open={openPhoto} close={() => setOpenPhoto(false)}>
        <h1 className="px-5 text-xl font-semibold">Preview Image</h1>          
               
        <div className="w-full rounded bg-gray-200 p-5">
           
          {selectedPhoto && (
            <Image
              src={selectedPhoto}
              width={500}
              height={500}
              alt="Preview"
              className="rounded-lg w-full h-auto object-contain"
            />
          )}
                          
        </div>
                       
      </ModalComponent>

      {/* Modal Create Journal  */}
      <ModalComponent
        open={open}
        close={() => {
          setPreview(null), setOpen(false);
        }}
      >
        <FormComponent
          Journal={true}
          TitleJournal={edit ? "Edit Journal" : "Create Journal"}
          coordsLat={coords?.lat ?? ""}
          coordsLon={coords?.lon ?? ""}
          handlePreview={handlePreview}
          preview={preview}
          FormAction={edit ? formAction2 : formAction}
          Ispending={edit ? isPending2 : isPending}
          textButton={edit ? "Update Journal" : "Create Journal"}
        />
      </ModalComponent>
    </>
  );
};

export default TableJournal;
