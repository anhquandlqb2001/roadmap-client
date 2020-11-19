import React, { useState } from "react";
import ReactMap from "../../components/ReactMap";
import RoadAPI from "../../lib/api/road";
import { withRouter } from "next/router";
import { ROAD_ENDPOINT } from "../../lib/util/endpoints.constant";

const recursiveChangeObject = (obj, searchKey, valueChange) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (key === searchKey && typeof value !== "object") {
      obj[key] = valueChange;
    } else if (typeof value === "object") {
      recursiveChangeObject(value, searchKey, valueChange);
    }
  });
  return obj;
};

const recursiveReadAllSmallestChildField = (obj, arr) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const val = findVal(obj, key);
    if (typeof val !== "object") {
      arr.push({ field: key, value: val });
    }
    if (typeof value !== "object") {
    } else if (typeof value === "object") {
      recursiveReadAllSmallestChildField(value, arr);
    }
  });
  return arr;
};

function findVal(object, key) {
  var value;
  Object.keys(object).some(function (k) {
    if (k === key) {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === "object") {
      value = findVal(object[k], key);
      return value !== undefined;
    }
  });
  return value;
}

const ReactRoad = ({router}) => {
  const [ownerMapID, setOwnerMapID] = useState(null);
  const [road, setRoad] = useState({})

  const mapID = router.query.id

  if (mapID === "undefined") {
    return null
  }

  React.useEffect(() => {
    const fetchMap = async () => {
      const response = await RoadAPI.get_map(`${ROAD_ENDPOINT}/${mapID}`);
      setRoad(response.data.data.map);
      response.data.data?.ownerMapID && setOwnerMapID(response.data.data?.ownerMapID)
    };
    try {
      fetchMap();
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

  console.log("re-render");
  

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
      console.log(result.data)
      if (!result.data.success) {
        return;
      }
      fillMap();
    });
  };

  return (
    <>
      <ReactMap handleClick={handleClick} />
    </>
  );
};


export default withRouter(ReactRoad);
