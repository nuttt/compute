var TuringApp = React.createClass({
    displayName: 'TuringApp',

    getInitialState: function () {
        return {
            tool: null,
            states: [],
            transitions: [],
            uniqueElementKey: 0,
            canvasOriginX: 0,
            canvasOriginY: 0,
            movingStateIdx: null,
            addingTransition: null,
            selectElement: null,
            panning: false,
        };
    },

    componentDidMount: function () {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);     
    },

    convertToTuringFormat: function() {
      var states = [];
      var transitions = [];
      
      this.state.states.map(function(state){
        states.push({
          id:   state.key + "",
          type: state.type
        });
      }.bind(states));

      this.state.transitions.map(function(transition){
        for(conf of transition.config) {
          transitions.push({
            from:  transition.from.key + "",
            to:    transition.to.key + "",
            input: conf.input,
            write: conf.write,
            direction: conf.direction 
          });
        }
      }.bind(transitions));

      return {
        turing: {
          states: states,
          transitions: transitions
        }
      };
    },

    handleSubmit: function() {
      console.log(this.convertToTuringFormat());
    },

    changeTool: function(tool) {
      var newTool = tool;
      if (tool === this.state.tool) {
        newTool = null;
      }
      this.setState({tool: newTool});
      this.resetAddTransition();
      this.resetSelectElement();
    },



    handleMouseDown: function(x, y) {
      // console.log("Mouse Down");
      // console.log(x + " " + y);
      if (this.state.tool == 'Add State') {
        this.createNewState(x, y);
      } else if (this.state.tool == 'Pan') {
        this.setState({panning: true});
      }

    },

    handleMouseDownOnElement: function(elementType, idx) {

      console.log(this.state.tool);

      if (this.state.tool == "Move" && elementType == "state") {
        // console.log('moving');
        this.setState({movingStateIdx: idx});

      } else if (this.state.tool == "Delete" && elementType == "state") {
        console.log('delete');
        this.deleteState(idx);
      } else if (this.state.tool == "Delete" && elementType == "transition") {
        console.log('delete');
        this.deleteTransition(idx);
      } else if (this.state.tool == "Add Transition" && elementType == "state") {
        this.addTransition(idx);
      } else if (this.state.tool == "Config") {
        console.log("Configing..");
        this.selectElement(elementType, idx);
      }
      // console.log("click " + elementType + idx);
    },

    handleMouseUp: function() {
      this.setState({
        movingStateIdx: null,
        panning: false
      });
    },

    handleMouseMove: function(e) {
      // console.log(e.movementX + " " + e.movementY);
      // console.log("moving idx:" + this.state.movingStateIdx);
      
      if (this.state.tool == "Move") {
        if (this.state.movingStateIdx === null) {
          // console.log("No element select");
          return ;
        }

        var states = this.state.states.slice();
        var idx = this.state.movingStateIdx;
        states[idx].x += e.movementX;
        states[idx].y += e.movementY;
        this.setState(states);
      } else if (this.state.tool == "Pan" && this.state.panning) {
        this.setState({
          canvasOriginX: this.state.canvasOriginX - e.movementX,
          canvasOriginY: this.state.canvasOriginY - e.movementY
        });
      }
      
      
    },

    resetAddTransition: function() {
      this.setState({addingTransition: null})
    },

    addTransition: function(stateIdx) {
      if (this.state.addingTransition === null) {
        console.log('first step');
        this.setState({addingTransition: this.state.states[stateIdx]});
      } else {
        console.log('second step');
        this.setState({uniqueElementKey: this.state.uniqueElementKey + 1});
        var transitions = this.state.transitions.slice();
        var transition = {
          key: this.state.uniqueElementKey,
          from: this.state.addingTransition,
          to: this.state.states[stateIdx],
          elementType: "transition",
          config: []
        }
        transitions.push(transition);
        console.log(transitions);
        this.setState({transitions: transitions, addingTransition: null});
      }
    },

    createNewState: function(x, y) {
      this.setState({uniqueElementKey: this.state.uniqueElementKey + 1});
      var state = {
        key: this.state.uniqueElementKey,
        x: x,
        y: y,
        type: "state",
        elementType: "state"
      };

      var newStates = this.state.states.slice();
      newStates.push(state);
      // console.log(this.newStates);
      this.setState({states: newStates});
      // console.log(this.state);
    },

    deleteState: function(idx) {

      var delState = this.state.states[idx];

      var newTransitions = [];

      this.state.transitions.map(function(t, idx){
        if(t.from !== delState && t.to !== delState) {
          newTransitions.push(t);
        }
      });

      this.setState({transitions: newTransitions});

      var newStates = this.state.states.slice();
      newStates.splice(idx, 1);

      // this.setState({states: newStates, transitions: newTransitions});
      this.setState({states: newStates});


    },

    deleteTransition: function(idx) {

      var newTransitions = this.state.transitions.slice();
      newTransitions.splice(idx, 1);

      this.setState({transitions: newTransitions});
    },

    selectElement: function(elementType, idx) {
      console.log("select " + elementType + "@" + idx);
      if (elementType == "state") {
        this.setState({selectElement: this.state.states[idx]});
      } else if (elementType == "transition") {
        this.setState({selectElement: this.state.transitions[idx]});
      }

      console.log(this.state.selectElement);
    },

    resetSelectElement: function() {
      this.setState({selectElement: null});
    },

    handleUpdateConfig: function(conf){
      console.log(">> config change");
      console.log(conf);
      var newSelectedElement = this.state.selectElement;
      $.extend(newSelectedElement, conf);
      this.setState({selectElement: newSelectedElement});
    },

    render: function() {
      
      var configPane = ""
      if(this.state.tool == "Config") {
        configPane = <ConfigPane
          selectElement={this.state.selectElement}
          onUpdateConfig={this.handleUpdateConfig}
        />;
      }
      return (
          <div id="turing-app">

            <Nav problemId={1} problemName="Palindrome" submit={this.handleSubmit}></Nav>
            <DrawCanvas
              handleMouseDown={this.handleMouseDown}
              handleMouseDownOnElement={this.handleMouseDownOnElement}
              states={this.state.states}
              transitions={this.state.transitions}
              addingTransition={this.state.addingTransition}
              selectElement={this.state.selectElement}
              offsetX={this.state.canvasOriginX}
              offsetY={this.state.canvasOriginY}
            />
            <Toolbar changeTool={this.changeTool} tool={this.state.tool}></Toolbar>
            {configPane}
          </div>
      );
    },
    
});