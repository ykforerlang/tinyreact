/**
 * Created by apple on 2017/7/16.
 */

/**
 *
 * @param comp func or div/p/span/..
 * @param props {}
 * @param children
 */
export default function createElement(comp, props, ...args) {
    let children = []
    for(let i = 0; i< args.length;i++){
        if (typeof args[i] === 'boolean' || args[i] === undefined || args === null) continue
        if(args[i] instanceof Array) {
            children = children.concat(args[i])
        } else {
            children.push(args[i])
        }
    }

    return {
        nodeName: comp,
        props: props || {},
        children
    }
}
