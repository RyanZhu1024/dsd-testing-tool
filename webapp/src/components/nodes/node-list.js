import React, {Component} from 'react';
import NodeListItem from './node-list-item';
export default class NodeList extends Component {

    componentWillMount() {
        this.props.loadNodes();
    }

    render () {
        return <div className="list-group">
            {
                this.props.nodes.map((node) => {
                        return <NodeListItem key={node.id} node={node}/>;
                    }
                )
            }
        </div>
    }
}