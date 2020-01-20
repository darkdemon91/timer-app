import React, { Component } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    SafeAreaView
} from 'react-native';

class ListComponent extends Component {
    render() {
        const {scroll, itemStyle} = styles;
        let padToTwo = (number) => (number <= 9 ? `0${number}`: number);
        return (
            <SafeAreaView style={{flex: 1}}>
                <FlatList
                    style={scroll}
                    data={this.props.lapArr}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) =>
                        <Text
                            key={index}
                            style={itemStyle}
                        >
                            {`${index}   ${padToTwo(item.min)}:${padToTwo(item.sec)}:${padToTwo(item.ms)}`}
                        </Text>
                    }
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: "#fff",
    },
    itemStyle: {
        padding: 10,
        fontSize: 22,
        height: 44,
        color: "#5C415D",
        textAlign: "center",
        backgroundColor: "#fff",
        marginBottom: 1
    }
});

export default ListComponent;
