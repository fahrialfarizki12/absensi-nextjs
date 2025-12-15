"use client";

import { useActionState } from "react";
import { LoginAction } from "../action/Action";
import FormAuth from "@/components/Auth/FormAuth";
import axiosClient from "@/lib/axios";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const [state, formAction, isPending] = useActionState(LoginAction, {});

  const router = useRouter();

  const handleLogin = async (formData) => {
    //kita masukan formData ke FormAction useActionState kita
    formAction(formData);

    //ambil form data
    const bodyForm = Object.fromEntries(formData);
    try {
      //feth login agar cookie ke kirim ke browser
      const res = await axiosClient.post("/auth/login", bodyForm);
      //ini agar cookie bisa masuk ke browser.
      const users = res.data.data;
      const usersData = {
        id: users.id,
        username: users.username,
        email: users.email,

        studentId: users?.StudentUser?.id ?? "Tidak ada",
        kelas: users?.StudentUser?.kelas ?? "Tidak ada",
        jurusan: users?.StudentUser?.jurusan ?? "Tidak ada",
        lokasiPrakerind: users?.StudentUser?.lokasi_perusahaan ?? "Tidak ada",
        pembimbing: users?.StudentUser?.guru_pembimbing ?? "Tidak ada",

        roles: users?.roles,
        photo: users?.photo,
      };
      localStorage.setItem("users", JSON.stringify(usersData));

      router.push("/");
    } catch (error) {
      router.push("/auth/login");
    }
  };

  return (
    <FormAuth
      Login={true}
      State={state}
      isPending={isPending}
      FormAction={handleLogin}
    />
  );
};

export default LoginPage;
