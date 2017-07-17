//头部组件
import React from "react";
import {Row,Col,Menu,Icon,Button,Modal,Tabs,Form,Input,message} from "antd";
import {Link} from "react-router";
import axios from "axios";
import logo from "../images/logo.png"



const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class NewsHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:null,
            selectedKey:"shehui",
            modalShow:false
        }
    }
    componentDidMount(){
        const username = localStorage.getItem("username");
        //读取浏览器保存的本地信息
        if(username){
            //更新状态
            this.setState({username})
        }
    }
    handleClickItem=(event)=>{
        this.setState({
            // 更新selectKey
            selectedKey:event.key
        });
        if(event.key==="regist"){
            this.setState({
                modalShow:true
            })
        }
    };
    // 关闭对话框
    handleClose = () =>{
        this.setState({
            modalShow:false
        })
        };
    logout = ()=>{
        //清除localstorage中的数据
        localStorage.removeItem("username");
        //更新状态
        this.setState({username:null})};
    //处理登录或者注册的回调：发送AJA请求
    handleSubmit = (isRegist) =>{
        //alert(isRegist);
        //1.准备带参数的url
       //http://newsapi.gugujiankong.com/Handler.ashx?action=register&r_userName=abc&r_password=123123&r_confirmPassword=123123
       //http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=zxfjd3g&password=123123
        let url = "http://newsapi.gugujiankong.com/Handler.ashx?";
        const action = isRegist ?"register":"login";
        url += `action=${action}`;
        //获取表单中所有的数据的集合对象
        const formData = this.props.form.getFieldsValue();
        if(isRegist){//注册
            const {r_username,r_password,r_confirm_password} = formData;
            url += `&r_userName=${r_username}&r_password=${r_password}&r_confirmPassword=${r_confirm_password}`;
        }else{//登录
            const {username,password} = formData;
            url +=`&username=${username}&password=${password}`
        }
        //2.发送ajax 请求
        axios.get(url)
            .then(response=>{
            const result = response.data;
            //3. 请求结束, 作相应提示
            if(isRegist){//注册
                if(result===true){
                    message.success("注册成功")

                }else{
                    console.log(
                  response.data
                );
                    message.error("注册失败, 重新注册!!")
                }
            }else{//登录
                if(result){
                    message.success("登录成功");
                    //更新username状态
                    let username = result.NickUserName;
                    this.setState({username});
                    //保存用户信息
                    localStorage.setItem("username",username)
                }else{
                    message.error("登录失败")
                }
            }
            });
        //关闭界面
        this.setState({
            modalShow :false
        });
        //清除数据
        this.props.form.resetFields();
    };
    render(){
        const {selectedKey,username,modalShow} = this.state;
        const userInfo = username
        ?(
                <MenuItem key="logout" className="logout">
                    <Button type="primary">{username}</Button>&nbsp;&nbsp;
                    <Link to="/usercenter">
                        <Button type="dashed">个人中心</Button>&nbsp;&nbsp;
                    </Link>
                    <Button type="default" onClick={this.logout}>退出</Button>
                </MenuItem>
            )
        :(
                <MenuItem key="regist" className="regist">
                    <Icon type="appstore-o"/>登录/注册
                </MenuItem>
            );
        const {getFieldDecorator} = this.props.form;
        return (
            <header>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <a href="/" className="logo">
                            <img src={logo} alt=""/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={19}>
                        <div>
                            <Menu mode="horizontal" selectedKeys={[selectedKey]} onClick={this.handleClickItem}>
                                <MenuItem key="top">
                                    <Icon type="appstore-o"/>头条
                                </MenuItem>
                                <MenuItem key="shehui">
                                    <Icon type="appstore-o"/>社会
                                </MenuItem>
                                <MenuItem key="guonei">
                                    <Icon type="appstore-o"/>国内
                                </MenuItem>
                                <MenuItem key="guoji">
                                    <Icon type="appstore-o"/>国际
                                </MenuItem>
                                <MenuItem key="yule">
                                    <Icon type="appstore-o"/>娱乐
                                </MenuItem>
                                <MenuItem key="tiyu">
                                    <Icon type="appstore-o"/>体育
                                </MenuItem>
                                <MenuItem key="keji">
                                    <Icon type="appstore-o"/>科技
                                </MenuItem>
                                <MenuItem key="shishang">
                                    <Icon type="appstore-o"/>时尚
                                </MenuItem>
                                {userInfo}
                            </Menu>
                            <Modal title="用户中心" visible={modalShow}
                            onOk={this.handleClose} onCancel={this.handleClose}
                            okText="关闭">
                                <Tabs  type="card">
                                    <TabPane tab="登录" key="1">
                                        <Form onSubmit={this.handleSubmit.bind(this,false)}>
                                            <FormItem label="用户名">
                                                {
                                                    getFieldDecorator("username")(
                                                        <Input type="text" placeholder="请输入账号"/>
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem label="密码">
                                                {
                                                    getFieldDecorator("password")(
                                                        <Input type="password" placeholder="请输入密码"/>
                                                    )
                                                }
                                            </FormItem>
                                            <Button type="primary" htmlType="submit">登录</Button>
                                        </Form>
                                    </TabPane>
                                    <TabPane tab="注册" key="2">
                                        <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                            <FormItem label="账户">
                                                {
                                                    getFieldDecorator("r_username")(
                                                        <Input type="text" placeholder="请输入账号"/>
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem label="密码">
                                                {
                                                    getFieldDecorator("r_password")(
                                                        <Input type="password" placeholder="请输入密码"/>
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem label="确认密码">
                                                {
                                                    getFieldDecorator("r_confirm_password")(
                                                        <Input type="password" placeholder="请再次输入您的密码"/>
                                                    )
                                                }
                                            </FormItem>
                                            <Button type="primary" htmlType="submit">注册</Button>
                                        </Form>
                                    </TabPane>
                                </Tabs>
                            </Modal>
                        </div>
                    </Col>
                    <Col span={1}></Col>

                </Row>
            </header>
        )
    }
}
// 所有包含<Form>的组件类都需要通过Form来包装一下
/*
 结果:
 this.props.form:
 getFieldDecorator(): 包装<Input>
 */
const FormNewsHeader = Form.create()(NewsHeader);
export default FormNewsHeader;// 向外暴露的必须是包装后的组件
