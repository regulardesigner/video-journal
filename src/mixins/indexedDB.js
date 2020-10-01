export const indexedDB = {
  // see exemple here:
  // https://www.raymondcamden.com/2019/10/16/using-indexeddb-with-vuejs

  data() {
    return{
      db_name: 'videojournal',
      db_version: 1
    }
  },

  methods: {
    async getIndexedDB() {
      return new Promise((resolve, reject) => {
    
      let request = window.indexedDB.open(this.db_name, this.db_version);
      
      request.onerror = e => {
        console.log('Error Opening the indexed Database', e);
        reject('Error');
      };
    
      request.onsuccess = e => {
        resolve(e.target.result);
      };
      
      request.onupgradeneeded = e => {
        console.log('On Upgrade Needed');
        let db = e.target.result;
        let objectStore = db.createObjectStore("videos", { autoIncrement: true, keyPath:'id' });
      };
      });
    },

    async getVideosFromDb() {
      return new Promise((resolve, reject) => {
    
        let trans = this.db.transaction(['videos'],'readonly');
        
        trans.oncomplete = e => {
          resolve(videos);
        };
        
        let store = trans.objectStore('videos');
        let videos = [];
        
        store.openCursor().onsuccess = e => {
          let cursor = e.target.result;
          
          if (cursor) {
            videos.push(cursor.value)
            cursor.continue();
          }
        };
    
      });
    },

    async addVideo(video_name, blobFile) {
      this.addDisabled = true;
      // random 'video' data for now
      let video = {
        name: video_name,
        blob: blobFile
      };

      console.log('about to add '+JSON.stringify(video));
      
      await this.addVideoToDb(video);
      
      this.savedVideos = await this.getVideosFromDb();
      this.addDisabled = false;      
    },
    
    async addVideoToDb(video) {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction(['videos'],'readwrite');
        
        trans.oncomplete = e => {
          resolve();
        };
        
        let store = trans.objectStore('videos');
        
        store.add(video);
      });
    },

    async deleteVideo(id) {
      console.log('console')
      await this.deleteVideoFromDb(id);
      this.savedVideos = await this.getVideosFromDb();      
    },

    async deleteVideoFromDb(id) {
      return new Promise((resolve, reject) => {
      let trans = this.db.transaction(['videos'],'readwrite');
      trans.oncomplete = e => {
        resolve();
      };
    
      let store = trans.objectStore('videos');
      store.delete(id);
      });
    },
  }
}