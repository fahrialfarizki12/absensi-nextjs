
"use client";
import FormAuth from "@/components/Auth/FormAuth";
import { UpdatePasswordAction } from "../action/Action.js";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
const UpdatePassword = () => {
  const SearchParams = useSearchParams()
  const token = SearchParams.get("token")
  //kirim token ke sisi server makai bind
  const [state, formAction, isPending] = useActionState((prevState,formData) => UpdatePasswordAction(prevState,formData,token),
    {},
  )
  return (
    <>
      <FormAuth
        State={state}
        isPending={isPending}
        FormAction={formAction}
        LupaPassword={true}

      />
    </>
  );
};

export default UpdatePassword;
