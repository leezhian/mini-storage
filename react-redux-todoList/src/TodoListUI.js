import React from "react";

const TodoList = (props) => {
    const {list, inputValue, changeInputValue, handleClick, handleDelete} = props;

    return (
        <div>
            <div>
                <input type="text" value={inputValue} onChange={changeInputValue}/>
                <button onClick={handleClick}>提交</button>
            </div>
            <ul>
                {list.map((item, index) => {
                    return <li onClick={() => {
                        handleDelete(index)
                    }} key={index}>{item}</li>
                })}
            </ul>
        </div>
    );
};

export default TodoList;