
import React, { useCallback, useRef, useState } from 'react';
import 'reactflow/dist/style.css';
import  ReactFlow, { Background, ReactFlowProvider }  from 'reactflow'
import TextMessageNode from './CustomNodes/TextMessageNode';
import ConfigurationPanel from '../ConfigurationPanel';
import "./styles.css"
import useStore  from "../zustand-helper/store";


let id=1;

//function to get unique id for the node
const getNodeId = () => `dndnode_${id++}`;


// Different custom nodes Mapper 
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

	//  To store ReactFlow instance on Initial state;
	const [reactFlowInstance, setReactFlowInstance] = useState(null);

	const reactFlowWrapper=useRef();

	// On draging Over the Node panel Component on ReactFlow Component Execution.Gave smooth transition by giving drop Effect "move".
	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	  }, []);

	// using Zustand Global state manager retrived required Functions and values

	  const {
		nodes,
		edges,
		onNodesChange,
		onConnect,
		addNodes,
		onSelectNode,
		onEdgesChange,
	} = useStore(selector);

// Function which to excute on Drop of Node panel Component
	const onDrop = useCallback(
		(event) => {
		  event.preventDefault();
	
		  const type = event.dataTransfer.getData('application/reactflow');
	
		  if (typeof type === 'undefined' || !type) {
			return;
		  }

		  // retriving x and y co-ordinates of Droped element on the Reactflow Component
		  const position = reactFlowInstance.screenToFlowPosition({
			x: event.clientX,
			y: event.clientY,
		  });

		  // created a new node with above x and y co-ordinates
		  const newNode = {
			id: getNodeId(),
			type,
			position,
			data: { label: `${type} node` },
		  };

		  // added the new node by using global function addNodes which addes the node to the Existing nodes 
		  addNodes(newNode);
		},
		[reactFlowInstance],
	  );

//intialized the Reactflow Component;
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