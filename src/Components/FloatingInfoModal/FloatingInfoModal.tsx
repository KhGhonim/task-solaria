interface PolygonInfoProps {
  unit: {
    code: number;
    type: string;
    space_m2: string;
    price: number;
    status: string;
  };
  position: { x: number; y: number };
}
/**
 * Displays a floating information box for a polygon unit.
 * The box includes details such as unit code, type, space, price, and status.
 * The position of the box on the page is determined by the provided coordinates.
 */
export default function FloatingInfoModal({ unit, position }: PolygonInfoProps) {
  return (
    <div
      style={{ top: `${position?.y}px`, left: `${position?.x}px` }}
      className={`w-[240px]  ${
        !unit?.code ? "hidden" : ""
      } absolute !z-50  bg-gray-800/80 backdrop-blur-sm text-white border-none shadow-xl rounded-lg`}
    >
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Unit {unit?.code}</h3>
          <span
            className={`px-2 py-1 rounded-md capitalize text-sm ${
              unit?.status === "available"
                ? "bg-green-500"
                : unit?.status === "reserved"
                ? "bg-amber-500"
                : "bg-red-500"
            }`}
          >
            {unit?.status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Unit Type</span>
            <span>{unit?.type}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Total Area</span>
            <span>{unit?.space_m2} M²</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Price</span>
            <span>{unit?.price} EGP</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 pt-0">
        <button className="w-full py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold">
          Callback
        </button>
      </div>
    </div>
  );
}
