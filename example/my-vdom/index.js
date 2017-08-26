/**
 * Created by apple on 2017/8/21.
 */

import createElement from '../../src/createElement'
import diff from './diff'

const app1= (
    <div>
        <div>
            <p>p1</p>
            <p>p2</p>
        </div>
        <ul>
            <li>li1</li>
            <li>li2</li>
            <li>li3</li>
        </ul>
    </div>
)

const app2 =(
    <div>
        <ul>
            <li>li1</li>
            <li>li2</li>
            <li>li3</li>
        </ul>
    </div>
)

const diff = diff(app1, app2)
console.log("diff:", diff)