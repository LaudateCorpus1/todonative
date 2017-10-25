import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import Swipeable from 'react-native-swipeable';
import Moment from 'moment';
import 'moment/locale/ru';

export default class TodoItem extends Component {
    swipeable = null;
    state = { showFullInfo: false };

    _editPressHandle = () => {
        this.swipeable.recenter();
        this.props.onEditPress();
    }

    _removePressHandle = () => {
        this.swipeable.recenter();
        this.props.onRemovePress();
    }

    _toggleFullMode() {
        this.setState(prevState => ({ showFullInfo: !prevState.showFullInfo }));
    }

    render () {
        Moment.locale('ru');
        const { item, onEditPress, onRemovePress, onToggleTodo } = this.props;
        const mustBeDone = item.shouldBeDoneBy;
        const doneAt = item.doneAt;
        let doneAtFormatted = '';
        let mustBeDoneFormatted = 'не указано';
        if (doneAt) doneAtFormatted = Moment(doneAt).format('D.MM.YYYY H:mm');
        if (mustBeDone) mustBeDoneFormatted = Moment(mustBeDone).format('D.MM.YYYY H:mm');
        const isOverdue = !item.done && mustBeDone && (Moment(mustBeDone) < Moment.now());
        let shortDate = (item.done) ? doneAt : mustBeDone;
        shortDate = (shortDate) ? Moment(shortDate).fromNow() : 'время не указано';

        let importanceText;
        switch(item.importance) {
            case '1': importanceText = 'Обычный'; break;
            case '2': importanceText = 'Важно'; break;
            case '3': importanceText = 'Очень важно'; break;
        }

        const leftContentDone = (
            <View style={styles.leftContent}>
                <SIcon name="check" size={30} color="white" />
            </View>);
        const leftContentUndone = (
            <View style={[ styles.leftContent, styles.leftContentUndone ]}>
                <SIcon name="close" size={30} color="white" />
            </View>);
        const leftContent = (item.done) ? leftContentUndone : leftContentDone;

        const editButton = (
            <View style={styles.hiddenButton}>
                <TouchableOpacity
                    onPress={this._editPressHandle}
                    style={styles.circleButton}>
                    <Icon name="edit" size={30} color="grey" />
                </TouchableOpacity>
            </View>);

        const deleteButton = (
            <View style={styles.hiddenButton}>
                <TouchableOpacity
                    onPress={this._removePressHandle}
                    style={[ styles.circleButton ]}>
                    <Icon name="delete" size={30} color="grey" />
                </TouchableOpacity>
            </View>);

        const rightButtons = [editButton, deleteButton];
        const colorClasses = [
            (isOverdue) ? styles.redText : null,
            (item.done) ? styles.greenText : null
        ];

        return (
            <Swipeable
                style={{ marginTop: 15 }}
                leftContent={leftContent}
                rightButtons={rightButtons}
                rightButtonWidth={55}
                onLeftActionRelease={onToggleTodo}
                leftActionActivationDistance={90}
                onRef={ref => this.swipeable = ref}>
                <TouchableOpacity style={styles.todo} onPress={this._toggleFullMode.bind(this)}>
                    { item.done &&
                        <View style={styles.doneIcon}>
                            <Icon name="check" size={40} color="rgba(24, 163, 54, 0.8)" />
                        </View>
                    }
                    <View style={ styles.todoBody }>
                        <Text style={[ styles.name, ...colorClasses ]}>
                            { item.name }
                        </Text>
                        { this.state.showFullInfo &&
                            <View>
                                <Text style={colorClasses}>{ item.description || 'Нет описания' }</Text>
                                <Text style={colorClasses}>Запланировано: { mustBeDoneFormatted }</Text>
                                { doneAt && <Text style={colorClasses}>Выполнено: { doneAtFormatted }</Text> }
                                <Text style={colorClasses}>Приоритет: { importanceText }</Text>
                            </View>
                        }
                        { !this.state.showFullInfo &&
                            <Text style={colorClasses}>{ importanceText}, { shortDate }</Text>
                        }
                    </View>
                </TouchableOpacity>
            </Swipeable>
        );
    }

}

const styles = StyleSheet.create({
    todo: {
        borderColor: '#c3cfe2',
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    todoBody: {
        justifyContent: 'space-between',
        width: 0,
        flexGrow: 1
    },
    name : {
        fontSize: 20,
        lineHeight: 24,
        marginBottom: 5
    },
    circleButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey'
    },
    hiddenButton: {
        flex: 1,
        borderColor: '#c3cfe2',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    redText: {
        color: 'rgba(220, 20, 20, 0.8)'
    },
    greenText: {
        color: 'rgba(24, 163, 54, 0.8)'
    },
    leftContent: {
        backgroundColor: 'rgba(24, 163, 54, 0.8)',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
        borderRadius: 5,
        marginRight: 10
    },
    leftContentUndone: {
        backgroundColor: 'rgba(210, 219, 212, 0.8)'
    },
    doneIcon: {
        justifyContent: 'center',
        marginRight: 7
    }
})