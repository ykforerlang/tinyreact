export default class RenderedHelper {
    constructor(arr) {
        this.__arr = arr || []
    }

    replaceNullPush(now, old) {
        if (!old) {
            now.__renderedHelperTag = `${this.__arr.length}`
            this.__arr.push(now)
        } else {
            if (this.__arr[old.__renderedHelperTag] === old) {
                now.__renderedHelperTag = old.__renderedHelperTag
                this.__arr[now.__renderedHelperTag] = now
            } else {
                now.__renderedHelperTag = `${this.__arr.length}`
                this.__arr.push(now)
            }
        }
    }

    slice(start, end) {
        return this.__arr.slice(start, end)
    }
}
