var Nav = React.createClass({
  render: function(){
    return (
      <nav>
        <div className="left">
          {this.props.problemName}
        </div>
        <div className="right">
          <SubmitButton />
        </div>
      </nav>
    );
  }
});