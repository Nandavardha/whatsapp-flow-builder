import React from 'react';
import styles from "./styles.module.css"
import { Handle, Position } from 'reactflow';
import useStore from '../../../zustand-helper/store';
import { FaWhatsapp } from 'react-icons/fa';


//custom Node (TextMessageNode) 

function TextMessageNode(props) {

	// Nodes Data is in Props.

	const node=useStore((store)=>{
		return store.nodes.find((node)=>{

			return node.id === props.id

		})
	});

	const nodeData=node.data;


	// to retrive the selected Node so that can be used for styling.
	const selectedNode=useStore((store)=>{
		return store.selectedNode;
	});


	// added handles for joining two nodes : handels are two type 
	//1. target 2. source. 
	// added functionality such that target node can only allow edge ending and source node to start the edge starting point.
  return (
	<>
	<div className={styles.container} style={{
		border:selectedNode === node.id?"1px solid blue":""
		}}>
		<div className={styles.header}>
			<span>Send Message</span>
			<FaWhatsapp style={{padding:"2px",background:"#fff",borderRadius:"50%"}} size="16px"/>
		</div>
		<div className={styles.content}>
		{nodeData.text}
		</div>
		
	</div>
	<Handle id="b" type="target" position={Position.Left} isConnectableEnd isConnectableStart={false}/>
    <Handle id="a" type="source" position={Position.Right}  isConnectableStart isConnectableEnd={false}/>
	</>
  )
}

export default TextMessageNode