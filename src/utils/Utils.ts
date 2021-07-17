class Utils {

  static toThumbImageUrl(item?: any): string {
      return `http://swalk.info/${item.image_path}/${item.image}`;
  }

  static getMovieType(content: string): string {
      if (content.indexOf('youtube') !== -1) {
        return "youtube"
      }
      if (content.indexOf('fc2') !== -1) {
        return "fc2"
      }
      if (content.indexOf('nico') !== -1) {
        return "nico"
      }
      return "mp4"
  }

  static getMovieTypeClass(content: string): string {
      var type = Utils.getMovieType(content)
      return `label label-${type} site_label`
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
