# Notes

* Music is stored in 4 level depth folders, 50 tracks per folder.
* Each track is xxx.mp3 + xxx.json
* format of json is

  ```js
  type = {
    name?: string,    // name of track, if not provided it will be the base name of the url
    author?: string,  // name of author/artist/band
    url?: string,     // url for author's page
    infoUrl?: string, // url for info about the track
  }
  ```
