import { useEffect, useState } from "react";

interface ComponentProps {
  handleHover: (polygon, event) => void;
  setHoveredPolygon: (polygon) => void;
  filteredPolygons: {
    code: number;
    status: string;
    price: number;
    type: string;
    space_m2: string;
  }[];
  svgData: string;
}
export default function PolygonDataOnHover({
  handleHover,
  setHoveredPolygon,
  filteredPolygons,
  svgData,
}: ComponentProps) {
  const [parsedPolygons, setParsedPolygons] = useState([]);
  /**
   * Parses the SVG data and filters out the polygons that are not in the filteredPolygons array.
   * It then sets the parsedPolygons state with the filtered and parsed polygons.
   * This function is run whenever the svgData or filteredPolygons state changes.
   */
  useEffect(() => {
    if (svgData) {
      const svgDoc = new DOMParser().parseFromString(svgData, "image/svg+xml");
      const allPolygons = Array.from(svgDoc.querySelectorAll("polygon"));

      /**
       * Maps over the polygons and returns an object with the following properties:
       * - datacode: The data-code attribute of the polygon.
       * - points: The points attribute of the polygon.
       * - fill: The fill attribute of the polygon, or red if it is not set.
       * - ...matchingData: The properties of the matching filteredPolygon object.
       * If no matching filteredPolygon is found, the function returns null.
       */
      const filteredParsedPolygons = allPolygons
        .map((polygon) => {
          const dataCode = polygon.getAttribute("data-code");
          const matchingData = filteredPolygons.find(
            (fp) => fp.code === parseInt(dataCode, 10) - 2
          );

          if (matchingData) {
            return {
              datacode: dataCode,
              points: polygon.getAttribute("points"),
              fill: polygon.getAttribute("fill") || "red",
              ...matchingData,
            };
          }
          return null;
        })
        .filter(Boolean);

      setParsedPolygons(filteredParsedPolygons);
    }
  }, [svgData, filteredPolygons]);

  return (
    <svg
      id="uuid-59b76a1b-abe3-40a4-afca-d4837b2fbc74"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3950.8 3950.8"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: 10,
      }}
    >
      {parsedPolygons.map((polygon, index) => (
        <polygon
          key={index}
          data-code={polygon.datacode}
          points={polygon.points}
          fill={polygon.fill}
          onMouseEnter={(e) => handleHover(polygon, e)}
          onMouseLeave={() => setHoveredPolygon(null)}
          style={{
            cursor: "pointer",
            transition: "fill 0.3s ease-in-out",
            stroke: "#000",
            strokeWidth: 1,
            zIndex: 10,
          }}
        />
      ))}
    </svg>
  );
}
