"use client";
import FormAuth from "@/components/Auth/FormAuth"
import { RegisterAction } from "../action/Action.js"
import { useActionState } from "react"

const Register = () => {
  const [state,formAction,isPending] = useActionState(RegisterAction,{})
  return (
  <>
    <FormAuth Register={true} State={state} FormAction={formAction} isPending={isPending}/>
    </>
  )
}

export default Register
