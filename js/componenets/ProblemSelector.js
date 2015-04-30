var ProblemSelector = React.createClass({


  getInitialState: function () {
      return {
          problems: []  
      };
  },
  getProblems: function() {
    $.ajax({
      url: "api/challenges.php",
      dataType: "json",
      method: "get",
      success: function(problems){
        this.setState({
          problems: problems
        });
        this.props.changeProblem(problems[0].id);
      }.bind(this)
    });
  },

  componentDidMount: function () {
    this.getProblems();
  },

  changeProblem: function(e) {
    id = e.target.value;
    this.props.changeProblem(id);
  },

  render: function() {
    return(
      <form className="form-inline">
        <div className="form-group">
          <select className="form-control" value={this.problemId} onChange={this.changeProblem}>
            {this.state.problems.map(function(problem){
              return (
                <option value={problem.id}>{problem.id}. {problem.title}</option>
              );
            })}
          </select>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
            View
          </button>
        </div>
      </form>
    );
  }

});