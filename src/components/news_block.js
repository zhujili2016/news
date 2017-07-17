//文字新闻列表
import React,{PropTypes}  from "react";
import axios from "axios";
import {Card} from "antd";
import {Link} from "react-router";
//用户中心组件
export default class NewsBlock extends React.Component{
    static propTypes ={
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired,
    };
    constructor(props){
        super(props);
        this.state = {
            newsArr:[]
        }
    }
    componentDidMount(){
        const {type,count} = this.props;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response=>{
                const result = response.data;
                this.setState({
                    newsArr:result
                })
            })
    }
    render(){
        const {newsArr} = this.state;
        const newsList = newsArr.length
            ?(
                <ul>
                    {newsArr.map((news,index)=>{
                        const {title,uniquekey} = news;
                        return (
                            <li key={index}>
                                <Link to={`/detail/${uniquekey}`}>
                                    {news.title}
                                </Link>
                                </li>
                        )
                    })}
                </ul>
            )
            :"没有任何新闻";
        return (
            <Card className="topNewsList">
                {newsList}
            </Card>
        )
    }
}
