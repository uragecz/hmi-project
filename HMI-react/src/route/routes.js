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
        children: {
            "just-home": {
                hash: "/home/just-home",
                name: "just-home",
                page: null,
                value: "1.1",
                icon: "../../assets/bobbin.png",
                children: {
                    "just-homea": {
                        hash: "/home/just-home/just-homea",
                        name: "just-homea",
                        page: "Graph",
                        value: "1.1.1",
                        icon: "../../assets/bobbin.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-homeb": {
                        hash: "/home/just-home/sub-homeb",
                        name: "sub-homeb",
                        page: "SubHomeB",
                        value: "1.1.2",
                        icon: "../../assets/ClearerService.png",
                        setting: ["shift","unit","group"],
                        children:  {}
                    },
                    "sub-homec": {
                        hash: "/home/just-home/sub-homec",
                        name: "sub-homec",
                        page: "SubHomeC",
                        value: "1.1.3",
                        icon: "../../assets/clocks.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    }
                }
            },
            "sub-homea": {
                hash: "/home/sub-homea",
                name: "sub-homea",
                page: null,
                value: "1.2",
                icon: "../../assets/ClearerService.png",
                children:  {
                    "just-homeaa": {
                        hash: "/home/sub-homea/just-homeaa",
                        name: "just-homeaa",
                        page: "HomeAA",
                        value: "1.2.1",
                        icon: "../../assets/bobbin.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-homebb": {
                        hash: "/home/sub-homea/sub-homebb",
                        name: "sub-homebb",
                        page: "SubHomeBB",
                        value: "1.2.2",
                        icon: "../../assets/ClearerService.png",
                        setting: ["shift","unit","group"],
                        children:  {}
                    },
                    "sub-homecc": {
                        hash: "/home/sub-homea/sub-homecc",
                        name: "sub-homecc",
                        page: "SubHomeCC",
                        value: "1.2.3",
                        icon: "../../assets/clocks.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    }
                }
            },
            "sub-homeb": {
                hash: "/home/sub-homeb",
                name: "sub-homeb",
                page: null,
                value: "1.3",
                icon: "../../assets/clocks.png",
                children: {
                    "just-home": {
                        hash: "/home/sub-homeb/just-home",
                        name: "just-home",
                        page: "Home",
                        value: "1.3.1",
                        icon: "../../assets/bobbin.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-homea": {
                        hash: "/home/sub-homeb/sub-homea",
                        name: "sub-homea",
                        page: "SubHomeA",
                        value: "1.3.2",
                        icon: "../../assets/ClearerService.png",
                        setting: ["shift","unit","group"],
                        children:  {}
                    },
                    "sub-homeb": {
                        hash: "/home/sub-homeb/sub-homeb",
                        name: "sub-homeb",
                        page: "SubHomeB",
                        value: "1.3.3",
                        icon: "../../assets/clocks.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    }
                }
            }
        }
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
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-grapha": {
                        hash: "/graph/just-graph/sub-grapha",
                        name: "sub-grapha",
                        page: "SubGraphA",
                        value: "2.1.2",
                        icon: "../../assets/group.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-graphb": {
                        hash: "/graph/sub-graphb",
                        name: "sub-graphb",
                        page: "SubGraphB",
                        value: "2.1.3",
                        icon: "../../assets/ClearerSettings.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    }
                }
            },
            "sub-grapha": {
                hash: "/graph/sub-grapha",
                name: "sub-grapha",
                page: null,
                value: "2.2",
                icon: "../../assets/group.png",
                children: {
                    "just-graph": {
                        hash: "/graph/just-graph",
                        name: "just-graph",
                        page: "Graph",
                        value: "2.2.1",
                        icon: "../../assets/config.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-grapha": {
                        hash: "/graph/sub-grapha",
                        name: "sub-grapha",
                        page: "SubGraphA",
                        value: "2.2.2",
                        icon: "../../assets/group.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-graphb": {
                        hash: "/graph/sub-graphb",
                        name: "sub-graphb",
                        page: "SubGraphB",
                        value: "2.2.3",
                        icon: "../../assets/ClearerSettings.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    }
                }
            },
            "sub-graphb": {
                hash: "/graph/sub-graphb",
                name: "sub-graphb",
                page: null,
                value: "2.3",
                icon: "../../assets/ClearerSettings.png",
                children: {
                    "just-graph": {
                        hash: "/graph/just-graph",
                        name: "just-graph",
                        page: "Graph",
                        value: "2.3.1",
                        icon: "../../assets/config.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-grapha": {
                        hash: "/graph/sub-grapha",
                        name: "sub-grapha",
                        page: "SubGraphA",
                        value: "2.3.2",
                        icon: "../../assets/group.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-graphb": {
                        hash: "/graph/sub-graphb",
                        name: "sub-graphb",
                        page: "SubGraphB",
                        value: "2.3.3",
                        icon: "../../assets/ClearerSettings.png",
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
        children: {
            "just-graph": {
                hash: "/graph/just-graph",
                name: "just-graph",
                page: null,
                value: "3.1",
                icon: "../../assets/config.png",
                children: {
                    "just-graph": {
                        hash: "/graph/just-graph",
                        name: "just-graph",
                        page: "Graph",
                        value: "3.1.1",
                        icon: "../../assets/config.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-grapha": {
                        hash: "/graph/sub-grapha",
                        name: "sub-grapha",
                        page: "SubGraphA",
                        value: "3.1.2",
                        icon: "../../assets/group.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-graphb": {
                        hash: "/graph/sub-graphb",
                        name: "sub-graphb",
                        page: "SubGraphB",
                        value: "3.1.3",
                        icon: "../../assets/ClearerSettings.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    }
                }
            },
            "sub-grapha": {
                hash: "/graph/sub-grapha",
                name: "sub-grapha",
                page: null,
                value: "3.2",
                icon: "../../assets/group.png",
                children: {
                    "just-graph": {
                        hash: "/graph/just-graph",
                        name: "just-graph",
                        page: "Graph",
                        value: "3.2.1",
                        icon: "../../assets/config.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-grapha": {
                        hash: "/graph/sub-grapha",
                        name: "sub-grapha",
                        page: "SubGraphA",
                        value: "3.2.2",
                        icon: "../../assets/group.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-graphb": {
                        hash: "/graph/sub-graphb",
                        name: "sub-graphb",
                        page: "SubGraphB",
                        value: "3.2.3",
                        icon: "../../assets/ClearerSettings.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    }
                }
            },
            "sub-graphb": {
                hash: "/graph/sub-graphb",
                name: "sub-graphb",
                page: null,
                value: "3.3",
                icon: "../../assets/ClearerSettings.png",
                children: {
                    "just-graph": {
                        hash: "/graph/just-graph",
                        name: "just-graph",
                        page: "Graph",
                        value: "3.3.1",
                        icon: "../../assets/config.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-grapha": {
                        hash: "/graph/sub-grapha",
                        name: "sub-grapha",
                        page: "SubGraphA",
                        value: "3.3.2",
                        icon: "../../assets/group.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    },
                    "sub-graphb": {
                        hash: "/graph/sub-graphb",
                        name: "sub-graphb",
                        page: "SubGraphB",
                        value: "3.3.3",
                        icon: "../../assets/ClearerSettings.png",
                        setting: ["shift","unit","group"],
                        children: {}
                    }
                }
            }
        }
    },
    "homeA": {
        hash: "/homeA",
        name: "homeA",
        page: "Home",
        value: "4",
        icon: "../../assets/config.png",
        setting: ["shift","unit","group"],
        children: {}
    }
};

module.exports = routes;
