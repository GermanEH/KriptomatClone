import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { FlatList } from 'react-native';
import axios from 'axios'
import { useEffect, useState } from 'react';

const Coin = ({name}) => (
  <View>
    <Text style={styles.coins}>{name}</Text>
  </View>
)

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  interface Coin {
    id:string;
    name:string;
    symbol:string;
  }

  const [data, setData] = useState<Array<Coin>>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get('https://api.coingecko.com/api/v3/coins/list')
        const data = response.data
        setData(data)
      } catch (error: any) {
        return error.message
      }
    }
    fetchData().then((r) => r)
  }, [])

  console.log(data)

  return (
    <View style={styles.container}>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>Kriptomat</Text>
      </View>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.text}>Log in or create an account, and buy your first cryptocurrencies today!</Text>
      <FlatList
      data={data}
      renderItem={({item}) => <Coin name={item.name}/>} 
      keyExtractor={item => item.id} />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  subTitle: {
    fontSize: 20,
  },
  subTitleContainer: {
    margin: 30,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    margin: 10,
  },
  text: {
    margin: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  coins: {
    fontSize: 10,
    // height: 1
  }
});
