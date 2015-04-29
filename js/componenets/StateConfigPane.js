var StateConfigPane = React.createClass({

  stateTypeChange: function() {
    console.log("stateTypeChange");
  },

  render: function() {

    return (
      <form>
        <div class="form-group">
          <label for="state-type">State Type</label>
          <select className="form-control" value="state" onChange={this.stateTypeChange}>
            <option value="state">Normal State</option>
            <option value="start">Start State</option>
            <option value="accept">Halt Accept</option>
            <option value="reject">Halt Reject</option>
          </select>
        </div>
      </form>
    );
  },
});