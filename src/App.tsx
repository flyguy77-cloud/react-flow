import './App.css';
import TurboFlow from "./components/flows/TurboFlow.tsx";
import {ReactFlowProvider} from "@xyflow/react";
import {DnDProvider} from "./components/interaction/draganddrop/DragDrop.tsx";

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
