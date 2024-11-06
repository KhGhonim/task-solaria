interface AvailabilityContentProps {
  handleTypeChange: (status: string | null) => void;
}
export default function PolygonsTypes({
  handleTypeChange,
}: AvailabilityContentProps) {
  return (
    <div className="mt-6 space-y-2">
      <button
        onClick={() => handleTypeChange("Commercial")}
        className="w-full p-2 rounded bg-emerald-500 hover:bg-emerald-600 transition-colors text-center"
      >
        Commercial
      </button>
      <button
        onClick={() => handleTypeChange("Administrative")}
        className="w-full p-2 rounded bg-amber-500 hover:bg-amber-600 transition-colors text-center"
      >
        Administrative
      </button>
      <button
        onClick={() => handleTypeChange("")}
        className="w-full p-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors text-center"
      >
        Clinical
      </button>
    </div>
  );
}
