import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css"
import useStore from '../../../zustand-helper/store';

function TextMessageAdder({selectedNode}) {

	const [value,setValue]=useState(selectedNode?.data?.text || "");


	const {updateNodeData}=useStore((store)=>{
		return {
			updateNodeData:store.updateNodeData
		}
	})

	const handleChange=(event)=>{
		setValue(event.target.value)
		updateNodeData({selectedNode,value:event.target.value})
	}

	useEffect(()=>{
			setValue(selectedNode?.data?.text || "")		
	},[selectedNode.id])


  return (
	<div className={styles.container}>
		<div style={{marginBottom:"6px"}}>Text</div>
		<textarea id={selectedNode.id} name={selectedNode.id} rows="4" cols="36" onChange={handleChange} value={value}>

		</textarea>

	</div>
  )
}

export default TextMessageAdder