//头部组件
import React from "react";
import {Row,Col,Menu,Icon,Button,Modal,Tabs,Form,Input} from "antd";
import {Link} from "react-router";
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
            modalShow:true
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
    handleClose=()=>{
        this.setState({
            modalShow:false
        })
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
                    <Button type="default">退出</Button>
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
                                        <Form>
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
                                                        <Input type="text" placeholder="请输入密码"/>
                                                    )
                                                }
                                            </FormItem>
                                            <Button type="primary" >登录</Button>
                                        </Form>
                                    </TabPane>
                                    <TabPane tab="注册" key="2">
                                        <Form>
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
                                                        <Input type="text" placeholder="请输入密码"/>
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem label="确认密码">
                                                {
                                                    getFieldDecorator("r_confirm_password")(
                                                        <Input type="text" placeholder="请再次输入您的密码"/>
                                                    )
                                                }
                                            </FormItem>
                                            <Button type="primary" >注册</Button>
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
