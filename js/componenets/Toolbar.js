var Toolbar = React.createClass({
  config: {
    tools: [
      'Add State',
      'Add Transition',
      'Move',
      'Delete',
      'Config',
      'Pan'
    ]
  },

  getInitialState: function () {
      return {
          currentTool: ""  
      };
  },

  render: function(){

    var tools = this.config.tools.map(function(tool){
      return (<ToolbarButton active={tool === this.props.tool} onClick={this.changeTool}>{tool}</ToolbarButton>);
    }.bind(this));

    return (
      <div id="toolbar">
        <div className="left">
          {tools}
        </div>
        <div className="right">
        </div>
      </div>
    );
  },

  changeTool: function(tool){
    this.props.changeTool(tool);
  },
});