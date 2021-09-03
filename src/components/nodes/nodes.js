import {StartNode} from "./start/startNode";

export const NodeTypes = {
    TIME_TICKER: StartNode
}

export const NODES = [
    {id: 1, type: 'TIME_TICKER', data: { label: 'Início', description: 'Aqui é o início do fluxo', icon: 'play_arrow' } },
    {id: 2, type: 'REMINDER', data: { label: 'Default' } },
    {id: 3, type: 'input', data: { label: 'Input' } },
]

export const getDataByNode = (search) => {
    return NODES.filter(n => n.type === search)[0];
}
