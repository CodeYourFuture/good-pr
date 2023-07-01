import GroupsPage from "@components/GroupsPage";
import Sidebar from "@components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-between p-0">
      <div className="flex border-neutral-800  overflow-hidden rounded-lg">
        <Sidebar />
        <div className="flex-1 w-screen bg-[#070e0e] p-10">
          <div>
            <h1 className="text-2xl font-bold">Teams</h1>
            <p className="text-sm ">Track teams & members</p>
          </div>

          <div className="mt-20">
            <GroupsPage />
          </div>
        </div>
      </div>
    </main>
  );
}
