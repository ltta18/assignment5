import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

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
    <View style={styles.container}>

    </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
