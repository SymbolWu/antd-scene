interface IObject {
  [propsName: string]: any;
}
export default function omitObject(value: IObject) {
  if (Object.prototype.toString.call(value) === "[object Object]") {
    const keySet = Object.keys(value);
    return keySet.reduce(function (prev: IObject, curr: string) {
      if (value[curr]) {
        prev[curr] = value[curr];
      }
      return prev;
    }, {});
  } else {
    throw Error("Value is not a Object");
  }
}
