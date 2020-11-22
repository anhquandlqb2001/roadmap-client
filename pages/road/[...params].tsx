import React, { useState } from "react";
import ReactMap from "../../components/map/ReactMap";
import RoadAPI from "../../lib/api/road";
import { withRouter } from "next/router";
import { ROAD_ENDPOINT } from "../../lib/util/endpoints.constant";
import {
  recursiveChangeObject,
  recursiveReadAllSmallestChildField,
  findVal,
} from "../../components/map/service";
import DefaultErrorPage from "next/error";

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
      if(typeof mapID !== "undefined") fetchMap();
    } catch (error) {
      console.log(error);
    }
  }, [mapID]);

  const fillMap = () => {
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

  React.useEffect(() => {
    fillMap();
  }, [road]);

  const handleClick = async (
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    const fieldChange = e.currentTarget.getAttribute("name");
    const currentValue = findVal(road, fieldChange);
    setRoad(recursiveChangeObject(road, fieldChange, !currentValue));
    await RoadAPI.change_field_map(
      mapID,
      ownerMapID,
      fieldChange,
      currentValue
    ).then((result) => {
      console.log('result: ', result);
      if (!result.data.success) {
        return;
      }
      fillMap();
    });
  };

  switch (mapName) {
    case "react":
      return <ReactMap handleClick={handleClick} />;
  }

  return <>{loading ? "Loading..." : <DefaultErrorPage statusCode={404} />}</>;
};

export default withRouter(Road);
