import TableWrap from "@/components/dashboard/Admin/TableWrapper";
import Loading from "@/components/Loading";
import { Suspense } from "react";
const page = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="p-4">
          <TableWrap Company={true} />
        </div>
      </Suspense>
    </>
  );
};

export default page;
