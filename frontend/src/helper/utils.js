

export const strictValidObject= (obj) => {
    return obj &&
      obj === Object(obj) &&
      Object.prototype.toString.call(obj) !== '[object Array]';
  }
export const strictValidObjectWithKeys= (obj) => {
    return strictValidObject(obj) &&
      !!Object.keys(obj).length;
  }
  export const strictValidArray= (arr) => arr && Array.isArray(arr)

 export const strictValidArrayWithMinLength= (arr, minLength) =>
    strictValidArray(arr) && arr.length >= minLength
 
export const removeFieldsFromObject=(obj = {},props)=>{
  let delAbleObj = {...obj}
  props.forEach(prop => {
    if(obj.hasOwnProperty(prop)){
      delete delAbleObj[prop]
    }
  });
  console.log(delAbleObj)
  return delAbleObj
}