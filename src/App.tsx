import './App.css';
import TurboFlow from "./features/flow/components/TurboFlow.tsx";
import {ReactFlowProvider} from "@xyflow/react";
import {DnDProvider} from "./features/sidebar/context/DragDropContext.tsx";

function App() {
    return (
        <>
            <ReactFlowProvider>
                <DnDProvider>
                    <TurboFlow/>
                </DnDProvider>
            </ReactFlowProvider>
        </>
    )
}

export default App
