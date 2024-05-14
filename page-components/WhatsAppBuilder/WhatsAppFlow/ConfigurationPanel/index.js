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

	// added a mapper to retrive the node that are to be in the Configuration Panel.
	// So that we can add the new nodes at one place and can be reflected everywhere.

	const nodes=getNodes();

	// configuration Panel will be in create state when there is no selectedNode.
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

	// configuration Panel will be in configuring state when there in a selectedNode.
	return <CustomizingNode selectedNode={selectedNode}/>



}

export default ConfigurationPanel