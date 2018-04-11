/**
 * Created by apple on 2017/8/21.
 */
import { diffObject, getDOM } from './util'
import Component from './Component'

import { init } from './events'

/**
 * 渲染vnode成实际的dom
 * @param vnode 虚拟dom表示
 * @param parent 实际渲染出来的dom，挂载的父元素
 */
export default function render(vnode, parent) {
    parent.__rendered =[]

    //events init
    init()

    renderInner(vnode, parent, null, null, 0)
}

/**
 * 渲染vnode成实际的dom
 * @param vnode 虚拟dom表示
 * @param parent 实际渲染出来的dom，挂载的父元素
 * @param comp   谁渲染了我
 * @param olddomOrComp  老的dom/组件实例
 * @param myIndex 在dom节点的位置
 */
export function renderInner(vnode, parent, comp, olddomOrComp, myIndex) {
    let dom
    if(typeof vnode === "string" || typeof vnode === "number" ) {
        if(olddomOrComp && olddomOrComp.splitText) {
            if(olddomOrComp.nodeValue !== vnode) {
                olddomOrComp.nodeValue = vnode
            }
        } else {
            if(olddomOrComp) {
                recoveryComp(olddomOrComp)
            }

            dom = document.createTextNode(vnode)
            parent.__rendered[myIndex] = dom  //comp 一定是null

            setNewDom(parent, dom, myIndex)
        }
    } else if(typeof vnode.nodeName === "string") {
        if(!olddomOrComp || olddomOrComp.nodeName !== vnode.nodeName.toUpperCase()) {
            createNewDom(vnode, parent, comp, olddomOrComp, myIndex)
        } else {
            diffDOM(vnode, parent, comp, olddomOrComp, myIndex)
        }
    } else if (typeof vnode.nodeName === "function") {
        let func = vnode.nodeName
        let inst
        if(olddomOrComp && olddomOrComp instanceof func) {
            inst = olddomOrComp
            inst.componentWillReceiveProps && inst.componentWillReceiveProps(vnode.props)

            let shoudUpdate
            if(inst.shouldComponentUpdate) {
                shoudUpdate = inst.shouldComponentUpdate(vnode.props, olddomOrComp.state)
            } else {
                shoudUpdate = true
            }


            shoudUpdate && inst.componentWillUpdate && inst.componentWillUpdate(vnode.props, olddomOrComp.state)
            inst.props = vnode.props

            if (!shoudUpdate) {
                return // do nothing just return
            }
        } else {
            if (olddomOrComp) {
                recoveryComp(olddomOrComp)
            }

            inst = new func(vnode.props)
            inst.componentWillMount && inst.componentWillMount()


            if (comp) {
                comp.__rendered = inst
            } else {
                parent.__rendered[myIndex] = inst
            }
        }

        let innerVnode = inst.render()
        renderInner(innerVnode, parent, inst, inst.__rendered, myIndex)

        if(olddomOrComp && olddomOrComp instanceof func) {
            inst.componentDidUpdate && inst.componentDidUpdate()
        } else {
            inst.componentDidMount && inst.componentDidMount()
        }
    }
}

/**
 * 替换新的Dom， 如果没有在最后插入
 * @param parent
 * @param newDom
 * @param myIndex
 */
function setNewDom(parent, newDom, myIndex) {
    const old =  parent.childNodes[myIndex]
    if (old) {
        parent.replaceChild(newDom, old)
    } else {
        parent.appendChild(newDom)
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

        if(k == "value") {
            dom.value = v
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

            const key = k.substring(2, 3).toLowerCase() + k.substring(3)
            dom.__events[key] = v
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

        if(k == "value") {
            dom.value = ""
            continue
        }

        if(k == "style") {
            dom.style.cssText = "" //IE
            continue
        }


        if(k[0] == "o" && k[1] == "n") {
            const key = k.substring(2, 3).toLowerCase() + k.substring(3)
            dom.__events[key] = null
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

        if(k == "value") {
            dom.value = v
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
            const key = k.substring(2, 3).toLowerCase() + k.substring(3)
            dom.__events[key] = v
            continue
        }

        dom.setAttribute(k, v)
    }
}

function createNewDom(vnode, parent, comp, olddomOrComp, myIndex) {
    if(olddomOrComp) {
        recoveryComp(olddomOrComp)
    }

    let dom = document.createElement(vnode.nodeName)

    dom.__rendered = []
    dom.__vnode = vnode
    dom.__myIndex = myIndex  // 方便 getDOMIndex 方法
    dom.__events = {}

    if (comp) {
        comp.__rendered = dom
    } else {
        parent.__rendered[myIndex] = dom
    }

    setAttrs(dom, vnode.props)

    setNewDom(parent, dom, myIndex)

    for(let i = 0; i < vnode.children.length; i++) {
        renderInner(vnode.children[i], dom, null, null, i)
    }
}

function diffDOM(vnode, parent, comp, olddom) {
    const {onlyInLeft, bothIn, onlyInRight} = diffObject(vnode.props, olddom.__vnode.props)
    setAttrs(olddom, onlyInLeft)
    removeAttrs(olddom, onlyInRight)
    diffAttrs(olddom, bothIn.left, bothIn.right)


    const willRemoveArr = olddom.__rendered.slice(vnode.children.length)
    const renderedArr = olddom.__rendered.slice(0, vnode.children.length)
    olddom.__rendered = renderedArr
    for(let i = 0; i < vnode.children.length; i++) {
        renderInner(vnode.children[i], olddom, null, renderedArr[i], i)
    }

    willRemoveArr.forEach(element => {
        recoveryComp(element)
        olddom.removeChild(getDOM(element))
    })

    olddom.__vnode = vnode
}

function recoveryComp(comp) {
    if (comp instanceof Component) {
        comp.componentWillUnmount && comp.componentWillUnmount()
        recoveryComp(comp.__rendered)
    } else if (comp.__rendered instanceof Array) {
        comp.__rendered.forEach(element => {
            recoveryComp(element)
        })
    } else {
        // do nothing
    }
}
