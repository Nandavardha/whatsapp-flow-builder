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

		// setting up the text message for the text-message Node
		setValue(event.target.value);
		//updated the node data with the text-message
		updateNodeData({selectedNode,value:event.target.value})
	}

	useEffect(()=>{
			// on change of the selectedNode, value is set to the node data.
			setValue(selectedNode?.data?.text || "")		
	},[selectedNode?.id])


  return (
	<div className={styles.container}>
		<div style={{marginBottom:"6px"}}>Text</div>
		<textarea id={selectedNode?.id} name={selectedNode?.id} rows="4" cols="36" onChange={handleChange} value={value}>

		</textarea>

	</div>
  )
}

export default TextMessageAdder