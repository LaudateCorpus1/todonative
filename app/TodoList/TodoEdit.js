import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Foundation';
import Moment from 'moment';

import { importanceDegrees } from './config';
import { addTodo, updateTodo } from './_todos.store';
import { setEditMode, updateTime, updateName, updateImportance, updateDesc } from './_editmode.store';

class TodoEdit extends Component {
    state = {
        isDateTimePickerVisible: false
    };

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });  
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    _handleNameChange = (name) => {
      this.props.updateName(name);
    }
  
    _handleDatePicked = (time) => {
      this.props.updateTime(time);
      this._hideDateTimePicker();
    };
  
    _saveTodo = () => {
      const todo = this.props.editMode.currentTodo;
      if (!todo.name) return;
      if (this.props.editMode.mode === 'add')
        this.props.addTodo(todo);
      else this.props.updateTodo(todo);
      this.props.setEditMode('none');
    }
  
    _changeImportance(importance) {
      this.props.updateImportance(importance);
    }

    _setEditMode(mode, todo) {
        this.props.setEditMode(mode, todo);
    }

    render() {
        Moment.locale('ru');
        const doneBy = this.props.editMode.currentTodo.shouldBeDoneBy;
        const currentImportance = this.props.editMode.currentTodo.importance;
        return (
            <View>
                <TextInput
                    value={this.props.editMode.currentTodo.name}
                    style={{ height: 44, fontSize: 20, lineHeight: 24 }}
                    placeholder="Новая задача..."
                    onChangeText={(value) => { this._handleNameChange(value) }}
                />
                <TextInput
                    multiline={true}
                    numberOfLines={3}
                    value={this.props.editMode.currentTodo.description}
                    style={{ fontSize: 14, lineHeight: 16 }}
                    placeholder="Описание..."
                    onChangeText={(value) => { this.props.updateDesc(value) }}
                />
                <Text style={{ marginTop: 10 }}>Приоритет</Text>
                <View style={ styles.importance }>
                    <ImportanceButton text='Обычный'
                        active={ currentImportance === '1' }
                        onPress={() => this._changeImportance('1')} />
                    <ImportanceButton text="Важно"
                        active={ currentImportance === '2' }
                        onPress={() => this._changeImportance('2')} />
                    <ImportanceButton text="Очень важно"
                        active={ currentImportance === '3' }
                        onPress={() => this._changeImportance('3')} />
                </View>
                <View>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonDateTime]}
                        onPress={this._showDateTimePicker}>
                        <Text style={styles.buttonText}>
                            {(doneBy) ? Moment(doneBy).format('D.MM.YYYY H:mm') : 'Выбрать время'}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                        mode="datetime"
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => { this._setEditMode('none') }} style={{ flex: 1 }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Отмена</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._saveTodo} style={{ flex: 1, marginLeft: 10 }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Сохранить</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapState = ({ editMode }) => ({ editMode });
const mapDispatch = { addTodo, updateTodo, updateName, updateTime, updateImportance, updateDesc, setEditMode };
export default connect (mapState, mapDispatch) (TodoEdit);

const ImportanceButton = ({ text, active, onPress }) => (
    <TouchableOpacity
        style={[ styles.importanceButton, (active) ? styles.importanceButtonActive : null]}
        onPress={onPress}>
        <Text style={[styles.importanceButtonText, (!active) ? styles.greyText : null]}>
            { text }
        </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonDateTime: {
        backgroundColor: '#038229',
        opacity: 0.8
    },
    buttonText: {
        padding: 10,
        color: 'white'
    },
    greyText: {
        color: 'grey'
    },
    importance: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    importanceButton: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderColor: 'grey',
        borderWidth: 1
    },
    importanceButtonActive: {
        backgroundColor: 'grey'
    },
    importanceButtonText: {
        padding: 5,
        color: 'white'
    }
})