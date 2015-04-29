var DrawCanvas = React.createClass({
  
  onMouseDown: function(e) {
    
    var pos = $(this.getDOMNode()).offset();
    var x = e.nativeEvent.pageX - pos.left;
    var y = e.nativeEvent.pageY - pos.top;

    this.props.handleMouseDown(x, y);
  },

  getInitialState: function () {
      return {
          mouseX: 0,
          mouseY: 0  
      };
  },

  onMouseMove: function(e) {
    var pos = $(this.getDOMNode()).offset();
    var x = e.nativeEvent.pageX - pos.left;
    var y = e.nativeEvent.pageY - pos.top;
    this.setState({
      mouseX: x,
      mouseY: y
    });
  },

  render: function(){
    
    var addingTransition = null;
    if(this.props.addingTransition !== null){
      addingTransition = <Transition
                          x1={this.props.addingTransition.x}
                          y1={this.props.addingTransition.y}
                          x2={this.state.mouseX}
                          y2={this.state.mouseY}
                        />
    }

    return(
      <div id="draw-canvas" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove}>
        {this.props.states.map(function(state, idx){
          return(
            <State
              key={state.key}
              idx={idx}
              x={state.x}
              y={state.y}
              onMouseDown={this.props.handleMouseDownOnElement}
              selected={this.props.selectElement == state}
              stateType="state"/>
          ); 
        }.bind(this))}
        {this.props.transitions.map(function(transition, idx){
          return(
            <Transition
              key={transition.key}
              idx={idx}
              x1={transition.from.x}
              y1={transition.from.y}
              x2={transition.to.x}
              y2={transition.to.y}
              selected={this.props.selectElement == transition}
              onMouseDown={this.props.handleMouseDownOnElement}
            />
          );
        }.bind(this))}
        {addingTransition}
      </div>
    );
  },
});