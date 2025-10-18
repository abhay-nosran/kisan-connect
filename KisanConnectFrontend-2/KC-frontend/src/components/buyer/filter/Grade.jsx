import { useState } from "react";

export default function Grade({ selectedGrade, setSelectedGrade }) {
  const grades = ["A", "B", "C"];
  const [isOpen, setIsOpen] = useState(true);

  const toggleGrade = (grade) => {
    let updated;
    if (selectedGrade.includes(grade)) {
      updated = selectedGrade.filter((g) => g !== grade);
    } else {
      updated = [...selectedGrade, grade];
    }
    setSelectedGrade(updated);
  };

  return (
    <div className="p-4 rounded-xl shadow-sm">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold text-[#458448]">Grade</h2>

        <svg
          className={`w-4 h-4 text-[#458448] transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="grid grid-cols-3 gap-1 mt-2">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => toggleGrade(grade)}
              className={`px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-200 ${
                selectedGrade.includes(grade)
                  ? "bg-[#6DAF7B] text-white"
                  : "bg-[#FFFAF0] text-black"
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
