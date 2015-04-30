var Nav = React.createClass({

  render: function(){
    return (
      <nav>
        <div className="left">
          <ProblemSelector problemId={this.props.problemId} changeProblem={this.props.changeProblem}/>
        </div>
        <div className="right">
          <SubmitButton submit={this.props.submit}/>
        </div>
      </nav>
    );
  }
});