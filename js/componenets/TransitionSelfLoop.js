var TransitionSelfLoop = React.createClass({

  onMouseDown: function(e){
    this.props.onMouseDown("transition", this.props.idx);
  },

  render: function(){
    var classes = React.addons.classSet({
      'transition': true,
      'selected': this.props.selected
    });
    
    var style = {
      top: this.props.y - 20 - 45 - this.props.offsetY,
      left: this.props.x - 10 - this.props.offsetX,
      position: 'absolute',
      zIndex: 50
    }

    var lineColor = "#e74c3c";
    if (this.props.selected) {
      lineColor = "#39d5ff";
    }

    var nameDiv = "";
    var labelHeight = 20;
    var labelWidth = 55;
    var styleDiv = {
      position: "absolute",
      top: this.props.y - 20 - 45 - 25 - this.props.offsetY,
      left: this.props.x - labelWidth * this.props.config.length / 2 - this.props.offsetX,
      border: "#F39C12 1px solid",
      backgroundColor: "#ffcf4b",
      padding: "0 10px",
      zIndex: 100,
      fontWeight: "bold"
    }

    names = this.props.config.map(function(cf){
      var content = cf.input + "/" + cf.write + ", " + cf.direction;
      return content; 
    });

    if (this.props.config.length > 0) {
      nameDiv = <div style={styleDiv}>{names.join(" || ")}</div>;
    }

    return (
      <span>
      <svg width={20} height={45} style={style} className={classes}>
          
          <Defs dangerouslySetInnerHTML={{__html: '<marker id="Triangle'+this.props.idx+'" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="3" markerHeight="3" orient="auto"><path fill="'+lineColor+'" d="M 0 0 L 10 5 L 0 10 z" /></marker>'}}/>
          <Path d="M 5 45 L 5 20 Q 10 -10 15 20 L 15 45"
                    fill="none" stroke={lineColor}
                    strokeWidth="5"
                    markerEnd={"url(#Triangle"+this.props.idx+")"}
                    onMouseDown={this.onMouseDown}
                    />
      </svg>
      {nameDiv}
      </span>
    );

  },

});

var Path = React.createClass({
    render: function() {
        return <path {...this.props}>{this.props.children}</path>;
    }
});
