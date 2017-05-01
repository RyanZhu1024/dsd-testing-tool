import React, {Component} from 'react';
import NodeListItem from './node-list-item';
import queryString from 'query-string';
export default class NodeList extends Component {

    componentWillMount() {
        console.log("load nodes");
        let search = this.props.location.search;
        if (search) {
            this.props.selectProject(search).then(() => {
                this.props.loadNodes();
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const search = nextProps.location.search;
        if (search) {
            const projectId = queryString.parse(search).projectId;
            if (projectId !== this.props.project) {
                console.log(this.props.project);
                console.log(projectId);
                this.props.selectProject(search).then(() => {
                    this.props.loadNodes();
                });
            }
        }
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