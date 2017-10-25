import React, { Component } from 'react';
import { View, TextVeiw, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { setFilter } from './_filter.store';

class TodoFilter extends Component {

    _setFilter(filter) {
        this.props.setFilter(filter);
    }

    render() {
        const filter = this.props.filter;
        return (
            <View style={ styles.filter }>
                <FilterButton text="Все"
                    setFilter={() => { this._setFilter('') }} active={filter === ''} />
                <FilterButton text="Обычные"
                    setFilter={() => { this._setFilter('1') }} active={filter === '1'}  />
                <FilterButton text="Важные"
                    setFilter={() => { this._setFilter('2') }} active={filter === '2'}  />
                <FilterButton text="Очень важные"
                    setFilter={() => { this._setFilter('3') }} active={filter === '3'}  />
            </View>
        );
    }
}

const mapState = ({ filter }) => ({ filter });
const mapDispatch = { setFilter };
export default connect(mapState, mapDispatch)(TodoFilter);

const FilterButton = ({ setFilter, text, active }) => (
    <TouchableOpacity
        style={[ styles.button, (active) ? styles.active : null ]}
        onPress={ setFilter }>
        <Text>{ text }</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    filter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'rgba(162, 181, 214, 0.7)',
    },
    button: {
        flexGrow: 1,
        padding: 15,
        backgroundColor: 'rgba(209, 226, 255, 0.5)',
        alignItems: 'center'
    },
    active: {
        backgroundColor: 'rgba(104, 144, 214, 0.7)'
    }
});