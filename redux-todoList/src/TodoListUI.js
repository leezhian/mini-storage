import React from 'react';
// antd 组件
import {Input, Button, List} from 'antd';

// 无状态组件
const TodoListUI = (props) => {
    return (
        <div style={{marginTap: 10, marginLeft: 10}}>
            <div>
                <Input
                    value={props.inputValue}
                    placeholder="todo info"
                    style={{width: 300, marginRight: 10}}
                    onChange={props.handleInputChange}></Input>
                <Button type="primary"
                        onClick={props.handleBtnClick}>提交</Button>
            </div>
            <List
                style={{marginTop: 10, width: 300}}
                bordered
                dataSource={props.list}
                renderItem={(item, index) => (
                    <List.Item onClick={() => {
                        props.handleItemDelete(index)
                    }}>
                        {item}
                    </List.Item>
                )}
            />
        </div>
    );
};

export default TodoListUI;