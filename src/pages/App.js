import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Header, Button } from 'react-native-elements';
import Deck from './Deck';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' }
];

class App extends React.Component {
  state = {
    data: DATA,
    rightCounter: 0,
    leftCounter: 0
  };

  resetDeck() {
    this.setState({ data: [...DATA] });
  }

  updateCounters(direction /*, item */) {
    if (direction === 'right') {
      return this.setState({ rightCounter: this.state.rightCounter + 1 });
    }
    return this.setState({ leftCounter: this.state.leftCounter + 1 });
  }

  renderCard(item) {
    return (
      <Card
        key={item.id}
        image={{ uri: item.uri }}
        containerStyle={{ borderRadius: 10 }}
        imageWrapperStyle={{ borderTopStartRadius: 10, borderTopEndRadius: 10, overflow: 'hidden' }}
      >
        <Text style={styles.text}>{item.text}</Text>
      </Card>
    );
  }

  renderNoMoreCards() {
    return (
      <View style={styles.noMoreCardsContainer}>
        <Text style={[styles.text, styles.noMoreCardsText]}>All Done!</Text>
        <Button onPress={this.resetDeck} title="Again!" titleStyle={styles.text} />
      </View>
    );
  }

  renderCounters() {
    return (
      <View style={styles.countersContainer}>
        <View style={styles.counterView}>
          <Text style={styles.text}>{this.state.leftCounter}</Text>
        </View>
        <View style={styles.counterView}>
          <Text style={styles.text}>{this.state.rightCounter}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header centerComponent={{ text: 'Mendão Swipe Cards', style: [styles.text, { color: '#fff' }] }} />
        <View style={styles.deckView}>
          <Deck
            data={this.state.data}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderNoMoreCards}
            resetDeck={this.resetDeck.bind(this)}
            onSwipeRight={this.updateCounters.bind(this, 'right')}
            onSwipeLeft={this.updateCounters.bind(this, 'left')}
          />
        </View>
        {this.renderCounters()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  deckView: {
    height: 250,
    zIndex: 1
  },
  countersContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  counterView: {
    width: 80,
    height: 80,
    marginVertical: 10,
    marginHorizontal: 50,
    borderWidth: 8,
    borderRadius: 50,
    borderColor: '#E2E2E2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noMoreCardsContainer: { alignItems: 'center' },
  noMoreCardsText: {
    fontSize: 20,
    margin: 50
  },
  text: {
    fontFamily: 'proxima-soft-bold'
  }
});

export default App;
