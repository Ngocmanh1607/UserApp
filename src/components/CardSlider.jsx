import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';

const CardSlider = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.card}>
          <View>
            <Image
              source={require('../assets/Images/pizza1.jpg')}
              style={styles.cardimage}
            />
          </View>

          <View style={styles.cardin1}>
            <Text style={styles.cardin1txt}>Pizza</Text>

            <View style={styles.cardin2}>
              <Text style={styles.cardin2txt1}>Fast food</Text>
              <Text style={styles.cardin2txt1}>Price 100$</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View>
            <Image
              source={require('../assets/Images/pizza2.jpg')}
              style={styles.cardimage}
            />
          </View>

          <View style={styles.cardin1}>
            <Text style={styles.cardin1txt}>Pizza</Text>

            <View style={styles.cardin2}>
              <Text style={styles.cardin2txt1}>Fast food</Text>
              <Text style={styles.cardin2txt1}>Price 100$</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View>
            <Image
              source={require('../assets/Images/pizza3.jpg')}
              style={styles.cardimage}
            />
          </View>

          <View style={styles.cardin1}>
            <Text style={styles.cardin1txt}>Pizza</Text>

            <View style={styles.cardin2}>
              <Text style={styles.cardin2txt1}>Fast food</Text>
              <Text style={styles.cardin2txt1}>Price 100$</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View>
            <Image
              source={require('../assets/Images/pizza4.jpg')}
              style={styles.cardimage}
            />
          </View>

          <View style={styles.cardin1}>
            <Text style={styles.cardin1txt}>Pizza</Text>

            <View style={styles.cardin2}>
              <Text style={styles.cardin2txt1}>Fast food</Text>
              <Text style={styles.cardin2txt1}>Price 100$</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default CardSlider;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
  },
  cardhead: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardimage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  card: {
    width: 280,
    height: 180,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardin1: {
    padding: 10,
  },
  cardin1txt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  cardin2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardin2txt1: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
