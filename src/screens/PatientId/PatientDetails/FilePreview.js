/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {Icon} from 'react-native-elements';
import Pdf from 'react-native-pdf';
import { show } from '../../../utils/toast';

const getExtention = filename => {
  // To get the file extension
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};
const downloadImage = uri => {
  let image_URL =
    'https://media.istockphoto.com/id/1337232523/photo/high-angle-view-of-a-lake-and-forest.jpg';
    
  let ext = getExtention(image_URL);
  let date = new Date();
  ext = '.' + ext[0];
  console.log(ext);
  // Get config and fs from RNFetchBlob
  // config: To pass the downloading related options
  // fs: Directory path where we want our image to download
  // console.log(ext);
  const {config, fs} = RNFetchBlob;
  let PictureDir = fs.dirs.PictureDir;
  RNFetchBlob.config({
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mime: `application/${ext}`,
      description: 'File downloaded by download manager.',
      path:
        PictureDir +
        '/image_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
      overwrite: true,
      fileCache: true,
    },
  })
    .fetch(
      'GET',
      'https://media.istockphoto.com/id/1337232523/photo/high-angle-view-of-a-lake-and-forest.jpg?s=2048x2048&w=is&k=20&c=HUkCp1sJPh7ymFrdJD3iTuSr_Aas-TEnphd5cdhs58M=',
    )
    .then(res => {
      // Showing alert after successful downloading
      console.log('res -> ', res.data);
      show('Image Downloaded Successfully.', "success");
    })
    .catch(err => {
      console.log(err);
    });
};

const checkPermission = async uri => {
  // Function to check the platform
  // If iOS then start downloading
  // If Android then ask for permission

  if (Platform.OS === 'ios') {
    downloadImage(uri);
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download Photos',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Once user grant the permission start downloading
        console.log('Storage Permission Granted.');
        downloadImage(uri);
      } else {
        // If permission denied then show alert
        show('Storage Permission Not Granted', "warning");
      }
    } catch (err) {
      // To handle permission related exception
      console.warn(err);
    }
  }
};

const FilePreview = ({navigation, route}) => {
  let ext = getExtention(route?.params);
  ext = '.' + ext[0];

  return (
    <View style={{flex: 1}}>
      {ext == '.pdf' || true ? (
        <View style={{flex: 1}}>
          <View
            style={{
              height: 50,
              width: '100%',
              flexDirection: 'row',
              position: 'absolute',
              zIndex: 9999,
              // backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flexDirection: 'row'}}>
              <Icon name="arrow-back" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => checkPermission(route?.params)}
              style={{flexDirection: 'row'}}>
              <Icon name="cloud-download" size={30} />
            </TouchableOpacity>
          </View>
          <Pdf
            // source={{
            //   uri: route?.params,
            // }}
            trustAllCerts={false}
            source={{
              uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', catch: true
            }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
          />
        </View>
      ) : (
        <ImageBackground
          source={{uri: route?.params}}
          style={{...StyleSheet.absoluteFill}}>
          <View
            style={{
              height: 50,
              width: '100%',
              flexDirection: 'row',
              position: 'absolute',
              zIndex: 9999,
              // backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flexDirection: 'row'}}>
              <Icon name="arrow-back" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => checkPermission(route?.params)}
              style={{flexDirection: 'row'}}>
              <Icon name="cloud-download" size={30} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

export default FilePreview;

const styles = StyleSheet.create({});
