var State = React.createClass({

  displayName: 'State',

  getInitialState: function () {
      return {
        repositioning: false,
        x: 0,
        y: 0,
      };
  },

  componentDidMount: function () {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.endReposition);
  },

  render: function(){

    var classes = React.addons.classSet({
      'state': true
    });

    var style = {
      top: this.state.y - 20,
      left: this.state.x - 20
    }

    return (
      <div style={style} className={classes} onMouseDown={this.startReposition}>Q1</div>
    );
  },

  startReposition: function() {
    this.setState({repositioning: true});
  },

  endReposition: function() {
    this.setState({repositioning: false});
  },

  reposition: function(e) {
    if(!this.state.repositioning) {
      return ;
    }

    this.setState({
      x: this.state.x + e.movementX,
      y: this.state.y + e.movementY
    });
  },

  handleMouseMove: function(e) {
    this.reposition(e);
  }

});