//Filter unique
//used as array.filter(onlyUnique)
export function onlyUnique(value: any, index: number, self: any[]): boolean {
  return self.indexOf(value) === index;
}

export function filterNil(value: any ): boolean {
  return !!value
}

//Adding numbers starting from zero
//Used as array.reduce(reduceSum)
export function reduceToSum(accumulator: number, currentValue: number): number {
  return (accumulator + currentValue);
}

//Simple sort array function
//used as array.sort(simpleSort)
export function simpleSort(a: number | string | object, b: number | string | object): number | undefined {
  const simpleCompare = (a: string | object, b: string | object) => {
    if (a > b)
      return 1;
    else if (b < a)
      return -1;
    else
      return 0;
  };
  if (typeof a === 'number' && typeof b == 'number') {
    return a - b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return (simpleCompare(a, b));
  } else if (typeof a === 'object' && typeof b === 'object') {
    return (simpleCompare(a, b));
  }

}

//Remove an item or index from an array
// Used as ArrayRemove([1,2,4],4)
export function ArrayRemove(self: any[], object: any): any[] {
  return self.filter((item) => object !== item);
}
