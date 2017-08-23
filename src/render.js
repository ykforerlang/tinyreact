/**
 * Created by apple on 2017/8/21.
 */
/**
 * 渲染vnode成实际的dom
 * @param vnode 虚拟dom表示
 * @param parent 实际渲染出来的dom，挂载的父元素
 * @param comp   谁渲染了我
 * @param olddom  老的dom
 */
export default function render(vnode, parent, comp, olddom) {
    let dom
    if(typeof vnode == "string" || typeof vnode == "number") {
        dom = document.createTextNode(vnode)
        comp && (comp.__rendered = dom)
        parent.appendChild(dom)

        if(olddom) {
            parent.replaceChild(dom, olddom)
        } else {
            parent.appendChild(dom)
        }
    } else if(typeof vnode.nodeName == "string") {
        dom = document.createElement(vnode.nodeName)

        comp && (comp.__rendered = dom)
        setAttrs(dom, vnode.props)

        if(olddom) {
            parent.replaceChild(dom, olddom)
        } else {
            parent.appendChild(dom)
        }

        for(let i = 0; i < vnode.children.length; i++) {
            render(vnode.children[i], dom, null, null)
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
                dom.style.cssText = v
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
