import React from "react";
import {Link} from "react-router";

 //包含各种新闻列表容器组件

export default class NewsContainer extends React.Component{
    render(){
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/detail/1">新闻1111</Link>
                    </li>
                    <li>
                        <Link to="/detail/2">新闻2222</Link>
                    </li>
                    <li>
                        <Link to="/usercenter">个人中心</Link>
                    </li>
                </ul>

            </div>
        )
    }
}