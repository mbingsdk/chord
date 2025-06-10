import axios from 'axios';
// import URLSearchParams from 'url';

class ChordFetcher {
    constructor() {
        this.url = "http://sergcat.xssemble.com/service-v2.php";
        this.headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 12; 22111317PG Build/SKQ1.220303.001)",
            "Host": "sergcat.xssemble.com",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "Content-Length": "0"
        };
        this.baseParams = {
            cc: "101",
            ci: "5",
            pc: "2044",
            lc: "en",
            vc: "9199"
        };
    }

    async fetchChordData(mode, query) {
        try {
          const response = await axios.post('https://hjmb.my.id/mbe/chord.php', new URLSearchParams({
            mode: mode,
            query: query
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });

          console.log('Daftar Lagu:', response.data);
          return response.data;
        } catch (err) {
          console.error('Gagal fetch list:', err.message);
        }
        // const params = new URLSearchParams({
        //     ...this.baseParams,
        //     a: query,
        //     name: mode === 'getList' ? 's' : 'i'
        // });

        // try {
        //     const response = await axios.post(this.url, null, {
        //         headers: this.headers,
        //         params: params
        //     });
        //     return response.data;
        // } catch (error) {
        //     throw new Error(`Gagal mengambil data: ${error.message}`);
        // }
    }

    cleanHTML(html) {
        return html
            .replace(/<sup>/g, '[[SUP]]')  // Tempatkan marker khusus untuk <sup>
            .replace(/<\/sup>/g, '[[/SUP]]') // Marker untuk </sup>
            .replace(/<[^>]*>/g, '')       // Hapus semua tag HTML lainnya
            .replace(/\n+/g, '\n')          // Hapus baris kosong berlebihan
            .trim();
    }

    processLine(line) {
        let chordLine = '';
        let lyricLine = '';
        let isChord = false;
        
        const parts = line.split(/(\[\[SUP]]|\[\[\/SUP]])/);
        
        parts.forEach(part => {
            if (part === '[[SUP]]') {
                isChord = true;
                return;
            }
            if (part === '[[/SUP]]') {
                isChord = false;
                return;
            }
            
            if (isChord) {
                chordLine += part;
                // lyricLine += ' '.repeat(part.length);
            } else {
                lyricLine += part;
                chordLine += ' '.repeat(part.length);
            }
        });
        
        return [chordLine, lyricLine];
    }

    formatChord(html) {
        const cleaned = this.cleanHTML(html);
        const lines = cleaned.split('\n');
        let output = [];
        
        lines.forEach(line => {
            const [chord, lyric] = this.processLine(line);
            if (chord.trim()) output.push(chord);
            output.push(lyric);
        });
        
        return output.join('\n');
    }

    async getSongList(query) {
        const data = await this.fetchChordData('getList', query);
        return data.reduce((acc, [id, artist, title]) => {
            acc[title] = { id, artist };
            return acc;
        }, {});
    }

    async getChordDetail(songId) {
        const [data] = await this.fetchChordData('getChord', songId);
        if (!data) return null;

        return {
            artist: data[0],
            title: data[1],
            chord: this.formatChord(data[2])
        };
    }
}

export default ChordFetcher;