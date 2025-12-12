"use client";


const DURATION_OPTIONS = ["1", "2", "3", "6", "9", "12"];

export default function DurationCourseForm() {

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white">Course Duration</h3>

      <select
        className="w-full bg-[#181818] border border-[#333] text-white rounded-md p-3 focus:ring-2 focus:ring-[#00BFFF]"
      >
        <option value="">Select Duration</option>
        {DURATION_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}