window.onload = function (){

    var hideAlert = false;

    window.wallpaperPropertyListener = {
        applyUserProperties: function (properties){
            // Background Image
            if (properties.backgroundimage){
                if (properties.backgroundimage.value){
                    if (properties.backgroundimage.value !== "undefined" || properties.backgroundimage.value !== undefined || properties.backgroundimage.value !== ""){
                        Object.assign(fondo.style, {
                            width: window.innerWidth+"px",
                            height: window.innerHeight+"px",
                            background: "url("+"file:///"+properties.backgroundimage.value+")"
                        }); 
                    }
                } else {
                    Object.assign(fondo.style, {background: ""});
                }
            }
            // Background size
            if (properties.backgroundalignment){
                if (properties.backgroundalignment.value){
                    if (properties.backgroundalignment.value == 0){
                        Object.assign(fondo.style, {backgroundSize: "contain"});
                    } else {
                        Object.assign(fondo.style, {backgroundSize: "cover"});
                    }
                    Object.assign(fondo.style, {
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    });
                }
            }
            // Background Blur
            if (properties.backgroundblur){
                root.style.setProperty("--filterBg", properties.backgroundblur.value+"px");
            }
            // Background Color
            if (properties.backgroundColor){
                if (properties.backgroundColor.value){
                    setColor("--bgColor", properties.backgroundColor.value);
                }
            }
            // Accent Color
            if (properties.accentColor1){
                if (properties.accentColor1.value){
                    setColor("--schemeColor", properties.accentColor1.value);
                }
            }
            // Primary Text
            if (properties.textColor1){
                if (properties.textColor1.value){
                    setColor("--font1", properties.textColor1.value);
                }
            }
            // Secondary Text
            if (properties.textColor2){
                if (properties.textColor2.value){
                    setColor("--font2", properties.textColor2.value);
                }
            }
            //Side Bar Background Color + Opacity
            if (properties.sidebarbackgroundcolor){
                sideBarColor = properties.sidebarbackgroundcolor.value;
                setColor("--sidebgColor", sideBarColor, false, false, true, sideBarOpacity);
            }
            if (properties.sidebarbackgroundopacity){
                sideBarOpacity = properties.sidebarbackgroundopacity.value;
                setColor("--sidebgColor", sideBarColor, false, false, true, sideBarOpacity);
            }
            //Side Bar Blur
            if (properties.sidebarbackgroundblur){
                root.style.setProperty("--sidebdFilter", "blur("+properties.sidebarbackgroundblur.value+"px)");
            }
            // Side Bar Border Width
            if (properties.sidebarborderwidth){
                root.style.setProperty("--sideBorderWidth", properties.sidebarborderwidth.value+"px");
            }
            // Side Bar Border Radious
            if (properties.sidebarborderradius){
                root.style.setProperty("--sideBorderRadius", properties.sidebarborderradius.value+"px");
            }
            // Side Bar Border Color
            if (properties.sidebarbordercolor){
                setColor("--sideBorderColor", properties.sidebarbordercolor.value);
            }
            // Hide Updates Alerts
            if (properties.hideupdatealert){
                hideAlert = properties.hideupdatealert.value;
            }
            // Version Control
            if (properties.version){
                if (properties.version.text != localStorage.getItem("wallpaper_version") && !hideAlert){
                    localStorage.setItem("wallpaper_version", properties.version.text);
                    alerta.actualizacion(
                        "SERVER MIGRATION / MAR 08, 2023",
                        "Steroid server has been migrated",
                        `   
                            <dl>
                                <dt>Notice:</dt>
                                    <dd>Due to server migration, your previous account might be unauthorized, if that's the case, please register again with the same email and follow the guide once more.</dd>
                            </dl>
                            <a class="chico">If you enjoy this wallpaper please leave a like. And remember, if you want to leave a comment, suggestion or report a bug, you can do it on the workshop page. Every single comment matters, always!</a>
                        `
                    );
                    alerta.actualizacion(
                        "DISCORD SERVER ALIVE ♥ / MAR 21, 2022",
                        "I created a discord server to support any issue you have!",
                        `
                            <dl>
                                <dt>Discord Link:</dt>
                                    <dd>https://discord.gg/GvNvXY26Mb</dd>
                                <dt>Description:</dt>
                                    <dd>The server has been created considering that soon I will be publishing a whole new Companion App for Wallpaper Engine! Come, hang out and if you want post your own wallpaper or suggestions, let's make Wallpaper Engine great together 👀</dd>
                            </dl>
                        `
                    );
                }
            }
            // Audio Bars Amount
            if (properties.audiobarsamount){
                canales = properties.audiobarsamount.value - 1;
                inicializar_Buffer();
            }
            // Audio Bars Width
            if (properties.audiobarswidth){
                if(properties.audiobarswidth.value){
                    anchoBarras = properties.audiobarswidth.value;
                }
            }
            // Audio Bars Spread
            if (properties.audiobarsspread){
                barrasSeparacion = properties.audiobarsspread.value;
                inicializar_Buffer();
            }
            // Visualizer X
            if (properties.audiovisualizermovex){
                document.getElementById("audio_canvas").style.right = -properties.audiovisualizermovex.value + "%";
            }
            // Visualizer Y
            if (properties.audiovisualizermovey){
                document.getElementById("audio_canvas").style.bottom = properties.audiovisualizermovey.value + "%";
            }
            // Visualizer Rotation
            if (properties.audiovisualizerrotation){
                document.getElementById("audio_canvas").style.transform =  "rotate("+properties.audiovisualizerrotation.value+"deg)";
            }
            // Visualizer Shadow Cast
            if (properties.audiovisualizershadowblur){
                audio_ctx.shadowBlur = properties.audiovisualizershadowblur.value;
            }
            // Visualizer Color
            if (properties.visColor){
                if (properties.visColor.value){
                    let rgb = (properties.visColor.value).split(" ").map(function (color){
                        return Math.ceil(color * 255);
                    });
                    audioColor = "#"+componentToHex(rgb[0])+componentToHex(rgb[1])+componentToHex(rgb[2]);
                    spotify_ctx.fillStyle = audioColor;
                    audio_ctx.fillStyle = audioColor;
                }
            }
            // Visualizer Shadow Cast Color
            if (properties.audiovisualizershadowcolor){
                if (properties.audiovisualizershadowcolor.value){
                    setColor(audio_ctx, properties.audiovisualizershadowcolor.value, true);
                    audio_ctx.fillStyle = audioColor;
                }
            }
            // Tilted Bar
            if (properties.tiltedBarColor){
                if (properties.tiltedBarColor.value){
                    inclinada_ctx.clearRect(-188, 401, 780, 2300);
                    setColor(inclinada_ctx, properties.tiltedBarColor.value, true);
                    inclinada_ctx.beginPath();
                    inclinada_ctx.fillRect(-189, 400, 780, 2300);
                }
            }
            if (properties.tiltedbaropacity){
                document.getElementById("inclinada").style.opacity = properties.tiltedbaropacity.value;
            }
            // Tilted Bar X
            if (properties.tiltedbarmovex){
                document.getElementById("inclinada").style.right = properties.tiltedbarmovex.value + "%";
            }
            // Tilted Bar Y
            if (properties.tiltedbarmovey){
                document.getElementById("inclinada").style.bottom = properties.tiltedbarmovey.value + "%";
            }
            // Tilted Bar Rotation
            if (properties.tiltedbarrotation){
                document.getElementById("inclinada").style.transform =  "rotate("+properties.tiltedbarrotation.value+"deg)";
            }
            // Waifu Selector
            if (properties.waifuSelector){
                cargarWaifu(properties.waifuSelector.value);
            }
            // Waifu Invert
            if (properties.waifuInvert){
                if (properties.waifuInvert.value){
                    invertCharacter = true;
                    document.getElementById("personaje").style.transform = "scaleX(-1) scale("+characterScale/100+")";
                    document.getElementById("sombra").style.transform = "scaleX(-1) scale("+characterScale/100+")";
                } else {
                    invertCharacter = false;
                    document.getElementById("personaje").style.transform = "scaleX(1) scale("+characterScale/100+")";
                    document.getElementById("sombra").style.transform = "scaleX(1) scale("+characterScale/100+")";
                }
            }
            // Waifu X
            if (properties.waifuX){
                moveCharacter(properties.waifuX.value,false);
            }
            // Waifu Y
            if (properties.waifuY){
                moveCharacter(false,properties.waifuY.value);
            }
            // Shadow X
            if (properties.shadowX){
                moveCharacter(false,false,properties.shadowX.value,false);
            }
            // Shadow Y
            if (properties.shadowY){
                moveCharacter(false,false,false,properties.shadowY.value);
            }
            // Waifu Scale
            if(properties.waifuScale){
                characterScale = properties.waifuScale.value;
                invertCharacter ? document.getElementById("personaje").style.transform = "scaleX(-1) scale("+characterScale/100+")" : document.getElementById("personaje").style.transform = "scale("+characterScale/100+")"; 
            }
            // Shadow Scale
            if (properties.shadowScale){
                shadowScale = properties.shadowScale.value;
                invertCharacter ? document.getElementById("sombra").style.transform = "scaleX(-1) scale("+shadowScale/100+")" : document.getElementById("sombra").style.transform = "scale("+shadowScale/100+")";
            }
            // Waifu Shadow
            if (properties.waifuShadowColor){
                if (properties.waifuShadowColor.value){
                    firstLoad ? setColor("", properties.waifuShadowColor.value, true, true) : shadowColor = properties.waifuShadowColor.value;
                }
            }
            // Waifu Shadow Opacity
            if (properties.waifuShadowOpacity){
                opacityShadow = properties.waifuShadowOpacity.value / 100;
                document.getElementById("sombra").style.opacity = opacityShadow;
            }
            // Display Day
            if (properties.displaydate){
                if (properties.displaydate.value){
                    document.getElementById("monthYear").style.display = "inline-block";
                } else {
                    document.getElementById("monthYear").style.display = "none";
                }
            }
            // Display Calendar
            if (properties.displayCalendar){
                if (properties.displayCalendar.value){
                    document.getElementById("contenedorCalendario").style.display = "block";
                    dibujarCalendario();
                } else {
                    document.getElementById("contenedorCalendario").style.display = "none";
                }
            }
            // Display Clock
            if (properties.displayClock){
                if (properties.displayClock.value){
                    document.getElementById("hora").style.display = "inline-block";
                    dibujarHora();
                } else {
                    document.getElementById("hora").style.display = "none";
                }
            }
            // 24Hs format Clock
            if (properties._24hsformat){
                if (properties._24hsformat.value){
                    horaFormato = true;
                } else {
                    horaFormato = false;
                }
                dibujarHora();
            }
            // Display Schedule
            if (properties.displaySchedule){
                if (properties.displaySchedule.value){
                    document.getElementById("cronogramaTitulo").style.display = "table";
                    document.getElementById("cronograma").style.display = "table";
                    document.getElementById("contenedorCronogramaNotas").style.display = "block";
                    document.getElementById("crononotasSeparador").style.display = "block";
                    document.getElementById("notas").style.marginTop = "20px";
                    cargarCronograma();
                } else {
                    document.getElementById("cronogramaTitulo").style.display = "none";
                    document.getElementById("cronograma").style.display = "none";
                    document.getElementById("crononotasSeparador").style.display = "none";
                    document.getElementById("notas").style.marginTop = "0px";
                    if (document.getElementById("notas").style.display != "block"){
                        document.getElementById("contenedorCronogramaNotas").style.display = "none";
                        document.getElementById("crononotasSeparador").style.display = "none";
                    }
                }
            }
            // Display Notes
            if (properties.displayNotes){
                if (properties.displayNotes.value){
                    document.getElementById("notas").style.display = "block";
                    document.getElementById("contenedorCronogramaNotas").style.display = "block";
                    cargarNotas();
                } else {
                    document.getElementById("notas").style.display = "none";
                    if (document.getElementById("cronograma").style.display == "none"){
                        document.getElementById("contenedorCronogramaNotas").style.display = "none";
                    }
                }
            }
            // Copy Schedule
            if (properties.copyschedule){
                if (properties.copyschedule.value){
                    copySchedule();
                }
            }
            // Clean Schedule Memory
            if (properties.cleanschedule){
                if (properties.cleanschedule.value){
                    localStorage.removeItem("scheduleMD5");
                    localStorage.removeItem("scheduleBase64");
                    localStorage.removeItem("notesMD5");
                    localStorage.removeItem("notesBase64");
                    alerta.scheduleClean();
                    cargarCronograma();
                    cargarNotas();
                }
            }
            // Steroid User
            if (properties.steroidusername){
                if (properties.steroidusername.value){
                    let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (emailPattern.test(properties.steroidusername.value)){
                        steroid.user_id = properties.steroidusername.value;
                    }
                }
            }
            // Steroid Wallpaper Token
            if (properties.steroidwallpapertoken){
                if (properties.steroidwallpapertoken.value){
                    if (properties.steroidwallpapertoken.value.length == 128){
                        steroid.session_token = properties.steroidwallpapertoken.value;
                    }
                }
            }

            // Steroid Weather
            if (properties.steroidweathercurrent){
                if (properties.steroidweathercurrent.value){
                    if (steroid.logged_in){
                        document.getElementById("climaActual").style.display = "inline-block";
                    }
                    steroid.weather.settings.current = true;
                    steroid.weather.settings.current_bak = true;
                } else {
                    document.getElementById("climaActual").style.display = "none";
                    steroid.weather.settings.current = false;
                    steroid.weather.settings.current_bak = false;
                }
            }
            if (properties.steroidweatherforecast){
                if (properties.steroidweatherforecast.value){
                    if (steroid.logged_in){
                        document.getElementById("clima").style.display = "block";
                    }
                    steroid.weather.settings.forecast = true;
                    steroid.weather.settings.forecast_bak = true;
                } else {
                    document.getElementById("clima").style.display = "none";
                    steroid.weather.settings.forecast = false;
                    steroid.weather.settings.forecast_bak = false;
                }
            }
            if (properties.steroidweather){
                if (properties.steroidweather.value){
                    if (steroid.logged_in){
                        steroid.weather.settings.active = true;
                        document.getElementById("contenedorClima").style.display = "block";
                        if (steroid.weather.settings.current_bak){
                            steroid.weather.settings.current = true;
                            weatherAPI.current();
                        }
                        if (steroid.weather.settings.forecast_bak){
                            steroid.weather.settings.forecast = true;
                            weatherAPI.forecast();
                        }
                    }
                    steroid.weather.settings.active = true;
                    steroid.weather.settings.active_bak = true;
                } else {
                    document.getElementById("contenedorClima").style.display = "none";
                    steroid.weather.settings.active = false;
                    steroid.weather.settings.active_bak = false;
                }
            }
            if (properties.steroidweathertemperature){
                if (properties.steroidweathertemperature.value){ // Metric/Imperial
                    if (steroid.logged_in){
                        if (steroid.weather.convention(properties.steroidweathertemperature.value)){
                            if (steroid.weather.settings.active){
                                if (steroid.weather.timerReset()){
                                    if (steroid.weather.settings.current_bak){
                                        steroid.weather.settings.current = true;
                                        weatherAPI.current();
                                    }
                                    if (steroid.weather.settings.forecast_bak){
                                        steroid.weather.settings.forecast = true;
                                        weatherAPI.forecast();
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Steroid Spotify
            if (properties.steroidspotify){
                if (properties.steroidspotify.value){
                    if (steroid.logged_in){
                        spotifyAPI.access();
                    }
                    steroid.spotify.settings.active = true;
                    steroid.spotify.settings.active_bak = true;
                } else {
                    steroid.spotify.settings.active = false;
                    steroid.spotify.settings.active_bak = false;
                    if (steroid.logged_in){
                        spotifyAPI.stop();
                    }
                }
            }

            // Steroid Login
            if (properties.separate10){
                if (properties.separate10.value){
                    async function login(){
                        let response = await steroid.verification();
                        if (!response.error){
                            if (steroid.spotify.settings.active){
                                steroid.spotify.settings.process_timeStamp = false;
                                steroid.spotify.settings.progress = false;
                                spotifyAPI.access();
                            } else {
                                if (steroid.spotify.settings.active_bak){
                                    steroid.spotify.settings.active = true;
                                    spotifyAPI.access();
                                }
                            }
                            if (steroid.weather.settings.active){
                                setTimeout(function(){
                                    if (steroid.weather.settings.current){
                                        weatherAPI.current();
                                    }
                                    if (steroid.weather.settings.forecast){
                                        weatherAPI.forecast();
                                    }
                                },2500);
                            } else {
                                setTimeout(function(){
                                    if (steroid.weather.settings.active_bak){
                                        steroid.weather.settings.active = true;
                                        if (steroid.weather.settings.current_bak){
                                            steroid.weather.settings.current = true;
                                            weatherAPI.current();
                                        }
                                        if (steroid.weather.settings.forecast_bak){
                                            steroid.weather.settings.forecast = true;
                                            weatherAPI.forecast();
                                        }
                                    }
                                },2500);
                            }
                        } else {
                            alerta.crear("Error", "", response.error);
                            if (steroid.weather.settings.current){
                                weatherAPI.current();
                            };
                            if (steroid.weather.settings.forecast){
                                weatherAPI.forecast();
                            }
                        }
                    }
                    login();
                } else {
                    spotifyAPI.stop();
                    steroid.spotify.settings.active = false;
                    steroid.weather.settings.active = false;
                    steroid.logged_in = false;
                }
            }

            // Spotify X
            if (properties.spotifycanvasmovex){
                document.getElementById("spotify_canvas").style.right = properties.spotifycanvasmovex.value + "%";
            }
            // Spotify Y
            if (properties.spotifycanvasmovey){
                document.getElementById("spotify_canvas").style.bottom = properties.spotifycanvasmovey.value + "%";
            }
            // Spotify Rotation
            if (properties.spotifycanvasrotation){
                document.getElementById("spotify_canvas").style.transform =  "rotate("+properties.spotifycanvasrotation.value+"deg)";
            }
            // Audio Processing Support
            if (!properties.supportsaudioprocessing){
                audio_ctx.clearRect(930, 680, 250, 660); // Clean residual bars
            }
            // Max Audio Bars Height
            if (properties.maxHeight){
                alturaMax = properties.maxHeight.value * 2;
            }
            // Audio Listener
            if (window.wallpaperRegisterAudioListener){
                window.wallpaperRegisterAudioListener(function(audioArray){
                    filtrarAudio(audioArray);
                });
            }
            // Bold Titles
            if (properties.boldtitles){
                if (properties.boldtitles.value){
                    boldTitles = true;
                    document.getElementById("monthYear").style.fontWeight = "bold";
                    document.getElementById("hora").style.fontWeight = "bold";
                    document.getElementById("climaTitulo").style.fontWeight = "bold";
                    document.getElementById("cronogramaTitulo").style.fontWeight = "bold";
                } else {
                    boldTitles = false;
                    document.getElementById("monthYear").style.fontWeight = "";
                    document.getElementById("hora").style.fontWeight = "";
                    document.getElementById("climaTitulo").style.fontWeight = "";
                    document.getElementById("cronogramaTitulo").style.fontWeight = "";
                }
            }
            if (properties.fontfamily){
                fontFamily = properties.fontfamily.value;
            }
            // Font URL
            if (properties.fonturl){
                fontURL = properties.fonturl.value;
            }
            // Font Family
            if (properties.textfont){
                if (properties.textfont.value == 1){
                    customFont = true;
                } else {
                    customFont = false;
                }
                loadFont();
            }
            if (properties.resetwidgetslocation){
                localStorage.removeItem("draggeableElements");
                draggeableElements_Data = {};
                initiateDragEvents();
            };

            // Elements Lock
            if (properties.elementslockpreset){
                lockPreset = properties.elementslockpreset.value;
            }
            if (properties.elementslock){
                activeDragEvents = properties.elementslock.value;
                initiateDragEvents();
            }
        }
    }

    const root = document.querySelector(':root');
    const fondo = document.querySelector("#fondo");
    var sideBarColor = "";
    var sideBarOpacity = 0;

    function setColor(variable, data, isCanvas, paintWaifu, isSideBar, opacity){
        if (isCanvas){
            let rgb = data.split(" ").map(function (color){
                return Math.ceil(color * 255);
            });
            try {
                variable.canvas.id == "audio_canvas" ? audio_ctx.shadowColor = "#"+componentToHex(rgb[0])+componentToHex(rgb[1])+componentToHex(rgb[2]) : false;
            }catch(err){}
            paintWaifu ? displayWaifuShadow(rgb[0],rgb[1],rgb[2]) : variable.fillStyle = "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);     
        } else {
            let customColor = data.split(" ");
            customColor = customColor.map(function(c){
                return Math.ceil(c * 255);
            });
            let cssData = "rgb(";
            if (opacity >= 0){ cssData += customColor + ", "+opacity+")";
            } else { cssData += customColor+")";}
            if (isSideBar){
                root.style.setProperty(variable, cssData)
            } else {
                root.style.setProperty(variable, cssData);
            }
        }
    }
    function componentToHex(c){
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    /*
        --------------------
        CHARACTER VISUALIZER
        --------------------
    */
    var shadowColor = "";
    var ubicacionArchivo = "";
    var imageData = "";
    var firstLoad = false;
    var invertCharacter = false;
    var opacityShadow = 1;
    var characterScale = 100;
    var characterX = 0;
    var characterY = 0;
    var shadowScale = 0;
    var shadowX = 0;
    var shadowY = 0;
    
    function cargarWaifu(ubicacion){
        if (ubicacion === "undefined" || ubicacion === undefined || ubicacion === ""){
            ubicacionArchivo = "files/AsukaForegroundAsuka.png";
        } else {
            ubicacionArchivo = "file:///"+ubicacion;
        }
        
        imageData = document.createElement('img');
        imageData.onload = () => {
            // Cleaning and preparing for new image. Faster than actually reusing the same canvas, yeah... Crazy, right?
            document.getElementById("personaje").remove();
            document.getElementById("sombra").remove();

            let character = document.createElement("canvas");
            let ctxcharacter = character.getContext("2d");
            let shadow = document.createElement("canvas");
            let ctxshadow = shadow.getContext('webgl2', {premultipliedAlpha: false}); // This isn't cursed, this is to avoid artifacts with PNGs.

            character.id = "personaje";
            shadow.id = "sombra";
            character.width = imageData.width;
            character.height = imageData.height;
            shadow.width = imageData.width;
            shadow.height = imageData.height;

            ctxcharacter.drawImage(imageData, 0, 0);
            document.getElementsByTagName("body")[0].appendChild(character);
            document.getElementsByTagName("body")[0].appendChild(shadow);

            setColor("", shadowColor, true, true);
        };
        imageData.src = ubicacionArchivo;
    }

    /*
        Here comes the intense bleep bloop.
        There are a lof of functions that should load in GPU, like this one...
        Did you know you can calculate stuff in there with this?
        That's so coool, right?!
    */

    function displayWaifuShadow(r,g,b){
        r = r/255; g = g/255; b = b/255;
        let canvas = document.getElementById("sombra");
        let gpu = new GPU({canvas});
        let kernel = gpu.createKernel(function(image, r, g, b){
            let pixel = image[this.thread.y][this.thread.x];
            this.color(r, g, b, pixel[3]);
        }).setOutput([imageData.width, imageData.height]).setGraphical(true);
        if (imageData.height == 0){
            alerta.crear("Wallpaper Error:", "", "No image found at:<br>"+imageData.src);
        } else {
            kernel(imageData, r, g, b);
        }
        kernel.canvas.id = "sombra";
        document.getElementsByTagName('body')[0].appendChild(kernel.canvas);
        finishSetup();
        firstLoad = true;
    }

    function finishSetup(){
        document.getElementById("personaje").style.transform = invertChar()+" scale("+characterScale/100+")";
        document.getElementById("sombra").style.transform = invertChar()+" scale("+shadowScale/100+")";
        document.getElementById("sombra").style.opacity = opacityShadow;
        moveCharacter(characterX, characterY, shadowX, shadowY);
        function invertChar(){
            if (invertCharacter){
                return "scaleX(-1)"
            } else {
                return "scaleX(1)"
            }
        }
    }

    function moveCharacter(cx, cy, sx, sy){
        if (cx !== false){
            characterX = cx;
            document.getElementById("personaje").style.right = -cx*1.5+"px";
        }
        if (cy !== false){
            characterY = cy;
            document.getElementById("personaje").style.top = cy*1.5+"px";
        }
        if (sx !== false){
            shadowX = sx;
            document.getElementById("sombra").style.right = -sx*1.5+"px";
        }
        if (sy !== false){
            shadowY = sy;
            document.getElementById("sombra").style.top = sy*1.5+"px";
        }
    }


    /*
    	--------
    	CALENDAR
    	--------
    */
    var dateOrg = new Date();
    var horaFormato = false;
    const meses = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const diasSemana = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    var hora = [dateOrg.getHours(), dateOrg.getMinutes(), dateOrg.getDate(), dateOrg.getFullYear()];

    function dibujarCalendario(){
        document.getElementById("calendario").innerHTML = "<tr><td>SU</td><td>MO</td><td>TU</td><td>WE</td><td>TH</td><td>FR</td><td>SA</td></tr>";

        let mes = dateOrg.getMonth();
        let dias = new Date(dateOrg.getFullYear(), mes + 1, 0).getDate();
        let elem = document.createElement("tr");
        let aux = new Date(dateOrg.getFullYear(), mes, 1).getDay();

        for (let i = 0; i < aux; i++){
            cargar("");
        }
        for (let i = 1; i <= dias; i++){
            aux = new Date(dateOrg.getFullYear(), mes, i).getDay();
            if (diasSemana[aux] == diasSemana[0]){
                document.getElementById("calendario").appendChild(elem);
                elem = document.createElement("tr");
                cargar(i);
            } else {
                cargar(i);
            }
        }

        function cargar(data){
            elem.appendChild(document.createElement("td")).appendChild(document.createTextNode(data));
        }
        document.getElementById("calendario").appendChild(elem);
        document.getElementById("monthYear").getElementsByTagName("span")[0].innerHTML = diasSemana[new Date(dateOrg.getFullYear(), mes, hora[2]).getDay()] + " /";
        document.getElementById("monthYear").getElementsByTagName("span")[1].innerHTML = meses[mes] + " " + hora[3];

        marcarCalendario();
    }

    function marcarCalendario(){
        let anteriores = true; // Past days signal
        let dias = document.getElementById("calendario").getElementsByTagName("td");
        for (let i = 7; i < dias.length; i++){
            if (anteriores){
                dias[i].classList.add("pasado");
            } // Past days marker
            if (dias[i].innerHTML == hora[2]){
                dias[i].classList.add("dia"); // Today's marker
                anteriores = false;
            }
        }
    }


    /*
        -----
        CLOCK
        -----
    */
    function dibujarHora(){
        let tiempo = document.getElementById("hora").getElementsByTagName("span");
        let date = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: !horaFormato
        });
        // If 24hs format is true -> if it's 24hs mark -> replace 24 for 00, or do nothing, or do nothing.
        horaFormato ? date.slice(0, 3) == "24:" ? date = date.replace("24:", "00:") : false : false;
        !horaFormato && date.slice(date.length - 2, date.length) == "AM" ? date = date.replace("12:", "00:") : false;

        tiempo[0].innerHTML = date;
    };
    /*
        hora[0] -> Hour
        hora[1] -> Minutes
        hora[2] -> Date
        hora[3] -> Year
    */
    var RefrescoReloj = setInterval(TimerReloj, 2000);

    function TimerReloj(){
        let fecha = new Date();
        if (hora[1] != fecha.getMinutes()){
            hora[1] = fecha.getMinutes();
            dibujarHora();
            if (hora[2] != fecha.getDate()){
                hora[2] = fecha.getDate();
                dibujarCalendario();
                if (steroid.weather.settings.active){
                    weatherAPI.current();
                };
            };
        };
        if (steroid.spotify.settings.active) spotifyAPI.playback();
    };
    
    let inclinada_canvas = document.getElementById("inclinada");
    let inclinada_ctx = inclinada_canvas.getContext("2d");
    inclinada_ctx.translate(0, 1900);
    inclinada_ctx.rotate(Math.PI / 180 * (-118.3));

    
    /*
            -----------
            WEATHER API
            -----------
    */
    const weatherAPI = {
        current: async function(){
            let response = await steroid.weather.current();
            if (!response.error){
                document.getElementById("climaTitulo").innerHTML = "WEATHER: ";
                let span = document.createElement("span");
                let iconoClima = document.createElement("i");
                iconoClima.classList.add("wi");
                iconoClima.classList.add("wi-" + steroid.weather.icons[response[0]["WeatherIcon"]]);
                span.appendChild(iconoClima);
                span.id = "climaActual";
                let temperatura = document.createTextNode(response[0]["Temperature"][steroid.weather.settings.convention]["Value"] + "°" + response[0]["Temperature"][steroid.weather.settings.convention]["Unit"]);
                span.appendChild(temperatura);
                document.getElementById("climaTitulo").appendChild(span);
                document.getElementById("contenedorClima").style.maxWidth = "fit-content";
            } else {
                alerta.crear("Error:", "", response.error);
            };
        },
        forecast: async function(){
            let response = await steroid.weather.forecast();
            if (!response.error){
                document.getElementById("clima").innerHTML = "";
                for (let i = 0; i < steroid.weather.settings.forecast_days; i++){
                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    let iconoClima = document.createElement("i");
                    iconoClima.classList.add("wi");
                    iconoClima.classList.add("wi-" + steroid.weather.icons[response["DailyForecasts"][i]["Day"]["Icon"]]);
                    td.appendChild(iconoClima);
                    semana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    temp = " " + semana[new Date(response["DailyForecasts"][i]["Date"]).getDay()];
                    switch (i){
                        case 0:
                            if (new Date(response["DailyForecasts"][i]["Date"]).getDay() !== new Date().getDay()){
                                steroid.weather.settings.forecast_days++;
                                i++;
                            }
                            td.appendChild(document.createTextNode(" Today"));
                            break;
                        case 1:
                            td.appendChild(document.createTextNode(" Tomorrow"));
                            break;
                        case 2:
                            td.appendChild(document.createTextNode(temp));
                            break;
                        case 3:
                            td.appendChild(document.createTextNode(temp));
                            break;
                    }
                    tr.appendChild(td);
                    td = document.createElement("td");
                    steroid.weather.cache.min = Math.round(response["DailyForecasts"][i]["Temperature"]["Minimum"]["Value"]);
                    steroid.weather.cache.max = Math.round(response["DailyForecasts"][i]["Temperature"]["Maximum"]["Value"]);
                    steroid.weather.cache.unit = response["DailyForecasts"][i]["Temperature"]["Maximum"]["Unit"];
                    td.appendChild(document.createTextNode(steroid.weather.cache.min + " - " + steroid.weather.cache.max + "°" + steroid.weather.cache.unit));
                    tr.appendChild(td);
                    document.getElementById("clima").appendChild(tr);
                }
                steroid.weather.setForecastDays(3);
            } else {
                alerta.crear("Error:", "", response.error);
            };
        }
    };

    var RefrescoClima = setInterval(TimerClima, 3600000);
    function TimerClima(){
        if (steroid.weather.active){
            if (steroid.weather.current){
                weatherAPI.current();
            }
            if (steroid.weather.forecast){
                weatherAPI.forecast();
            }
        }
    }

    /*
        ------------------
        SCHEDULE AND NOTES
        ------------------

        If you wonder, why am I going to use MD5 and the crypto library...
        Well, it's to easily store a hash of all the data inside each day, so I don't have
        to compare the entire chunk of information!
        It's actually faster because low level wizard shit going on around the MD5.
    */

    // Schedule
    const originalScheduleMD5 = "4f336a4c41ab125d25f4ce6f4d3bd892";
    var scheduleErrorTrigger = false;
    function cargarCronograma(){
        try {
            let semana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let activity = "";
            let scheduleComplete = JSON.stringify(scheduleNotes["Schedule"]);
            let scheduleMD5 = CryptoJS.MD5(scheduleComplete);

            if (localStorage.getItem("scheduleMD5") === null){ // First time
                localStorage.setItem("scheduleMD5", scheduleMD5);
                localStorage.setItem("schedule", scheduleComplete);
            } else if (localStorage.getItem("scheduleMD5") != scheduleMD5 && scheduleMD5 != originalScheduleMD5){ // Not the first time
                localStorage.setItem("scheduleMD5", scheduleMD5);
                localStorage.setItem("schedule", scheduleComplete);
            };

            document.getElementById("cronograma").innerHTML = "";
            let schedulePlain = JSON.parse(localStorage.getItem("schedule"));
            schedulePlain[semana[new Date(dateOrg.getFullYear(), new Date().getMonth(), hora[2]).getDay()]].map(function (daySchedule){
                tr = document.createElement("tr");
                td = document.createElement("td");
                td.appendChild(document.createTextNode(daySchedule.hour));
                tr.appendChild(td);
                td = document.createElement("td");
                activity = "/ " + daySchedule.activity;
                tr.appendChild(document.createTextNode(activity));
                document.getElementById("cronograma").appendChild(tr);
            });
        } catch (error){
            alerta.crear("Error:", "", "There was an error while trying to load your schedule. Please check that you have followed the guide correctly or not misspelled something!\n");
            scheduleErrorTrigger = true;
        };
        
    }
    // Notes
    function cargarNotas(){
        try {
            let notesComplete = JSON.stringify(scheduleNotes["Notes"]);
            let notesMD5 = CryptoJS.MD5(notesComplete);

            if (localStorage.getItem("notesMD5") === null){ // First time
                localStorage.setItem("notesMD5", notesMD5);
                localStorage.setItem("notes", notesComplete);
            } else if (localStorage.getItem("notesMD5") != notesMD5 && notesMD5 != originalScheduleMD5){ // Not the first time
                localStorage.setItem("notesMD5", notesMD5);
                localStorage.setItem("notes", notesComplete);
            };
            
            notesPlain = JSON.parse(localStorage.getItem("notes"));

            document.getElementById("notas").innerHTML = "";
            notesPlain.map(function(note){
                let a = document.createElement('a');
                let br = document.createElement('br');
                a.innerHTML = note;
                let children = [...a.childNodes];
                children.forEach(element => {
                    element.innerText = element.innerHTML;
                });
                document.getElementById("notas").appendChild(a).appendChild(br);
            });
        } catch {
            if (!scheduleErrorTrigger){
                alerta.crear("Error:", "", "There was an error while trying to load your notes. Please check that you have followed the guide correctly or not misspelled something!\n");
            };
        };
    }

    /*
        // Copy Schedule

        This function is just a pain in the a**. Since I have to parse by myself everything, huh...
        You might be wondering: ¿Why?.
        To be honest, I could just leave javascript to do the job and that's it. But, since I am not the only
        one using this, I have to make it look beautiful and easy to read for everyone.
        Ergo, I have to parse it by myself... F U N. Well, not by myself, your CPU will suffer it, lol
    */
    function copySchedule(){
        let schedulePlain = atob(localStorage.getItem("scheduleBase64"));
        let notesPlain = atob(localStorage.getItem("notesBase64"));

        schedulePlain = '"Schedule": ' + js_beautify(schedulePlain);
        notesPlain = ',\n"Notes": ' + notesPlain;
        // God please forgive me for my sins, but I don't know how to handle this big ass Regex...
        schedulePlain = schedulePlain
            .replace(/\n        "hour"/g, "hour")
            .replace(/\n        "activity"/g, " activity")
            .replace(/\[{hour:/g, '[\n\t\t{hour:')
            .replace(/\n    }, {/g, '},\n\t\t{')
            .replace(/\n    }/g, '}\n\t');
        notesPlain = notesPlain
            .replace(/: \["/, ': [\n\t"')
            .replace(/","/g, '",\n\t"')
            .replace(/"]/, '"\n]');
        document.getElementById("datosCronograma").value = "var scheduleNotes = {\n" + schedulePlain + notesPlain + "\n}";
        var copyText = document.getElementById("datosCronograma");
        copyText.select();
        document.execCommand("copy"); // Typescript hates this function!
        alerta.schedule();
    }



    /*
                -----------
                SPOTIFY API
                -----------
    */

    // Canvas initialization
    var spotifyCanvas = document.getElementById("spotify_canvas");
    var spotify_ctx = spotifyCanvas.getContext("2d");
    spotify_ctx.shadowColor = "#262625";
    spotify_ctx.translate(460, 840);

    const spotifyAPI = {
        access: async () => {
            steroid.spotify.clearCache();
            let response = await steroid.spotify.access();
            try {
                if (response.success){
                    spotifyAPI.playback();
                }
            } catch {
                alerta.spotify(response.error);
            }
        },
        playback: async () => {
            let response = await steroid.spotify.playback();
            if (!response.error){
                try {
                    if (response.song.name){
                        spotifyAPI.display();
                    }
                } catch {
                    if (response.play){
                        spotifyAPI.display();
                    }
                    if (response.pause){
                        spotifyAPI.stop();
                    }
                }
                if (response.stopped){
                    spotifyAPI.stop();
                }
            }
        },
        display: () => {
            // Cover + Song Info
            spotify_ctx.shadowBlur = 2;
            let image = new Image();
            image.src = steroid.spotify.cache.song.cover.base64;
            setTimeout(function (){
                spotify_ctx.clearRect(-30, -30, 1920, 230);
                spotify_ctx.drawImage(image, 0, 0, 120, 120);
                spotify_ctx.font = "34px "+spotifyFont;
                spotify_ctx.fillText(steroid.spotify.cache.song.name.toUpperCase(), 140, 54);
                spotify_ctx.font = "30px "+spotifyFont;
                spotify_ctx.fillText(steroid.spotify.cache.song.artist, 140, 96);
            }, 500);
        },
        stop: () => {
            spotify_ctx.clearRect(-30, -30, 1920, 230);
        }
    };

    /*
        -----
        SOUND
        -----
    */

    var alturaMax = 0;
    var canales = 63;
    var cCanales = 0;
    var limpiarCanales = 0;
    var buffer = []; // Audio buffer for smooth visualizer :)
    var ciclos_buffer = 3; // Buffer of 3, to create a smooth movement (Before, "present", after)
    var ciclos_aux = 0; // Just an auxiliar variable

    var barrasSeparacion = 0;
    var anchoBarras = 0;

    /*
        Functions down below will be added once Wallpaper Engine developer stops messing around 
        with core components and bug the shit out of my code.

        - Power Saving Mode.
        - Framerate Limiter.
        - Less GPU load.

        var frameLimiter = false;
        var renderingFrames = 60;
        var frameLimiterLock = false;

        Another question is HOW ON EARTH, can my simple canvas consume 15% of an RTX 3060. HOW?!?
        WHAT THE HELL IS WRONG WITH THIS SOFTWARE.
    */

    function inicializar_Buffer(){
        audio_ctx.clearRect(930, 680, 250, limpiarCanales);
        for (let i = 0; i < 3; i++){
            buffer[i] = [];
            buffer[i].length = canales + 1;
            buffer[i].fill(0);
        }
        limpiarCanales = (barrasSeparacion+1)*(canales+1);
    }

    var audio_canvas = document.getElementById("audio_canvas");
    var audio_ctx = audio_canvas.getContext("2d");
    var audioColor = "";
    audio_ctx.translate(630, 1980);
    audio_ctx.rotate(Math.PI / 180 * (-118.3));

    async function filtrarAudio(audioArray){
        if (ciclos_aux < ciclos_buffer){
            buffer[ciclos_aux] = audioArray;
            ciclos_aux++;
        } else {
            buffer[1] = buffer[2];
            buffer[2] = audioArray;
            while (cCanales < canales - 1){
                buffer[0][cCanales] = ((buffer[1][cCanales]+buffer[2][cCanales])*alturaMax)/2; // Smooth movement
                buffer[0][cCanales] = (buffer[0][cCanales]+buffer[0][cCanales+1]+buffer[0][cCanales+2])/3;  // Smooth height
                buffer[0][cCanales] > 199 ? buffer[0][cCanales] = 199 : false; // Avoiding overflow
                cCanales++;
            }
            cCanales = 0;
        }
        window.requestAnimationFrame(render);
    }

    function render(){
        audio_ctx.clearRect(930, 680, 250, limpiarCanales); // Cleans the screen every time the rendering animation is triggered
        audio_ctx.beginPath();
        for (i = 0; i < canales + 1; i++){
            audio_ctx.fillRect(960, 700 + barrasSeparacion * i, buffer[0][i], anchoBarras);
        }
    }

    /*
        ---------------------
        DRAGGEABLE COMPONENTS
        ---------------------
        All elements with the class "draggeable" will be stored, so each one
        has it's own mouse event and functions.
    */

    var activeDragEvents = true;
    var lockPreset = "";

    var draggeableElementTimeEvent = 9;
    var draggeableElements = document.getElementsByClassName("draggeable"); // This returns the draggeable elements on code order!
    var draggeableElements_Data = localStorage.getItem("draggeableElements");
    draggeableElements_Data == null ? draggeableElements_Data = {} : draggeableElements_Data = JSON.parse(draggeableElements_Data);

    var screenSize = localStorage.getItem("screenSize");
    screenSize == null ? screenSize = [window.innerWidth, window.innerHeight] : screenSize = JSON.parse(screenSize);
    var genericOffset = 10;
    var dragThisElement = "";

    var draggeableTimer = 0;
    var draggeableInterval = "";
    var draggeableActive = false;
    var draggeableRotateValue = 0;

    var draggingIconActive = "";

    /*
        Prebaked elements!

        You might be wondering why...
        Well, actually, it's kinda messy. But, if we talk about performance, I think it's better
        to create all the elements needed and store them in memory. Then we can pop them in and out
        without the need to create more on the fly!
    */

    const dragIcon = document.createElement("div");
    const rotateIcon = document.createElement("div");
    const successIcon = document.createElement("div");
    const clipboardIcon = document.createElement("div");

    dragIcon.id = "drag-icon";
    rotateIcon.id = "rotate-icon";
    successIcon.id = "success-icon";
    clipboardIcon.id = "clipboard-icon";

    addDraggeableIcon(dragIcon);
    addDraggeableIcon(rotateIcon);
    addDraggeableIcon(successIcon);
    addDraggeableIcon(clipboardIcon);

    successIcon.addEventListener("mouseup", mouseSuccessEvent);
    clipboardIcon.addEventListener("mouseup", mouseSuccessEvent);
    
    function addDraggeableIcon(element){
        let draggeableSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        draggeableSVG.setAttribute("height", "24px");
        draggeableSVG.setAttribute("width", "24px");
        draggeableSVG.setAttribute("viewbox", "0 0 24 24");
        
        let draggeablePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        switch(element.id){
            case "drag-icon":
                draggeablePath.setAttribute("d", "M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z");
                break;
            case "rotate-icon":
                draggeablePath.setAttribute("d", "M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z");
                break;
            case "success-icon":
                draggeablePath.setAttribute("d", "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z");
                break;
            case "clipboard-icon":
                draggeablePath.setAttribute("d", "M15.5,2h-8C6.67,2,6,2.67,6,3.5v10C6,14.33,6.67,15,7.5,15h8c0.83,0,1.5-0.67,1.5-1.5v-10C17,2.67,16.33,2,15.5,2z M15.5,13.5h-8v-10h8V13.5z M3,12v-1.5h1.5V12H3z M3,15v-1.5h1.5V15H3z M9,16.5h1.5V18H9V16.5z M3,7.5h1.5V9H3V7.5z M7.5,18H6v-1.5 h1.5V18z M4.5,18C3.67,18,3,17.33,3,16.5h1.5V18z M4.5,6H3c0-0.83,0.67-1.5,1.5-1.5V6z M13.49,16.5c0,0.83-0.67,1.5-1.5,1.5h0v-1.5 L13.49,16.5L13.49,16.5z");
                break;
        }
        element.appendChild(draggeableSVG).appendChild(draggeablePath);
    }
    
    function mouseEventDown(e){
        if (!draggeableActive){
            dragThisElement = this.id;
            clearInterval(draggeableInterval);
            draggeableInterval = setInterval(function(){
                if (draggeableTimer < draggeableElementTimeEvent){
                    draggeableTimer++;
                } else {
                    document.getElementById(dragThisElement).classList.add("dragging");
                    document.getElementById(dragThisElement).appendChild(dragIcon);
                    document.getElementById(dragThisElement).appendChild(rotateIcon);
                    document.getElementById(dragThisElement).appendChild(successIcon);
                    document.getElementById(dragThisElement).appendChild(clipboardIcon);
                    dragIcon.addEventListener("mousedown", mouseDownIconsEvent);
                    rotateIcon.addEventListener("mousedown", mouseDownIconsEvent);
                    successIcon.addEventListener("mousedown", mouseDownIconsEvent);
                    clipboardIcon.addEventListener("mousedown", mouseDownIconsEvent);
                    draggeableActive = true;
                    clearInterval(draggeableInterval);
                }
            },100);
        }
    }

    function mouseEventUp(){
        document.getElementById("clipboard-icon").style.backgroundColor = "";
        document.getElementById("clipboard-icon").children[0].style.fill = "";
        document.body.removeEventListener("mouseup", mouseEventUp);
    }

    function mouseIconUpEvent(){
        clearInterval(draggeableInterval);
        draggeableTimer = 0;
    }

    function mouseDownIconsEvent(e){
        document.getElementById(this.id).style.backgroundColor = "var(--schemeColor)";
        document.getElementById(this.id).children[0].style.fill = "var(--font1)";
        switch(this.id){
            case "drag-icon":
                draggeableElements_Data[dragThisElement].offset = [
                    e.clientX - draggeableElements_Data[dragThisElement].offset[0],
                    e.clientY - draggeableElements_Data[dragThisElement].offset[1]
                ]
                if (draggingIconActive != this.id){
                    document.body.addEventListener("mousemove", mouseDragEvent);
                    draggingIconActive = this.id;
                } else {
                    document.getElementById(this.id).style.backgroundColor = "";
                    document.getElementById(this.id).children[0].style.fill = "";
                    document.body.removeEventListener("mousemove", mouseDragEvent);
                    draggingIconActive = "";
                }
            break;

            case "rotate-icon":
                if (draggingIconActive != this.id){
                    draggeableRotateValue = document.getElementById(dragThisElement).style.transform;
                    draggeableRotateValue == "" ? draggeableRotateValue = "rotate(0deg)" : false;
                    draggeableRotateValue = draggeableRotateValue.slice(7, -4);
                    draggeableRotateValue = parseFloat(draggeableRotateValue);
                    draggeableElements_Data[dragThisElement].rotationOffset[0] = draggeableRotateValue;
                    draggeableElements_Data[dragThisElement].rotationOffset[1] = e.clientY;
                    document.body.addEventListener("mousemove", mouseRotateEvent);
                    document.body.addEventListener("mousedown", mouseRotateDownEvent, true);
                    draggingIconActive = this.id;
                } else {
                    document.getElementById("rotate-icon").style.backgroundColor = "";
                    document.getElementById("rotate-icon").children[0].style.fill = "";
                    draggingIconActive = "";
                }
            break;

            case "success-icon":
                document.getElementById(dragThisElement).removeEventListener("mousedown", mouseEventDown);
                if (localStorage.getItem("draggeableElements") != ""){
                    localStorage.setItem("draggeableElements",JSON.stringify(draggeableElements_Data)); // Store all the data for the future
                }
            break;

            case "clipboard-icon":
                document.body.addEventListener("mouseup", mouseEventUp);
                break;
        }
    }

    function mouseSuccessEvent(e){
        switch(this.id){
            case "success-icon":
                clearInterval(draggeableInterval);
                draggeableTimer = 0;
                draggeableActive = false;
                document.getElementById(this.id).style.backgroundColor = "";
                document.getElementById(this.id).children[0].style.fill = "";
                document.getElementById("rotate-icon").remove();
                document.getElementById("drag-icon").remove();
                document.getElementById("success-icon").remove();
                document.getElementById("clipboard-icon").remove();
                document.getElementById(dragThisElement).addEventListener("mousedown", mouseEventDown);
                document.getElementById(dragThisElement).classList.remove("dragging");
                dragThisElement = "";
            break;
            case "clipboard-icon":
                document.getElementById("datosCronograma").value = JSON.stringify(draggeableElements_Data);
                var copyText = document.getElementById("datosCronograma");
                copyText.select();
                document.execCommand("copy"); // Typescript hates this function!

                document.getElementById("clipboard-icon").style.backgroundColor = "";
                document.getElementById("clipboard-icon").children[0].style.fill = "";

            break;
        }
    }

    function mouseDragEvent(e){
        document.getElementById(dragThisElement).style.left = e.clientX - draggeableElements_Data[dragThisElement].offset[0] +"px";
        document.getElementById(dragThisElement).style.top  = e.clientY - draggeableElements_Data[dragThisElement].offset[1] +"px";
    }

    function mouseRotateEvent(e){
        draggeableRotateValue = (e.clientY - draggeableElements_Data[dragThisElement].rotationOffset[1])/2 + draggeableElements_Data[dragThisElement].rotationOffset[0];
        document.getElementById(dragThisElement).style.transform = "rotate("+draggeableRotateValue+"deg)";
    }

    function mouseRotateDownEvent(e){
        draggeableElements_Data[dragThisElement].rotationOffset[0] = draggeableRotateValue;
        document.body.removeEventListener("mousemove", mouseRotateEvent);
        document.body.removeEventListener("mousedown", mouseRotateDownEvent, true);
        if (e.path[1].id != "rotate-icon"){
            document.getElementById("rotate-icon").style.backgroundColor = "";
            document.getElementById("rotate-icon").children[0].style.fill = "";
            draggingIconActive = "";
        }
    }

    function initiateDragEvents(){
        if (screenSize[0] !== window.innerWidth){ // Changing the size of the screen means changing the offset, this will reset the location of the elements
            localStorage.removeItem("draggeableElements");
            draggeableElements_Data = {};
        }
        genericOffset = window.innerHeight * genericOffset / 1080;
        setTimeout(function(){
            if (!activeDragEvents){
                let totalHeight = 0;
                if (localStorage.getItem("draggeableElements") != undefined){
                    for (let i = 0; i < draggeableElements.length; i++){
                        draggeableElements[i].style.left = draggeableElements_Data[draggeableElements[i].id].offset[0] +"px";
                        draggeableElements[i].style.top = draggeableElements_Data[draggeableElements[i].id].offset[1] +"px";
                        draggeableElements[i].style.transform = "rotate("+draggeableElements_Data[draggeableElements[i].id].rotationOffset[0]+"deg)";
                        draggeableElements[i].addEventListener("mousedown", mouseEventDown);
                        draggeableElements[i].addEventListener("mouseup", mouseIconUpEvent);
                    }
                } else {
                    for (let i = 0; i < draggeableElements.length; i++){
                        if (draggeableElements_Data[draggeableElements[i].id] == undefined){
                            console.log(draggeableElements[i].id);
                            if (i == 0){ // First element
                                draggeableElements_Data[draggeableElements[i].id] = {
                                    height: draggeableElements[i].offsetHeight,
                                    offset: [0,0],
                                    rotationOffset: [0,0]
                                };
                            } else {
                                totalHeight += draggeableElements[i-1].offsetHeight + genericOffset; // Add previous element height
                                draggeableElements_Data[draggeableElements[i].id] = {
                                    height: draggeableElements[i].offsetHeight,
                                    offset: [0, totalHeight],
                                    rotationOffset: [0,0]
                                };
                            }
                            draggeableElements[i].style.left = draggeableElements_Data[draggeableElements[i].id].offset[0] +"px";
                            draggeableElements[i].style.top = draggeableElements_Data[draggeableElements[i].id].offset[1] +"px";
                        }
                        draggeableElements[i].addEventListener("mousedown", mouseEventDown);
                        draggeableElements[i].addEventListener("mouseup", mouseIconUpEvent);
                    }
                    localStorage.setItem("draggeableElements",JSON.stringify(draggeableElements_Data));
                    localStorage.setItem("screenSize",JSON.stringify([window.innerWidth, window.innerHeight]));
                }
            } else {
                if (lockPreset != ""){
                    let lockPreset_Data = JSON.parse(lockPreset);
                    for (let i = 0; i < draggeableElements.length; i++){
                        draggeableElements[i].style.left = lockPreset_Data[draggeableElements[i].id].offset[0] +"px";
                        draggeableElements[i].style.top = lockPreset_Data[draggeableElements[i].id].offset[1] +"px";
                        draggeableElements[i].style.transform = "rotate("+lockPreset_Data[draggeableElements[i].id].rotationOffset[0]+"deg)";
                        draggeableElements[i].removeEventListener("mousedown", mouseEventDown);
                        draggeableElements[i].removeEventListener("mouseup", mouseIconUpEvent);
                    }
                    localStorage.setItem("draggeableElements",lockPreset);
                    draggeableElements_Data = lockPreset;
                    draggeableElements_Data == null ? draggeableElements_Data = {} : draggeableElements_Data = JSON.parse(draggeableElements_Data);
                }
            }
            document.getElementById("informacionLateral").style.opacity = 1;
        },1000);
    }


    /*
        ------------------
        CUSTOM FONT LOADER
        ------------------
    */

    var customFont = false;
    var fontURL = "";
    var fontFamily = "Odibee Sans";
    var spotifyFont = "Odibee Sans";
    var boldTitles = false;

    function loadFont(){
        if (customFont){
            let link = document.createElement('link');
            link.id = 'custom-font';
            link.rel = 'stylesheet';
            link.href = fontURL;
            document.head.appendChild(link);
            document.getElementById("monthYear").style.paddingBottom = "12px";
            document.getElementById("calendario").style.paddingBottom = "12px";
            document.getElementById("hora").style.paddingBottom = "6px";
            document.getElementById("hora").style.paddingRight = "6px";
            document.getElementById("contenedorClima").style.padding = "20px 14px";
            document.body.style.fontFamily = fontFamily;
            spotifyFont = fontFamily;
            spotifyAPI.playback();
            if (boldTitles){
                document.getElementById("monthYear").style.fontWeight = "bold";
                document.getElementById("hora").style.fontWeight = "bold";
                document.getElementById("climaTitulo").style.fontWeight = "bold";
                document.getElementById("cronogramaTitulo").style.fontWeight = "bold";
            }
        } else {
            document.body.style.fontFamily = "Odibee Sans";
            spotifyFont = "Odibee Sans";
            spotifyAPI.playback();
            document.getElementById("monthYear").style.paddingBottom = "";
            document.getElementById("calendario").style.paddingBottom = "";
            document.getElementById("hora").style.paddingBottom = "";
            document.getElementById("hora").style.paddingRight = "";
            document.getElementById("contenedorClima").style.padding = "";
            document.getElementById("monthYear").style.fontWeight = "";
            document.getElementById("hora").style.fontWeight = "";
            document.getElementById("climaTitulo").style.fontWeight = "";
            document.getElementById("cronogramaTitulo").style.fontWeight = "";
        }
    }
    

    /*
            ------
            ALERTS
            ------
    */
    const alerta = {
        crear: (fecha, titulo, comentario) => {
            let pantalla = document.createElement("div");
            pantalla.classList.add("alertas");

            let contenedor = document.createElement("div");
            contenedor.classList.add("contenedorAlerta");

            let cerrar = document.createElement("a");
            cerrar.classList.add("cerrarAlerta");
            cerrar.onclick = function (){
                var parent = this.offsetParent;
                parent.style.display = "none";
                setTimeout(function (){
                    (document.getElementsByTagName("body"))[0].removeChild(parent);
                }, 200);
            }
            cerrar.appendChild(document.createTextNode("X"));

            let fecha_contenedor = document.createElement("a");
            fecha_contenedor.classList.add("fechaAlerta");
            fecha_contenedor.appendChild(document.createTextNode(fecha));

            let titulo_contenedor = document.createElement("a");
            titulo_contenedor.classList.add("tituloAlerta");
            titulo_contenedor.appendChild(document.createTextNode(titulo));

            let comentario_contenedor = document.createElement("a");
            comentario_contenedor.classList.add("comentarioAlerta");
            comentario_contenedor.innerHTML = comentario;

            contenedor.appendChild(cerrar);
            contenedor.appendChild(fecha_contenedor);
            contenedor.appendChild(titulo_contenedor);
            contenedor.appendChild(comentario_contenedor);

            pantalla.appendChild(contenedor);
            (document.getElementsByTagName("body"))[0].appendChild(pantalla);
        },
        schedule: () => {
            alerta.crear("Notification:", "", "Schedule and notes copied to clipboard! Now you can disable this function in the wallpaper settings menu.")
        },
        scheduleClean: () => {
            alerta.crear("Notification:", "", "Schedule memory wiped, reload your wallpaper.")
        },
        clima: (error) => {
            alerta.crear("Weather Error:", "", error)
        },
        spotify: (error) => {
            alerta.crear("Spotify Error:", "", error)
        },
        actualizacion: (fecha, titulo, comentario) => {
            alerta.crear(fecha, titulo, comentario);
        },
    }
}