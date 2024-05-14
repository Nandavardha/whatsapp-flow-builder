import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import INITIAL_NODES from './nodes';
import INITIAL_EDGES from './edges';
import { applyNodeChanges,MarkerType } from 'reactflow';

let edgeCount=0;


const useStore = createWithEqualityFn((set,get)=>{

	return {
		nodes: INITIAL_NODES,
		edges: INITIAL_EDGES,
		selectedNode:"",
		onNodesChange:(changes)=>{
			set({
				nodes: applyNodeChanges(changes, get().nodes),
			});
		},
		addNodes:(node)=>{
			set({
				nodes:[...get().nodes,node],
			})
		},

		onSelectNode:(id)=>{
			set({selectedNode:id})
		},
		onEdgesChange:(changes)=>{
			if(changes?.[0]?.type === "remove"){
				const filteredEdges=get().edges.filter((edge)=>{
					return edge.id !== changes?.[0]?.id;
				});
				set({
					edges:filteredEdges,
				})
			}
		},

		updateNodeData:({value,selectedNode})=>{
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
	}

},shallow)


export default useStore;