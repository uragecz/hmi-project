/**
 * Created by urunzl on 29.7.2016.
 */

var routes = {
    "home":{
        hash: "/home",
        names: {
            cz: "Doma",
            eng: "Home"
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
            eng: "Settings"
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
                            eng: "Piecing"
                        },
                        name: "piecing",
                        page: "Piecing",
                        value: "2.1.1",
                        icon: "../../assets/config.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "qmSettings": {
                        hash: "/settings/product-settings/qmSettings",
                        names: {
                            cz: "QM nastavení",
                            eng: "QM setting"
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
    "graphs": {
        hash: "/graphs",
        names: {
            cz: "Grafy",
            eng: "Graphs"
        },
        name: "graphs",
        page: "Graphs",
        value: "3",
        icon: "../../assets/group.png",
        children: {
            "faultReport": {
                hash: "/graphs/faultReport",
                names: {
                    cz: "Chybové hlášení",
                    eng: "Fault report"
                },
                name: "faultReport",
                page: "FaultReport",
                value: "3.1",
                icon: "../../assets/group.png",
                setting: ["shift","unit","group"],
                children: {}
            },
            "qualityMatrix": {
                hash: "/graphs/qualityMatrix",
                names: {
                    cz: "Graf kvality",
                    eng: "Quality matrix"
                },
                name: "qualityMatrix",
                page: "QualityMatrix",
                value: "3.2",
                icon: "../../assets/config.png",
                setting: ["shift","unit","group"],
                children: {}
            }
        }
    },
    "homeA": {
        hash: "/homeA",
        names: {
            cz: "Doma",
            eng: "Home"
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
