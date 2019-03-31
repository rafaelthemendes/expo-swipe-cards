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
        imageWrapperStyle={{ borderTopStartRadius: 10, borderTopEndRadius: 10 }}
      >
        <Text style={{ fontFamily: 'proxima-soft-bold' }}>{item.text}</Text>
      </Card>
    );
  }

  renderNoMoreCards() {
    return (
      <View style={{ alignItems: 'center', marginBottom: -200 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'proxima-soft-bold',
            margin: 50
          }}
        >
          All Done!
        </Text>
        <Button onPress={this.resetDeck} title="Reset" titleStyle={{ fontFamily: 'proxima-soft-bold' }} />
      </View>
    );
  }

  renderCounters() {
    return (
      <View style={styles.countersContainer}>
        <View style={styles.counterView}>
          <Text style={styles.counterViewText}>{this.state.leftCounter}</Text>
        </View>
        <View style={styles.counterView}>
          <Text style={styles.counterViewText}>{this.state.rightCounter}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header centerComponent={{ text: 'Swipe Card', style: { color: '#fff' } }} />
        <Deck
          data={this.state.data}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          resetDeck={this.resetDeck.bind(this)}
          onSwipeRight={this.updateCounters.bind(this, 'right')}
          onSwipeLeft={this.updateCounters.bind(this, 'left')}
        />
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
  countersContainer: {
    marginTop: 200,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  counterView: {
    width: 80,
    height: 80,
    margin: 50,
    borderWidth: 8,
    borderRadius: 50,
    borderColor: '#E2E2E2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  counterViewText: {
    fontFamily: 'proxima-soft-bold'
  }
});

export default App;
