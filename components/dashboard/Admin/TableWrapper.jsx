import { cookies } from "next/headers";
import TableUsers from "./TableUsers";
import TableGuru from "./TableGuru";
import TableAbsen from "./TableAbsen";
import TableCompany from "./TableCompany";

export default async function TableWrap({ guru, Absen, Company }) {
  const Cookies = await cookies();
  const token = Cookies.get("token")?.value;

  let jsonData;

  if (guru) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/v1/users/guru/pembimbing`,
      {
        cache: "no-cache",
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );
    jsonData = await res.json();
  } else if (Absen) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/v1/siswa/absen`,
      {
        cache: "no-cache",
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );
    jsonData = await res.json();
  } else if (Company) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/v1/users/company/all`,
      {
        cache: "no-cache",
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );
    jsonData = await res.json();
  } else {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/users`, {
      cache: "no-cache",
      headers: {
        Cookie: `token=${token}`,
      },
    });
    jsonData = await res.json();
  }

  return guru ? (
    <TableGuru Result={jsonData} />
  ) : Absen ? (
    <TableAbsen Result={jsonData} />
  ) : Company ? (
    <TableCompany Result={jsonData} />
  ) : (
    <TableUsers Result={jsonData} />
  );
}
