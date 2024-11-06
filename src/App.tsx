import { useEffect, useState } from "react";
import FloatingInfo from "./Components/FloatingInfoModal/FloatingInfoModal";
import PolygonFiltering from "./Components/FloatingModal/FloatingModal";
import image from "./assets/0-floor.png";
import PolygonDataOnHover from "./Components/Polygons/Polygons";
import PalygonData from "./assets/PalygonData.json";
import svgOverlay from "./assets/0-floor.svg";

function App() {
  const [svgData, setsvgData] = useState<string>("");
  const [hoveredPolygon, setHoveredPolygon] = useState(null);
  const [infoPosition, setinfoPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [priceRange, setPriceRange] = useState<number[]>([
    0,
    Math.max(...PalygonData.map((d) => d.price)),
  ]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [filteredPolygons, setFilteredPolygons] = useState<
    {
      code: number;
      status: string;
      price: number;
      type: string;
      space_m2: string;
    }[]
  >(PalygonData);
  useEffect(() => {
    /**
     * Asynchronously fetches an SVG file from the specified overlay path
     * and updates the state with the fetched SVG data.
     */
    const fetchSvg = async () => {
      const response = await fetch(svgOverlay);
      const svg = await response.text();
      setsvgData(svg);
    };

    fetchSvg();
  }, []);
  useEffect(() => {
    /**
     * Filters the PalygonData based on the selected price range and status.
     * Returns only the polygons that match the criteria.
     */
    const filteredData = PalygonData.filter((polygon) => {
      // Check if the polygon's price is within the selected price range
      const inPriceRange =
        polygon.price >= priceRange[0] && polygon.price <= priceRange[1];

      // Check if the polygon's status matches the selected status, or if no status is selected
      const matchesStatus = selectedStatus
        ? polygon.status === selectedStatus
        : true;

      // Return true if both conditions are met, meaning the polygon should be included in the filtered data
      return inPriceRange && matchesStatus;
    });

    setFilteredPolygons(filteredData);
  }, [priceRange, selectedStatus]);
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  /**
   * Handles the hover event on a polygon, merging the polygon data
   * with matching data from PalygonData based on the polygon's data code.
   * Updates the hovered polygon state and information position.
   */
  const handleHover = (polygon, event) => {
    const matchingData = PalygonData.find(
      (data) => data.code === parseInt(polygon.datacode)
    );
    if (matchingData) {
      const mergedPolygon = { ...polygon, ...matchingData };
      setHoveredPolygon(mergedPolygon);
    }
    setinfoPosition({ x: event.clientX, y: event.clientY });
  };
  return (
    <div className="w-full h-full">
      <PolygonFiltering
        setPriceRange={setPriceRange}
        handleStatusChange={handleStatusChange}
      />
      <FloatingInfo unit={hoveredPolygon} position={infoPosition} />
      <PolygonDataOnHover
        handleHover={handleHover}
        setHoveredPolygon={setHoveredPolygon}
        filteredPolygons={filteredPolygons}
        svgData={svgData}
      />
      <img
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "#272727",
          objectFit: "cover",
        }}
        src={image}
        alt="Background"
      />
    </div>
  );
}

export default App;
