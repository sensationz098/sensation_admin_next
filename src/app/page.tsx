



export default  function HomePage() {
  return (
    <main className=" h-[calc(100vh-72px)]  bg-black text-gray-200 flex flex-col items-center justify-center w-full" 
  //  style={{
  //   height: "calc(100vh - (40px + 32px))",
  // }}
  >
      <section className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Course Builder Admin Panel
        </h1>
        <p className="text-lg text-gray-400 mb-12">
          Manage  company courses, instructors, and analytics from one place.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-10 w-full max-w-6xl">
        <div className="bg-[#111] border border-[#222] rounded-2xl p-8 text-center hover:border-[#1E90FF] transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-white mb-3">Courses</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Create, edit, and organize your entire course catalog with full control
            over structure, content, and publishing.
          </p>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-2xl p-8 text-center hover:border-[#1E90FF] transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-white mb-3">Instructors</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Oversee instructor onboarding, roles, and teaching permissions
            across all departments.
          </p>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-2xl p-8 text-center hover:border-[#1E90FF] transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-white mb-3">Reports</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Access key metrics, track progress, and export analytics for internal
            evaluation and planning.
          </p>
        </div>
      </section>

      {/* <footer className="bg-red-500 text-center text-sm text-gray-600 ">
        <p>© {new Date().getFullYear()} Course Builder Admin | Internal Use Only</p>
      </footer> */}
    </main>
  );
}