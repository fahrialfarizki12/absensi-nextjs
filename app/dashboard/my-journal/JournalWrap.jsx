import TableJournal from "@/components/dashboard/Journal/TableJournal";
import { cookies } from "next/headers";

export default async function JournalWrap() {
  const Cookies = await cookies();
  const token = Cookies.get("token")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/journal/siswa`, {
  cache: "no-cache",
    headers: {
      Cookie: `token=${token}`,
    },
  });
  const json = await res.json();

  return <TableJournal Result={json} />;
}

