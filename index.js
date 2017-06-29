import React from 'react'

import {
    View,
    ScrollView,
    Animated,
    StyleSheet,
    Text,
    Platform,
    Dimensions,
} from 'react-native'

const { width: WindowWidth } = Dimensions.get('window')

export class CardsSlider extends React.Component {
    static DEFAULT_SPACING = 10
    static DEFAULT_WIDTH = WindowWidth
    static DEFAULT_CARDWIDTH = WindowWidth - 4 * 10
    static commonProps = {
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        pagingEnabled: true,
    }
    lastSelectIdx = 0
    state = {
        leftOffset: new Animated.Value(0),
    }

    constructor(...props) {
        super(...props)

        this.__onPageSelect = this.__onPageSelect.bind(this)
    }

    render() {
        let { children: items, style, spacing: inSpacing, ...others } = this.props
        style = StyleSheet.flatten(style)

        let itemCount = items && items.length || 0
        let spacing = inSpacing || CardsSlider.DEFAULT_SPACING
        this.containerWidth = style && style.width || CardsSlider.DEFAULT_WIDTH
        if (Platform.OS == 'ios') {
            this.containerWidth -= 3 * spacing
        }
        
        let contentView = null
        if (itemCount > 0) {
            if (Platform.OS == 'android') {
                let width = this.containerWidth - 4 * spacing
                contentView = (
                    <ScrollView style={[{width: this.containerWidth}]}
                        {...CardsSlider.commonProps}
                        scrollEventThrottle={50}
                        onMomentumScrollEnd={this.__onPageSelect}
                        onScroll={({nativeEvent: {contentOffset: {x}}}) => {
                            this.state.leftOffset.setValue(x)
                        }} >
                        {items.map((item, idx) => {
                            return (<View key={`belt-${idx}`} style={{width: this.containerWidth}} />)
                        })}

                        {items.map((item, idx) => {
                            let baseOffsetX = 2 * spacing + (width + spacing) * idx
                            return (
                                <Animated.View key={`item-${idx}`} style={{width, position: 'absolute', left: this.state.leftOffset.interpolate({
                                        inputRange: [0, this.containerWidth * itemCount],
                                        outputRange: [baseOffsetX, baseOffsetX + 3 * spacing * itemCount],
                                    }), top: 0, bottom: 0}} >
                                    {item}
                                </Animated.View>
                            )
                        })}
                    </ScrollView>
                )
            } else {
                let width = this.containerWidth - spacing
                contentView = (
                    <ScrollView style={[{marginLeft: spacing, marginRight: 2 * spacing, width: this.containerWidth, overflow: 'visible'}]} 
                        {...CardsSlider.commonProps}
                        onMomentumScrollEnd={this.__onPageSelect} >
                        {items.map((item, idx) => {
                            return (
                                <View key={`item-${idx}`} style={{width, marginLeft: spacing}} >
                                    {item}
                                </View>
                            )
                        })}
                    </ScrollView>
                )
            }
        }

        return (
            <View style={[{overflow: 'hidden', flex: style && style.height ? 0 : 1}, style]} {...others} >
                {contentView}
            </View>
        )
    }

    __onPageSelect({nativeEvent: {contentOffset: {x}}}) {
        let idx = x / this.containerWidth
        if (idx != this.lastSelectIdx) {
            this.lastSelectIdx = idx

            let { onSelectCard } = this.props
            onSelectCard && onSelectCard(idx)
        }
    }
}