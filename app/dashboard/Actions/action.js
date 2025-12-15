import axiosClient from "@/lib/axios";

export const CreateComment = async (prevState, formData, id) => {
  try {
    const bodyForm = Object.fromEntries(formData);

    const res = await axiosClient.post(`/comment/${id}`, bodyForm);

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

export const AbsenCreate = async (prevState, formData) => {
  try {
    const bodyForm = Object.fromEntries(formData);

    const res = await axiosClient.post("/siswa/absen", bodyForm, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal Absen",
    };
  }
};

export const JournalCreate = async (prevState, formData) => {
  try {
    const bodyForm = Object.fromEntries(formData);

    const res = await axiosClient.post("/journal", bodyForm, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      success: true,
      message: res.data.message,
    };
    console.log(res);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error.response?.data?.message || "Gagal journal",
    };
  }
};

export const JournalUpdate = async (prevState, formData, id) => {
  try {
    const bodyForm = Object.fromEntries(formData);

    const res = await axiosClient.patch(`/journal/${id}`, bodyForm, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal Absen",
    };
  }
};
