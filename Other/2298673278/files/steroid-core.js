const steroid = {
    // CORE VARIABLES
    url: 'https://steroidapp.ddns.net/api/',
    header: {'Content-Type': 'application/x-www-form-urlencoded'},
    logged_in: false,
    awaiting_verification: false,
    user_id: "",
    session_token: "",
    errors: {
        offline: "Ooops, seems like Steroid's server is offline or under maintenance! We will be back online in a few hours!"
    },
    hello: async () => {
        let response = await fetch('https://steroidapp.ddns.net', {
            method: 'GET',
        }).then(res => {
            res.status == 200 ? response = {success: true} : response = {error: steroid.errors.offline}
        }).catch(response = {error: steroid.errors.offline});
        return response;
    },
    verification: async function(){
        let response;
        steroid.awaiting_verification = true;
        await fetch(steroid.url+"verification", {
            method: "POST",
            headers: steroid.header,
            body: "user_id="+steroid.user_id+"&wallpaper_token="+steroid.session_token,
        }).then(res => {
            switch(res.status){
                case 200:
                    res.json().then(res => {
                        steroid.weather.cache.location = localStorage.getItem("user_location");
                        localStorage.setItem("user_id", steroid.user_id);
                        localStorage.setItem("session_token", steroid.session_token);
                        localStorage.setItem("spotify_refresh_token", res.spotify_token);
                        localStorage.setItem("user_location", res.user_location);
                        localStorage.setItem("weather_api", res.weather_api);
                        localStorage.setItem("user_ip", res.user_ip);
                        if (localStorage.getItem("temperature_convention") == null){
                            localStorage.setItem("temperature_convention", "Metric");
                        } else {
                            steroid.weather.settings.convention = localStorage.getItem("temperature_convention");
                        }
                        if (localStorage.getItem("last_current_weather") == null){
                            localStorage.setItem("last_current_weather", 0);
                            localStorage.setItem("current_weather", null);
                        }
                        if (localStorage.getItem("last_forecast_weather") == null){
                            localStorage.setItem("last_forecast_weather", 0);
                            localStorage.setItem("forecast_weather", null);
                        }
                    });
                    response = {success: true};
                    steroid.logged_in = true;
                    break;
                case 401: 
                    response = {error: "Your username or wallpaper token are incorrect, please check them on your settings.", code: 401}; 
                    break;
                case 429:
                    response = {error: "Too many token refresh attempts, come back in 24 hours.", code: 429}; 
                    break;
            }
        }).catch(response = {error: steroid.errors.offline}).finally(() => {
            steroid.awaiting_verification = false;
            steroid.logged_in = true;
        });
        return response;
    },
    weather: {
        convention: (convention) => {
            if (localStorage.getItem("temperature_convention") !== convention){
                if (convention == "Metric" || convention == "Imperial"){
                    steroid.weather.settings.convention = convention;
                    localStorage.setItem("temperature_convention", convention);
                    return true;
                }
            }
            return false;
        },
        setForecastDays: (days) => {
            steroid.weather.settings.forecast_days = days;
            return true;
        },
        timerReset: () => {
            if (steroid.logged_in){
                localStorage.setItem("last_current_weather", 0);
                localStorage.setItem("last_forecast_weather", 0);
                return true;
            }
            return false;
        },
        cityCode: () => {
            return new Promise(async function (resolve, reject){
                if (localStorage.getItem("city_code") == null){
                    if (localStorage.getItem("user_location") !== null || localStorage.getItem("weather_api") !== null){
                        await fetch("http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + localStorage.getItem("weather_api") + "&q=" + localStorage.getItem("user_location") + "&language=en-US&offset=1", {
                            method: "GET",
                        }).then(res => res.json()).then(data => {
                            localStorage.setItem("city_code", data[0]["Key"]);
                            resolve({success: true});
                        }).catch(error => {resolve({error: "There was an issue processing your location or API, please check them on your Dashboard and try again."})});
                    } else {
                        resolve({error: "Please set your location or API on Steroid's Dashboard."});
                    }
                } else {
                    if (steroid.weather.cache.location !== localStorage.getItem("user_location")){
                        if (localStorage.getItem("user_location") !== null || localStorage.getItem("weather_api") !== null){
                            await fetch("http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + localStorage.getItem("weather_api") + "&q=" + localStorage.getItem("user_location") + "&language=en-US&offset=1", {
                                method: "GET",
                            }).then(res => res.json()).then(data => {
                                localStorage.setItem("city_code", data[0]["Key"]);
                                resolve({success: true});
                            }).catch(error => {resolve({error: "There was an issue processing your location or API, please check them on your Dashboard and try again."})});
                        } else {
                            resolve({error: "Please set your location or API on Steroid's Dashboard."});
                        }
                    } else {
                        resolve({success: true});
                    }
                }
            });
        },
        current: async () => {
            let response;
            if (steroid.logged_in){
                if (steroid.weather.settings.active && steroid.weather.settings.current){
                    response = await steroid.weather.cityCode();
                    if (response.success){
                        response = Date.now() - localStorage.getItem("last_current_weather");
                        if (response > steroid.weather.settings.waitingTime.current){ // One hour
                            await fetch("http://dataservice.accuweather.com/currentconditions/v1/" + localStorage.getItem("city_code") + "?apikey=" + localStorage.getItem("weather_api") + "&language=en-US", {
                                method: "GET",
                                headers: {"Accept-Encoding": "gzip"}
                            }).then(res => res.json()).then(data => {
                                response = data;
                                localStorage.setItem("last_current_weather", Date.now());
                                localStorage.setItem("current_weather", JSON.stringify(response));
                            }).catch(error => {response = {error: "There was an issue processing your location or API, please check them on your Dashboard and try again."}});
                        } else {
                            response = JSON.parse(localStorage.getItem("current_weather"));
                        }
                    }
                } else {
                    response = {error: "You must activate Steroid weather features on your wallpaper settings."};
                }
            } else {
                response = {error: "You must login with Steroid to receive weather details."};
            }
            return response;
        },
        forecast: async () => {
            let response;
            if (steroid.logged_in){
                if (steroid.weather.settings.active && steroid.weather.settings.forecast){
                    response = await steroid.weather.cityCode();
                    if (response.success){
                        response = Date.now() - localStorage.getItem("last_forecast_weather");
                        if (response > steroid.weather.settings.waitingTime.forecast){
                            let conventionType = "";
                            steroid.weather.settings.convention == "Metric" ? conventionType = "&metric=true" : conventionType = "&metric=false";
                            await fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + localStorage.getItem("city_code") + "?apikey=" + localStorage.getItem("weather_api") + "&language=en-US&details=true"+conventionType+"&format=json", {
                                method: "GET",
                                headers: {"Accept-Encoding": "gzip"}
                            }).then(res => res.json()).then(data => {
                                response = data;
                                localStorage.setItem("last_forecast_weather", Date.now());
                                localStorage.setItem("forecast_weather", JSON.stringify(response));
                            }).catch(error => {response = {error: "There was an issue processing your location or API, please check them on your Dashboard and try again."}});
                        } else {
                            response = JSON.parse(localStorage.getItem("forecast_weather"));
                        }
                    }
                } else {
                    response = {error: "You must activate Steroid weather features on your wallpaper settings."};
                }
                
            } else {
                response = {error: "You must login with Steroid to receive weather details."};
            }
            return response;
        },
        icons: {
            1: "day-sunny",
            2: "day-sunny-overcast",
            3: "day-sunny-overcast",
            4: "day-sunny-overcast",
            5: "day-sunny-overcast",
            6: "day-sunny-overcast",
            7: "day-cloudy",
            8: "cloudy",
            11: "fog",
            12: "showers",
            13: "day-showers",
            14: "day-showers",
            15: "thunderstorm",
            16: "day-storm-showers",
            17: "day-storm-showers",
            18: "rain",
            19: "snow-wind",
            20: "day-snow",
            21: "day-snow",
            22: "snow",
            23: "day-snow",
            24: "snowflake-cold",
            25: "sleet",
            26: "rain-mix",
            29: "rain-mix",
            30: "hot",
            31: "snowflake-cold",
            32: "strong-wind",
            33: "night-clear",
            34: "night-alt-cloudy",
            35: "night-alt-cloudy",
            36: "night-alt-cloudy",
            37: "night-alt-cloudy",
            38: "night-alt-cloudy",
            39: "night-showers",
            40: "night-showers",
            41: "night-alt-storm-showers",
            42: "night-alt-storm-showers",
            43: "night-alt-snow-wind",
            44: "night-alt-snow-wind"
        },
        cache: {
            location: null,
            cityCode: null,
            min: 0,
            max: 0,
            unit: "F"
        },
        settings: {
            active: true,
            active_bak: false,
            current: true,
            current_bak: false,
            forecast: true,
            forecast_bak: false,
            forecast_days: 3,
            convention: "Metric",
            waitingTime: {
                current: 3600000, // One hour 
                forecast: 14400000 // Four hours
            }
            /*  
                To calculate the waiting time, you should do this math:
                [(TIME YOU WANT IN HOURS) x (THE WAITING TIME IN MS)] / (THE WAITING TIME IN HOURS)

                Example:
                (30 minutes updates) -> Not recommended tho
                (0.5 x 3600000) / 1 = 1800000
            */
        }
    },
    spotify: {
        clearCache: async () => {
            steroid.spotify.cache.song = {
                name: null,
                album: null,
                artist: null,
                cover: {
                    url: null,
                    base64: null
                },
                duration: {
                    ms: null,
                    time: null
                },
                progress: {
                    ms: null,
                    time: null
                }
            }
        },
        access: async () => {
            if (steroid.logged_in){
                let response;
                await fetch("https://accounts.spotify.com/api/token", {
                    method: "POST",
                    headers: steroid.spotify.headers,
                    body: "grant_type=refresh_token&refresh_token=" + localStorage.getItem("spotify_refresh_token")
                }).then(res => res.json().then(data => {
                    if (data.access_token !== undefined){
                        localStorage.setItem("spotify_access_token", data.access_token);
                        localStorage.setItem("spotify_token_type", data.token_type);
                        localStorage.setItem("spotify_scope", data.scope);
                        response = {success: true};
                    } else {
                        response = {error: "Ooops, something went wrong! Please refresh your Spotify token on Steroid's website."};
                    }
                })).catch(response = {error: "There was an issue connecting to Spotify, please try again in a few minutes."});
                return response;
            } else {
                return {error: "You should activate Steroid first to use Spotify."};
            }
        },
        playback: async () => {
            if (steroid.logged_in && steroid.spotify.settings.active){
                let response;
                await fetch("https://api.spotify.com/v1/me/player/currently-playing?market=us", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization":  localStorage.getItem("spotify_token_type") + " " + localStorage.getItem("spotify_access_token")
                    },
                }).then(async res => {
                    try {
                        response = await res.json();
                    } catch {
                        response = res;
                        if (response.status == 204){
                            response = {stopped: true};
                        } else {
                            response = {error: "There is an issue with your Spotify account, please sync with Steroid again."};
                        }
                        return;
                    };
                    if (response.error == undefined){
                        if (response.is_playing && steroid.spotify.settings.active){
                            steroid.spotify.cache.is_playing = true;
                            if (steroid.spotify.cache.song.name != response.item.name){ // If the name of the song changed
                                steroid.spotify.cache.song.name = response.item.name; // Store new name
                                steroid.spotify.cache.song.album = response.item.album.name; // Store new album
                                steroid.spotify.cache.song.artist = response.item.artists[0].name; // Store new artist
                                steroid.spotify.cache.song.cover.url = response.item.album.images[1].url; // Store album cover url
                                if (steroid.spotify.settings.create_cover){
                                    steroid.spotify.cache.song.cover.base64 = await steroid.spotify.cover();
                                } else {
                                    steroid.spotify.cache.song.cover.base64 = null;
                                }
                                if (steroid.spotify.settings.progress){
                                    if (steroid.spotify.settings.process_timeStamp){ // Check the output format
                                        steroid.spotify.cache.song.progress.ms = response.progress_ms;
                                        steroid.spotify.cache.song.duration.ms = response.item.duration_ms;
                                        steroid.spotify.cache.song.progress.time = getTime(response.progress_ms);
                                        steroid.spotify.cache.song.duration.time = getTime(response.item.duration_ms);
                                    } else {
                                        steroid.spotify.cache.song.progress.ms = response.progress_ms;
                                        steroid.spotify.cache.song.duration.ms = response.item.duration_ms;
                                    }
                                } else {
                                    if (steroid.spotify.settings.process_timeStamp){ // Check the output format
                                        steroid.spotify.cache.song.progress.ms = 0;
                                        steroid.spotify.cache.song.duration.ms = response.item.duration_ms;
                                        steroid.spotify.cache.song.progress.time = 0;
                                        steroid.spotify.cache.song.duration.time = getTime(response.item.duration_ms);
                                    } else {
                                        steroid.spotify.cache.song.progress.ms = 0;
                                        steroid.spotify.cache.song.duration.ms = response.item.duration_ms;
                                        steroid.spotify.cache.song.progress.time = 0;
                                        steroid.spotify.cache.song.duration.time = 0;
                                    }
                                }
                                response = {song: steroid.spotify.cache.song};
                            } else { // If it is the same song, then just update the progress
                                if (steroid.spotify.settings.progress){
                                    if (steroid.spotify.settings.process_timeStamp){
                                        steroid.spotify.cache.song.progress.ms = response.progress_ms;
                                        steroid.spotify.cache.song.progress.time = getTime(response.progress_ms);
                                        response = steroid.spotify.cache.song.progress;
                                    } else {
                                        steroid.spotify.cache.song.progress.ms = response.progress_ms;
                                        response = {ms: steroid.spotify.cache.song.progress.ms};
                                    }
                                } else {
                                    response = {play: true};
                                }
                            }
                        } else {
                            steroid.spotify.cache.is_playing = false;
                            response = {pause: true};
                        }
                    } else {
                        if (response.error.status !== 429){
                            response = await steroid.spotify.access();
                            if (response.success){
                                response = await steroid.spotify.playback();
                            }
                        };
                    }
                }).catch(error => {response = {stopped: true}});
                return response;
            } else {
                return {stopped: true};
            }
            
            

            function getTime(miliseconds){
                let minutes = Math.floor(miliseconds / 60000);
                let seconds = ((miliseconds % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }
        },
        play: async () => {
            // Comes in next update
        },
        pause: async () => {
            // Comes in next update
        },
        stop: async () => {
            // Comes in next update
        },
        next: async () => {
            // Comes in next update
        },
        previous: async () => {
            // Comes in next update
        },
        getCollection: async () => { // Works for Albums or Playlists
            // Comes in next update
        },
        cover: async () => {
            let img = new Image;
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let base64;
            img.crossOrigin = "anonymous";
            await loadImage(img, canvas, ctx);
            return base64;
            function loadImage(){
                return new Promise(function (resolve, reject){
                    img.addEventListener('load', function(){ // Wait until the url image data loads
                        canvas.width  = img.naturalWidth;
                        canvas.height = img.naturalHeight;
                        ctx.drawImage(img, 0, 0);
                        base64 = canvas.toDataURL(); // Store the base64 processed image on the cache
                        resolve();
                    });
                    img.src = steroid.spotify.cache.song.cover.url;
                })
            }
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ZmY3NjYyZTAyMDg3NDk3MGEwMTAxNzNjMjA0MzljNTc6NzMwNmQ1ZGU0NWZjNGVlZDk0NDkzYjk3NTY0YmYxMTE='
        },
        cache: {
            song: {
                name: null,
                album: null,
                artist: null,
                cover: {
                    url: null,
                    base64: null
                },
                duration: {
                    ms: null,
                    time: null
                },
                progress: {
                    ms: null,
                    time: null
                }
            },
            is_playing: false,
            processing_cover: false
        },
        settings: {
            active: true,
            active_bak: true,
            progress: true,
            create_cover: true,
            process_timeStamp: true
        }
    }
}