/**
 * Created by urunzl on 1.8.2016.
 */

import HomePage from './home/homePage';
import SubGraphA from './subGraphA/subGraphA';
import SubGraphB from './subGraphB/subGraphB';
import SubHomeA from './subHomeA/subHomeA';
import SubHomeB from './subHomeB/subHomeB';

//settings
import Settings from './settings/Settings';
import QmSettings from './settings/qmSettings/qmSettings';
import ProductSettings from './settings/productSettings/productSettings';
import Piecing from './settings/productSettings/piecing/piecing';

module.exports = {
    QmSettings: QmSettings,
    Home: HomePage,
    SubHomeA: SubHomeA,
    SubHomeB: SubHomeB,
    SubGraphA: SubGraphA,
    SubGraphB: SubGraphB,
    ProductSettings: ProductSettings,
    Piecing: Piecing,
    Settings: Settings
};