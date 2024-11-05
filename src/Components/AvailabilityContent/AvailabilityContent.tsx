interface AvailabilityContentProps {
  handleStatusChange: (status: string | null) => void;
}
export default function AvailabilityContent({
  handleStatusChange,
}: AvailabilityContentProps) {
  return (
    <div className="mt-6 space-y-2">
      <button
        onClick={() => handleStatusChange(null)}
        className="w-full text-center p-2 rounded bg-purple-500 hover:bg-purple-600 transition-colors"
      >
        All
      </button>
      <button
        onClick={() => handleStatusChange("sold")}
        className="w-full text-center p-2 rounded bg-red-500 hover:bg-red-600 transition-colors"
      >
        Sold
      </button>
      <button
        onClick={() => handleStatusChange("available")}
        className="w-full text-center p-2 rounded bg-green-500 hover:bg-green-600 transition-colors"
      >
        Available
      </button>
      <button
        onClick={() => handleStatusChange("reserved")}
        className="w-full text-center p-2 rounded bg-amber-500 hover:bg-amber-600 transition-colors"
      >
        Reserved
      </button>
    </div>
  );
}
