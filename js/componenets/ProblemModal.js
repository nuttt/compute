var ProblemModal = React.createClass({

  getInitialState: function () {
      return {
          problem: {}  
      };
  },
  updateProblemDescription: function(id) {
    
    $.ajax({
      url: "api/challenges.php",
      dataType: "json",
      method: "get",
      data: {
        id: id
      },
      success: function(problem){
        console.log(problem);
        this.setState({
          problem: problem
        });
      }.bind(this)
    });

  },

  componentWillReceiveProps: function (nextProps) {
    this.updateProblemDescription(nextProps.id);
  },

  render: function(){

    return (
      <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">{this.state.problem.id}. {this.state.problem.title}</h4>
            </div>
            <div className="modal-body">
              {this.state.problem.detail}
            </div>
          </div>
        </div>
      </div>
    );
  }
});