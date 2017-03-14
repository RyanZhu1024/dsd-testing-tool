import React, {Component} from "react";
import Header from "./header.js";
import Article from "./article.js";

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
