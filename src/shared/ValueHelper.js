function isValid(v) {
  if (v === undefined || v === null) return false;
  else if (v === "") return false;
  else return true;
}
export { isValid };
