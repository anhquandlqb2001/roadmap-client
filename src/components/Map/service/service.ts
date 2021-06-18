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

export const getNodesName = (map, childNodes, parentNodes) => {
  Object.keys(map).forEach((key) => {
    const value = map[key];
    const val = findVal(map, key);
    if (val.hasOwnProperty("value")) {
      childNodes.push({ field: key, value: val.value, resources: val?.resources });
    } else if (key.toString() !== "resources" && key.toString() !== "value") {
      parentNodes.push({ field: key })
    }
    if (typeof value !== "object") {
    } else if (typeof value === "object") {
      getNodesName(value, childNodes, parentNodes);
    }
  });
  return [childNodes, parentNodes];
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

export const fillChildNodes = (map, node: HTMLElement, firstTimes?: boolean) => {
  const [childNodes] = getNodesName(map, [], []);
  childNodes.map((child) => {
    const pathElement = node.querySelector<HTMLElement>(
      `[id="${child.field}"]`
    );
    if (pathElement) {
      firstTimes && pathElement.classList.add("node--child") // add class if it is the first time render
      if (pathElement && child.value === true) {
        pathElement.classList.add("active")
      } else if (pathElement) {
        pathElement.classList?.remove("active")
      }
    }
  });
};

export const fillParentNode = (map: object, node: HTMLElement, firstTimes?: boolean) => {
  const AutoComplete = new AutoCompleteClass(map);
  const parentNodesNameComplete = AutoComplete.getParentNodeNameComplete();
  const [_, parentNodesName] = getNodesName(map, [], [])

  parentNodesName.map((parentNode) => {
    const pathElement = node.querySelector<HTMLElement>(
      `[id="${parentNode.field}"]`
    );
    if (!pathElement) {
      return;
    }
    firstTimes && pathElement.classList.add("node--parent") // add class if it is the first time render
    if (parentNodesNameComplete.findIndex(p => p === parentNode.field) !== -1) {
      return;
    }
    if (pathElement) {
      pathElement.classList?.remove("active");
    }
  });

  parentNodesNameComplete.map((parentNode) => {
    const pathElement = node.querySelector(`[id="${parentNode}"]`);
    if (pathElement) {
      pathElement.classList.add("active");
    }
  });
};

// export /**
//  *
//  * @param map array of user map if user has login
//  * @param currentMapId mapID of current map
//  */
//   const findOwnerMapIDIfExist = (
//     map: [],
//     currentMapId: string
//   ) => {
//     let a;
//     map.forEach((m) => {
//       if (m.mapHasStarted === currentMapId) {
//         return (a = m.ownerMapId);
//       }
//     });
//     return a;
//   };

export const handleClick = async (
  name: string,
  map,
  e: React.MouseEvent<SVGPathElement, MouseEvent>,
  ref
) => {
  const fieldChange = e.currentTarget.getAttribute("id");
  const currentValue = findVal(map, fieldChange);

  const newMap = recursiveChangeObject(map, fieldChange, !currentValue.value);

  localStorage.setItem(name, JSON.stringify(newMap))

  fillChildNodes(newMap, ref);
  fillParentNode(newMap, ref);
};
