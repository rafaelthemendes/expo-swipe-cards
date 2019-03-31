import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Header } from 'react-native-elements';
import Deck from './Deck';

const DATA = [
  { id: 1, text: 'Mila, 32  ', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' }
];

class App extends React.Component {
  renderCard(item) {
    return (
      <Card
        key={item.id}
        image={{ uri: item.uri }}
        containerStyle={{ borderRadius: 10 }}
        imageWrapperStyle={{ borderTopStartRadius: 10, borderTopEndRadius: 10 }}
      >
        <Text style={{ fontFamily: 'gotham-rounded', fontWeight: '900' }}>{item.text}</Text>
      </Card>
    );
  }

  renderNoMoreCards() {
    return (
      <Card title="All Done!">
        <Text style={{ marginBottom: 10 }}>There's no more content here!</Text>
      </Card>
    );
  }

  render() {
    return (
      <View>
        <Header centerComponent={{ text: 'Swipe Card', style: { color: '#fff' } }} />
        <View style={styles.container}>
          <Deck data={DATA} renderCard={this.renderCard} renderNoMoreCards={this.renderNoMoreCards} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default App;
