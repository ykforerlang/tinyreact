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
    return {
        nodeName: comp,
        props: props || {},
        children: args || []
    }
}
