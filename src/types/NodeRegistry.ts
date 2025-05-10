import DescriptionIcon from '@mui/icons-material/Description';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import {BaseNodeData} from "./BaseNodeTypes.ts";
import GitHubIcon from "@mui/icons-material/GitHub";

export const nodeRegistry: Record<string, Omit<BaseNodeData, 'onConfigure'>> = {
    script: {
        nodeType: 'script',
        title: 'Run Script',
        icon: GitHubIcon,
        fields: [
            {
                key: 'script',
                label: 'Script',
                type: 'select',
                value: 'generate-report.sh',
                options: ['generate-report.sh', 'cleanup-data.sh']
            },
            {
                key: 'timeout',
                label: 'Timeout',
                type: 'number',
                value: 60
            }
        ]
    },
    report: {
        nodeType: 'report',
        title: 'Genereer Rapport',
        icon: DescriptionIcon,
        fields: [
            {
                key: 'template',
                label: 'Template',
                type: 'text',
                value: 'default-template'
            }
        ]
    },
    start: {
        nodeType: 'start',
        title: 'Start Node',
        icon: PlayArrowIcon,
        fields: []
    },
    stop: {
        nodeType: 'stop',
        title: 'End Node',
        icon: StopIcon,
        fields: []
    },
};