import { updateClassComponent, updateFragmentComponent, updateFunctionComponent, updateHostComponent, updateHostTextComponent } from "./ReactFiberReconciler"
import { ClassComponent, Fragment, FunctionComponent, HostComponent, HostText } from "./ReactWorkTags"
import { Placement } from "./utils"

let wip = null // work in progress 当前正在工作中的
let wipRoot = null
// 初次渲染和更新
export function scheduleUpdateOnFiber(fiber) {
    wip = fiber
    wipRoot = fiber
}

function performUnitOfWork() {
    const { tag } = wip
    // TODO:更新当前组件
    switch (tag) {
        case HostComponent:
            updateHostComponent(wip)
            break
        case FunctionComponent:
            updateFunctionComponent(wip)
            break
        case ClassComponent:
            updateClassComponent(wip)
            break
        case Fragment:
            updateFragmentComponent(wip)
            break
        case HostText:
            updateHostTextComponent(wip)
            break
        default:
            break
    }

    // TODO: 更新下一个 深度优先遍历
    if (wip.child) {
        wip = wip.child
        return
    }

    let next = wip
    while (next) {
        if (next.sibling) {
            wip = next.sibling
            return
        }
        next = next.return
    }

    wip = null
}


function workLoop(IdleDeadLine) {
    while (wip && IdleDeadLine.timeRemaining() > 0) {
        performUnitOfWork()
    }

    if (!wip && wipRoot) {
        commitRoot()
    }
}

function commitRoot() {
    commitWorker(wipRoot)
    wipRoot = null
}

function commitWorker(wip) {
    if (!wip) return
    // 1. 提交自己 
    // parentNode是父dom节点
    const parentNode = getParentNode(wip.return)
    const { flags, stateNode } = wip
    if (flags && Placement && stateNode) {
        parentNode.appendChild(stateNode)
    }
    // 2. 更新子节点
    commitWorker(wip.child);
    // 3. 更新兄弟节点
    commitWorker(wip.sibling);
}


function getParentNode(wip) {
    let tem = wip // 函数式组件的stateNode为null 递归向上寻找dom
    while (tem) {
        if (tem.stateNode) {
            return tem.stateNode
        }
        tem = tem.return
    }
}

// 浏览器原生方法 空闲时间机会渲染
requestIdleCallback(workLoop)


