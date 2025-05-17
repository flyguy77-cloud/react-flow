import DescriptionIcon from '@mui/icons-material/Description';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import {BaseNodeData} from "../types/BaseNodeTypes.ts";
import CodeIcon from '@mui/icons-material/Code';
import TerminalIcon from '@mui/icons-material/TerminalOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SaveIcon from '@mui/icons-material/Save';
import {handleScriptLoading} from "../handlers/useScriptNodeHandler.tsx";
import FunctionIcon from "../../../shared/icons/FunctionIcon.tsx";

export const nodeRegistry: Record<string, Omit<BaseNodeData, 'actions'>> = {
    // Omit => Use all fields from BaseNodeData, except field actions. So not every type has to have an actions field”
    //
    // Trigger Nodes
    start: {
        nodeType: 'start',
        title: 'Start',
        icon: PlayArrowIcon,
        fields: [],
        theme: {
            background: '#E8F5E9',
            text: '#1B5E20'
        },
    },
    schedule: {
        nodeType: 'schedule',
        title: 'Schedule',
        label: 'Schedule',
        icon: ScheduleIcon,
        category: 'Triggers',
        fields: [
            {
                key: 'frequency',
                label: 'Frequentie',
                type: 'select',
                value: 'daily',
                options: ['once', 'daily', 'weekly', 'monthly', 'advanced']
            },
            {
                key: 'datetime',
                label: 'Startmoment',
                type: 'datetime',
                value: '2025-05-17T08:00',
                visibleIf: {notFrequency: 'advanced'}
            },
            {
                key: 'cron',
                label: 'Cron expressie',
                type: 'text',
                value: '0 8 * * *',
                visibleIf: {frequency: 'advanced'}
            }
        ],
        theme: {
            background: '#E1F5FE',
            text: '#0277BD'
        }
    },

    // Task Nodes
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
        status: "failed",
        fields: [
            {
                key: 'onderzoekId',
                label: 'Onderzoek ID',
                type: 'text',
                value: '1234321'
            },
            {
                key: 'periode',
                label: 'Periode',
                type: 'select',
                value: '1 maand',
                options: ['1 maand', '3 maanden', '6 maanden']
            },
            {
                key: 'timeout',
                label: 'Timeout (sec.)',
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
        },
    },
    inlineScript: {
        nodeType: 'inlineScript',
        title: 'Inline Script',
        status: 'running',
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
        },
    },
    genereer: {
        nodeType: 'genereer',
        title: 'Genereer rapport',
        icon: DescriptionIcon,
        fields: [
            {
                key: 'template',
                label: 'Format',
                type: 'select',
                value: 'Pdf',
                options: ['Pdf', 'MS Word']
            }
        ],
        theme: {
            background: '#FFF3E0',
            text: '#E65100',
        },
    },
    save: {
        nodeType: 'save',
        title: 'Save Report',
        icon: SaveIcon,
        fields: [
            {
                key: 'destination',
                label: 'Opslaan naar',
                type: 'select',
                value: 'Locatie',
                options: ['Lokaal', 'DMS']
            },
            {
                key: 'folderPath',
                label: 'Maplocatie',
                type: 'text',
                value: '/onderzoeken/rapporten/'
            },
            {
                key: 'filename',
                label: 'Bestandsnaam',
                type: 'text',
                value: 'rapport-${onderzoekId}.pdf'
            }
        ],
        theme: {
            background: '#E8F5E9',
            text: '#2E7D32'
        },
        actions: {
            retry: () => console.log('Opnieuw proberen opslaan'),
            logs: () => console.log('Toon opslaglog')
        }
    },

    // Logical Nodes
    conditionNode: {
        nodeType: 'conditionNode',
        title: 'IF/ELSE',
        label: 'Condition',
        icon: HelpOutlineIcon,
        fields: [
            {
                key: 'expression',
                label: 'Voorwaarde',
                type: 'text',
                value: 'onderzoekId !== ""'
            }
        ],
        theme: {
            background: '#FFFDE7',
            text: '#9E9D24'
        },
        status: 'idle'
    },
    orJoin: {
        nodeType: 'orJoin',
        title: 'OR',
        icon: DoneIcon,
        fields: [],
        theme: {
            background: '#E3F2FD', text: '#1565C0'
        }
    },
    andJoin: {
        nodeType: 'andJoin',
        title: 'AND',
        icon: DoneAllIcon,
        fields: [],
        theme: {
            background: '#E8F5E9', text: '#2E7D32'
        },
        status: 'waiting' // dynamisch bijwerken
    },

    // End Nodes
    stop: {
        nodeType: 'stop',
        title: 'End',
        icon: StopIcon,
        fields: [],
        theme: {
            background: '#FFEBEE',
            text: '#B71C1C'
        },
    },
}

export const nodeRegistryArray = Object.entries(nodeRegistry).map(([type, config]) => ({
    type,
    label: String(config.label ?? config.title ?? type)
}));