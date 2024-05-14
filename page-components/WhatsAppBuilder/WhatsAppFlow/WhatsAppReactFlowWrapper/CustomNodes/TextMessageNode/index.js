import React from 'react';
import styles from "./styles.module.css"
import { Handle, Position } from 'reactflow';
import useStore from '../../../zustand-helper/store';
import { FaTrash, FaWhatsapp } from 'react-icons/fa';


//custom Node (TextMessageNode) 

function TextMessageNode(props) {

	// Nodes Data is in Props.

	const {node,deleteNode,onSelectNode}=useStore((store)=>{
		return {
			node:store.nodes.find((node)=>{

			return node.id === props.id

		}),
		deleteNode:store.deleteNode,
		onSelectNode:store.onSelectNode,
	}
	});

	const selectedNode=useStore((store)=>{
		return store.selectedNode;
	});

	const nodeData=node?.data;


	// to retrive the selected Node so that can be used for styling.

	const handleDelete=(event)=>{
		event.stopPropagation();
		onSelectNode("");
		deleteNode(node.id);
		
	}


	// added handles for joining two nodes : handels are two type 
	//1. target 2. source. 
	// added functionality such that target node can only allow edge ending and source node to start the edge starting point.
  return (
	<>
	<div className={styles.container} style={{
		border:selectedNode === node?.id?"1px solid blue":""
		}}>
		<div className={styles.header}>
			<span>Send Message</span>
			<FaWhatsapp style={{padding:"2px",background:"#fff",borderRadius:"50%"}} size="16px"/>
		</div>
		<div className={styles.content}>
		{nodeData?.text}
		</div>
		
	</div>
	{selectedNode === node?.id && <FaTrash size="16px" className={styles.trash} onClick={handleDelete}/>}
	<Handle id="b" type="target" position={Position.Left} isConnectableEnd isConnectableStart={false}/>
    <Handle id="a" type="source" position={Position.Right}  isConnectableStart isConnectableEnd={false}/>
	</>
  )
}

export default TextMessageNode