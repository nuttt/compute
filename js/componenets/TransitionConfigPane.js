var TransitionConfigPane = React.createClass({

  onUpdateConfig: function(config) {
    this.props.onUpdateConfig({config: config});
  },

  render: function() {

    return (
      <form>
        <div class="form-group">
          <label for="state-type">Transition List (Input, Write, Direction)</label>
          <TransitionConfigList
            selectElement={this.props.selectElement}
            onUpdateConfig={this.onUpdateConfig}
          />
        </div>
      </form>
    );
  },
});