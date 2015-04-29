var TransitionConfigRow = React.createClass({

  cloneOldConf: function() {
    return $.extend({}, this.props.selectElement.config[this.props.idx]);
  },

  changeInput: function(e){
    var newConf = this.cloneOldConf;
    newConf.input = e.target.value;
    this.props.onUpdateConfig(newConf, this.props.idx);
  },

  changeWrite: function(e){
    var newConf = this.cloneOldConf;
    newConf.write = e.target.value;
    this.props.onUpdateConfig(newConf, this.props.idx);
  },

  changeDirection: function(e) {
    var newConf = this.cloneOldConf;
    newConf.direction = e.target.value;
    this.props.onUpdateConfig(newConf, this.props.idx);
  },

  deleteConfig: function() {
    this.props.onDeleteConfig(this.props.idx);
  },

  render: function() {

    var conf = this.props.selectElement.config[this.props.idx];

    var rowstyle = {
      padding: "5px 0px"
    }

    return (
      <div className="row" style={rowstyle}>
        <div className="col-md-3 col-sm-3">
          <input type="text" className="form-control" value={conf.input} onChange={this.changeInput}/>
        </div>
        <div className="col-md-3 col-sm-3">
          <input type="text" className="form-control" value={conf.write} onChange={this.changeWrite}/>
        </div>
        <div className="col-md-3 col-sm-3">
          <select className="form-control" value={conf.direction} onChange={this.changeDirection}>
            <option value="S">S</option>
            <option value="L">L</option>
            <option value="R">R</option>
          </select>
        </div>
        <div className="col-md-3 col-sm-3">
          <div className="btn btn-danger" onClick={this.deleteConfig}>X</div>
        </div>
      </div>
    );
  },
});