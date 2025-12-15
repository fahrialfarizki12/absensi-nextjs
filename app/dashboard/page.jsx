import JournalWrapper from "./JournalWrapper";
import { Suspense } from "react";
import LoadingSuspense from "@/components/LoadingSuspense";

const Dashboard = async () => {
	
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-10">
      	<Suspense fallback={<LoadingSuspense/>}>
        <JournalWrapper />
      	</Suspense>
      </div>
    </>
  );
};

export default Dashboard;
