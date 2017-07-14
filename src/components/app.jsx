import React from "react";

import NewsHeader from "./news_header";
import "../componentsCss/pc.css";

export default class App extends React.Component{
    render(){
        return (
            <div>
                <NewsHeader/>
                {this.props.children}
                <div>footer</div>
            </div>

        )
    }
}