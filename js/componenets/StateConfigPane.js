var StateConfigPane = React.createClass({

  stateTypeChange: function(e) {
    console.log("stateTypeChange");
    console.log(e.target.value);
    this.props.onUpdateConfig({type: e.target.value});
  },

  render: function() {

    return (
      <form>
        <div class="form-group">
          <label for="state-type">State Type</label>
          <select className="form-control" value={this.props.selectElement.type} onChange={this.stateTypeChange}>
            <option value="state">Normal State</option>
            <option value="start">Start State</option>
            <option value="accepted">Accept</option>
            <option value="rejected">Reject</option>
          </select>
        </div>
      </form>
    );
  },
});