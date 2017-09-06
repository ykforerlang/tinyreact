/**
 * Created by apple on 2017/9/6.
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
    let originalChildren = dom.childNodes,
        children = [],
        keyed = {},
        keyedLen = 0,
        min = 0,
        len = originalChildren.length,
        childrenLen = 0,
        vlen = vchildren ? vchildren.length : 0,
        j, c, vchild, child;

    // Build up a map of keyed children and an Array of unkeyed children:
    if (len!==0) {
        for (let i=0; i<len; i++) {
            let child = originalChildren[i],
                props = child[ATTR_KEY],
                key = vlen && props ? child._component ? child._component.__key : props.key : null;
            if (key!=null) {
                keyedLen++;
                keyed[key] = child;
            }
            else if (props || (child.splitText!==undefined ? (isHydrating ? child.nodeValue.trim() : true) : isHydrating)) {
                children[childrenLen++] = child;
            }
        }
    }

    if (vlen!==0) {
        for (let i=0; i<vlen; i++) {
            vchild = vchildren[i];
            child = null;

            // attempt to find a node based on key matching
            let key = vchild.key;
            if (key!=null) {
                if (keyedLen && keyed[key]!==undefined) {
                    child = keyed[key];
                    keyed[key] = undefined;
                    keyedLen--;
                }
            }
            // attempt to pluck a node of the same type from the existing children
            else if (!child && min<childrenLen) {
                for (j=min; j<childrenLen; j++) {
                    if (children[j]!==undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
                        child = c;
                        children[j] = undefined;
                        if (j===childrenLen-1) childrenLen--;
                        if (j===min) min++;
                        break;
                    }
                }
            }

            // morph the matched/found/created DOM child to match vchild (deep)
            child = idiff(child, vchild, context, mountAll);

            if (child && child!==dom) {
                if (i>=len) {
                    dom.appendChild(child);
                }
                else if (child!==originalChildren[i]) {
                    if (child===originalChildren[i+1]) {
                        removeNode(originalChildren[i]);
                    }
                    else {
                        dom.insertBefore(child, originalChildren[i] || null);
                    }
                }
            }
        }
    }


    // remove unused keyed children:
    if (keyedLen) {
        for (let i in keyed) if (keyed[i]!==undefined) recollectNodeTree(keyed[i], false);
    }

    // remove orphaned unkeyed children:
    while (min<=childrenLen) {
        if ((child = children[childrenLen--])!==undefined) recollectNodeTree(child, false);
    }
}



