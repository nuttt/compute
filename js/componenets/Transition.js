var Transition = React.createClass({

  onMouseDown: function(e){
    this.props.onMouseDown("transition", this.props.idx);
  },

  distance: function(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  },

  render: function(){
    var classes = React.addons.classSet({
      'transition': true,
      'selected': this.props.selected
    });
    
    var margin = 5;
    var stateRadius = 25;
    var arrowHeight = 15;

    var x1o = this.props.x1;
    var y1o = this.props.y1;
    var x2o = this.props.x2;
    var y2o = this.props.y2;

    var centerX = (x1o + x2o) / 2;
    var centerY = (y1o + y2o) / 2;

    var distance = this.distance(x1o, y1o, x2o, y2o) ;
    if (distance < 0) {
      distance = 0;
    }

    var dx = x2o - x1o;
    var dy = y2o - y1o;
    var angle = Math.acos(dx / distance);
    if (dy < 0) {
      angle = 2 * Math.PI - angle;
    }

    var perpendAngle = angle + Math.PI / 2.0;
    var shiftMargin = 10;
    var shiftX = Math.cos(perpendAngle) * shiftMargin;
    var shiftY = Math.sin(perpendAngle) * shiftMargin;

    var oppositeDirection = this.props.key1 > this.props.key2;

    if (this.props.key1 == -1) {
      shiftX = 0;
      shiftY = 0;
    }

    var degree = angle * 180 / Math.PI;

    var drawDistance = distance - 2 * stateRadius;
    var style = {
      top: centerY - arrowHeight / 2 + shiftY - this.props.offsetY,
      left: centerX - drawDistance / 2 + shiftX - this.props.offsetX,
      position: 'absolute',
      zIndex: 50,
      MozTransform: "rotate(" + degree + "deg)",
      WebkitTransform: "rotate(" + degree + "deg)",
      OTransform: "rotate(" + degree + "deg)",
      msTransform: "rotate(" + degree + "deg)",
      transform: "rotate(" + degree + "deg)"
    }

    var classes =  React.addons.classSet({
      'transition': true
    });

    var lineColor = "#e74c3c";
    if (this.props.selected) {
      lineColor = "#39d5ff";
    }

    var nameDiv = "";
    var boxDegree = degree;
    var boxShiftX = shiftX;
    var boxShiftY = shiftY;

    if (boxDegree > 90 && boxDegree < 270) {
      boxDegree += 180;
      boxShiftX = -shiftX;
      boxShiftX = -shiftY;
    }

    // console.log("shiftX: " + shiftX);
    // console.log("shiftY: " + shiftY);
    // console.log("boxShiftX: " + boxShiftX);
    // console.log("boxShiftY: " + boxShiftY);

    var labelHeight = 20;
    var labelWidth = 55;
    if (!this.props.mouseEffect) {
      var styleDiv = {
        position: "absolute",
        top: centerY - labelHeight / 2 + shiftY - this.props.offsetY,
        left: centerX - labelWidth * this.props.config.length / 2 + shiftX - this.props.offsetX,
        border: "#F39C12 1px solid",
        backgroundColor: "#ffcf4b",
        padding: "0 10px",
        zIndex: 100,
        fontWeight: "bold",
        MozTransform: "rotate(" + boxDegree + "deg)",
        WebkitTransform: "rotate(" + boxDegree + "deg)",
        OTransform: "rotate(" + boxDegree + "deg)",
        msTransform: "rotate(" + boxDegree + "deg)",
        transform: "rotate(" + boxDegree + "deg)"
      }
      // console.log(styleDiv);

      names = this.props.config.map(function(cf){

        var content = cf.input + "/" + cf.write + ", " + cf.direction;
        return content; 
      });

      if (this.props.config.length > 0) {
        nameDiv = <div style={styleDiv}>{names.join(" || ")}</div>;
      }
    }

    return (
      <span>
      <svg width={drawDistance} height={arrowHeight} style={style} className={classes}>
          
          <Defs dangerouslySetInnerHTML={{__html: '<marker id="Triangle'+this.props.idx+'" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="3" markerHeight="3" orient="auto"><path fill="'+lineColor+'" d="M 0 0 L 10 5 L 0 10 z" /></marker>'}}/>
          <Line x1={0} y1={arrowHeight/2} x2={drawDistance} y2={7.5}
                    fill="#e74c3c" stroke={lineColor}
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

var Line = React.createClass({
    render: function() {
        return <line {...this.props}>{this.props.children}</line>;
    }
});

var Defs = React.createClass({
    render: function() {
        return <defs {...this.props}>{this.props.children}</defs>;
    }
});
