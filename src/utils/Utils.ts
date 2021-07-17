class Utils {

  static toThumbImageUrl(item?: any): string {
      return `http://swalk.info/${item.image_path}/${item.image}`;
  }

  static toImageUrl(url?: string): string {
    if (!url) {
      const endpoint = process.env.REACT_APP_API_ENDPOINT;
      return `${endpoint}/images/user.png`;
    }

    if (url.match(/^blob/)) {
      return url;
    }
    else {
      const endpoint = process.env.REACT_APP_API_ENDPOINT;
      return `${endpoint}/${url}`;
    }
  }

}

export default Utils;
