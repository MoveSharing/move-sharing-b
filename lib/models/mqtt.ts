export interface M2Package {
    mt: number;
    mn: number; //Scroll serial number.255->0 Scroll
    gtc: string; // GPS clock utc time
    la: number; //Latitude
    lo: number; //Longitude
    Alt: number; //Altitude
    su: number; //Number of satellites
    va: number; //GPS validity // 0=invalid, 1=2d ,2= 3d
    gs: string; //GPS status
    ss: number; //rssi/4g signal strength
    tt: number; //Trip time
    td: number; //Trip distance
    ws: number; //The current speed
    ioterr: number; //IOT error
    coterr: number; //COT error
    iottemp: number; //IOT temperature
    cottemp: number; //COT temperature
    motortemp: number; //Motor temperature
    battemp: number; //Battery temperature
    soc: number; //Battery level
    lights: number; //Lights
    taillight: number; //Tail light
    Scost: number;
    linelockstatus: number;
    batlockstatus: number;
    iotalarm: number;
    iotbat: number;
    iotvin: number;
    topic: string;
}
