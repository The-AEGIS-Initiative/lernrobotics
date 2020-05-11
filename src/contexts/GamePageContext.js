import React, { createContext } from "react";

export const GamePageContext = createContext();

// Holds global information for GamePages
// Contains:
// isLoading: loading status of unity webgl client
// setLoading: set loading status of unity webgl client
export class GamePageProvider extends React.Component {
  setPort = (port) => {
    this.setState({ port: port });
  };

  setLoading = (isLoading) => {
    this.setState({ isLoading: isLoading });
  };

  setEditorContent = (content) => {
    console.log(content);
    this.setState({ editorContent: content });
  };

  state = {
    isLoading: true,
    setLoading: this.setLoading,
    editorContent: "",
    setEditorContent: this.setEditorContent,
  };

  render() {
    return (
      <GamePageContext.Provider value={this.state}>
        {this.props.children}
      </GamePageContext.Provider>
    );
  }
}

export const GamePageConsumer = GamePageContext.Consumer;
