import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, FlatList } from 'react-native';
import moment from 'moment';
import { Card, Button, Icon } from 'react-native-elements';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const getNews = async () => {
    const response = await fetch(
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=d05ce933a10240f18baec1e2cb2da323'
    );
    const jsonData = await response.json();
    setArticles(jsonData.articles);
    setLoading(false);
  };

  useEffect(() => {
    getNews()
  }, [])

  const renderArticleItem = ({ item }) => {
    return (
      <Card title={item.title} image={{ uri: item.urlToImage }}>
        <View style={styles.row}>
          <Text style={styles.label}>Source</Text>
          <Text style={styles.info}>{item.source.name}</Text>
        </View>
        <Text style={{ marginBottom: 10 }}>{item.content}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Published</Text>
          <Text style={styles.info}>
            {moment(item.publishedAt).format('LLL')}
          </Text>
        </View>
        <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" />
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator 
          size="large" 
          loading={loading} 
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <FlatList
          data={articles}
          renderItem={renderArticleItem}
          keyExtractor={item => item.title}
        />
      </View>
    </SafeAreaView>
  )
  
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  containerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    height: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: 'grey'
  }
});
