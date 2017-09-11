/**
 * Created by apple on 2017/8/21.
 */
import { diffObject, getDOM } from './util'
import RenderedHelper from './RenderedHelper'

/**
 * 渲染vnode成实际的dom
 * @param vnode 虚拟dom表示
 * @param parent 实际渲染出来的dom，挂载的父元素
 * @param comp   谁渲染了我
 * @param olddomOrComp  老的dom/组件实例
 */
export default function render(vnode, parent, comp, olddomOrComp) {
    let dom
    if(typeof vnode === "string" || typeof vnode === "number" ) {
        if(olddomOrComp && olddomOrComp.splitText) {
            if(olddomOrComp.nodeValue !== vnode) {
                olddomOrComp.nodeValue = vnode
            }
        } else {
            dom = document.createTextNode(vnode)
            parent.__rendered.replaceNullPush(dom, olddomOrComp) //comp 一定是null

            if(olddomOrComp) {
                parent.replaceChild(dom, getDOM(olddomOrComp))
            } else {
                parent.appendChild(dom)
            }
        }
    } else if(typeof vnode.nodeName === "string") {
        if(!olddomOrComp || olddomOrComp.nodeName !== vnode.nodeName.toUpperCase()) {
            createNewDom(vnode, parent, comp, olddomOrComp)
        } else {
            diffDOM(vnode, parent, comp, olddomOrComp)
        }
    } else if (typeof vnode.nodeName === "function") {
        let func = vnode.nodeName
        let inst
        if(olddomOrComp && olddomOrComp instanceof func) {
            inst = olddomOrComp
            inst.props = vnode.props
        } else {
            inst = new func(vnode.props)

            if (olddomOrComp) {
                parent.removeChild(getDOM(olddomOrComp))
            }

            if (comp) {
                comp.__rendered = inst
            } else {
                parent.__rendered.replaceNullPush(inst, olddomOrComp)
            }
        }

        let innerVnode = inst.render()
        render(innerVnode, parent, inst, inst.__rendered)
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

function createNewDom(vnode, parent, comp, olddomOrComp) {
    let dom = document.createElement(vnode.nodeName)

    dom.__rendered = new RenderedHelper()
    dom.__vnode = vnode

    if (comp) {
        comp.__rendered = dom
    } else {
        parent.__rendered.replaceNullPush(dom, olddomOrComp)
    }

    setAttrs(dom, vnode.props)

    if(olddomOrComp) {
        parent.replaceChild(dom, getDOM(olddomOrComp))
    } else {
        parent.appendChild(dom)
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


    olddom.__rendered.slice(vnode.children.length)
        .forEach(element => {
            olddom.removeChild(getDOM(element))
        })

    const __renderedArr = olddom.__rendered.slice(0, vnode.children.length)
    olddom.__rendered = new RenderedHelper(__renderedArr)
    for(let i = 0; i < vnode.children.length; i++) {
        render(vnode.children[i], olddom, null, __renderedArr[i])
    }
    olddom.__vnode = vnode
}
