import Sidebar from "@components/Sidebar";
import TeamCard from "@components/TeamCard";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-between p-0">
      <div className="flex border-neutral-800  overflow-hidden rounded-lg">
        <Sidebar />
        <div className="flex-1 w-screen bg-[#F1F3F7] p-6">
          <div>
            <h1 className="text-2xl font-bold">Teams</h1>
            <p className="text-sm ">Track teams & members</p>
          </div>
          {/* below  is the part for teams cards, to be edited for multiple cards */}
          <div className="mt-24">
            <TeamCard />
          </div>
        </div>
      </div>
    </main>
  );
}
