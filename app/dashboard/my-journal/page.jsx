
import { Suspense } from "react"
import JournalWrap from "./JournalWrap"
import Loading from "@/components/Loading"

const JournalPage = () => {
  return (
    <>
    	<Suspense fallback={<Loading/>} >
    	<div className="p-5">
    			<JournalWrap/>
    	</div>
    	</Suspense>
    </>
  )
}

export default JournalPage
