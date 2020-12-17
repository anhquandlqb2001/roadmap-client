import { RefObject } from "react";
import { changeFieldMap } from "../../lib/api/road";
import { TCurrentUserResponseMap } from "../../lib/api/user";

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

export const recursiveReadAllSmallestChildField = (obj, arr) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const val = findVal(obj, key);
    if (val.hasOwnProperty("value")) {
      arr.push({ field: key, value: val.value, resources: val?.resources });
    }
    if (typeof value !== "object") {
    } else if (typeof value === "object") {
      recursiveReadAllSmallestChildField(value, arr);
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

export const fillMap = (map, node: HTMLElement) => {
  const childField = recursiveReadAllSmallestChildField(map, []);
  childField.map((child) => {
    const pathElement = node.querySelector<HTMLElement>(
      `[id="${child.field}"]`
    );
    if (pathElement) {
      if (pathElement && child.value === true) {
        pathElement.style.fill = "green";
      } else if (pathElement) {
        pathElement.style.fill = "";
      }

      pathElement.style.cursor = "pointer"
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
  ref
) => {
  const fieldChange = e.currentTarget.getAttribute("id");
  const currentValue = findVal(map, fieldChange);
  if (e.ctrlKey) {
    alert("redirect now");
    return;
  }

  await changeFieldMap({
    mapId: mapId,
    fieldChange: fieldChange,
    currentValue: currentValue.value,
  }).then((result) => {
    if (!result.data.success) {
      return;
    }
    fillMap(recursiveChangeObject(map, fieldChange, !currentValue.value), ref);
  });
};

export const removeHandleClick = ({
  ref,
  user,
  mapId,
  map,
  userHasStartedMap,
}) => {
  const nodeList = ref.current?.querySelectorAll(".node--child");
  nodeList.forEach((node) => {
    node.removeEventListener("click", async function (e) {
      if (!user.user) return console.log("Ban chua dang nhap!");
      if (userHasStartedMap) return await handleClick(mapId, map, e, ref);
      return console.log("Ban chua dang ky lo trinh nay!");
    });
  });
};
