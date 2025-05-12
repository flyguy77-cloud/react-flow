| **Layer** | **Mag importeren uit**                  | **Mag** **niet** **importeren uit** |
| --------- | --------------------------------------- | ----------------------------------- |
| app/      | alles                                   | \-                                  |
| pages/    | widgets/, features/, entities/, shared/ | app/ (soms ok)                      |
| widgets/  | features/, entities/, shared/           | pages/, app/                        |
| features/ | entities/, shared/                      | widgets/, pages/, app/              |
| entities/ | shared/                                 | alles boven entities/               |
| shared/   | alleen shared/                          | alles boven shared/                 |



src/
│
├── app/                       # App setup (root component, providers, routing, theming)
│   └── App.tsx
│   └── index.tsx
│
├── shared/                   # Herbruikbare elementen zonder domeinlogica
│   ├── ui/                   # Generieke UI-components (Button, Modal, Icon, etc.)
│   │   └── FunctionIcon.tsx
│   └── lib/                  # Utils, helpers, constants
│       └── file.ts           # saveFile, loadFile etc.
│
├── entities/                 # Domeinobjecten zonder veel gedrag
│   └── node/                 # Kernrepresentatie van een node
│       ├── model/            # Base types (BaseNodeData, AppNode, etc.)
│       │   └── types.ts
│       └── registry/         # nodeRegistry en node configuraties
│           └── nodeRegistry.ts
│
├── features/                 # Functionele units met user-interactie
│   ├── dragAndDrop/          # Sidebar en context
│   │   ├── components/
│   │   │   └── DragDropSidebar.tsx
│   │   └── context/
│   │       └── DragDropContext.tsx
│   ├── nodeHandlers/         # node-specifieke acties
│   │   └── useScriptNodeHandler.ts
│   └── workflowPersistence/  # save/load workflow functie
│       └── useWorkflowPersistence.ts
│
├── widgets/                  # Zelfstandige UI-bouwblokken (nodes)
│   └── nodeRenderer/         # Alle node-componenten
│       ├── BaseNode.tsx
│       ├── StartNode.tsx
│       └── EndNode.tsx
│
├── pages/                    # Volledige views
│   └── WorkflowCanvas/
│       ├── components/
│       │   └── Flow.tsx
│       └── factory/
│           └── createNodeFromType.ts
│
└── index.html


// src/entities/node/model/index.ts
export * from './types';

// src/entities/node/registry/index.ts
export * from './nodeRegistry';

// src/features/dragAndDrop/components/index.ts
export { default as DragDropSidebar } from './DragDropSidebar';

// src/features/dragAndDrop/context/index.ts
export * from './DragDropContext';

// src/features/nodeHandlers/index.ts
export * from './useScriptNodeHandler';

// src/features/workflowPersistence/index.ts
export * from './useWorkflowPersistence';

// src/widgets/nodeRenderer/index.ts
export { default as BaseNode } from './BaseNode';
export { default as StartNode } from './StartNode';
export { default as EndNode } from './EndNode';

// src/pages/WorkflowCanvas/components/index.ts
export { default as Flow } from './Flow';

// src/pages/WorkflowCanvas/factory/index.ts
export * from './createNodeFromType';

// src/shared/lib/index.ts
export * from './file';

// src/shared/ui/index.ts
export { default as FunctionIcon } from './FunctionIcon';
