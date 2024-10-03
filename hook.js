Java.perform(function () {
    let b = Java.use("com.yanzhenjie.permission.b");
    b["b"].implementation = function (activity, strArr) {
        let result = this["b"](activity, strArr);
        console.log("result is" + result)
        return true;//无论给不给权限都返回True
    };
    let m = Java.use("com.example.gita.gxty.utils.m");
    m["c"].implementation = function (obj) {
        console.log(`log: ${obj}`);//Hook Log函数
    };
    var HashMap = Java.use("java.util.HashMap");
    var SignScanActivity = Java.use("com.example.gita.gxty.ram.SignScanActivity");

    SignScanActivity["onCreate"].implementation = function (bundle) {
        this["onCreate"](bundle);
        var Ibeacon = Java.use("com.example.gita.gxty.model.Ibeacon");
        // 创建新的 Ibeacon 实例并赋值
        var ibeaconInstance = Ibeacon.$new();
        ibeaconInstance.id.value = "131452";
        ibeaconInstance.major.value = "10090";
        ibeaconInstance.minor.value = "50719";
        ibeaconInstance.name.value = "";
        ibeaconInstance.number.value = "42";
        ibeaconInstance.uuid.value = "FDA50693-A4E2-4FB1-AFCF-C6EB07647825";
        console.log(ibeaconInstance.getMyKey())
        var MyLatLng = Java.use("com.example.gita.gxty.model.MyLatLng");
        var myLatLngInstance = MyLatLng.$new();
        myLatLngInstance.latitude.value = 100.0;
        myLatLngInstance.longitude.value = 20.0;
        ibeaconInstance.position = myLatLngInstance;
        // 查找 SignScanActivity 实例并调用 K.put()/
        //
        Java.choose("com.example.gita.gxty.ram.SignScanActivity", {
            onMatch: function (instance) {
                var kField = instance.class.getDeclaredField("K");
                kField.setAccessible(true);
                var kValue = kField.get(instance);
                console.log(kValue.$className)
                var hashMap = Java.cast(kValue, HashMap);
                // 调用 K.value.put("key", ibeaconInstance)
                hashMap.put(ibeaconInstance.getMyKey(), ibeaconInstance);
                console.log("Added new Ibeacon to K.");
            },
            onComplete: function () {
                console.log("Search complete.");
            }
        });
    };
    let SignService = Java.use("com.example.gita.gxty.ram.service.SignService");
    SignService["didRangeBeaconsInRegion"].implementation = function (collection, region) {
        console.log(`SignService.didRangeBeaconsInRegion is called: collection=${collection}, region=${region}`);
        Java.choose("com.example.gita.gxty.ram.service.SignService", {
            onMatch: function (instance) {
                var kField = instance.class.getDeclaredField("G");
                kField.setAccessible(true);
                var kValue = kField.get(instance);
                console.log(kValue.$className)
                var hashMap = Java.cast(kValue, HashMap);
                // 调用 K.value.put("key", ibeaconInstance)
                var Ibeacon = Java.use("com.example.gita.gxty.model.Ibeacon");
                var ibeaconInstance = Ibeacon.$new();
                ibeaconInstance.id.value = "131452";
                ibeaconInstance.major.value = "10090";
                ibeaconInstance.minor.value = "50719";
                ibeaconInstance.name.value = "";
                ibeaconInstance.number.value = "42";
                ibeaconInstance.uuid.value = "FDA50693-A4E2-4FB1-AFCF-C6EB07647825";
                console.log(ibeaconInstance.getMyKey())
                var MyLatLng = Java.use("com.example.gita.gxty.model.MyLatLng");
                var myLatLngInstance = MyLatLng.$new();
                myLatLngInstance.latitude.value = 100.0;
                myLatLngInstance.longitude.value = 20.0;
                ibeaconInstance.position = myLatLngInstance;
                hashMap.put(ibeaconInstance.getMyKey(), ibeaconInstance);
                console.log("Added new Ibeacon to K.");
            },
            onComplete: function () {
                console.log("Search complete.");
            }
        });
        this["didRangeBeaconsInRegion"](collection, region);
    };
});
