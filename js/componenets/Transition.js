var Transition = React.createClass({

  onMouseDown: function(e){
    this.props.onMouseDown("transition", this.props.idx);
  },

  hey: function(){
    console.log("Hey transition");
  },

  render: function(){
    var classes = React.addons.classSet({
      'transition': true
    });
    
    var margin = 5;
    var stateRadius = 25;

    var x1a = this.props.x1;
    var y1a = this.props.y1;
    var x2a = this.props.x2;
    var y2a = this.props.y2;

    var dx = x2a - x1a;
    var dy = y2a - y1a;

    var tan = dy / dx;
    var angle = Math.atan(tan);
    var perpendAngle = angle + Math.PI / 2.0;
    var shiftMargin = 10;
    var shiftX = Math.cos(perpendAngle) * shiftMargin;
    var shiftY = Math.sin(perpendAngle) * shiftMargin;

    if (this.props.key1 > this.props.key2) {
      shiftX = -shiftX;
      shiftY = -shiftY;
    }
    else if(this.props.key1 == -1 && this.props.key2 == -1) {
      shiftX = 0;
      shiftY = 0;
    }

    var ox = stateRadius * Math.cos(angle);
    var oy = stateRadius * Math.sin(angle);

    var x1, y1, x2, y2;
    if (x1a <= x2a) {
      x1 = x1a + ox;
      x2 = x2a - ox;
    } else {
      x1 = x1a - ox;
      x2 = x2a + ox;
    }

    if ((y1a <= y2a && tan > 0) || (y1a > y2a && tan <= 0)) {
      y1 = y1a + oy;
      y2 = y2a - oy;
    } else {
      y1 = y1a - oy;
      y2 = y2a + oy;
    }

    x1 += shiftX;
    x2 += shiftX;
    y1 += shiftY;
    y2 += shiftY;

    var minX = Math.min(x1, x2);
    var minY = Math.min(y1, y2);
    var maxX = Math.max(x1, x2);
    var maxY = Math.max(y1, y2);

    var style = {
      top: minY - margin,
      left: minX - +margin,
      position: 'absolute',
      zIndex: 50
    }

    var classes =  React.addons.classSet({
      'transition': true
    });

    var lineColor = "#e74c3c";
    if (this.props.selected) {
      lineColor = "#00ffff";
    }

    return (
      <svg width={Math.abs(x2-x1)+margin*2} height={Math.abs(y2-y1)+margin*2} style={style} className={classes}>
          
          <Defs dangerouslySetInnerHTML={{__html: '<marker id="Triangle'+this.props.idx+'" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="3" markerHeight="3" orient="auto"><path fill="'+lineColor+'" d="M 0 0 L 10 5 L 0 10 z" /></marker>'}}/>
          <Line x1={x1-minX+margin} y1={y1-minY+margin} x2={x2-minX+margin} y2={y2-minY+margin}
                    fill="#e74c3c" stroke={lineColor}
                    strokeWidth="5"
                    markerEnd={"url(#Triangle"+this.props.idx+")"}
                    onMouseDown={this.onMouseDown}
                    />
      </svg>
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
