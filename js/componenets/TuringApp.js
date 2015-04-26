var TuringApp = React.createClass({
    displayName: 'TuringApp',

    getInitialState: function () {
        return {
            tool: null  
        };
    },

    componentDidMount: function () {
      document.addEventListener('click', this.test);      
    },

    test: function(){
      console.log('body click!');
    },

    changeTool: function(tool) {
      var newTool = tool;
      if (tool === this.state.tool) {
        newTool = null;
      }
      this.setState({tool: newTool});
    },

    render: function() {
        return (
            <div id="turing-app">
              <Nav problemId={1} problemName="Palindrome"></Nav>
              <DrawCanvas></DrawCanvas>
              <Toolbar changeTool={this.changeTool} tool={this.state.tool}></Toolbar>
            </div>
        );
    },
    
});