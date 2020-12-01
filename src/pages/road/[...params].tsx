import React, { useState } from "react";
import ReactMap from "../../components/map/ReactMap";
import { getMap, changeFieldMap } from "../../lib/api/road";
import { withRouter } from "next/router";
import { ROAD_ENDPOINT } from "../../lib/util/endpoints.constant";
import {
  recursiveChangeObject,
  findVal,
  fillMap,
} from "../../components/map/service";
import DefaultErrorPage from "next/error";

const Road = ({ router }) => {
  const [road, setRoad] = useState({});
  const [loading, setLoading] = useState(true);
  const mapName = router.query.params && router.query.params[0];
  const mapID = router.query.params && router.query.params[1];

  if (mapID === "undefined") {
    return null;
  }

  React.useEffect(() => {
    const fetchMap = async () => {
      const response = await getMap(`${ROAD_ENDPOINT}/${mapID}/info`);
      setRoad(response.data.data.map);
      response.data.success && setLoading(false);
    };
    try {
      if (typeof mapID !== "undefined") fetchMap();
    } catch (error) {
      console.log(error);
    }
  }, [mapID]);

  const handleClick = async (
    mapID: string,
    ownerMapID: string,
    map,
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    const fieldChange = e.currentTarget.getAttribute("id");
    const currentValue = findVal(map, fieldChange);
    if (e.ctrlKey) {
      alert("redirect now");
      return;
    }

    setRoad(recursiveChangeObject(map, fieldChange, !currentValue.value));
    
    await changeFieldMap(
      mapID,
      ownerMapID,
      fieldChange,
      !currentValue.value
    ).then((result) => {
      if (!result.data.success) {
        return;
      }
      console.log(result.data);
      fillMap(map);
    });
  };

  switch (mapName) {
    case "react":
      return <ReactMap mapID={mapID} handleClick={handleClick} road={road} />;
  }

  return <>{loading ? "Loading..." : <DefaultErrorPage statusCode={404} />}</>;
};

export default withRouter(Road);
