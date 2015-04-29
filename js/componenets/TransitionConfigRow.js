var TransitionConfigRow = React.createClass({

  render: function() {

    var rowstyle = {
      padding: "5px 0px"
    }

    return (
      <div className="row" style={rowstyle}>
        <div className="col-md-3 col-sm-3">
          <input type="text" className="form-control"/>
        </div>
        <div className="col-md-3 col-sm-3">
          <input type="text" className="form-control"/>
        </div>
        <div className="col-md-3 col-sm-3">
          <select className="form-control" value="S">
            <option value="S">S</option>
            <option value="L">L</option>
            <option value="R">R</option>
          </select>
        </div>
        <div className="col-md-3 col-sm-3">
          <button className="btn btn-danger">X</button>
        </div>
      </div>
    );
  },
});