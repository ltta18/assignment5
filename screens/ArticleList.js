import React, { 
  useState, 
  useEffect, 
  useMemo 
} from 'react';
import { styles as styles } from '../styles/styles';
import {  
  Text, 
  View, 
  ActivityIndicator, 
  SafeAreaView, 
  FlatList,
  Linking 
} from 'react-native';
import moment from 'moment';
import { 
  Card, 
  Button, 
  Icon 
} from 'react-native-elements';

export default function ArticleList() {
  const [loading, setLoading] = useState(true);
  const [hasErrored, setHasApiError] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false);
  const [articles, setArticles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const publishers = new Set()

  const filterForUniqueArticles = arr => {
    const cleaned = [];
    arr.forEach(itm => {
      let unique = true;
      cleaned.forEach(itm2 => {
        const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
        if (isEqual) unique = false;
      });
      if (unique) cleaned.push(itm);
    });
    return cleaned;
  };

  const getNews = async () => {
    if (lastPageReached) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page=${pageNumber}`
      );
      const jsonData = await response.json();
      const hasMoreArticles = jsonData.articles.length > 0;
      if (hasMoreArticles) {
        const newArticleList = filterForUniqueArticles(
          articles.concat(jsonData.articles)
        );
        setArticles(newArticleList);
        setPageNumber(pageNumber + 1);
      } else {
        setLastPageReached(true);
      }

      for (let i; i<jsonData.length; i++) {
        publishers.add(jsonData[i].source.name)
      }

    } catch (error) {
      setHasApiError(true);
    }

    setLoading(false);
  };

  const handlePress = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    });
  };

  useEffect(() => {
    getNews()
  }, [articles])

  const renderArticleItem = ({ item }) => {
    return (
      <Card 
        wrapperStyle={styles.cardContainer} 
        title={item.title} 
        image={{ uri: item.urlToImage }}
      >
        <View style={styles.row}>
          <Text style={styles.label}>Source</Text>
          <Text style={styles.info}>{item.source.name}</Text>
        </View>
        <Text style={styles.content}>{item.content}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Published</Text>
          <Text style={styles.info}>
            {moment(item.publishedAt).format('LLL')}
          </Text>
        </View>
        <Button 
          containerStyle={styles.button}
          icon={<Icon />} 
          title="Read more" 
          backgroundColor="#03A9F4"
          onPress={() => handlePress(item.url)}
        />
      </Card>
    );
  };

  const renderArticleList = useMemo(
    () => 
      <FlatList
        data={articles}
        renderItem={renderArticleItem}
        keyExtractor={item => item.title}
        onEndReached={getNews} 
        onEndReachedThreshold={1}
        ListFooterComponent={
          lastPageReached 
          ? <Text>No more articles</Text> 
          : <ActivityIndicator
              size="large"
              loading={loading}
          />
        }
      />
    , [articles]);


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

  if (hasErrored) {
    return (
      <View style={styles.container}>
        <Text>Error =(</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Articles Count:</Text>
          <Text style={styles.info}>{articles.length}</Text>
        </View>
        {renderArticleList}
      </View>
    </SafeAreaView>
  )
  
}

