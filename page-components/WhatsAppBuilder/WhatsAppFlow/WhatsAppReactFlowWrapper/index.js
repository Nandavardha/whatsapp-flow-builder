
import React, { useCallback, useRef, useState } from 'react';
import 'reactflow/dist/style.css';
import  ReactFlow, { Background, ReactFlowProvider }  from 'reactflow'
import TextMessageNode from './CustomNodes/TextMessageNode';
import ConfigurationPanel from '../ConfigurationPanel';
import "./styles.css"
import useStore  from "../zustand-helper/store";


let id=1;

const getNodeId = () => `dndnode_${id++}`;



const nodeTypes={
	"text_message":TextMessageNode
}

const selector = (state) => ({
	nodes: state.nodes,
	edges: state.edges,
	onNodesChange: state.onNodesChange,
	onConnect:state.onConnect,
	addNodes:state.addNodes,
	onSelectNode:state.onSelectNode,
	onEdgesChange:state.onEdgesChange
});

function WhatsAppReactFlowWrapper() {

	const [reactFlowInstance, setReactFlowInstance] = useState(null);

	const reactFlowWrapper=useRef()
	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	  }, []);

	  const {
		nodes,
		edges,
		onNodesChange,
		onConnect,
		addNodes,
		onSelectNode,
		onEdgesChange,
	} = useStore(selector);

	const onDrop = useCallback(
		(event) => {
		  event.preventDefault();
	
		  const type = event.dataTransfer.getData('application/reactflow');
	
		  if (typeof type === 'undefined' || !type) {
			return;
		  }

		  const position = reactFlowInstance.screenToFlowPosition({
			x: event.clientX,
			y: event.clientY,
		  });
		  const newNode = {
			id: getNodeId(),
			type,
			position,
			data: { label: `${type} node` },
		  };
		  addNodes(newNode);
		},
		[reactFlowInstance],
	  );


  return (
	<div className='dndflow'>
		<ReactFlowProvider>
			<div className="reactflow-wrapper" ref={reactFlowWrapper}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					nodeTypes={nodeTypes}
					onConnect={onConnect}
					onDrop={onDrop}
					onDragOver={onDragOver}
					onInit={setReactFlowInstance}
					nodesDraggable={true}
					onNodeClick={(_,value)=>{
						onSelectNode(value.id)
					}}
					onEdgesChange={onEdgesChange}
				>
				<Background color="#ccc" variant="dots"  size="lg"/>
				</ReactFlow>
			</div>
			<ConfigurationPanel/>
		</ReactFlowProvider>
	</div>


  )
}

export default WhatsAppReactFlowWrapper