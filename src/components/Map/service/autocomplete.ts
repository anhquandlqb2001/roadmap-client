class AutoComplete {
  public initMap: any;
  public childNodeName: string[] = [];

  constructor(map: any) {
    this.initMap = map;

    this.getLeafComplete(this.initMap, this.childNodeName);
  }

  getLeafComplete = (maps: any, childNode: string[]) => {
    Object.keys(maps).forEach((key) => {
      const children = maps[key];
      if (typeof children === "object" && children?.value === true) {
        childNode.push(key);
      } else if (typeof children === "object") {
        return this.getLeafComplete(children, childNode);
      }
    });
  };

  findChildNodePath = (obj: any, name: string, arr: string[] = []) => {
    for (let prop in obj) {
      if (prop === name) {
        return [...arr];
      } else if (typeof obj[prop] === "object") {
        let result = this.findChildNodePath(obj[prop], name, arr);
        if (result) {
          return arr.push(prop);
        }
      }
    }
    return null;
  };

  getParentNodeNameComplete = () => {
    const parentNodeCompleteArr = this.childNodeName.map((node) => {
      let array: string[] = [];
      this.findChildNodePath(this.initMap, node, array);
      return [...array];
    });

    if (parentNodeCompleteArr.length === 0) return [];

    const parentNodeComplete = parentNodeCompleteArr.reduce((a, b) =>
      a.concat(b)
    );

    return parentNodeComplete.filter((value, index, array) => {
      return array.indexOf(value) == index;
    });
  };
}

export default AutoComplete;

/**
 *
 * => tim node co value true && luu ten duong
 * => fill
 *
 */

/**
 *
 * => lay ten tat ca cac node co value: true
 * => tim duong den node do => key[]
 * => fill keys
 *
 */
