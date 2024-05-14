import React from 'react';
import styles from "./styles.module.css"
import { Handle, Position } from 'reactflow';
import useStore from '../../../zustand-helper/store';
import { FaWhatsapp } from 'react-icons/fa';

function TextMessageNode(props) {

	const node=useStore((store)=>{
		return store.nodes.find((node)=>{

			return node.id === props.id

		})
	});

	const nodeData=node.data;

	const selectedNode=useStore((store)=>{
		return store.selectedNode;
	})

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