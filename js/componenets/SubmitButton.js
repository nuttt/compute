var SubmitButton = React.createClass({

  render: function(){
    return (
      <div className="btn btn-primary" onClick={this.props.submit}>Submit</div>
    );
  }
});