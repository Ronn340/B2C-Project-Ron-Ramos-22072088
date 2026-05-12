export function cx(
  ...classes: Array<
    string | Record<string, boolean | null | undefined> | null | undefined
  >
): string {
  // class helper that turns a list of classes into a single string
  // if one of the classes is an object, it will add the key if the value is truthy

  let result = "";
  for (const cls of classes) {
    //String case
    if (typeof cls === "string") {
      result += cls + " ";

      //Object case
    } else if (typeof cls === "object" && cls !== null) {
      for (const [key, value] of Object.entries(cls)) {
        if (value) {
          result += key + " ";
        }
      }

    }
  }


  // e.g. cx("foo", "bar") => "foo bar"
  // e.g. cx("foo", { bar: true }) => "foo bar"
  return result.trim();
}

export default cx;
