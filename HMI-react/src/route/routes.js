/**
 * Created by urunzl on 29.7.2016.
 */

var routes = {
    "home":{
        hash: "/home",
        names: {
            cz: "Doma",
            eng:"Home"
        },
        name: "home",
        page: "Home",
        value: "1",
        icon: "../../assets/Articles.png",
        children: {}
    },
    "settings": {
        hash: "/settings",
        names: {
            cz: "Nastavení",
            eng:"Settings"
        },
        name: "settings",
        page: "Settings",
        value: "2.",
        icon: "../../assets/Overview.png",
        children: {
            "product-settings": {
                hash: "/settings/product-settings",
                names: {
                    cz: "Nastavení produktu",
                    eng:"Product settings"
                },
                name: "product-settings",
                page: "ProductSettings",
                value: "2.1",
                icon: "../../assets/config.png",
                setting: ["shift","unit","group"],
                children: {
                    "piecing": {
                        hash: "/settings/product-settings/piecing",
                        names: {
                            cz: "Sestavení",
                            eng:"Piecing"
                        },
                        name: "piecing",
                        page: "Piecing",
                        value: "2.1.1",
                        icon: "../../assets/config.png",
                        setting: ["shift","unit"],
                        children: {}
                    },
                    "qmSettings": {
                        hash: "/settings/product-settings/qmSettings",
                        names: {
                            cz: "QM nastavení",
                            eng:"QM setting"
                        },
                        name: "qmSettings",
                        page: "QmSettings",
                        value: "2.1.2",
                        icon: "../../assets/group.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    }
                }
            }
        }
    },
    "graph1": {
        hash: "/graph1",
        names: {
            cz: "Graf",
            eng:"Graph"
        },
        name: "graph1",
        page: null,
        value: "3",
        icon: "../../assets/group.png",
        children: {}

    },
    "homeA": {
        hash: "/homeA",
        names: {
            cz: "Doma",
            eng:"Home"
        },
        name: "homeA",
        page: null,
        value: "4",
        icon: "../../assets/config.png",
        setting: ["shift","unit","group"],
        children: {}
    }
};

module.exports = routes;
