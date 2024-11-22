import { FunctionComponent, HostComponent } from "./ReactWorkTags"
import { isStr, Placement, isFn } from "./utils"

export function createFiber(vnode, returnFiber) {
    const fiber = {
        type: vnode.type,
        key: vnode.key,
        props: vnode.props,
        stateNode: null, // 原生标签对应dom节点,class组件对应实例,函数组件对应null
        child: null, // 第一个子fiber
        sibling: null, // 下一个兄弟节点
        return: returnFiber,
        flags: Placement,
        index: null,
    }
    const { type } = vnode
    if (isStr(type)) { // dom
        fiber.tag = HostComponent
    } else if (isFn(type)) { // 函数组件以及类组件
        fiber.tag = FunctionComponent
    }
    return fiber
}