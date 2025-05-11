export const nodeCategories = [
    {
        label: 'Input',
        nodes: [
            {type: 'start', label: 'Start'},
            {type: 'loadScript', label: 'Load Script'},
        ],
    },
    {
        label: 'Processing',
        nodes: [
            {type: 'runScript', label: 'Run Script'},
            {type: 'inlineScript', label: 'Inline Script'},
        ],
    },
    {
        label: 'Output',
        nodes: [
            {type: 'genereer', label: 'Genereer Rapport'},
            {type: 'stop', label: 'Stop'},
        ],
    },
];