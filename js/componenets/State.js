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
      top: this.props.y - this.config.size / 2,
      left: this.props.x - this.config.size / 2
    }

    return (
      <div style={style} className={classes} onMouseDown={this.onMouseDown}></div>
    );

  },

});