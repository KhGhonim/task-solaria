import PolygonsTypes from "../PolygonsTypes/PolygonsTypes";
import AvailabilityBtns from "../AvailabilityBtns/AvailabilityBtns";
import PriceSlider from "../PriceSlider/PriceSlider";
import { useState } from "react";

interface AvailabilityBtnsProps {
  handleStatusChange: (status: string | null) => void;
  setPriceRange: (priceRange: number[]) => void;
  handleTypeChange: (type: string | null) => void;
}
export default function FloatingModal({
  setPriceRange,
  handleStatusChange,
  handleTypeChange,
}: AvailabilityBtnsProps) {
  const [activeTab, setActiveTab] = useState("type");

  return (
    <div className="absolute z-50 top-4 left-4 p-4 rounded-lg bg-gray-700/80 backdrop-blur-sm w-[280px] text-white">
      <div className="w-full">
        <div className="flex w-full bg-transparent border-none">
          <button
            onClick={() => setActiveTab("type")}
            className={` ${
              activeTab === "type" ? "active text-white" : "text-gray-400"
            } relative w-full `}
          >
            Type
            <span
              className={`absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white transition-opacity duration-300 ${
                activeTab === "type" ? "opacity-100" : "opacity-0"
              }`}
            ></span>
          </button>
          <button
            onClick={() => setActiveTab("availability")}
            className={` ${
              activeTab === "availability"
                ? "active text-white"
                : "text-gray-400"
            } relative w-full `}
          >
            Availability
            <span
              className={`absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white transition-opacity duration-300 ${
                activeTab === "availability" ? "opacity-100" : "opacity-0"
              }`}
            ></span>
          </button>
        </div>
        {/* Content based on the active tab */}
        {activeTab === "type" && (
          <div className="w-full flex flex-col space-y-2">
            <PolygonsTypes handleTypeChange={handleTypeChange} />
            <PriceSlider setPriceRange={setPriceRange} />{" "}
          </div>
        )}
        {activeTab === "availability" && (
          <AvailabilityBtns handleStatusChange={handleStatusChange} />
        )}
      </div>
    </div>
  );
}
