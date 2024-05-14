import React from 'react'
import WhatsAppReactFlowWrapper from './WhatsAppReactFlowWrapper'
import ToolBar from './ToolBar';


// WorkFlow Parent Component with toolbar and ReactFlow wrapper;

function WhatsAppFlow() {

  return (
	<>
	<ToolBar/>
	<WhatsAppReactFlowWrapper/>
	</>

  )
}

export default WhatsAppFlow