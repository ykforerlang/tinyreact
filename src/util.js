/**
 * Created by apple on 2017/8/30.
 */
import Component from './Component'
export function diffObject(leftProps, rightProps) {
    const onlyInLeft = {}
    const bothLeft = {}
    const bothRight = {}
    const onlyInRight = {}

    for(let key in leftProps) {
        if(rightProps[key] === undefined) {
            onlyInLeft[key] = leftProps[key]
        } else {
            bothLeft[key] = leftProps[key]
            bothRight[key] = rightProps[key]
        }
    }

    for(let key in rightProps) {
        if(leftProps[key] === undefined) {
            onlyInRight[key] = rightProps[key]
        }
    }

    return {
        onlyInRight,
        onlyInLeft,
        bothIn: {
            left: bothLeft,
            right: bothRight
        }
    }
}


export function getDOM(comp) {
    let rendered = comp.__rendered
    while (rendered instanceof Component) { //判断对象是否是dom
        rendered = rendered.__rendered
    }
    return rendered
}