export function isObject(value) {
  return value !== null && typeof value === 'object';
}

export function isCallable(value) {
  return typeof value === 'function';
}

export function isSameObjectContent(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) { return false; }
  const keys = Object.keys(obj1);

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      if (!isSameObjectContent(obj1[key], obj2[key])) {
        return false;
      }
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

export function isUndefined(value) {
  const UNDEFINED = void (0);
  return value === UNDEFINED;
}

export function deepCopyOf(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function convertToNumber(value) {
  const num = +value;
  if(String(num) === String(value)) {
    return num;
  } else {
    return value;
  }
}

export function portValueSafely(value) {
  const stringified = JSON.stringify(value).replace(/\\/g, "\\\\");
  return `JSON.parse(\`${stringified}\`)`;
}