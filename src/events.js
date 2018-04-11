const supportEventType = ['keydown', 'keypress', 'keyup', 'click', 'mouseenter', 'mouseover', 'mousemove', 'change']

function getSyntheticEvent(e) {
    e.stopPropagation = function () {
        e.__notup = true // 不冒泡
    }
    return e
}


function getRelatedDOMList(e) {
    const path = e.path || e.deepPath
    if(path) return path

    const result = []

    let node = e.target
    while (node !== window.document) {

        result.push(node)
        node = node.parentNode
    }

    return result
}


function superHandle(e) {

    const syntheticEvent = getSyntheticEvent(e)

    const domList = getRelatedDOMList(e)

    const eventType = e.type

    for(let i = domList.length - 1; i >= 0; i-- ) { // 捕获期
        const eleDom = domList[i]

        if(!eleDom.__events) break

        const handle = eleDom.__events[eventType + 'Capture']
        handle && handle(syntheticEvent)
    }

    for(let i = 0; i < domList.length; i++) { // 冒泡期
        const eleDom = domList[i]

        if(!eleDom.__events) break

        const handle = eleDom.__events[eventType]
        handle && handle(syntheticEvent)
        if (syntheticEvent.__notup) {
            break
        }
    }
}


export function init() {
    supportEventType.forEach(eventType => {
        document.addEventListener(eventType, superHandle)
    })
}
