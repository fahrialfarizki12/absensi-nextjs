"use client";
import FormAuth from "@/components/Auth/FormAuth";
import { ForgotPasswordAction } from "../action/Action.js";

import { useActionState } from "react";
const ForgotPassword = () => {
  const [state, formAction, isPending] = useActionState(
    ForgotPasswordAction,
    {}
  );
  return (
    <>
      <FormAuth
        State={state}
        isPending={isPending}
        FormAction={formAction}
        Forgot={true}
      />
    </>
  );
};

export default ForgotPassword;
