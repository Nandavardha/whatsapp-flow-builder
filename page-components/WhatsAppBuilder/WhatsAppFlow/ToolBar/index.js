import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css"
import  useStore  from '../zustand-helper/store';

function ToolBar() {

	const {edges,nodes}=useStore((store)=>{
		return {edges:store.edges,nodes:store.nodes}
	});

	const [error,setError]=useState(false)


	const handleClick=()=>{
		const targetNodes =new Set();
		edges.forEach((edge)=>{
			targetNodes.add(edge.target);
		});

		if( Math.abs(targetNodes.size - nodes.length) > 1 && nodes.length >1){
			setError(true);
		}
	}

	useEffect(()=>{
		const time=setTimeout(()=>{

			if(error){
				setError(false)
			}

		},3000)
		return ()=>{
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