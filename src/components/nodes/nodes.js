import {StartNode} from "./start/startNode";

export const NodeTypes = {
    start: StartNode
}

export const NODES = [
    {id: 1, type: 'start', data: { label: 'Início', description: 'Aqui é o início do fluxo', icon: 'play_arrow' } },
    {id: 2, type: 'default', data: { label: 'Default' } },
    {id: 3, type: 'input', data: { label: 'Input' } },
]

export const getDataByNode = (search) => {
    return NODES.filter(n => n.type === search)[0];
}