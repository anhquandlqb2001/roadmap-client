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
