import React, {Component} from 'react'
import NewsHeader from './news_header'
import NewsFooter from './news_footer'
import '../componentCss/pc.css'

/*
根路由应用组件
 */
export default class App extends Component {
  render () {
    return (
      <div>
        <NewsHeader />
        {this.props.children}
        <NewsFooter />
      </div>
    )
  }
}
<div className="imageblock" key={index}>
    <Link to={`/detail/${uniquekey}`}>
        <div>
            <image src={thumbnail_pic_s} style={imageStyles}/>
        </div>
        <div className="custom-card">
            <h3 style={titleSytles}>{title}</h3>
            <p>{author_name}</p>
        </div>
    </Link>
</div>