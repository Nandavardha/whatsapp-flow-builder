import React from 'react';
import styles from "./styles.module.css";
import getNodes from './utils/getNodes';
import { isEmpty } from 'lodash';
import CustomizingNode from './CustomizingNode';
import useStore from '../zustand-helper/store';

function ConfigurationPanel() {

	const {selectedNode}=useStore((store)=>{

		return {
			selectedNode:store.selectedNode
		}

	})
	const nodes=getNodes()

	if(isEmpty(selectedNode)){

		return (
			<div className={styles.container}>
				{
					Object.keys(nodes).map((nodeKey)=>{
					const Node=nodes[nodeKey];
					return <Node />
					})
				}
			</div>
		  )

	}


	return <CustomizingNode selectedNode={selectedNode}/>



}

export default ConfigurationPanel