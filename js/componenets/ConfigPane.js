var ConfigPane = React.createClass({

  render: function() {

    var paneContent = "";
    
    if (this.props.selectElement !== null) {
      if (this.props.selectElement.elementType == "state") {
        paneContent = <StateConfigPane selectElement={this.props.selectElement} onUpdateConfig={this.props.onUpdateConfig}/>;
      } else if (this.props.selectElement.elementType == "transition") {
        paneContent = <TransitionConfigPane selectElement={this.props.selectElement} onUpdateConfig={this.props.onUpdateConfig}/>;
      }
    }
    

    return (
      <div id="config-pane">
        {paneContent}
      </div>
    );
  }
});