/**
 * All code in this component is from source:
 * https://bam4d.github.io/#/post/blogging-using-react-markdown-and-mathjax/1
 */
import React from "react";
import ReactDOM from "react-dom";
import mj from "markdown-it-mathjax";
var md = require("markdown-it")({
  html: true,
  linkify: true,
});
/**
 * Render markdown content
 */
class MarkdownViewer extends React.Component {
  constructor(props) {
    super(props);
    this.md = md.use(mj());
    this.state = { markdownData: "" };
  }

  setMarkdown = (markdown) => {
    this.setState({ markdownData: markdown });
  };

  renderMathJax = () => {
    const currentNode = ReactDOM.findDOMNode(this);
    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, currentNode]);
  };

  componentDidMount() {
    this.renderMathJax();
  }

  componentDidUpdate(props, state) {
    this.renderMathJax();
  }

  componentWillMount() {
    console.log(this.props.markdownText);
    if (this.props.markdownSrc) {
      fetch(this.props.markdownSrc)
        .then((response) => {
          if (!response.ok) {
            return "# Not Found";
          } else {
            return response.text();
          }
        })
        .then((markdownData) => {
          this.setMarkdown(markdownData);
        });
    } else if (this.props.markdownText) {
      this.setMarkdown(this.props.markdownText);
    }
  }

  render() {
    var markdown = null;
    if (this.props.markdownSrc) {
      markdown = this.md.render(this.state.markdownData);
    } else if (this.props.markdownText) {
      markdown = this.md.render(this.props.markdownText);
    }

    return (
      <div
        style={{
          padding: "15px",
          height: "95vh",
          overflow: "scroll",
          backgroundColor: "#e5ebf2",
          color: "black",
          width: "100%",
        }}
        dangerouslySetInnerHTML={{ __html: markdown }}
      />
    );
  }
}

export default MarkdownViewer;
