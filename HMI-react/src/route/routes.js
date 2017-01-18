/**
 * Created by urunzl on 29.7.2016.
 */

var routes = {
    "home":{
        hash: "/home",
        name: "home",
        page: null,
        value: "1",
        icon: "../../assets/Articles.png",
        children: {}
    },
    "settings": {
        hash: "/settings",
        name: "settings",
        page: null,
        value: "2",
        icon: "../../assets/Overview.png",
        children: {
            "product-settings": {
                hash: "/settings/product-settings",
                name: "product-settings",
                page: "ProductSettings",
                value: "2.1",
                icon: "../../assets/config.png",
                setting: ["shift","unit","group"],
                children: {
                    "piecing": {
                        hash: "/settings/product-settings/piecing",
                        name: "piecing",
                        page: "Piecing",
                        value: "2.1.1",
                        icon: "../../assets/config.png",
                        setting: ["shift","unit"],
                        children: {}
                    },
                    "graph": {
                        hash: "/settings/product-settings/graph",
                        name: "graph",
                        page: "Graph",
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
        name: "graph1",
        page: null,
        value: "3",
        icon: "../../assets/group.png",
        children: {}

    },
    "homeA": {
        hash: "/homeA",
        name: "homeA",
        page: null,
        value: "4",
        icon: "../../assets/config.png",
        setting: ["shift","unit","group"],
        children: {}
    }
};

module.exports = routes;
