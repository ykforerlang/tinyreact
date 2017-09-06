/**
 * Created by apple on 2017/9/6.
 */
import { diffObject } from './util'

/**
 * 渲染vnode成实际的dom
 * @param vnode 虚拟dom表示
 * @param parent 实际渲染出来的dom，挂载的父元素
 * @param comp   谁渲染了我
 * @param olddom  老的dom
 */
export default function render(vnode, parent, comp, olddom, myIndex) {
    let dom
    if(typeof vnode == "string" || typeof vnode == "number") {
        if(olddom && olddom.splitText) {
            if(olddom.nodeValue !== vnode) {
                olddom.nodeValue = vnode
            }
        } else {
            dom = document.createTextNode(vnode)
            if(olddom) {
                parent.replaceChild(dom, olddom)
            } else {
                const target = typeof myIndex == "number" ? parent.childNodes[myIndex] : null
                parent.insertBefore(dom, target)
            }
        }
    } else if(typeof vnode.nodeName == "string") {
        if(!olddom || olddom.nodeName != vnode.nodeName.toUpperCase()) {
            createNewDom(vnode, parent, comp, olddom, myIndex)
        } else {
            diffDOM(vnode, parent, comp, olddom)
        }
    } else if (typeof vnode.nodeName == "function") {
        let func = vnode.nodeName
        let inst = new func(vnode.props)

        comp && (comp.__rendered = inst)

        let innerVnode = inst.render(inst)
        render(innerVnode, parent, inst, olddom)
    }
}

function setAttrs(dom, props) {
    const allKeys = Object.keys(props)
    allKeys.forEach(k => {
        const v = props[k]

        if(k == "className") {
            dom.setAttribute("class", v)
            return
        }

        if(k == "style") {
            if(typeof v == "string") {
                dom.style.cssText = v //IE
            }

            if(typeof v == "object") {
                for (let i in v) {
                    dom.style[i] =  v[i]
                }
            }
            return

        }

        if(k[0] == "o" && k[1] == "n") {
            const capture = (k.indexOf("Capture") != -1)
            dom.addEventListener(k.substring(2).toLowerCase(), v, capture)
            return
        }

        dom.setAttribute(k, v)
    })
}

function removeAttrs(dom, props) {
    for(let k in props) {
        if(k == "className") {
            dom.removeAttribute("class")
            continue
        }

        if(k == "style") {
            dom.style.cssText = "" //IE
            continue
        }


        if(k[0] == "o" && k[1] == "n") {
            const capture = (k.indexOf("Capture") != -1)
            const v = props[k]
            dom.removeEventListener(k.substring(2).toLowerCase(), v, capture)
            continue
        }

        dom.removeAttribute(k)
    }
}

/**
 *  调用者保证newProps 与 oldProps 的keys是相同的
 * @param dom
 * @param newProps
 * @param oldProps
 */
function diffAttrs(dom, newProps, oldProps) {
    for(let k in newProps) {
        let v = newProps[k]
        let ov = oldProps[k]
        if(v === ov) continue

        if(k == "className") {
            dom.setAttribute("class", v)
            continue
        }

        if(k == "style") {
            if(typeof v == "string") {
                dom.style.cssText = v
            } else if( typeof v == "object" && typeof ov == "object") {
                for(let vk in v) {
                    if(v[vk] !== ov[vk]) {
                        dom.style[vk] = v[vk]
                    }
                }

                for(let ovk in ov) {
                    if(v[ovk] === undefined){
                        dom.style[ovk] = ""
                    }
                }
            } else {  //typeof v == "object" && typeof ov == "string"
                dom.style = {}
                for(let vk in v) {
                    dom.style[vk] = v[vk]
                }
            }
            continue
        }

        if(k[0] == "o" && k[1] == "n") {
            const capture = (k.indexOf("Capture") != -1)
            let eventKey = k.substring(2).toLowerCase()
            dom.removeEventListener(eventKey, ov, capture)
            dom.addEventListener(eventKey, v, capture)
            continue
        }

        dom.setAttribute(k, v)
    }
}

function createNewDom(vnode, parent, comp, olddom, myIndex) {
    let dom = document.createElement(vnode.nodeName)

    dom.__vnode = vnode
    comp && (comp.__rendered = dom)
    setAttrs(dom, vnode.props)

    if(olddom) {
        parent.replaceChild(dom, olddom)
    } else {
        const target = typeof myIndex == "number" ? parent.childNodes[myIndex] : null
        parent.insertBefore(dom, target)
    }

    for(let i = 0; i < vnode.children.length; i++) {
        render(vnode.children[i], dom, null, null)
    }
}

function diffDOM(vnode, parent, comp, olddom) {
    const {onlyInLeft, bothIn, onlyInRight} = diffObject(vnode.props, olddom.__vnode.props)
    setAttrs(olddom, onlyInLeft)
    removeAttrs(olddom, onlyInRight)
    diffAttrs(olddom, bothIn.left, bothIn.right)


    //reorder(olddom, vnode.props, olddom.__vnode.props)
    let olddomChild = olddom.firstChild
    for(let i = 0; i < vnode.children.length; i++) {
        render(vnode.children[i], olddom, null, olddomChild)
        olddomChild = olddomChild && olddomChild.nextSibling
    }

    while (olddomChild) { //删除多余的子节点
        let next = olddomChild.nextSibling
        olddom.removeChild(olddomChild)
        olddomChild = next
    }
    olddom.__vnode = vnode
}


function myReorder(oldChildNodes, vchildrens, olddom) {
    let ocnKeyMap = {}  // key值和 child的映射， 方便根据key确定child
    for(let i = 0; i < oldChildNodes.length; i ++) {
        const key = oldChildNodes[i].__vnode.props.key
        ocnKeyMap[key] = oldChildNodes[i]
    }

    vchildrens.forEach((element, index) => {
        const key = element.props.key
        if(ocnKeyMap[key] === undefined) { // 如果之前不存在这个key值, 直接在对应位置 插入一个新的
            render(element, olddom, null, null, index)
        } else {
            // 如果可以复用， 则直接diff。 如果不可以复用， render内部的 replaceChild 会插入新的dom， 并且移除之前的
            let ocdom = ocnKeyMap[key]
            render(element, olddom, null, ocdom, index)


            if (key === oldList[index].key) {
                // 如果 新的key和老的key位置相同 donothing
                let ocdom = ocnKeyMap[key]
                render(element, olddom, null, ocdom, index) //尝试复用 oldchild

            } else {
                let ocdom = ocnKeyMap[key]
                render(element, olddom, null, ocdom, index) //尝试复用 oldchild
            }
        }
    })

    //删除多余节点
    while (oldChildNodes.length !== vchildrens.length) {
        olddom.removeChild(olddom.lastChild)
    }
}