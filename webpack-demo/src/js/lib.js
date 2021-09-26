const typeReg = /^\[object (\S+)\]$/


/**
 * 获取数据类型
 */
export function getDataType(data, isLower = false) {
    let objType = Object.prototype.toString.call(data)
    let matches = typeReg.exec(objType)
    let type = matches ? (matches[1] === 'Number' && isNaN(data) ? 'NaN' : matches[1]) : objType

    return isLower ? type.toLowerCase() : type
}


// application/x-www-form-urlencoded 参数格式化
export function stringify(data) {
    let result = ''
    let type = getDataType(data)
    if (type === 'Array' || type === 'Object') {
        result = Object.keys(data)
            .reduce((res, k, i) => res += `${i > 0 ? '&' : ''}${k}=${data[k] === undefined || data[k] === null ? '' : data[k]}`, '')
    } else {
        result = String(data)
    }
    
    return result
}

/**
 * 转义 new RegExp(string) 中string的特殊字符，避免正则中被当作特殊字符匹配
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-unicode-escape-es6
 * @param {String} string 需要转义的字符串
 * @returns {String} 转义后的字符串
 */

export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|\[\]\\]/g, "\\$&")
}