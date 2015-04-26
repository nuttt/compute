var ToolbarButton = React.createClass({
  render: function() {
    classes = React.addons.classSet({
      'btn': true,
      'btn-default': !this.props.active,
      'btn-primary': this.props.active
    });
    return(
      <button className={classes} onClick={this.onClick}>{this.props.children.toString()}</button>
    );
  },

  onClick: function() {
    this.props.onClick(this.props.children.toString());
  }
});