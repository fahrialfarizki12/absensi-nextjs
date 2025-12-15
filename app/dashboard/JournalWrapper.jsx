import JournalList from "@/components/dashboard/JournalList";
import { cookies } from "next/headers";

export default async function JournalWrapper(request) {
	const Cookies = await cookies()
	const token = Cookies.get("token")?.value
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/journal`, {
    cache: "no-cache",
    headers:{
    	Cookie: `token=${token}`
    }
  });
  const json = await res.json();

  return <JournalList Result={json} />;
}

