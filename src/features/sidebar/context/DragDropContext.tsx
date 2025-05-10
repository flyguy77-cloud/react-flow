import { createContext, useContext, useState, ReactNode } from 'react';

type NodeType = string | null;

type DnDContextType = [NodeType, (type: NodeType) => void];

const DnDContext = createContext<DnDContextType | undefined>(undefined);

export const DnDProvider = ({ children }: { children: ReactNode }) => {
    const [type, setType] = useState<NodeType>(null);

    return (
        <DnDContext.Provider value={[type, setType]}>
            {children}
        </DnDContext.Provider>
    );
};

export const useDnD = (): DnDContextType => {
    const context = useContext(DnDContext);
    if (!context) {
        throw new Error('useDnD must be used within a DnDProvider');
    }
    return context;
};