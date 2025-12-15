"use server";

import axiosClient from "@/lib/axios";

export const RegisterAction = async (prevState, formData) => {
  try {
    const bodyForm = Object.fromEntries(formData);
    bodyForm.lokasi_perusahaan = parseInt(bodyForm.lokasi_perusahaan);
    bodyForm.guru_pembimbing = parseInt(bodyForm.guru_pembimbing);

    const res = await axiosClient.post("/auth/register", bodyForm);

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal Register",
    };
  }
};

export const LoginAction = async (prevState, formData) => {
  try {
    const bodyForm = Object.fromEntries(formData);
    const res = await axiosClient.post("/auth/login", bodyForm);

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal Login",
    };
  }
};

export const ForgotPasswordAction = async (prevState, formData) => {
  try {
    const bodyForm = Object.fromEntries(formData);
    const res = await axiosClient.post("/auth/forgot-password", bodyForm);

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal Login",
    };
  }
};

export const UpdatePasswordAction = async (prevState, formData, token) => {
  try {
    console.log(token);
    const bodyForm = Object.fromEntries(formData);
    const res = await axiosClient.patch(
      `/auth/update-password?token=${token}`,
      bodyForm
    );

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error.response?.data?.message || "Gagal Login",
    };
  }
};
