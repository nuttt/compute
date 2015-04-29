var TransitionConfigPane = React.createClass({

  stateTypeChange: function() {
    console.log("stateTypeChange");
  },

  render: function() {

    return (
      <form>
        <div class="form-group">
          <label for="state-type">Transition List (Read, Write, Move)</label>
          <TransitionConfigList />
        </div>
      </form>
    );
  },
});