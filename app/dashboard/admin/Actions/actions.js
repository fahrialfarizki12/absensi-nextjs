import axiosClient from "@/lib/axios";

export const CreateUsersAdmin = async (prevState, formData) => {
  try {
    const bodyForm = Object.fromEntries(formData);

    const res = await axiosClient.post(`/users`, bodyForm);

    return {
      success: true,
      message: res.data.message,
    };
    console.log(res);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error.response?.data?.message || "Gagal Created",
    };
  }
};

export const UpdateUsersAdmin = async (prevState, formData) => {
  try {
    const bodyForm = Object.fromEntries(formData);
    const res = await axiosClient.patch(`/users/${bodyForm.id}`, bodyForm);

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal Update",
    };
  }
};

export const createGuru = async (prevState, formData) => {
  try {
    const bodyForm = Object.fromEntries(formData);
    const res = await axiosClient.post(`/users/guru/pembimbing`, bodyForm);

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal Update",
    };
  }
};

export const createCompany = async (prevState, formData) => {
  try {
    const bodyForm = Object.fromEntries(formData);
    const res = await axiosClient.post(`/users/company/create`, bodyForm);

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal create",
    };
  }
};
