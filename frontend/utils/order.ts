export const orderByString = (arr: any, key: string, reverse = false) => {
  if (reverse) {
    return arr.sort((a: any, b: any) => {
      if ( b[key] < a[key] ){
        return -1;
      }
      if ( b[key] > a[key] ){
        return 1;
      }
      return 0;
    })
  }

  return arr.sort((a: any, b: any) => {
    if ( a[key] < b[key] ){
      return -1;
    }
    if ( a[key] > b[key] ){
      return 1;
    }
    return 0;
  })
}

export const orderByNumber = (arr: any, key: string, reverse = false) => {
  return arr.sort((a: any, b: any) => {
    if (reverse) return b[key] - a[key];
    return a[key] - b[key];
  })
}

export const orderByDate = (arr: any, key: string, reverse = false) => {
  return arr.sort((a: any, b: any) => {
    const aDate = Date.parse(a.date_of_birth);
    const bDate = Date.parse(b.date_of_birth);

    if (reverse) return bDate - aDate;

    return aDate - bDate;
  });
}