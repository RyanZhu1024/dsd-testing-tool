import React, {Component} from "react";
import Header from "./commons/header.js";
import Article from "./commons/article.js";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Article />
      </div>
    )
  }
}
