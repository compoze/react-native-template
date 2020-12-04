type Sortable = number | string | object;

//Filter unique
//used as array.filter(onlyUnique)
export function onlyUnique(value: any, index: number, self: any[]): boolean {
  return self.indexOf(value) === index;
}

export function filterNil(value: any): boolean {
  return !!value;
}

//Adding numbers starting from zero
//Used as array.reduce(reduceSum, 0)
export const reduceToSum = (
  accumulator: number,
  currentValue: number
): number => {
  return accumulator + currentValue;
};

//Simple sort array function
//used as array.sort(simpleSort)
export const simpleSort = (a: Sortable, b: Sortable): number => {
  const simpleCompare = (a: string | object, b: string | object) => {
    if (a > b) return 1;
    else if (b < a) return -1;
    else return 0;
  };
  if (typeof a === 'number' && typeof b == 'number') {
    return a - b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
    // return (simpleCompare(a, b));
  } else if (typeof a === 'object' && typeof b === 'object') {
    return simpleCompare(a, b);
  }
};
export const simpleSortAscending = (a: Sortable, b: Sortable): number => {
  return simpleSort(a, b);
};

export const simpleSortDescending = (a: Sortable, b: Sortable): number => {
  return simpleSort(b, a);
};
//Remove an item or index from an array
// Used as ArrayRemove([1,2,4],4)
export const arrayRemove = (self: any[], object: any): any[] => {
  return self.filter((item) => object !== item);
};
