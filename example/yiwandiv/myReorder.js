/**
 * Created by apple on 2017/9/6.
 */

function getKeyObjMap(arr) {
    const result = {}
    arr.forEach(element => {
        result[element.key] = element
    })
    return result
}

function myReorder(oldList, newList) {
    var oldMap = getKeyObjMap(oldList)

    newList.forEach((element, index) => {
        if(oldMap[element.key] === undefined) {
            //oldList.splice(index, 0, element)
            insertBefore(oldList, element, oldList[index])
        } else {
            if (element.key !== oldList[index].key) {
                let ov = oldMap[element.key]
                insertBefore(oldList, ov, oldList[index])
            }
        }
    })

    while (newList.length != oldList.length) {
        remove(oldList, oldList[oldList.length -1])
    }
}


let removeCount = 0
function remove(oldList, item) {
    removeCount ++
    let iIndex
    oldList.forEach((element, index) => {
        if(element.key === item.key) {
            iIndex = index
        }
    })
    oldList.splice(iIndex, 1)
}


let insertBeforeCount = 0
function insertBefore(oldList, item, target) {
    insertBeforeCount ++

    if (target === undefined) {
        oldList.push(item)
    } else {
        let iIndex
        oldList.forEach((element, index) => {
            if(element.key === item.key) {
                iIndex = index
            }
        })
        if(iIndex === undefined) {
            let tIndex
            oldList.forEach((element, index) => {
                if(element.key === target.key) {
                    tIndex = index
                }
            })
            oldList.splice(tIndex, 0, item)
        } else {
            oldList.splice(iIndex, 1)

            let tIndex
            oldList.forEach((element, index) => {
                if(element.key === target.key) {
                    tIndex = index
                }
            })
            oldList.splice(tIndex, 0, item)
        }

    }
}

function equalArr(oldList, newList) {
    for (let i = 0; i < oldList.length; i++) {
        if (oldList[i].key !== newList[i].key) {
            return false
        }
    }
    return true
}


var oldList = [
    {key: 'a'},
    {key: 'b'},
    {key: 'c'},
    {key: 'd'},
    {key: 'h'},
    {key: 'u1'},
    {key: 'u2'},
    {key: 'u3'},
    {key: 'u4'},
]
var newList = [
    {key: 'y'},
    {key: 'x'},
    {key: 'a'},
    {key: 'b'},
    {key: 'c'},
    {key: 'd'},
    {key: 'h'}
]

myReorder2(oldList, newList)
console.log("mr:", equalArr(oldList, newList), insertBeforeCount, removeCount)