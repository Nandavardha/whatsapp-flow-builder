import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import INITIAL_NODES from './nodes';
import INITIAL_EDGES from './edges';
import { applyNodeChanges,MarkerType } from 'reactflow';

let edgeCount=0;


//Zustand Store Initializer;
const useStore = createWithEqualityFn((set,get)=>{

	return {
		nodes: INITIAL_NODES,
		edges: INITIAL_EDGES,
		selectedNode:"",
		onNodesChange:(changes)=>{

			//to track changes in the node state whether it is position changes. 
			set({
				nodes: applyNodeChanges(changes, get().nodes),
			});
		},
		addNodes:(node)=>{
			// setting  new nodes on dropping of the node panel component
			set({
				nodes:[...get().nodes,node],
			})
		},

		onSelectNode:(id)=>{
			//To track the selected node;
			set({selectedNode:id})
		},
		onEdgesChange:(changes)=>{

			// To track any change happend to the edges
			if(changes?.[0]?.type === "remove"){

				//logic to remove the deleted edges
				const filteredEdges=get().edges.filter((edge)=>{
					return edge.id !== changes?.[0]?.id;
				});
				set({
					edges:filteredEdges,
				})
			}
		},

		updateNodeData:({value,selectedNode})=>{

			//Adding the Data to the node on addition of text in node panel 
			const findNodes=get().nodes.filter((node)=>{
				return node.id !== selectedNode.id;
			});

			selectedNode['data']={
				...(selectedNode['data'] || {}),
				text:value
			};
			
			set( {nodes:[...findNodes,selectedNode]})

		},
		onConnect:(connect)=>{

			//logic to add edge between the nodes added source, target and markerEnd;
			const edge={
				source: connect.source,
				target: connect.target,
				id: `edge-${edgeCount++}`,
				markerEnd: {
					type: MarkerType.ArrowClosed,
				  },
			  };

			set({
				edges:[...get().edges,edge]
			})

		},
		deleteNode:(id)=>{

			const filterdNodes=get().nodes.filter((node)=>{
				return node.id !== id;
			})

			const filterEdes=get().edges.filter((edge)=>{

				return edge.source !== id && edge.target !== id;

			})

			set({nodes:filterdNodes});

			set({edges:filterEdes});
		}
	}

},
shallow)


export default useStore;