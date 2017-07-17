//图片新闻列表组件
import React, {Component,PropTypes} from 'react';
import axios from "axios";
import {Card} from "antd";
import {Link} from "react-router";

export default class NewsImageBlock extends Component {
    static propTypes = {
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired,
        cardWidth:PropTypes.string.isRequired,
        imageWidth:PropTypes.string.isRequired,
        cardTitle:PropTypes.string.isRequired,
    };
    constructor(props){
        super(props);
        this.state = {
            newsArr:[]
        }
    }
    componentDidMount(){
        const {type, count} = this.props;
        const url =  `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response => {
                const result = response.data;
                // 更新状态
                this.setState({
                    newsArr: result
                })
            })
    }
    render () {
        const {cardTitle,cardWidth,imageWidth} = this.props;
        const {newsArr} = this.state;
        const imageStyles = {
            width: imageWidth,
            height: "90px",
            display: "block"
        };
        const titleStyles = {
            width: imageWidth,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        };
        const newsList = newsArr.length ===0
            ?"没有任何新闻"
            :newsArr.map((news,index)=>{
            const {uniquekey,thumbnail_pic_s,title,author_name} = news;
            return(
                <div className="imageblock" key={index}>
                    <Link to={`/detail/${uniquekey}`}>
                        <div>
                            <img src={thumbnail_pic_s} style={imageStyles}/>
                        </div>
                        <div className="custom-card">
                            <h3 style={titleStyles}>{title}</h3>
                            <p>{author_name}</p>
                        </div>
                    </Link>
                </div>
            )
        });
        return (
            <Card title={cardTitle} style={{width:cardWidth}} className="topNewsList">
                {newsList}
            </Card>
        )
    }
}