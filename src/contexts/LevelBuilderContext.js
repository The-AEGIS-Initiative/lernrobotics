import React, { createContext } from "react";

export const LevelBuilderContext = createContext();

// Holds global information for GamePages
// Contains:
// isLoading: loading status of unity webgl client
// setLoading: set loading status of unity webgl client
export class levelBuilderProvider extends React.Component {
  setTaskContent = (content) => {
    if (this.editMode === false) {
      console.log("ERROR: Mutating task content in non-edit mode!");
      return;
    }
    console.log(content);
    this.setState({ taskContent: content });
  };

  setTutorialContent = (content) => {
    if (this.editMode === false) {
      console.log("ERROR: Mutating tutorial content in non-edit mode!");
      return;
    }
    console.log(content);
    this.setState({ tutorialContent: content });
  };

  setDefaultCodeContent = (content) => {
    if (this.editMode === false) {
      console.log("ERROR: Mutating default code in non-edit mode!");
      return;
    }
    console.log(content);
    this.setState({ defaultCodeContent: content });
  };

  state = {
    editMode: false,
    setEditMode: this.setEditMode,
    taskContent: "",
    setTaskContent: this.setTaskContent,
    tutorialContent: "",
    setTutorialContent: this.setTutorialContent,
    defaultCodeContent: "",
    setDefaultCodeContent: this.setDefaultCodeContent,
  };

  render() {
    return (
      <LevelBuilderContext.Provider value={this.state}>
        {this.props.children}
      </LevelBuilderContext.Provider>
    );
  }
}

export const LevelBuilderConsumer = LevelBuilderContext.Consumer;
