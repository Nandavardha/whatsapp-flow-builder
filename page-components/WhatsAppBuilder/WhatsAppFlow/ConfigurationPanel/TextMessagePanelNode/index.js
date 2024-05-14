import React from 'react';
import styles from "./styles.module.css";
import { AiOutlineMessage } from "react-icons/ai";

function TextMessagePanelNode() {
	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData('application/reactflow', nodeType);
		event.dataTransfer.effectAllowed = 'move';
	  };
  return (
	<div className={styles.container} onDragStart={(event) => onDragStart(event, 'text_message')} draggable>
		<div style={{alignSelf:"center"}}>
			<AiOutlineMessage size="30px"/>
			<div >Message</div>
		</div>
	</div>
  )
}

export default TextMessagePanelNode