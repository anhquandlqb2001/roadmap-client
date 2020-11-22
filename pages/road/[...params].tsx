import React, { useState } from "react";
import ReactMap from "../../components/map/ReactMap";
import RoadAPI from "../../lib/api/road";
import { withRouter } from "next/router";
import { ROAD_ENDPOINT } from "../../lib/util/endpoints.constant";
import {
  recursiveChangeObject,
  findVal,
  recursiveReadAllSmallestChildField,
} from "../../components/map/service";
import DefaultErrorPage from "next/error";

const fillMap = (road) => {
  const childField = recursiveReadAllSmallestChildField(road, []);
  childField.map((child) => {
    const pathElement = document.querySelector<HTMLElement>(
      `[name="${child.field}"]`
    );
    if (pathElement && child.value === true) {
      pathElement.style.fill = "green";
    } else if (pathElement) {
      pathElement.style.fill = "";
    }
  });
};

const Road = ({ router }) => {
  const [ownerMapID, setOwnerMapID] = useState(null);
  const [road, setRoad] = useState({});
  const [loading, setLoading] = useState(true);
  const mapName = router.query.params && router.query.params[0];
  const mapID = router.query.params && router.query.params[1];

  if (mapID === "undefined") {
    return null;
  }

  React.useEffect(() => {
    const fetchMap = async () => {
      const response = await RoadAPI.get_map(`${ROAD_ENDPOINT}/${mapID}/info`);
      setRoad(response.data.data.map);
      response.data.data?.ownerMapID &&
        setOwnerMapID(response.data.data?.ownerMapID);

      response.data.success && setLoading(false);
    };
    try {
      if (typeof mapID !== "undefined") fetchMap();
    } catch (error) {
      console.log(error);
    }
  }, [mapID]);

  React.useEffect(() => fillMap(road), [road]);

  

  const handleClick = async (
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    const fieldChange = e.currentTarget.getAttribute("id");
    const currentValue = findVal(road, fieldChange);

    if (e.ctrlKey) {
      alert("redirect now");
      return;
    }
    console.log(currentValue.value);
    setRoad(recursiveChangeObject(road, fieldChange, !currentValue.value));
    console.log(currentValue.value);

    await RoadAPI.change_field_map(
      mapID,
      ownerMapID,
      fieldChange,
      !currentValue.value
    ).then((result) => {
      if (!result.data.success) {
        return;
      }
      console.log(result.data);
      fillMap(road);
    });
  };

  switch (mapName) {
    case "react":
      return <ReactMap handleClick={handleClick} />;
  }

  return <>{loading ? "Loading..." : <DefaultErrorPage statusCode={404} />}</>;
};

export default withRouter(Road);
