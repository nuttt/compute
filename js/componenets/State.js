var State = React.createClass({

  config: {
    size: 50
  },

  onMouseDown: function(e){
    this.props.onMouseDown("state", this.props.idx);
  },

  render: function(){
    var classes = React.addons.classSet({
      'state': true,
      'selected': this.props.selected
    });

    var style = {
      top: this.props.y - this.config.size / 2 - this.props.offsetY,
      left: this.props.x - this.config.size / 2 - this.props.offsetX
    }

    var stateName = "";
    
    if (this.props.stateType == "accepted" ) {
      stateName = "A";
    }
    else if (this.props.stateType == "rejected" ) {
      stateName = "R";
    }
    else if (this.props.stateType == "start" ) {
      stateName = "S";
    }
    
    return (
      <div style={style} className={classes} onMouseDown={this.onMouseDown}>{stateName}</div>
    );

  },

});