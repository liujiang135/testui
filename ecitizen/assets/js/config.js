/**
 * Created by fisher on 2017/3/22.
 */
let config = {
    // aas_backend_host:'http://10.10.12.166:8000',
    // aas_websocket_host:'ws://10.10.12.166:8002',
    // axios_baseURL: 'http://10.10.12.166:8000/api',
    // is_sso_host:'http://10.10.12.166:8000',
    aas_backend_host:'http://shell.wingconn.net/ecitizen',
    aas_websocket_host:'ws://shell.wingconn.net:8003',
    axios_baseURL: 'http://shell.wingconn.net/ecitizen/api',
    is_sso_host:'http://shell.wingconn.net/ecitizen',
    app_cache_time: 21600,//app缓存过期时间，单位：秒
    browser_options: {
        statusbar: {
            color: '#1F99D1'
        },
        toolbar: {
            height: 44,
            color: '#1F99D1'
        },
        title: {
            color: '#ffffff',
            showPageTitle: true
        },
        backButton: {
            wwwImage: 'img/back.png',
            wwwImagePressed: 'img/back.png',
            wwwImageDensity: 2,
            align: 'left',
            event: 'backPressed'
        },
        forwardButton: {
            wwwImage: 'img/forward.png',
            wwwImagePressed: 'img/forward.png',
            wwwImageDensity: 2,
            align: 'left',
            event: 'forwardPressed'
        },
        closeButton: {
            wwwImage: 'img/close.png',
            wwwImagePressed: 'img/close.png',
            wwwImageDensity: 2,
            align: 'right',
            event: 'closePressed'
        },
        backButtonCanClose: true
    },
    browser_target: '_blank'
}
export  default config;