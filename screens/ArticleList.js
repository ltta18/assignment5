import React, { useMemo } from 'react';
import { articleStyles as styles } from '../styles/styles';
import {  
  Text, 
  View, 
  SafeAreaView,
  ActivityIndicator,
  Linking,
  RefreshControl, 
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { 
  Card, 
  Button, 
  Icon 
} from 'react-native-elements';
import moment from 'moment';

export default function ArticleList({route}) {
  const { length, articles, loading, getNews, lastPageReached, refreshing, onRefresh } = route.params

  const handlePress = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    });
  };

  const renderArticleItem = ({ item }) => {
    if (item === undefined) return
    return (
        <Card 
          wrapperStyle={styles.cardContainer} 
          title={
            item.title === undefined 
            ? '' 
            : item.title} 
          image={{ uri: item.urlToImage }}
        >
          <View style={styles.row}>
            <Text style={styles.label}>Source</Text>
            <Text style={styles.info}>
              {item.source.name === undefined 
              ? '' 
              : item.source.name}
            </Text>
          </View>
          <Text style={styles.content}>
            {item.content === undefined 
            ? '' 
            : item.content}
          </Text>
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
            onPress={() => item.url === undefined ? '' : handlePress(item.url)}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Articles Count:</Text>
          <Text style={styles.info}>{length}</Text>
        </View>
        {renderArticleList}
      </View>
    </SafeAreaView>
  )
  
}

