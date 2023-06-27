import Sidebar from "@components/Sidebar";
import TeamOverviewHeader from "@components/TeamOverviewHeader";
import { setLazyProp } from "next/dist/server/api-utils";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-between p-0">
      <div className="flex border-neutral-800  overflow-hidden rounded-lg">
        <Sidebar />
        <div className="flex-1 w-screen bg-[#070E0E] p-10">
          <TeamOverviewHeader />
        </div>
      </div>
    </main>
  );
}
