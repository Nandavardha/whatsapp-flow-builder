const { default: TextMessageAdder } = require("../TextMessageAdder");

const getNodeMapping=({key})=>{
	const MAPPER={
		"text_message":TextMessageAdder
	}

	return MAPPER[key] || TextMessageAdder;
}

export default getNodeMapping;