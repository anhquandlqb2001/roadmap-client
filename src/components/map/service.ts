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
}

export function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const fillMap = (road) => {
  const childField = recursiveReadAllSmallestChildField(road, []);
  childField.map((child) => {
    const pathElement = document.querySelector<HTMLElement>(
      `[id="${child.field}"]`
    );
    if (pathElement && child.value === true) {
      pathElement.style.fill = "green";
    } else if (pathElement) {
      pathElement.style.fill = "";
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