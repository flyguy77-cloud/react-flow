import DescriptionIcon from '@mui/icons-material/Description';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import {BaseNodeData} from "../types/BaseNodeTypes.ts";
import CodeIcon from '@mui/icons-material/Code';
import TerminalIcon from '@mui/icons-material/TerminalOutlined';
import DoneAll from '@mui/icons-material/DoneAll';
import Done from '@mui/icons-material/Done';
import HelpOutline from '@mui/icons-material/HelpOutline';
import {handleScriptLoading} from "../handlers/useScriptNodeHandler.tsx";
import FunctionIcon from "../../../shared/icons/FunctionIcon.tsx";

export const nodeRegistry: Record<string, Omit<BaseNodeData, 'actions'>> = {
    // Omit => Use all fields from BaseNodeData, except field actions. So not every type has to have an actions field”
    loadScript: {
        nodeType: 'loadScript',
        title: 'Load Script',
        icon: CodeIcon,
        fields: [
            {
                key: 'loadScript',
                label: 'Script',
                type: 'select',
                value: 'generate-report.sh',
                options: ['generate-report.sh', 'cleanup-data.sh']
            },
        ],
        theme: {
            background: '#E3F2FD',
            text: '#0D47A1',
        },
        actions: {
            local: () => handleScriptLoading("local"),
            remote: () => handleScriptLoading("remote"),
            logs: () => console.log('logs open')
        }
    },
    runScript: {
        nodeType: 'runScript',
        title: 'Run Script',
        icon: TerminalIcon,
        status: "succes",
        fields: [
            {
                key: 'runScript',
                label: 'Script',
                type: 'select',
                value: 'generate-report.sh',
                options: ['generate-report.sh', 'cleanup-data.sh']
            },
            {
                key: 'onderzoekId',
                label: 'Onderzoek ID',
                type: 'text',
                value: ''
            },
            {
                key: 'periode',
                label: 'Periode',
                type: 'text',
                value: ''
            },
            {
                key: 'timeout',
                label: 'Timeout',
                type: 'number',
                value: 60
            }
        ],
        actions: {
            retry: () => handleScriptLoading("retry"),
            logs: () => console.log("logs openen")
        },
        theme: {
            background: '#F3E5F5',
            text: '#6A1B9A'
        }, // paars
    },
    genereer: {
        nodeType: 'genereer',
        title: 'Genereer',
        icon: DescriptionIcon,
        fields: [
            {
                key: 'template',
                label: 'Template',
                type: 'text',
                value: 'default-template'
            }
        ],
        theme: {
            background: '#FFF3E0',
            text: '#E65100',
        },
    },
    inlineScript: {
        nodeType: 'inlineScript',
        title: 'Inline Script',
        status: 'running',  // status handling
        icon: FunctionIcon,
        fields: [
            {
                key: 'code',
                label: 'Script',
                type: 'textarea',
                value: '# write your script here'
            }
        ],
        theme: {
            background: '#FBE9E7',
            text: '#4E342E'
        }, // bruinachtig
    },
    start: {
        nodeType: 'start',
        title: 'Start',
        icon: PlayArrowIcon,
        fields: [],
        theme: {
            background: '#E8F5E9',
            text: '#1B5E20'
        }, // groen
    },
    stop: {
        nodeType: 'stop',
        title: 'End',
        icon: StopIcon,
        fields: [],
        theme: {
            background: '#FFEBEE',
            text: '#B71C1C'
        }, // rood
    },
    conditionNode: {
        nodeType: 'conditionNode',
        title: 'If/Else',
        icon: HelpOutline,
        fields: [
            {
                key: 'expression',
                label: 'Expressie',
                type: 'text',
                value: 'onderzoekId !== "" && periode === "Q2"'
            }
        ],
        theme: {background: '#E3F2FD', text: '#0D47A1'}, // blauw
    },
    orJoin: {
        nodeType: 'orJoin',
        title: 'OR',
        icon: Done,
        fields: [], // Geen config nodig, het is puur logica
        theme: {
            background: '#E3F2FD', text: '#1565C0'
        }
    },
    andJoin: {
        nodeType: 'andJoin',
        title: 'AND',
        icon: DoneAll,
        fields: [],
        theme: {
            background: '#E8F5E9', text: '#2E7D32'
        },
        status: 'waiting' // dynamisch bijwerken
    }
}