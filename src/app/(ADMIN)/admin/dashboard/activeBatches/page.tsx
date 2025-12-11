// app/admin/dashboard/activeBatches/page.tsx
import BatchCard from "@/components/admin/BatchCard";
// import BatchCardWithPortal from "@/components/admin/BatchCardWithPortel";
import { ReactQueryServerProvider } from "@/context/ReactQueryServer";

export default async function ActiveBatchesPage() {
  // TEMP DATA (Replace later with AWS API)
  const batches = [
    {
      id: "b1",
      name: "Advanced Classical Dance",
      teacher: "Priya Sharma",
      duration: "6 Months",
      students: [
        { id: "s1", name: "Riya" },
        { id: "s2", name: "Aman" },
        { id: "s3", name: "Harsh" },
      ],
    },
    {
      id: "b2",
      name: "Beginner Yoga",
      teacher: "Aditi Singh",
      duration: "3 Months",
      students: [
        { id: "s4", name: "Neha" },
        { id: "s5", name: "Lakshay" },
      ],
    },
  ];

  return (
    <ReactQueryServerProvider>
      <div className="p-6 bg-black min-h-screen text-white space-y-6">
        <h1 className="text-3xl font-bold">Active Batches</h1>
             <p > Total Active Batches {batches.length}</p>
 
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {batches.map((b) => (
            <BatchCard key={b.id} batch={b} />
          ))}
        </div>
      </div>
    </ReactQueryServerProvider>
  );
}
