var TransitionConfigList = React.createClass({

  render: function() {

    return (
      <div className="container-fluid">
        <TransitionConfigRow />
        <TransitionConfigRow />
        <div className="row">
          <button className="btn btn-primary">
            Add
          </button>
        </div>
      </div>
    );
  },
});