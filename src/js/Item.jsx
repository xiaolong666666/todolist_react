import React, { Component } from 'react';

class Item extends Component {
    constructor(){
        super();
        this.state = {
            inEdit: false,
            flag: true
        }
        this.handdle = this.handdle.bind(this);
    }
    
    handdle(){
        this.setState(
            { inEdit: true },
            ()=>{
                let { todo } = this.props;
                this.refs.myInput.value = todo.value;
                this.refs.myInput.focus();
            }
        );
    }

    render() {
        let { todo, deleteTodo, changeHasCompleted, editTodo } = this.props;
        let { inEdit, flag } = this.state;
        let completed = todo.hasCompleted ? "completed" : "";
        let className = inEdit ? completed+" editing" : completed;
        return (
            <li className={className}>
                <div className="view">
                    <input type="checkbox" className="toggle" onChange={()=>{changeHasCompleted(todo)}} checked={todo.hasCompleted}/>
                    <label onDoubleClick={this.handdle}>{todo.value}</label>
                    <button className="destroy" onClick={()=>{deleteTodo(todo)}}></button>
                </div>
                <input type="text" className="edit" ref="myInput"
                    onBlur={()=>{
                        if(flag){
                            todo.value = this.refs.myInput.value.trim();
                            editTodo(todo);
                            this.setState({ inEdit: false });
                        }
                    }}
                    onKeyUp={(e)=>{
                        if(e.keyCode!==13 && e.keyCode!==27) return false;
                        if(e.keyCode===13){
                            todo.value = this.refs.myInput.value.trim();
                            editTodo(todo);
                            this.setState({ inEdit: false });
                        }
                        if(e.keyCode===27){
                            this.setState({ inEdit: false, flag: false });
                            setTimeout(()=>{
                                this.setState({ flag: true });
                            },10);
                        }
                    }}
                />
            </li>
        );
    }
}

export default Item;