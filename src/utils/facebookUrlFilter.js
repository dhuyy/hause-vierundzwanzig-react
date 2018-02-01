export default function facebookUrlFilter (url) {
  if (url.indexOf('pages') >= 0) {
    return '@'.concat(
      url.replace('http://www.facebook.com/pages/', '')
        .replace(/%20/g, '')
        .split('/')[0]
    );
  } else {
    return '@'.concat(
      url.replace('https://www.facebook.com/', '').replace('/', '')
    );
  }
}
