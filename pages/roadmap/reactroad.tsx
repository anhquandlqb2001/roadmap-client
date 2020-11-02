import { GetServerSideProps } from "next";
import React from "react";
import ReactMap from "../../components/ReactMap";
import UserAPI from "../../lib/api/user";

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

const ReactRoad = () => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const fetchMap = async () => {
      const response = await UserAPI.get_react_map();
      console.log(response);
      setData(response.data.data);
    };
    fetchMap();
  }, []);

  const fillMap = () => {
    const childField = recursiveReadAllSmallestChildField(data, []);
    childField.map((child) => {
      const pathElement = document.querySelector<HTMLElement>(
        `[aria-label="${child.field}"]`
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
  }, [data]);

  const handleClick = async (
    e: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    const fieldChange = e.currentTarget.getAttribute("aria-label");
    const currentValue = findVal(data, fieldChange);
    setData(recursiveChangeObject(data, fieldChange, !currentValue));
    await UserAPI.change_field_react_map({field: fieldChange, currentValue}).then(result => console.log(result.data))
    fillMap();
  };

  return (
    <>
      <ReactMap handleClick={handleClick} />
    </>
  );
};

export default ReactRoad;
