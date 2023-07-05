import GroupsPage from "@components/GroupsPage";
import GroupsSidebar from "@components/GroupsSidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-between p-0 text-[white] ">
      <div className="flex border-neutral-800  overflow-hidden rounded-lg">
        <GroupsSidebar />
        <div className="flex-1 w-screen bg-[#070e0e] pl-[5%] pr-[5%]">
          <div class="p-4 py-12">
            <h1 className="text-[30px] font-bold">Teams</h1>
            <p className="text-sm ">Track teams & members</p>
          </div>

          <div className="">
            <GroupsPage />
          </div>
        </div>
      </div>
    </main>
  );
}
