var ConfigPane = React.createClass({

  render: function() {

    var paneContent = "";
    
    if (this.props.selectElement !== null) {
      if (this.props.selectElement.elementType == "state") {
        paneContent = <StateConfigPane/>;
      }  
    }
    

    return (
      <div id="config-pane">
        {paneContent}
      </div>
    );
  }
});