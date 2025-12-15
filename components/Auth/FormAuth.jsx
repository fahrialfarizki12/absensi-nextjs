"use client";
import Link from "next/link";
import axiosClient from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const FormAuth = ({
  Register,
  Login,
  Forgot,
  LupaPassword,
  State,
  FormAction,
  isPending,
}) => {
  //KelasJurusan Option
  const kelasJurusan = [
    { kelas: "XII TKR 1", jurusan: "TEKNIK KENDARAAN RINGAN" },
    { kelas: "XII TKR 2", jurusan: "TEKNIK KENDARAAN RINGAN" },
    { kelas: "XII TKR 3", jurusan: "TEKNIK KENDARAAN RINGAN" },
    { kelas: "XII AKL", jurusan: "AKUNTANSI & KEUANGAN LEMBAGA" },
    { kelas: "XII TKJ 1", jurusan: "TEKNIK KOMPUTER & JARINGAN" },
    { kelas: "XII TKJ 2", jurusan: "TEKNIK KOMPUTER & JARINGAN" },
    { kelas: "XII TKJ 3", jurusan: "TEKNIK KOMPUTER & JARINGAN" },
  ];

  //ambul jurusanUniq
  const uniqJurusan = [...new Set(kelasJurusan.map((data) => data.jurusan))];

  //state
  const [getCompany, setCompany] = useState([]);
  const [getGuru, setGuru] = useState([]);

  useEffect(() => {
    const getCompanyName = async () => {
      try {
        const response = await axiosClient.get("/users/company/all");

        setCompany(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getGuruPembimbing = async () => {
      try {
        const response = await axiosClient.get("/users/guru/pembimbing");
        setGuru(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGuruPembimbing();
    getCompanyName();
    //Toast
  }, []);

  useEffect(() => {
    // Jangan running apa2 kalau State masih kosong

    if (State?.success === true) {
      toast.success(State.message);
    }

    if (State?.success === false) {
      toast.error(State.error);
    }
  }, [State]);

  return (
    <div className="flex  justify-center items-center h-screen">
      <div className="bg-white shadow-sm w-md p-2 px-6 rounded-xl pb-8 ">
        <div className="text-center my-5 ">
          <h1 className="font-semibold text-3xl uppercase">
            {Login
              ? "Login"
              : Register
                ? "Registrasi"
                : Forgot
                  ? "Lupa Password"
                  : "Update Password"}
          </h1>
        </div>
        <form className="flex flex-col mt-5" action={FormAction}>
          {Forgot && (
            <div className="mb-5">
              <label className="floating-label">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Masukan Email"
                  required
                  name="email"
                  className="input input-md w-full outline-0"
                />
              </label>
            </div>
          )}

          {LupaPassword && (
            <>
              <div className="mb-5">
                <label className="floating-label">
                  <span>New Password</span>
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    className="input input-md w-full outline-0"
                  />
                </label>
              </div>

              <div className="mb-5">
                <label className="floating-label">
                  <span>Konfirmasi Password</span>
                  <input
                    type="password"
                    placeholder="Konfirmasi Password"
                    required
                    name="konfirmasiPass"
                    className="input input-md w-full outline-0"
                  />
                </label>
              </div>
            </>
          )}

          {Login && (
            <>
              <div className="mb-5">
                <label className="floating-label">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    className="input input-md w-full outline-0"
                  />
                </label>
              </div>

              <div className="mb-5">
                <label className="floating-label">
                  <span>Password</span>
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    name="password"
                    className="input input-md w-full outline-0"
                  />
                </label>
              </div>
            </>
          )}
          {Register && (
            <>
              <div className="mb-5">
                <label className="floating-label">
                  <span>Username</span>
                  <input
                    type="text"
                    required
                    placeholder="Username"
                    name="username"
                    className="input input-md w-full outline-0"
                  />
                </label>
              </div>

              <div className="mb-5">
                <label className="floating-label">
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    name="email"
                    className="input input-md w-full outline-0"
                  />
                </label>
              </div>
              <div className="flex  gap-3">
                <div className="mb-5">
                  <label className="floating-label">
                    <span>Password</span>
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      name="password"
                      className="input input-md w-full outline-0"
                    />
                  </label>
                </div>

                <div className="mb-5">
                  <label className="floating-label">
                    <span>Konfirmasi Password</span>
                    <input
                      type="password"
                      required
                      placeholder="Konfirmasi Password"
                      name="konfirmasiPass"
                      className="input input-md w-full outline-0"
                    />
                  </label>
                </div>
              </div>

              <div className="mb-5">
                <label className="floating-label">
                  <select
                    name="kelas"
                    className="select w-full outline-0"
                    defaultValue="Pilih Kelas"
                    required
                  >
                    <option disabled>Pilih Kelas</option>
                    {kelasJurusan.map((kelas, index) => (
                      <option key={index} value={kelas.kelas}>
                        {kelas.kelas}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mb-5">
                <label className="floating-label">
                  <select
                    name="jurusan"
                    className="select w-full outline-0"
                    defaultValue="Pilih Jurusan"
                    required
                  >
                    <option disabled>Pilih Jurusan</option>
                    {uniqJurusan.map((jurusan, index) => (
                      <option key={index} value={jurusan}>
                        {jurusan}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mb-5">
                <label className="floating-label">
                  <select
                    name="lokasi_perusahaan"
                    className="select w-full outline-0"
                    defaultValue="Pilih Perusahaan"
                    required
                  >
                    <option disabled>Pilih Perusahaan</option>
                    {getCompany.map((company, index) => (
                      <option key={index} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mb-5">
                <label className="floating-label">
                  <select
                    name="guru_pembimbing"
                    className="select w-full outline-0"
                    defaultValue="Pilih Pembimbing"
                    required
                  >
                    <option disabled>Pilih Pembimbing</option>

                    {getGuru.map((guru, index) => (
                      <option key={index} value={guru.id}>
                        {guru.username}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </>
          )}

          {Login ? (
            <div className="flex gap-x-4 mb-3 py-1 items-center">
              <Link
                href="/auth/register"
                className=" text-sm  underline capitalize"
              >
                Belum punya akun?
              </Link>
              <Link
                href="/auth/forgot-password"
                className=" text-sm  underline capitalize"
              >
                Lupa Password?
              </Link>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="mb-3 text-sm w-fit py-1 underline capitalize"
            >
              Sudah punya akun?
            </Link>
          )}

          {/* Button Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="btn w-full bg-transpram text-white py-5 active:bg-transpram/50 hover:bg-transpram/50 disabled:bg-transpram/50"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : Login ? (
              "Login"
            ) : Register ? (
              "Registrasi"
            ) : Forgot ? (
              "Resend Email"
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormAuth;
