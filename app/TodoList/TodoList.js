import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

import {loadTodos, removeTodo, toggleTodo} from './_todos.store';
import {setEditMode} from './_editmode.store';
import TodoItem from './TodoItem';
import TodoEdit from './TodoEdit';
import Filter from './Filter';

class TodoList extends Component {

    componentDidMount() {
        this.props.loadTodos();
    }

    _setEditMode(mode, todo) {
        this.props.setEditMode(mode, todo);
        this.refs._scrollView.scrollTo({y: 0, animated: true});
    }

    render() {
        const addIcon = (<Icon name="plus" size={30} color="green"/>);

        return (
            <ScrollView ref='_scrollView'>
                <Filter/>
                <View style={{padding: 20}}>
                    {this.props.editMode.mode === 'none' &&
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => {
                                this._setEditMode('add')
                            }}>
                            {addIcon}
                        </TouchableOpacity>
                    </View>
                    }
                    {this.props.editMode.mode !== 'none' &&
                    <TodoEdit/>
                    }
                    {this.props.todos.map((item, index) =>
                        <TodoItem key={index} item={item}
                                  onEditPress={() => {
                                      this._setEditMode('edit', item)
                                  }}
                                  onRemovePress={() => {
                                      this.props.removeTodo(item.id)
                                  }}
                                  onToggleTodo={() => {
                                      this.props.toggleTodo(item.id)
                                  }}
                        />)
                    }
                    {!this.props.todos.length && this.props.editMode.mode === 'none' &&
                    <Text style={{fontSize: 20, marginTop: 10, textAlign: 'center'}}>
                        Вы можете добавить новую задачу
                    </Text>
                    }
                </View>
            </ScrollView>
        )
    }
}

const mapState = (state) => ({
    todos: state.todos.filter(todo => todo.importance === state.filter || state.filter === ''),
    editMode: state.editMode
});
const mapDispatch = {loadTodos, removeTodo, toggleTodo, setEditMode};
export default connect(mapState, mapDispatch)(TodoList);

const styles = StyleSheet.create({
    addButton: {
        borderWidth: 2,
        borderColor: 'green',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});