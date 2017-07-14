import React from "react";
//新闻详情组件
export default class NewsDatail extends React.Component{
    render(){
        return (
            <div>新闻详情：uniqueKey为{this.props.params.uniqueKey}</div>
        )
    }
}
