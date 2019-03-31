import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions, StyleSheet, UIManager, LayoutAnimation } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.1;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  };

  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else {
          this.resetPosition();
        }
      }
    });
    this.state = { index: 0 };
  }

  componentWillUpdate() {
    // Android only
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring(); // Animate any layout changes
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(this.onSwipeComplete.bind(this, direction));
  }

  onSwipeComplete(direction) {
    const { data, onSwipeLeft, onSwipeRight } = this.props;
    const item = data[this.state.index];
    direction === 'left' ? onSwipeLeft(item) : onSwipeRight(item);

    this.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...this.position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCard() {
    const { data } = this.props;
    const { index } = this.state;

    if (index >= data.length) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data
      .map((item, itemIndex) => {
        if (itemIndex < index) return null;
        if (itemIndex === index) {
          return (
            <Animated.View key={item.id} style={[this.getCardStyle(), styles.card]} {...this.panResponder.panHandlers}>
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }
        const backgroundCardStyle = {
          top: 5 * (itemIndex - index),
          width: SCREEN_WIDTH - 10 * (itemIndex - index),
          left: 5 * (itemIndex - index)
        };
        return (
          <Animated.View key={item.id} style={[styles.card, backgroundCardStyle]}>
            {this.props.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  }

  render() {
    return <View>{this.renderCard()}</View>;
  }
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
});

export default Deck;
