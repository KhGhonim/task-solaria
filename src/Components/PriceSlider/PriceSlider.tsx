import { useState } from "react";
import PalygonData from "../../assets/PalygonData.json";

export default function PriceSlider({ setPriceRange }) {
  const [localPriceRange, setLocalPriceRange] = useState([
    0,
    Math.max(...PalygonData.map((d) => d.price)),
  ]);

  /**
   * Handles changes to the min and max price range inputs.
   * It updates the component's local state and the App component's state.
   */
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newValue = parseInt(value, 10);

    if (name === "min") {
      setLocalPriceRange((prev) => [newValue, prev[1]]);
      setPriceRange((prev) => [newValue, prev[1]]); // Update the App component state
    } else if (name === "max") {
      setLocalPriceRange((prev) => [prev[0], newValue]);
      setPriceRange((prev) => [prev[0], newValue]); // Update the App component state
    }
  };

  return (
    <>
      <div className="mt-6 space-y-2">{/* Status buttons here */}</div>
      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Price</span>
            <span>
              LE {localPriceRange[0]} - {localPriceRange[1]}
            </span>
          </div>
          <div className="flex space-x-4">
            <input
              type="range"
              name="min"
              min="0"
              max={localPriceRange[1]}
              value={localPriceRange[0]}
              onChange={handlePriceChange}
              className="w-full"
            />
            <input
              type="range"
              name="max"
              min={localPriceRange[0]}
              max={Math.max(...PalygonData.map((d) => d.price))}
              value={localPriceRange[1]}
              onChange={handlePriceChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
