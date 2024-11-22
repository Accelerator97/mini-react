import { createFiber } from "./ReactFiber"
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop"

function ReactDOMRoot(internalRoot) {
    this._internalRoot = internalRoot
}

ReactDOMRoot.prototype.render = function (children) {
    const root = this._internalRoot
    updateContainer(children, root)
}

function createRoot(container) { // container为dom元素
    const root = { containerInfo: container }
    return new ReactDOMRoot(root)
}

function updateContainer(element, container) {
    const { containerInfo } = container
    const fiber = createFiber(element, { // 父节点fiber
        type: containerInfo.nodeName.toLocaleLowerCase(), // div
        stateNode: containerInfo // 父节点对应的dom元素
    })
    // 组件初次渲染
    scheduleUpdateOnFiber(fiber)
}



export default { createRoot }