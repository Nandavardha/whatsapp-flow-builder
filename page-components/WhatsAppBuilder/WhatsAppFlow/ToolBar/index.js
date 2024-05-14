import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css"
import  useStore  from '../zustand-helper/store';

function ToolBar() {

	const {edges,nodes}=useStore((store)=>{
		return {edges:store.edges,nodes:store.nodes}
	});

	//state to store the error on clicking save changes;
	const [error,setError]=useState(false)


	const handleClick=()=>{
		const targetNodes =new Set();

		// stroed all the nodes which are targets for edges;
		edges.forEach((edge)=>{
			targetNodes.add(edge.target);
		});


		// if targetNodes size is greater - nodes length > 1 and in case of more than 1 node raising the error 
		if( Math.abs(targetNodes.size - nodes.length) > 1 && nodes.length >1){
			setError(true);
		}
	}

	useEffect(()=>{

		// used set time out to show the error for only 3s after clicking the save button
		const time=setTimeout(()=>{

			if(error){
				setError(false)
			}

		},3000)
		return ()=>{
			// clearing the Timeout on unmount;
			clearTimeout(time)
		}

	},[error])

	
  return (
	<div className={styles.container}>
		<div className={styles.sub_container} style={{justifyContent:error ? "space-between":"flex-end"}}>
		{error && <div className={styles.error}>Cannot Save Flow</div>}
		<button className={styles.button} onClick={handleClick}>
			Save Changes
		</button>

		</div>

		

	</div>
  )
}

export default ToolBar