var TransitionConfigList = React.createClass({

  addConfig: function(){

    var newConfig = this.props.selectElement.config.slice();
    newConfig.push({
      input: "",
      write: "",
      direction: "S"
    });

    this.props.onUpdateConfig(newConfig);

  },

  updateConfig: function(conf, idx) {
    this.props.selectElement.config[idx] = conf;
    this.props.onUpdateConfig(this.props.selectElement.config);
  },

  deleteConfig: function(idx) {
    var newConfig = this.props.selectElement.config;
    newConfig.splice(idx, 1);
    this.props.onUpdateConfig(newConfig);
  },

  render: function() {

    console.log(this.props.selectElement);

    return (
      <div className="container-fluid">
        {this.props.selectElement.config.map(function(conf, idx){
          return (
            <TransitionConfigRow
              selectElement={this.props.selectElement}
              idx={idx}
              onUpdateConfig={this.updateConfig}
              onDeleteConfig={this.deleteConfig}
            />
          );
        }.bind(this))}
        <div className="row">
          <div className="btn btn-primary" onClick={this.addConfig}>
            Add
          </div>
        </div>
      </div>
    );
  },
});