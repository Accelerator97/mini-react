import { createFiber } from "./ReactFiber"
import { isStringOrNumber, updateNode } from "./utils"

export function updateHostComponent(wip) {
    if (!wip.stateNode) {
        wip.stateNode = document.createElement(wip.type)
        // 更新属性
        updateNode(wip.stateNode, {}, wip.props)
    }
    reconcileChildren(wip, wip.props.children)
}

export function updateFunctionComponent(wip) {
    const { type, props } = wip // 函数式组件 type为函数
    const children = type(props)
    reconcileChildren(wip, children)
}

export function updateClassComponent(wip) {
    const { type, props } = wip // 函数式组件 type为函数
    const instance = new type(props)
    const children = instance.render()
    reconcileChildren(wip, children)
}

export function updateFragmentComponent() {

}

export function updateHostTextComponent() {

}

// 协调(diff)
function reconcileChildren(wip, children) {
    // children 可能是一个对象数组 、对象 、字符串
    if (isStringOrNumber(children)) return   // 非对象直接覆盖就好 
    const newChildren = Array.isArray(children) ? children : [children]
    let previousNewFiber = null
    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i]
        if (newChild === null) continue
        const newFiber = createFiber(newChild, wip)
        if (previousNewFiber === null) {
            // head node
            wip.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }
        previousNewFiber = newFiber
    }

}