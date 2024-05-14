import React from 'react';
import styles from "./styles.module.css"
import getNodeMapping from './utils/getNodeMapping';
import { FaArrowLeft } from 'react-icons/fa';
import useStore from '../../zustand-helper/store';

function CustomizingNode({selectedNode}) {

	//retrived SelectedNode Data from store.
	const {selectedNodeData,onSelectNode}=useStore((store)=>{

		return {
			selectedNodeData:store.nodes.find((node)=>{
					return node.id === selectedNode
			}),
			onSelectNode:store.onSelectNode,
		}

	})

	const Element=getNodeMapping({key:selectedNodeData?.type})
  return (
	<div className={styles.container}>
		<div className={styles.message_bar}>
		<FaArrowLeft onClick={()=>{
			// onClick of Left Arrow removed the selectedNode.
			onSelectNode("")
		}}/>
			<span>Message</span>
		</div>
		<Element selectedNode={selectedNodeData}/>
	</div>
  )
}

export default CustomizingNode