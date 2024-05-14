const { default: TextMessagePanelNode } = require("../TextMessagePanelNode");


// Functions to get Configuration Panel Nodes;
const getNodes=()=>{
	return {
		text_message:TextMessagePanelNode
	}
}

export default getNodes;