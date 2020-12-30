import { NextRouter } from "next/router";
import { updateMapProgress } from "../../../lib/api/road";
import { TCurrentUserResponseMap } from "../../../lib/api/user";
import AutoCompleteClass from "./autocomplete";

export const recursiveChangeObject = (obj, searchKey, valueChange) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (key === searchKey && value.hasOwnProperty("value")) {
      obj[key].value = valueChange;
    } else if (typeof value === "object") {
      recursiveChangeObject(value, searchKey, valueChange);
    }
  });
  return obj;
};

export const getChildNodes = (obj, arr) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const val = findVal(obj, key);
    if (val.hasOwnProperty("value")) {
      arr.push({ field: key, value: val.value, resources: val?.resources });
    }
    if (typeof value !== "object") {
    } else if (typeof value === "object") {
      getChildNodes(value, arr);
    }
  });
  return arr;
};

export const findVal = (object, key) => {
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
};

export function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const fillChildNodes = (map, node: HTMLElement) => {
  const childField = getChildNodes(map, []);
  childField.map((child) => {
    const pathElement = node.querySelector<HTMLElement>(
      `[id="${child.field}"]`
    );
    if (pathElement) {
      pathElement.classList.add("node--child")
      if (pathElement && child.value === true) {
        pathElement.classList.add("active")
      } else if (pathElement) {
        pathElement.classList?.remove("active")
      }

    }
  });
};

export const fillParentNode = (map, node) => {
  const AutoComplete = new AutoCompleteClass(map);
  const parentNodesNameComplete = AutoComplete.getParentNodeNameComplete();

  const parentNodes = node.querySelectorAll(".node--parent");

  [...parentNodes].map((parentNode) => {
    if (parentNodesNameComplete.findIndex(p => p === parentNode) !== -1) {
      return;
    }
    parentNode.classList?.remove("active");
  });

  parentNodesNameComplete.map((parentNode) => {
    const pathElement = node.querySelector(`[id="${parentNode}"]`);
    if (pathElement) {
      pathElement.classList.add("active");
    }
  });
};

export /**
 *
 * @param map array of user map if user has login
 * @param currentMapId mapID of current map
 */
const findOwnerMapIDIfExist = (
  map: TCurrentUserResponseMap[],
  currentMapId: string
) => {
  let a;
  map.forEach((m) => {
    if (m.mapHasStarted === currentMapId) {
      return (a = m.ownerMapId);
    }
  });
  return a;
};

export const handleClick = async (
  mapId: string,
  map,
  e: React.MouseEvent<SVGPathElement, MouseEvent>,
  ref, 
  router: NextRouter
) => {
  const fieldChange = e.currentTarget.getAttribute("id");
  const fieldName = e.currentTarget.getAttribute("data-name")
  const currentValue = findVal(map, fieldChange);

  if (e.ctrlKey) {
    window.open(decodeURIComponent(`/docs/${mapId}#user-content-${fieldName}`))
    return;
  }

  await updateMapProgress({
    mapId: mapId,
    fieldChange: fieldChange,
    currentValue: currentValue.value,
  }).then((result) => {
    if (!result.data.success) {
      return;
    }
    const newMap = recursiveChangeObject(map, fieldChange, !currentValue.value);
    fillChildNodes(newMap, ref);
    fillParentNode(newMap, ref);
  });
};
